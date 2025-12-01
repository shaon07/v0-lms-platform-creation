"use client";

import { Card, CardContent } from "@/components/atoms";
import type { Lesson } from "@/lib/courses-data";

interface LessonListProps {
  lessons: Lesson[];
}

export default function LessonList({ lessons }: LessonListProps) {
  if (!lessons || lessons.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <ul className="space-y-2">
          {lessons.map((l) => (
            <li key={l.id} className="flex items-center justify-between">
              <span className="truncate">{l.title}</span>
              <span className="text-sm text-muted-foreground">
                {l.duration}m
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
