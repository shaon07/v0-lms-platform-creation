import fs from "fs";

export interface YouTubeVideo {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
}

const YT_DEBUG = !!process.env.YT_DEBUG;
export async function getPlaylistVideos(
  playlistId: string
): Promise<YouTubeVideo[]> {
  try {
    // Prefer official YouTube Data API if an API key is available — more reliable
    const ytDataApiKey =
      process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    if (ytDataApiKey) {
      const videos: YouTubeVideo[] = [];
      let pageToken: string | undefined = undefined;
      let page = 0;
      while (true) {
        page += 1;
        const url: string = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}${
          pageToken ? `&pageToken=${pageToken}` : ""
        }&key=${ytDataApiKey}`;
        try {
          const res: any = await fetch(url, { next: { revalidate: 3600 } });
          if (!res.ok) {
            console.warn(`YouTube Data API returned ${res.status}`);
            break;
          }
          const j: any = await res.json();
          const items = j.items || [];
          for (const it of items) {
            const vid =
              it.snippet?.resourceId?.videoId || it.contentDetails?.videoId;
            if (!vid) continue;
            videos.push({
              id: vid,
              title: it.snippet?.title || "Unknown Title",
              duration: "",
              thumbnail:
                it.snippet?.thumbnails?.standard?.url ||
                it.snippet?.thumbnails?.high?.url ||
                it.snippet?.thumbnails?.default?.url ||
                "",
            });
          }
          if (j.nextPageToken) {
            pageToken = j.nextPageToken;
            if (page > 50) break;
            continue;
          }
          break;
        } catch (e) {
          console.error("YouTube Data API error", e);
          break;
        }
      }
      console.log(`YouTube Data API: fetched ${videos.length} videos`);
      return videos;
    }
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
      console.warn(
        "Could not find playlist contents in JSON structure - will search whole JSON"
      );
    }

    const videos: YouTubeVideo[] = [];
    const seen = new Set<string>();

    // Helper: recursively collect playlistVideoRenderer nodes, only add new ids
    function collectPlaylistVideos(obj: any) {
      if (!obj || typeof obj !== "object") return 0;
      let added = 0;
      if (Array.isArray(obj)) {
        for (const el of obj) {
          added += collectPlaylistVideos(el);
        }
        return added;
      }

      // playlistVideoRenderer (common in initial playlist page)
      if (obj.playlistVideoRenderer) {
        const video = obj.playlistVideoRenderer;
        const id = video.videoId;
        if (id && !seen.has(id)) {
          seen.add(id);
          videos.push({
            id,
            title: video.title?.runs?.[0]?.text || "Unknown Title",
            duration: video.lengthText?.simpleText || "0:00",
            thumbnail: video.thumbnail?.thumbnails?.[0]?.url || "",
          });
          added += 1;
        }
      }

      // videoRenderer (sometimes used inside continuation payloads)
      if (obj.videoRenderer) {
        const video = obj.videoRenderer;
        const id = video.videoId || video?.accessibility?.data?.videoId;
        if (id && !seen.has(id)) {
          seen.add(id);
          videos.push({
            id,
            title:
              video.title?.runs?.[0]?.text ||
              video.title?.simpleText ||
              "Unknown Title",
            duration:
              video.lengthText?.simpleText ||
              video.lengthText?.simpleText ||
              "0:00",
            thumbnail:
              video.thumbnail?.thumbnails?.[0]?.url ||
              video.thumbnail?.thumbnails?.slice(-1)[0]?.url ||
              "",
          });
          added += 1;
        }
      }

      for (const k of Object.keys(obj)) {
        try {
          added += collectPlaylistVideos(obj[k]);
        } catch {}
      }
      return added;
    }

    // Helper: count playlistVideoRenderer occurrences (debug)
    function countPlaylistRenderers(obj: any): number {
      if (!obj || typeof obj !== "object") return 0;
      let count = 0;
      if (Array.isArray(obj)) {
        for (const el of obj) count += countPlaylistRenderers(el);
        return count;
      }
      if (obj.playlistVideoRenderer) return 1;
      for (const k of Object.keys(obj)) {
        try {
          count += countPlaylistRenderers(obj[k]);
        } catch {}
      }
      return count;
    }

    // Try to collect from the expected 'contents' first (preserves canonical order), then fallback
    if (contents) {
      const added = collectPlaylistVideos(contents);
      console.log(`Initial collection from contents: added ${added} videos`);
    } else {
      const added = collectPlaylistVideos(data);
      console.log(`Initial collection from full data: added ${added} videos`);
    }

    // Debug: log initial IDs snapshot to a temp file for inspection
    try {
      if (YT_DEBUG) {
        const logPath = `/tmp/yt_playlist_${playlistId}.log`;
        const snapshot = Array.from(seen).slice(0, 400).join(",");
        const msg = `INITIAL ${new Date().toISOString()} playlist=${playlistId} count=${
          seen.size
        } snapshot=${snapshot}\n`;
        fs.appendFileSync(logPath, msg, { encoding: "utf8" });
      }
    } catch (e) {
      if (YT_DEBUG) console.warn("Could not write debug log", e);
    }

    // Try to find a continuation token to fetch additional pages (handles several shapes)
    function findContinuation(obj: any): string | null {
      if (!obj || typeof obj !== "object") return null;
      if (Array.isArray(obj)) {
        for (const el of obj) {
          const t = findContinuation(el);
          if (t) return t;
        }
        return null;
      }

      // Common locations for continuation tokens
      if (obj.nextContinuationData?.continuation)
        return obj.nextContinuationData.continuation;
      if (obj.continuation) return obj.continuation;
      if (obj.continuationData?.continuation)
        return obj.continuationData.continuation;
      if (obj.reloadContinuationData?.continuation)
        return obj.reloadContinuationData.continuation;
      if (obj.continuationEndpoint?.continuationCommand?.token)
        return obj.continuationEndpoint.continuationCommand.token;
      if (obj.continuationEndpoint?.token)
        return obj.continuationEndpoint.token;

      for (const k of Object.keys(obj)) {
        const t = findContinuation(obj[k]);
        if (t) return t;
      }
      return null;
    }

    // Prefer a continuation token that is specifically attached to the
    // playlist renderer (so we don't accidentally pick a token for
    // recommendations or other sections).
    function findPlaylistContinuation(obj: any): string | null {
      if (!obj || typeof obj !== "object") return null;
      if (Array.isArray(obj)) {
        for (const el of obj) {
          const t = findPlaylistContinuation(el);
          if (t) return t;
        }
        return null;
      }

      // Direct continuation renderer placed after the video items
      if (
        obj.continuationItemRenderer?.continuationEndpoint?.continuationCommand
          ?.token
      )
        return obj.continuationItemRenderer.continuationEndpoint
          .continuationCommand.token;

      // playlistVideoListRenderer often contains a continuations array
      if (obj.playlistVideoListRenderer?.continuations?.length) {
        const c = obj.playlistVideoListRenderer.continuations[0];
        if (c.nextContinuationData?.continuation)
          return c.nextContinuationData.continuation;
        if (c.continuationCommand?.token) return c.continuationCommand.token;
      }

      // Some responses use continuationContents.playlistVideoListContinuation
      if (
        obj.continuationContents?.playlistVideoListContinuation?.continuations
          ?.length
      ) {
        const c =
          obj.continuationContents.playlistVideoListContinuation
            .continuations[0];
        if (c.nextContinuationData?.continuation)
          return c.nextContinuationData.continuation;
        if (c.continuationCommand?.token) return c.continuationCommand.token;
      }

      // older/alternate shapes
      if (obj.playlistVideoListContinuation?.continuations?.length) {
        const c = obj.playlistVideoListContinuation.continuations[0];
        if (c.nextContinuationData?.continuation)
          return c.nextContinuationData.continuation;
        if (c.continuationCommand?.token) return c.continuationCommand.token;
      }

      for (const k of Object.keys(obj)) {
        const t = findPlaylistContinuation(obj[k]);
        if (t) return t;
      }
      return null;
    }

    // Find continuation token: prefer playlist-specific continuation,
    // otherwise fall back to the generic search.
    let continuation = findPlaylistContinuation(data) || findContinuation(data);
    if (continuation)
      console.log(
        "Found initial continuation token",
        continuation.slice(0, 20)
      );

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

    // Fallback: provide a minimal client context if extraction failed
    if (!context) {
      context = {
        client: {
          clientName: "WEB",
          clientVersion: "2.20230522.00.00",
        },
      };
    }

    // If we have a continuation token and an API key/context, fetch additional pages
    let page = 0;
    while (continuation) {
      if (!apiKey || !context) break;
      page += 1;
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

        const foundCount = countPlaylistRenderers(contJson);
        console.log(
          `Continuation page ${page}: playlistVideoRenderer occurrences in response: ${foundCount}`
        );

        const before = seen.size;

        // Debug: append top-level and second-level keys of contJson to the log for inspection
        try {
          if (YT_DEBUG) {
            const logPath = `/tmp/yt_playlist_${playlistId}.log`;
            const topKeys = Object.keys(contJson || {}).join(",");
            const secondLevel: string[] = [];
            for (const k of Object.keys(contJson || {})) {
              const v = contJson[k];
              if (v && typeof v === "object") {
                secondLevel.push(
                  `${k}=>${Object.keys(v).slice(0, 20).join("|")}`
                );
              }
            }
            fs.appendFileSync(
              logPath,
              `KEYS ${new Date().toISOString()} top=${topKeys} second=${secondLevel.join(
                ";"
              )}\n`
            );
          }
        } catch (e) {}

        // First try collecting directly from the response
        let added = collectPlaylistVideos(contJson);

        // If nothing was directly found, try common continuation containers
        if (added === 0) {
          // Dump the continuation JSON for offline inspection (only when YT_DEBUG set)
          try {
            if (YT_DEBUG) {
              const dumpPath = `/tmp/yt_cont_${playlistId}_page${page}.json`;
              fs.writeFileSync(dumpPath, JSON.stringify(contJson, null, 2), {
                encoding: "utf8",
              });
              console.log(`Wrote continuation dump to ${dumpPath}`);
            }
          } catch (e) {}
          const contItems: any[] = [];

          const actions =
            contJson.onResponseReceivedActions ||
            contJson.onResponseReceivedActions;
          if (Array.isArray(actions)) {
            for (const a of actions) {
              if (a.appendContinuationItemsAction?.continuationItems)
                contItems.push(
                  ...a.appendContinuationItemsAction.continuationItems
                );
              if (a.reloadContinuationItemsCommand?.continuationItems)
                contItems.push(
                  ...a.reloadContinuationItemsCommand.continuationItems
                );
              if (a.continuationItems) contItems.push(...a.continuationItems);
            }
          }

          const endpoints =
            contJson.onResponseReceivedEndpoints ||
            contJson.onResponseReceivedEndpoints;
          if (Array.isArray(endpoints)) {
            for (const e of endpoints) {
              if (e.appendContinuationItemsAction?.continuationItems)
                contItems.push(
                  ...e.appendContinuationItemsAction.continuationItems
                );
            }
          }

          if (
            contJson.continuationContents?.playlistVideoListContinuation
              ?.contents
          )
            contItems.push(
              ...contJson.continuationContents.playlistVideoListContinuation
                .contents
            );
          if (contJson.continuationContents?.itemSectionContinuation?.contents)
            contItems.push(
              ...contJson.continuationContents.itemSectionContinuation.contents
            );

          if (contItems.length > 0) {
            const subAdded = collectPlaylistVideos(contItems);
            added += subAdded;
            console.log(
              `Continuation page ${page}: extracted ${contItems.length} continuation items, added ${subAdded}`
            );
          } else {
            // Dump the continuation JSON for offline inspection when nothing found (only with YT_DEBUG)
            try {
              if (YT_DEBUG) {
                const dumpPath = `/tmp/yt_cont_${playlistId}_page${page}.json`;
                fs.writeFileSync(dumpPath, JSON.stringify(contJson, null, 2), {
                  encoding: "utf8",
                });
                console.log(`Wrote continuation dump to ${dumpPath}`);
              }
            } catch (e) {}
          }
        }

        const after = seen.size;
        console.log(
          `Continuation page ${page}: added ${
            after - before
          } new videos (seen ${after})`
        );

        // Append debug info to file
        try {
          if (YT_DEBUG) {
            const logPath = `/tmp/yt_playlist_${playlistId}.log`;
            const msg = `CONT ${new Date().toISOString()} playlist=${playlistId} page=${page} added=${
              after - before
            } seen=${after} foundCount=${foundCount}\n`;
            fs.appendFileSync(logPath, msg, { encoding: "utf8" });
          }
        } catch (e) {
          /* ignore */
        }

        // Find next continuation token
        continuation = findContinuation(contJson);
        if (continuation)
          console.log(`Next continuation: ${continuation.slice(0, 20)}`);
      } catch (e) {
        console.error("Error fetching continuation", e);
        break;
      }
      // safety: avoid infinite loops
      if (page > 50) {
        console.warn("Too many continuation pages, stopping");
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
