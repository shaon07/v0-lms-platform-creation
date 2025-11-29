import { coursesData } from "./courses-data"

export interface SavedCourse {
  courseId: string
  savedDate: string
  progress: number
  completedLessons: number
}

const STORAGE_KEY = "lms_saved_courses"

// Get all saved courses
export function getSavedCourses(): SavedCourse[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

// Check if course is saved
export function isCourseSaved(courseId: string): boolean {
  const saved = getSavedCourses()
  return saved.some((s) => s.courseId === courseId)
}

// Save course to My Courses
export function saveCourse(courseId: string): void {
  const saved = getSavedCourses()
  if (!saved.find((s) => s.courseId === courseId)) {
    saved.push({
      courseId,
      savedDate: new Date().toISOString(),
      progress: 0,
      completedLessons: 0,
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  }
}

// Remove course from saved
export function removeSavedCourse(courseId: string): void {
  const saved = getSavedCourses()
  const filtered = saved.filter((s) => s.courseId !== courseId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

// Update course progress
export function updateProgress(courseId: string, progress: number, completedLessons: number): void {
  const saved = getSavedCourses()
  const course = saved.find((s) => s.courseId === courseId)
  if (course) {
    course.progress = Math.min(progress, 100)
    course.completedLessons = completedLessons
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  }
}

// Get saved course with full data
export function getSavedCourseDetails(courseId: string) {
  const saved = getSavedCourses()
  const savedCourse = saved.find((s) => s.courseId === courseId)
  const course = coursesData.find((c) => c.id === courseId)

  if (!savedCourse || !course) return null

  return {
    ...course,
    ...savedCourse,
    totalLessons: 60,
  }
}
