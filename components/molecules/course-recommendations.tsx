"use client";

import CourseCard from "@/components/molecules/course-card";
import { coursesData } from "@/lib/courses-data";
import { getSavedCourses } from "@/lib/enrollment";
import { useMemo } from "react";

interface CourseRecommendationsProps {
  currentCourseId?: string;
  limit?: number;
}

export default function CourseRecommendations({
  currentCourseId,
  limit = 6,
}: CourseRecommendationsProps) {
  const savedCourses = useMemo(() => getSavedCourses(), []);
  const savedCourseIds = new Set(savedCourses.map((c) => c.courseId));

  const recommendations = useMemo(() => {
    const currentCourse = coursesData.find((c) => c.id === currentCourseId);
    if (!currentCourse) return [];

    const sameCategory = coursesData.filter(
      (c) =>
        c.category === currentCourse.category &&
        c.id !== currentCourseId &&
        !savedCourseIds.has(c.id)
    );

    const popular = coursesData
      .filter((c) => c.id !== currentCourseId && !savedCourseIds.has(c.id))
      .sort((a, b) => b.students - a.students)
      .slice(0, limit - sameCategory.length);

    return [...sameCategory, ...popular].slice(0, limit);
  }, [currentCourseId, savedCourseIds, limit]);

  if (recommendations.length === 0) return null;

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Recommended For You</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Based on your learning interests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
