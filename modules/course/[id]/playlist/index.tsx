import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/atoms";
import { courseDetailsMap } from "@/lib/courses-data";
import { getPlaylistVideos, YouTubeVideo } from "@/lib/youtube";
import PlaylistClient from "./features/PlaylistClient";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PlaylistContainer({ params }: PageProps) {
  const { id: courseId } = await params;
  const course = courseDetailsMap[courseId];

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">Course not found</p>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to courses
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const playlistId =
    course.youtubePlaylistId ||
    (course.url.includes("list=")
      ? course.url.split("list=")[1].split("&")[0]
      : "");

  let initialVideos: YouTubeVideo[] = [];
  let debugError = "";

  if (playlistId) {
    try {
      initialVideos = await getPlaylistVideos(playlistId);
    } catch (e) {
      debugError = e instanceof Error ? e.message : "Unknown error";
    }
  }

  return (
    <PlaylistClient
      course={course}
      playlistId={playlistId}
      initialVideos={initialVideos}
      debugError={debugError}
    />
  );
}
