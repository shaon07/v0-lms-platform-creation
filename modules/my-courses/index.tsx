"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms";
// Header removed — site header is provided by SiteLayout
import {
  getSavedCourseDetails,
  getSavedCourses,
  removeSavedCourse,
} from "@/lib/enrollment";
import { BookOpen, Clock, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function getCategoryGradient(category: string): string {
  const gradients: { [key: string]: string } = {
    JavaScript: "bg-gradient-to-br from-yellow-400 to-orange-500",
    React: "bg-gradient-to-br from-blue-400 to-cyan-500",
    Java: "bg-gradient-to-br from-red-400 to-orange-600",
    Python: "bg-gradient-to-br from-blue-600 to-yellow-400",
    "Node.js": "bg-gradient-to-br from-green-400 to-emerald-600",
    Django: "bg-gradient-to-br from-green-700 to-lime-500",
    Android: "bg-gradient-to-br from-green-500 to-teal-600",
    Vue: "bg-gradient-to-br from-green-400 to-emerald-500",
    "C++": "bg-gradient-to-br from-blue-500 to-indigo-700",
    PHP: "bg-gradient-to-br from-purple-500 to-indigo-600",
    "HTML and CSS": "bg-gradient-to-br from-orange-400 to-red-500",
    MongoDB: "bg-gradient-to-br from-green-500 to-emerald-600",
    Docker: "bg-gradient-to-br from-blue-500 to-cyan-600",
  };
  return gradients[category] || "bg-gradient-to-br from-gray-400 to-gray-600";
}

import CourseCard from "./features/CourseCard";

export default function MyCoursesContainer() {
  const [savedCourses, setSavedCourses] = useState<
    NonNullable<ReturnType<typeof getSavedCourseDetails>>[]
  >([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedCourses();
  }, []);

  const loadSavedCourses = () => {
    const saved = getSavedCourses();
    const courseDetails = saved
      .map((enrollment) => getSavedCourseDetails(enrollment.courseId))
      .filter(
        (course): course is ReturnType<typeof getSavedCourseDetails> =>
          course !== null
      );
    setSavedCourses(
      courseDetails as NonNullable<ReturnType<typeof getSavedCourseDetails>>[]
    );
    setIsLoading(false);
  };

  const handleRemoveCourse = (courseId: string) => {
    removeSavedCourse(courseId);
    loadSavedCourses();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="text-center">Loading your courses...</div>
        </div>
      </div>
    );
  }

  const completedCourses = savedCourses.filter(
    (course) => course.progress === 100
  );
  const inProgressCourses = savedCourses.filter(
    (course) => course.progress < 100
  );

  const totalLearningHours = savedCourses.length * 5;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Courses</h1>
          <p className="text-muted-foreground">
            Continue learning where you left off or explore new courses
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Saved Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{savedCourses.length}</div>
              <p className="text-xs text-muted-foreground">courses saved</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inProgressCourses.length}
              </div>
              <p className="text-xs text-muted-foreground">
                courses being studied
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completedCourses.length}
              </div>
              <p className="text-xs text-muted-foreground">courses finished</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Learning Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLearningHours}h</div>
              <p className="text-xs text-muted-foreground">hours learning</p>
            </CardContent>
          </Card>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            In Progress ({inProgressCourses.length})
          </h2>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>

        {/* In Progress Courses */}
        {inProgressCourses.length > 0 ? (
          <div
            className={`mb-12 ${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }`}
          >
            {inProgressCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                viewMode={viewMode}
                onRemove={() => handleRemoveCourse(course.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-muted/50 rounded-lg p-8 text-center mb-12">
            <p className="text-muted-foreground">
              No courses saved yet. Add courses from the explore page!
            </p>
            <Link href="/">
              <Button className="mt-4">Explore Courses</Button>
            </Link>
          </div>
        )}

        {/* Completed Courses */}
        {completedCourses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">
              Completed ({completedCourses.length})
            </h2>
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }`}
            >
              {completedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  viewMode={viewMode}
                  onRemove={() => handleRemoveCourse(course.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
