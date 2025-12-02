import { Card, CardContent } from "@/components/atoms";
import Link from "next/link";

export default function CourseProgressList({ courses }: { courses: any[] }) {
  return (
    <div className="space-y-4">
      {courses.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No courses in this category
          </CardContent>
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
                      {/* icon placeholder */}
                      {course.instructor}
                    </span>
                    <span className="flex items-center gap-1">
                      {/* icon placeholder */}
                      {course.completedLessons || 0} lessons
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span className="font-semibold">
                        {course.progress || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all"
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
}
