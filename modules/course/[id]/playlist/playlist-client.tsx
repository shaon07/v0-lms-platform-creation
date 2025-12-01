"use client";

import { ArrowLeft, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Header from "@/components/organisms/header";
import { Button } from "@/components/ui/button";
import { CourseDetails } from "@/lib/courses-data";
import { YouTubeVideo } from "@/lib/youtube";

interface PlaylistClientProps {
  course: CourseDetails;
  playlistId: string;
  initialVideos: YouTubeVideo[];
  debugError?: string;
}

export default function PlaylistClient({
  course,
  playlistId,
  initialVideos,
  debugError,
}: PlaylistClientProps) {
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  const usingRealData = initialVideos.length > 0;
  const videos = usingRealData
    ? initialVideos
    : course.lessons.map((l, i) => ({
        id: l.id,
        title: l.title,
        duration: l.duration.toString(),
        thumbnail: "",
      }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 max-w-[1600px] mx-auto w-full p-4 md:p-6">
        {process.env.NEXT_PUBLIC_MODE === "development" && (
          <div className="mb-4 p-2 bg-muted text-xs font-mono rounded border">
            <p>Playlist ID: {playlistId || "None"}</p>
            <p>Videos Found: {initialVideos.length}</p>
            <p>Using Real Data: {usingRealData ? "Yes" : "No"}</p>
            <p>Total Items Displayed: {videos.length}</p>
            {debugError && (
              <p className="text-red-500">Scraper Error: {debugError}</p>
            )}
          </div>
        )}

        <div className="mb-4 flex items-center gap-4">
          <Link href={`/course/${course.id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
          </Link>
          <h1 className="text-xl font-bold truncate">{course.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-lg">
              {playlistId ? (
                <iframe
                  key={
                    usingRealData
                      ? videos[activeLessonIndex]?.id
                      : activeLessonIndex
                  }
                  width="100%"
                  height="100%"
                  src={
                    usingRealData && videos[activeLessonIndex]
                      ? `https://www.youtube.com/embed/${videos[activeLessonIndex].id}?list=${playlistId}`
                      : `https://www.youtube.com/embed/videoseries?list=${playlistId}&index=${activeLessonIndex}`
                  }
                  title={`${course.title} - Video ${activeLessonIndex + 1}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  No Playlist ID available
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {videos[activeLessonIndex]?.title ||
                  `Lesson ${activeLessonIndex + 1}`}
              </h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{course.instructor}</span>
                {videos[activeLessonIndex]?.duration && (
                  <>
                    <span>•</span>
                    <span>{videos[activeLessonIndex].duration}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-xl overflow-hidden bg-card flex flex-col h-[calc(100vh-200px)] lg:h-[600px]">
              <div className="p-4 border-b bg-muted/30">
                <h3 className="font-semibold text-lg">Course Content</h3>
                <p className="text-sm text-muted-foreground">
                  {activeLessonIndex + 1} / {videos.length} videos
                </p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="p-2 space-y-1">
                  {videos.map((video, index) => (
                    <button
                      key={`${video.id ?? "noid"}-${index}`}
                      onClick={() => setActiveLessonIndex(index)}
                      className={`w-full text-left p-3 rounded-lg text-sm transition-colors flex gap-3 group ${
                        index === activeLessonIndex
                          ? "bg-primary/10 hover:bg-primary/15"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {index === activeLessonIndex ? (
                          <PlayCircle className="w-5 h-5 text-primary" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-[10px] text-muted-foreground">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-medium truncate ${
                            index === activeLessonIndex
                              ? "text-primary"
                              : "text-foreground"
                          }`}
                        >
                          {video.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {video.duration}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
