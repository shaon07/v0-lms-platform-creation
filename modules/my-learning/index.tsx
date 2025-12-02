"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms";
import Header from "@/components/organisms/header";
import { coursesData } from "@/lib/courses-data";
import { getSavedCourses } from "@/lib/enrollment";
import { BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import CourseProgressList from "./features/CourseProgressList";

export default function MyLearningContainer() {
  const [activeTab, setActiveTab] = useState("in-progress");
  const savedCourses = useMemo(() => getSavedCourses(), []);

  const enrolledCourses = savedCourses
    .map((saved) => {
      const course = coursesData.find((c) => c.id === saved.courseId);
      return { ...saved, ...course };
    })
    .filter(Boolean);

  const inProgressCourses = enrolledCourses.filter(
    (c) => c.progress < 100 && c.progress > 0
  );
  const completedCourses = enrolledCourses.filter((c) => c.progress === 100);
  const notStartedCourses = enrolledCourses.filter((c) => c.progress === 0);

  const totalProgress =
    enrolledCourses.length > 0
      ? Math.round(
          enrolledCourses.reduce((sum, c) => sum + (c.progress || 0), 0) /
            enrolledCourses.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Learning Journey</h1>
          <p className="text-muted-foreground">
            Track your progress and continue learning
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{totalProgress}%</div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {enrolledCourses.length} courses enrolled
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {inProgressCourses.length}
              </div>
              <p className="text-xs text-muted-foreground">
                courses being studied
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {completedCourses.length}
              </div>
              <p className="text-xs text-muted-foreground">courses finished</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Tabs */}
        {enrolledCourses.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No courses yet</p>
              <p className="text-muted-foreground mb-6">
                Start learning by exploring courses
              </p>
              <Button asChild>
                <Link href="/">Browse Courses</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="in-progress">
                In Progress ({inProgressCourses.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedCourses.length})
              </TabsTrigger>
              <TabsTrigger value="not-started">
                To Start ({notStartedCourses.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="in-progress" className="mt-6">
              <CourseProgressList courses={inProgressCourses} />
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <CourseProgressList courses={completedCourses} />
            </TabsContent>

            <TabsContent value="not-started" className="mt-6">
              <CourseProgressList courses={notStartedCourses} />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
