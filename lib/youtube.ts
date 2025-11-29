export interface YouTubeVideo {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
}

export async function getPlaylistVideos(
  playlistId: string
): Promise<YouTubeVideo[]> {
  try {
    console.log(`Fetching playlist: ${playlistId}`);
    const response = await fetch(
      `https://www.youtube.com/playlist?list=${playlistId}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch playlist: ${response.status}`);
      return [];
    }

    const html = await response.text();
    console.log(`Fetched HTML length: ${html.length}`);

    // More robust extraction
    let jsonString = "";
    try {
      const startMarker = "var ytInitialData =";
      const start = html.indexOf(startMarker);
      if (start === -1) {
        console.error("Could not find ytInitialData start marker");
        return [];
      }

      const endMarker = ";";
      // Find the first semicolon after the start marker
      // Note: This is still naive but better than simple regex.
      // A better way is to look for the </script> tag or specific end sequence.
      // ytInitialData is usually defined in a script tag.

      // Let's try splitting by the start marker and taking the rest
      const contentAfterStart = html.substring(start + startMarker.length);

      // Find the end of the JSON object. It usually ends with ";" before a newline or </script>
      // We can try to parse it by finding the balanced braces, but that's complex.
      // Often it's just followed by ";"

      // Heuristic: It usually ends with ";</script>" or ";var"
      let end = contentAfterStart.indexOf(";</script>");
      if (end === -1) {
        end = contentAfterStart.indexOf(";\n");
      }
      if (end === -1) {
        // Fallback: try to find the first semicolon that looks like the end of the statement
        // This is risky if the JSON contains strings with semicolons.
        // Let's try a different approach: match the script tag content.
        end = contentAfterStart.indexOf(";");
      }

      if (end !== -1) {
        jsonString = contentAfterStart.substring(0, end);
      } else {
        console.error("Could not find ytInitialData end marker");
        return [];
      }
    } catch (e) {
      console.error("Error extracting JSON string", e);
      return [];
    }

    if (!jsonString) {
      console.error("Empty JSON string extracted");
      return [];
    }

    let data;
    try {
      data = JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse ytInitialData JSON", e);
      return [];
    }

    // Navigate through the JSON to find the playlist items
    // Paths can vary. We'll try a few common ones.
    const tabs = data.contents?.twoColumnBrowseResultsRenderer?.tabs;
    const tab = tabs?.find((t: any) => t.tabRenderer?.selected) || tabs?.[0];

    const contents =
      tab?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]
        ?.itemSectionRenderer?.contents?.[0]?.playlistVideoListRenderer
        ?.contents;

    if (!contents) {
      console.error("Could not find playlist contents in JSON structure");
      // console.log("Available keys in data:", Object.keys(data))
      return [];
    }

    const videos: YouTubeVideo[] = [];

    // Helper: recursively collect playlistVideoRenderer nodes
    function collectPlaylistVideos(obj: any) {
      if (!obj || typeof obj !== "object") return;
      if (Array.isArray(obj)) {
        obj.forEach(collectPlaylistVideos);
        return;
      }

      if (obj.playlistVideoRenderer) {
        const video = obj.playlistVideoRenderer;
        videos.push({
          id: video.videoId,
          title: video.title?.runs?.[0]?.text || "Unknown Title",
          duration: video.lengthText?.simpleText || "0:00",
          thumbnail: video.thumbnail?.thumbnails?.[0]?.url || "",
        });
      }

      for (const k of Object.keys(obj)) {
        collectPlaylistVideos(obj[k]);
      }
    }

    collectPlaylistVideos(contents);

    // Try to find a continuation token to fetch additional pages
    function findContinuation(obj: any): string | null {
      if (!obj || typeof obj !== "object") return null;
      if (Array.isArray(obj)) {
        for (const el of obj) {
          const t = findContinuation(el);
          if (t) return t;
        }
        return null;
      }
      if (obj.nextContinuationData?.continuation)
        return obj.nextContinuationData.continuation;
      for (const k of Object.keys(obj)) {
        const t = findContinuation(obj[k]);
        if (t) return t;
      }
      return null;
    }

    let continuation = findContinuation(contents);

    // Extract INNERTUBE API key and context from the page to use the browse endpoint
    let apiKey = "";
    let context: any = null;
    try {
      const ytcfgMatch = html.match(/ytcfg\.set\((\{[\s\S]*?\})\);/);
      if (ytcfgMatch) {
        const cfg = JSON.parse(ytcfgMatch[1]);
        apiKey = cfg.INNERTUBE_API_KEY || "";
        context = cfg.INNERTUBE_CONTEXT || null;
      }
      if (!apiKey) {
        const keyMatch = html.match(/"INNERTUBE_API_KEY"\s*:\s*"([^"]+)"/);
        if (keyMatch) apiKey = keyMatch[1];
      }
      if (!context) {
        const ctxMatch = html.match(
          /"INNERTUBE_CONTEXT"\s*:\s*(\{[\s\S]*?\})\s*,\s*"INNERTUBE_CONTEXT_CLIENT_NAME"/
        );
        if (ctxMatch) {
          try {
            context = JSON.parse(ctxMatch[1]);
          } catch {}
        }
      }
    } catch (e) {
      console.warn("Failed to extract INNERTUBE config", e);
    }

    // If we have a continuation token and an API key/context, fetch additional pages
    while (continuation) {
      if (!apiKey || !context) break;
      try {
        const browseUrl = `https://www.youtube.com/youtubei/v1/browse?key=${apiKey}`;
        const body = JSON.stringify({ context, continuation });
        const contResp = await fetch(browseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
          },
          body,
          next: { revalidate: 3600 },
        });

        if (!contResp.ok) {
          console.error(`Continuation fetch failed: ${contResp.status}`);
          break;
        }

        const contJson = await contResp.json();

        // Collect any playlistVideoRenderer nodes in the response
        collectPlaylistVideos(contJson);

        // Find next continuation token
        continuation = findContinuation(contJson);
      } catch (e) {
        console.error("Error fetching continuation", e);
        break;
      }
    }

    console.log(`Found ${videos.length} videos`);
    return videos;
  } catch (error) {
    console.error("Error scraping YouTube playlist:", error);
    return [];
  }
}
