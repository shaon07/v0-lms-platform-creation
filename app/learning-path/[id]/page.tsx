"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Course, coursesData } from "@/lib/courses-data";
import { learningPaths } from "@/lib/learning-paths";
import { ArrowLeft, BookOpen, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function LearningPathPage() {
  const router = useRouter();
  const params = useParams();
  const pathId = params.id as string;
  const path = learningPaths.find((p) => p.id === pathId);

  if (!path) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              Learning path not found
            </p>
            <button
              onClick={() => router.back()}
              className="text-primary hover:underline mt-4 inline-block cursor-pointer"
            >
              Back
            </button>
          </div>
        </main>
      </div>
    );
  }

  const pathCourses = path.courses
    .map((id) => coursesData.find((c) => c.id === id))
    .filter((c): c is Course => !!c);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Back navigation */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {path.level}
          </div>
          <h1 className="text-4xl font-bold mb-2">{path.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            {path.description}
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Total Duration</p>
                <p className="font-semibold">{path.duration} hours</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Courses Included
                </p>
                <p className="font-semibold">{pathCourses.length} courses</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Skills You'll Learn
                </p>
                <p className="font-semibold">Complete mastery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses in Path */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Courses in This Path</h2>
          <div className="space-y-4">
            {pathCourses.map((course, index) => (
              <Card
                key={course.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6 flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        by {course.instructor} • {course.students}+ students
                      </p>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/course/${course.id}`}>View Course</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why This Path */}
        <Card className="bg-muted/30 border-primary/20 mb-12">
          <CardHeader>
            <CardTitle>Why This Learning Path?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              This structured learning path guides you through the most
              essential concepts and practical skills in a logical order,
              ensuring you build a strong foundation before moving to advanced
              topics.
            </p>
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              <li>
                Sequential learning from fundamentals to advanced concepts
              </li>
              <li>Each course builds on knowledge from previous courses</li>
              <li>Estimated {path.duration} hours to complete all courses</li>
              <li>Ideal for learners at the {path.level} level</li>
              <li>
                Industry-recognized skills taught by experienced instructors
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Ready to start learning?</h3>
          <p className="text-muted-foreground mb-6">
            Begin with the first course and progress at your own pace
          </p>
          <Button size="lg" asChild>
            <Link href={`/course/${pathCourses[0]?.id}`}>
              Start Learning Now
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
