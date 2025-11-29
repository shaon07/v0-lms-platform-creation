"use client"

import { useState, useMemo } from "react"
import Header from "@/components/header"
import { getSavedCourses } from "@/lib/enrollment"
import { coursesData } from "@/lib/courses-data"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, CheckCircle2, ChevronRight } from "lucide-react"

export default function MyLearning() {
  const [activeTab, setActiveTab] = useState("in-progress")
  const savedCourses = useMemo(() => getSavedCourses(), [])

  const enrolledCourses = savedCourses
    .map((saved) => {
      const course = coursesData.find((c) => c.id === saved.courseId)
      return { ...saved, ...course }
    })
    .filter(Boolean)

  const inProgressCourses = enrolledCourses.filter((c) => c.progress < 100 && c.progress > 0)
  const completedCourses = enrolledCourses.filter((c) => c.progress === 100)
  const notStartedCourses = enrolledCourses.filter((c) => c.progress === 0)

  const totalProgress =
    enrolledCourses.length > 0
      ? Math.round(enrolledCourses.reduce((sum, c) => sum + (c.progress || 0), 0) / enrolledCourses.length)
      : 0

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Learning Journey</h1>
          <p className="text-muted-foreground">Track your progress and continue learning</p>
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
                <div className="bg-primary h-full transition-all" style={{ width: `${totalProgress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{enrolledCourses.length} courses enrolled</p>
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
              <div className="text-3xl font-bold">{inProgressCourses.length}</div>
              <p className="text-xs text-muted-foreground">courses being studied</p>
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
              <div className="text-3xl font-bold">{completedCourses.length}</div>
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
              <p className="text-muted-foreground mb-6">Start learning by exploring courses</p>
              <Button asChild>
                <Link href="/">Browse Courses</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="in-progress">In Progress ({inProgressCourses.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
              <TabsTrigger value="not-started">To Start ({notStartedCourses.length})</TabsTrigger>
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
  )
}

function CourseProgressList({ courses }: { courses: any[] }) {
  return (
    <div className="space-y-4">
      {courses.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">No courses in this category</CardContent>
        </Card>
      ) : (
        courses.map((course) => (
          <Link key={course.id} href={`/course/${course.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.instructor}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.completedLessons || 0} lessons
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span className="font-semibold">{course.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full transition-all" style={{ width: `${course.progress || 0}%` }} />
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="mt-2">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  )
}
