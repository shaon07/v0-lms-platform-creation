"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Circle, Clock } from "lucide-react"
import type { Lesson } from "@/lib/courses-data"

interface LessonListProps {
  lessons: Lesson[]
}

export default function LessonList({ lessons }: LessonListProps) {
  return (
    <div className="space-y-3">
      {lessons.map((lesson, index) => (
        <Card key={lesson.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
          <CardContent className="flex items-start gap-4 p-4">
            <div className="flex-shrink-0 mt-1">
              {lesson.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium mb-1">
                {index + 1}. {lesson.title}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{lesson.duration} minutes</span>
              </div>
            </div>
            {lesson.completed && (
              <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded dark:bg-green-950 dark:text-green-400">
                Completed
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
