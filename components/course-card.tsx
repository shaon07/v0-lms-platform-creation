"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Play, Users, Star, Bookmark, ChevronRight } from "lucide-react"
import type { Course } from "@/lib/courses-data"
import { saveCourse, removeSavedCourse, isCourseSaved } from "@/lib/enrollment"

interface CourseCardProps {
  course: Course
  onSaveToggle?: (saved: boolean) => void
}

export default function CourseCard({ course, onSaveToggle }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isSaved, setIsSaved] = useState(() => isCourseSaved(course.id))

  // Generate color based on category hash
  const getCategoryColor = (category: string) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600",
      "from-pink-500 to-pink-600",
      "from-green-500 to-green-600",
      "from-orange-500 to-orange-600",
      "from-red-500 to-red-600",
      "from-indigo-500 to-indigo-600",
      "from-teal-500 to-teal-600",
    ]
    const hash = category.charCodeAt(0) + category.charCodeAt(category.length - 1)
    return colors[hash % colors.length]
  }

  const handleViewCourse = () => {
    if (course.url && course.url !== "#") {
      window.open(course.url, "_blank", "noopener,noreferrer")
    }
  }

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isSaved) {
      removeSavedCourse(course.id)
      setIsSaved(false)
    } else {
      saveCourse(course.id)
      setIsSaved(true)
    }
    onSaveToggle?.(!isSaved)
  }

  return (
    <Link href={`/course/${course.id}`}>
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 h-64">
          {/* Thumbnail with gradient */}
          <div
            className={`w-full h-full bg-gradient-to-br ${getCategoryColor(course.category)} flex items-center justify-center transition-transform duration-300 ${isHovered ? "scale-105" : ""}`}
          >
            <Play className="w-16 h-16 text-white/50" />
          </div>

          {/* Overlay on hover */}
          <div
            className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <button
              className="bg-white text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors"
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <Play className="w-4 h-4 fill-current" />
              View Details
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleToggleSave(e)
            }}
            className={`absolute top-3 left-3 p-2 rounded-full transition-colors ${
              isSaved ? "bg-primary text-primary-foreground" : "bg-black/40 text-white hover:bg-black/60"
            }`}
            aria-label={isSaved ? "Remove from My Courses" : "Add to My Courses"}
          >
            <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
          </button>

          {/* Badge */}
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
            {course.category}
          </div>
        </div>

        {/* Course Info */}
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">by {course.instructor}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.students}+ students</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span>Free</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
