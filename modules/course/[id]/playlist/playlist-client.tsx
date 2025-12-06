"use client";

import { ArrowLeft, List, PlayCircle, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/atoms";
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
  const [isMobilePlaylistOpen, setIsMobilePlaylistOpen] = useState(false);

  const usingRealData = initialVideos.length > 0;
  const videos = usingRealData
    ? initialVideos
    : course.lessons.map((l, i) => ({
        id: l.id,
        title: l.title,
        duration: l.duration.toString(),
        thumbnail: "",
      }));

  const handleVideoSelect = (index: number) => {
    setActiveLessonIndex(index);
    setIsMobilePlaylistOpen(false);
  };

  const PlaylistContent = () => (
    <>
      <div className="p-3 sm:p-4 border-b bg-muted/30 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-base sm:text-lg">Course Content</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {activeLessonIndex + 1} / {videos.length} videos
          </p>
        </div>
        <button
          onClick={() => setIsMobilePlaylistOpen(false)}
          className="lg:hidden p-2 rounded-md hover:bg-muted"
          aria-label="Close playlist"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {videos.map((video, index) => (
            <button
              key={`${video.id ?? "noid"}-${index}`}
              onClick={() => handleVideoSelect(index)}
              className={`w-full text-left p-2.5 sm:p-3 rounded-lg text-sm transition-colors flex gap-2.5 sm:gap-3 group ${
                index === activeLessonIndex
                  ? "bg-primary/10 hover:bg-primary/15"
                  : "hover:bg-muted"
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {index === activeLessonIndex ? (
                  <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                ) : (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-[9px] sm:text-[10px] text-muted-foreground">
                    {index + 1}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium text-xs sm:text-sm line-clamp-2 ${
                    index === activeLessonIndex
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {video.title}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
                  {video.duration}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="w-full">
      {process.env.NEXT_PUBLIC_MODE === "development" && (
        <div className="mb-3 sm:mb-4 p-2 bg-muted text-xs font-mono rounded border overflow-x-auto">
          <p>Playlist ID: {playlistId || "None"}</p>
          <p>Videos Found: {initialVideos.length}</p>
          <p>Using Real Data: {usingRealData ? "Yes" : "No"}</p>
          <p>Total Items Displayed: {videos.length}</p>
          {debugError && (
            <p className="text-red-500">Scraper Error: {debugError}</p>
          )}
        </div>
      )}

      {/* Header with back button and title */}
      <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <Link href={`/course/${course.id}`} className="flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 sm:h-9 text-xs sm:text-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Back to Course
          </Button>
        </Link>
        <h1 className="text-base sm:text-lg md:text-xl font-bold line-clamp-1">
          {course.title}
        </h1>
      </div>

      {/* Main content grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Video player section */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          <div className="aspect-video w-full rounded-lg sm:rounded-xl overflow-hidden bg-black shadow-lg">
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
              <div className="w-full h-full flex items-center justify-center text-white text-sm sm:text-base">
                No Playlist ID available
              </div>
            )}
          </div>

          {/* Video info */}
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold line-clamp-2">
              {videos[activeLessonIndex]?.title ||
                `Lesson ${activeLessonIndex + 1}`}
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <span>{course.instructor}</span>
              {videos[activeLessonIndex]?.duration && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span>{videos[activeLessonIndex].duration}</span>
                </>
              )}
            </div>
          </div>

          {/* Mobile playlist toggle button */}
          <Button
            variant="outline"
            className="w-full lg:hidden flex items-center justify-center gap-2"
            onClick={() => setIsMobilePlaylistOpen(true)}
          >
            <List className="w-4 h-4" />
            <span>
              View Playlist ({activeLessonIndex + 1}/{videos.length})
            </span>
          </Button>
        </div>

        {/* Desktop playlist sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="border rounded-xl overflow-hidden bg-card flex flex-col h-[600px] sticky top-20">
            <PlaylistContent />
          </div>
        </div>
      </div>

      {/* Mobile playlist drawer */}
      {isMobilePlaylistOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsMobilePlaylistOpen(false)}
            aria-hidden
          />
          <aside className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-background shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
            <PlaylistContent />
          </aside>
        </div>
      )}
    </div>
  );
}
