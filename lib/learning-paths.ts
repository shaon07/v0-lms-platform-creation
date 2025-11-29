export interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: number; // in hours
  courses: string[]; // course IDs
  icon: string;
  color: string;
}

export const learningPaths: LearningPath[] = [
  {
    id: "web-dev-beginner",
    title: "Web Development Fundamentals",
    description:
      "Start your web development journey with HTML, CSS, and JavaScript basics",
    level: "Beginner",
    duration: 40,
    // HTML, CSS, JavaScript, Modern JS, TypeScript, Intro to React
    courses: ["26", "27", "14", "16", "40", "17"],
    icon: "🌐",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "full-stack-dev",
    title: "Full Stack Development",
    description:
      "Master frontend with React and backend with Node.js to build complete web applications",
    level: "Intermediate",
    duration: 80,
    // React, MERN / Node.js, Node tutorials, MongoDB, MySQL
    courses: ["17", "22", "23", "32", "34"],
    icon: "🚀",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    description:
      "Build native Android apps from scratch with comprehensive Android development",
    level: "Beginner",
    duration: 60,
    // Android core playlists and Kotlin for Android
    courses: ["1", "2", "3", "38"],
    icon: "📱",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "backend-master",
    title: "Backend Development Mastery",
    description:
      "Learn server-side development with Java, Python, and database management",
    level: "Intermediate",
    duration: 90,
    // Java, Python, Django, MongoDB, Go fundamentals
    courses: ["11", "20", "31", "32", "37"],
    icon: "⚙️",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "python-pro",
    title: "Python Programming Pro",
    description: "Comprehensive Python course from basics to advanced concepts",
    level: "Beginner",
    duration: 50,
    // Python fundamentals, web with Django, DS/algorithms in Python, and ML introductions
    courses: ["20", "21", "31", "60", "75"],
    icon: "🐍",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "devops-essentials",
    title: "DevOps & Tools",
    description:
      "Master version control with Git and containerization with Docker",
    level: "Intermediate",
    duration: 35,
    // Git, Docker, Bash & Shell scripting, DevOps-focused shell scripting
    courses: ["35", "36", "66", "73"],
    icon: "🛠️",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "dsa-master",
    title: "Data Structures & Algorithms Mastery",
    description:
      "Comprehensive DSA preparation using C++ and problem-solving techniques",
    level: "Advanced",
    duration: 120,
    courses: ["41", "42", "43", "56", "57"],
    icon: "🧠",
    color: "from-red-500 to-pink-500",
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description:
      "Introductory to advanced topics in AI and machine learning with hands-on projects",
    level: "Intermediate",
    duration: 100,
    courses: ["64", "65", "75"],
    icon: "🤖",
    color: "from-green-400 to-teal-500",
  },
];
