import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Course, coursesData } from "@/lib/courses-data";
import { learningPaths } from "@/lib/learning-paths";
import { ChevronRight, Clock } from "lucide-react";
import Link from "next/link";

export default function LearningPathsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">All Learning Paths</h1>
            <p className="text-muted-foreground">
              Browse all curated learning sequences
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
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {pathCourses.map((course, i) => (
                          <div
                            key={course.id}
                            className="flex items-center gap-2"
                          >
                            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-center leading-6 text-xs font-semibold">
                              {i + 1}
                            </span>
                            <span className="line-clamp-1">{course.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button className="w-full gap-2" asChild>
                      <Link href={`/learning-path/${path.id}`}>
                        View Path
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
