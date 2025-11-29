"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { CourseDetails } from "@/lib/courses-data"
import { ExternalLink, BookOpen, Users, Clock } from "lucide-react"

interface CourseDetailsProps {
  course: CourseDetails
  progress: number
}

export default function CourseDetailsComponent({ course, progress }: CourseDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          {course.level}
        </div>
        <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
        <p className="text-lg text-muted-foreground mb-4">{course.description}</p>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{course.duration} hours</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span>By {course.instructor}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button asChild size="lg" className="gap-2">
            <a href={course.url} target="_blank" rel="noopener noreferrer">
              Start Learning <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg">
            Share Course
          </Button>
        </div>
      </div>

      {/* Rating Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Student Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{course.rating}</span>
            <span className="text-sm text-muted-foreground">out of 5 stars</span>
          </div>
          <p className="text-sm text-muted-foreground">{course.reviews} reviews from students</p>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm w-6">{star}★</span>
                <div className="flex-1 bg-muted rounded-full h-1.5">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{
                      width: `${Math.random() * 50 + 10}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
