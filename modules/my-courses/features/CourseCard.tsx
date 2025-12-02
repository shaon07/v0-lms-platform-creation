"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms";
import { Trash2, User } from "lucide-react";

function getCategoryGradient(category: string): string {
  const gradients: { [key: string]: string } = {
    JavaScript: "bg-gradient-to-br from-yellow-400 to-orange-500",
    React: "bg-gradient-to-br from-blue-400 to-cyan-500",
    Java: "bg-gradient-to-br from-red-400 to-orange-600",
    Python: "bg-gradient-to-br from-blue-600 to-yellow-400",
    "Node.js": "bg-gradient-to-br from-green-400 to-emerald-600",
    Django: "bg-gradient-to-br from-green-700 to-lime-500",
    Android: "bg-gradient-to-br from-green-500 to-teal-600",
    Vue: "bg-gradient-to-br from-green-400 to-emerald-500",
    "C++": "bg-gradient-to-br from-blue-500 to-indigo-700",
    PHP: "bg-gradient-to-br from-purple-500 to-indigo-600",
    "HTML and CSS": "bg-gradient-to-br from-orange-400 to-red-500",
    MongoDB: "bg-gradient-to-br from-green-500 to-emerald-600",
    Docker: "bg-gradient-to-br from-blue-500 to-cyan-600",
  };
  return gradients[category] || "bg-gradient-to-br from-gray-400 to-gray-600";
}

export default function CourseCard({
  course,
  viewMode,
  onRemove,
}: {
  course: any;
  viewMode: "grid" | "list";
  onRemove: () => void;
}) {
  const handleContinue = () => {
    if (course.url && course.url !== "#") {
      window.open(course.url, "_blank", "noopener,noreferrer");
    }
  };

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6 flex items-center gap-6">
          <div
            className={`${getCategoryGradient(
              course.category
            )} w-24 h-24 rounded-lg flex-shrink-0`}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg mb-1 line-clamp-2">
              {course.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {course.instructor}
              </span>
              <span>{course.category}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {course.completedLessons} of {course.totalLessons} lessons
                completed
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <Button onClick={handleContinue} size="sm">
              Continue
            </Button>
            <Button
              onClick={onRemove}
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow relative">
      <div className={`${getCategoryGradient(course.category)} h-32 w-full`} />
      <CardHeader>
        <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
        <CardDescription className="flex items-center gap-2 mt-1">
          <User className="w-4 h-4" />
          {course.instructor}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{course.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {course.completedLessons} of {course.totalLessons} lessons
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleContinue} className="flex-1">
            Continue Learning
          </Button>
          <Button
            onClick={onRemove}
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
