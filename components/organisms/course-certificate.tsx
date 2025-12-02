"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms";
import type { CourseDetails } from "@/lib/courses-data";
import { Award, Download, Share2 } from "lucide-react";

interface CourseCertificateProps {
  course: CourseDetails;
  progress: number;
}

export default function CourseCertificate({
  course,
  progress,
}: CourseCertificateProps) {
  const isCompleted = progress === 100;

  if (!isCompleted) {
    return (
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
            <Award className="w-5 h-5" />
            Certificate of Completion
          </CardTitle>
          <CardDescription className="text-amber-800 dark:text-amber-300">
            Complete all lessons to earn your certificate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border-2 border-dashed border-amber-200 dark:border-amber-800 text-center">
            <p className="text-muted-foreground mb-4">{progress}% Complete</p>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden mb-4">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Complete {100 - progress}% more to unlock your certificate
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-200">
          <Award className="w-5 h-5" />
          Certificate of Completion
        </CardTitle>
        <CardDescription className="text-green-800 dark:text-green-300">
          You have successfully completed this course!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border-2 border-green-200 dark:border-green-800 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
            Certificate of Completion
          </p>
          <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Completed on{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mb-4 rounded-full" />
          <p className="text-sm font-medium">Instructor: {course.instructor}</p>
        </div>

        <div className="flex gap-3">
          <Button className="gap-2 flex-1" variant="default">
            <Download className="w-4 h-4" />
            Download Certificate
          </Button>
          <Button className="gap-2 flex-1 bg-transparent" variant="outline">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
