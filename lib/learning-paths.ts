export interface LearningPath {
  id: string
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: number // in hours
  courses: string[] // course IDs
  icon: string
  color: string
}

export const learningPaths: LearningPath[] = [
  {
    id: "web-dev-beginner",
    title: "Web Development Fundamentals",
    description: "Start your web development journey with HTML, CSS, and JavaScript basics",
    level: "Beginner",
    duration: 40,
    courses: ["26", "27", "14"], // HTML, CSS, JavaScript
    icon: "🌐",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "full-stack-dev",
    title: "Full Stack Development",
    description: "Master frontend with React and backend with Node.js to build complete web applications",
    level: "Intermediate",
    duration: 80,
    courses: ["17", "22", "34"], // React, Node.js, MySQL
    icon: "🚀",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    description: "Build native Android apps from scratch with comprehensive Android development",
    level: "Beginner",
    duration: 60,
    courses: ["1", "2", "3"], // Android courses
    icon: "📱",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "backend-master",
    title: "Backend Development Mastery",
    description: "Learn server-side development with Java, Python, and database management",
    level: "Intermediate",
    duration: 90,
    courses: ["11", "20", "32"], // Java, Python, MongoDB
    icon: "⚙️",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "python-pro",
    title: "Python Programming Pro",
    description: "Comprehensive Python course from basics to advanced concepts",
    level: "Beginner",
    duration: 50,
    courses: ["20", "21", "31"], // Python, Django
    icon: "🐍",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "devops-essentials",
    title: "DevOps & Tools",
    description: "Master version control with Git and containerization with Docker",
    level: "Intermediate",
    duration: 35,
    courses: ["35", "36"], // Git, Docker
    icon: "🛠️",
    color: "from-indigo-500 to-blue-500",
  },
]
