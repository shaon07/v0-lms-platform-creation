import { getPlaylistVideos } from "./lib/youtube";

async function main() {
    const playlistId = "PLgH5QX0i9K3p9xzYLFGdfYliIRBLVDRV5";
    console.log(`Testing scraper for playlist: ${playlistId}`);
    try {
        const videos = await getPlaylistVideos(playlistId);
        console.log("Videos found:", videos.length);
        if (videos.length > 0) {
            console.log("First video:", videos[0]);
        } else {
            console.log("No videos found.");
        }
    } catch (error) {
        console.error("Error running scraper:", error);
    }
}

main();
