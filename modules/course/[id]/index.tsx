"use client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms";
import CourseRecommendations from "@/components/molecules/course-recommendations";
import YoutubePlayer from "@/components/molecules/youtube-player";
import CourseDetails from "@/components/organisms/course-details";
import Header from "@/components/organisms/header";
import { courseDetailsMap } from "@/lib/courses-data";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CourseContainer() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const course = courseDetailsMap[courseId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">Course not found</p>
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to courses
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const completedLessons = course.lessons.filter((l) => l.completed).length;
  const progress = Math.round((completedLessons / course.lessons.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
          size="sm"
          className="mb-6 bg-transparent cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to courses
        </Button>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <CourseDetails course={course} progress={progress} />
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Course Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Completion</span>
                    <span className="font-semibold">{progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {completedLessons} of {course.lessons.length} lessons
                  completed
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{course.duration}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level:</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Students:</span>
                  <span className="font-medium">
                    {course.students.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <span className="font-medium">{course.rating} ⭐</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {course.youtubePlaylistId && (
          <YoutubePlayer
            playlistId={course.youtubePlaylistId}
            title="Course Videos"
          />
        )}

        <CourseRecommendations currentCourseId={courseId} />
      </main>
    </div>
  );
}
