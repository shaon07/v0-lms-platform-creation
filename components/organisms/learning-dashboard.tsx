"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms";
import { coursesData } from "@/lib/courses-data";
import { Award, BookOpen, TrendingUp, Users } from "lucide-react";

export default function LearningDashboard() {
  const totalStudents = coursesData.reduce(
    (acc, course) => acc + course.students,
    0
  );
  const totalCourses = coursesData.length;
  const categories = new Set(coursesData.map((c) => c.category)).size;
  const mostPopularCourse = coursesData.reduce((max, course) =>
    course.students > max.students ? course : max
  );

  const stats = [
    {
      title: "Total Courses",
      value: totalCourses,
      description: "Programming courses available",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    },
    {
      title: "Total Learners",
      value: `${Math.round(totalStudents / 1000)}k+`,
      description: "Students enrolled",
      icon: Users,
      color:
        "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
    },
    {
      title: "Categories",
      value: categories,
      description: "Programming languages & tools",
      icon: TrendingUp,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
    },
    {
      title: "Most Popular",
      value: mostPopularCourse.title,
      description: `${mostPopularCourse.students} students`,
      icon: Award,
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Learning Overview</h2>
        <p className="text-muted-foreground">
          Track your learning journey and explore courses
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  {stat.title}
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
