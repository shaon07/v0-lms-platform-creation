"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Course, coursesData } from "@/lib/courses-data";
import { learningPaths } from "@/lib/learning-paths";
import { ChevronRight, Clock } from "lucide-react";
import Link from "next/link";

export default function LearningPathsSection() {
  return (
    <section className="py-12">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Structured Learning Paths</h2>
          <p className="text-muted-foreground">
            Follow curated course sequences to master specific skills and build
            your career
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {learningPaths.map((path) => {
          const pathCourses = path.courses
            .map((id) => coursesData.find((c) => c.id === id))
            .filter((c): c is Course => !!c);

          return (
            <Card
              key={path.id}
              className="hover:shadow-lg transition-shadow flex flex-col"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-4xl">{path.icon}</span>
                  <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {path.level}
                  </span>
                </div>
                <CardTitle className="text-xl">{path.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {path.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{path.duration} hours total</span>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">
                      {pathCourses.length} courses included
                    </p>
                    <div className="space-y-1">
                      {pathCourses.map((course, i) => (
                        <div
                          key={course.id}
                          className="text-xs text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-center leading-5 text-xs font-semibold">
                            {i + 1}
                          </span>
                          <span className="line-clamp-1">{course.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="w-full gap-2" asChild>
                  <Link href={`/learning-path/${path.id}`}>
                    View Path
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="w-full flex justify-center mt-4">
        <Button className="gap-2" asChild>
          <Link href={`/learning-path`}>
            See more
            <ChevronRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
