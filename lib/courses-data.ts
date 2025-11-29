export interface Course {
  id: string
  title: string
  category: string
  instructor: string
  students: number
  url: string
  language: "Bangla" | "Hindi" // added language field
}

export interface Lesson {
  id: string
  title: string
  duration: number // in minutes
  completed: boolean
}

export interface Resource {
  id: string
  title: string
  type: "pdf" | "video" | "code" | "article"
  url: string
}

export interface CourseDetails {
  id: string
  title: string
  category: string
  instructor: string
  students: number
  url: string
  rating: number // 0-5
  reviews: number
  description: string
  duration: number // in hours
  level: "Beginner" | "Intermediate" | "Advanced"
  lessons: Lesson[]
  resources: Resource[]
  price?: number
  enrolledStudents?: number
  language: "Bangla" | "Hindi" // added language field
  youtubePlaylistId?: string // Added YouTube playlist ID for iframe embedding
}

export const coursesData: Course[] = [
  // ========== BANGLA COURSES ==========

  // Android - Bangla
  {
    id: "1",
    title: "Android Bangla Tutorials",
    category: "Android",
    instructor: "Anisul Islam",
    students: 1200,
    url: "https://www.youtube.com/playlist?list=PLgH5QX0i9K3p9xzYLFGdfYliIRBLVDRV5",
    language: "Bangla", // added language
  },
  {
    id: "2",
    title: "Android Firebase Bangla Tutorials",
    category: "Android",
    instructor: "Anisul Islam",
    students: 890,
    url: "https://www.youtube.com/playlist?list=PLgH5QX0i9K3oDurEmECb5U_BZ1hrLaHx-",
    language: "Bangla", // added language
  },
  {
    id: "3",
    title: "Android SQLite Database Bangla Tutorials",
    category: "Android",
    instructor: "Anisul Islam",
    students: 750,
    url: "https://www.youtube.com/playlist?list=PLgH5QX0i9K3oJBRutwsFgUKrKJCjv9K3p",
    language: "Bangla", // added language
  },

  // C - Bangla
  {
    id: "4",
    title: "C Programming Bangla Tutorial Course",
    category: "C",
    instructor: "Anisul Islam",
    students: 2100,
    url: "https://www.youtube.com/playlist?list=PLgH5QX0i9K3pCMBZcul1fta6UivHDbXvz",
    language: "Bangla", // added language
  },
  {
    id: "5",
    title: "C Programming Bangla Tutorial For Beginners 2023",
    category: "C",
    instructor: "Hablu Programmer",
    students: 1800,
    url: "https://youtube.com/playlist?list=PLNMnAEqLBwmrwDSycdTLsvZBhmK5kOtgV",
    language: "Bangla", // added language
  },
  {
    id: "6",
    title: "C - All you need to know",
    category: "C",
    instructor: "Stack Learner",
    students: 1600,
    url: "https://www.youtube.com/playlist?list=PL_XxuZqN0xVASsjyqiNzgjUWHbDkN2Scy",
    language: "Bangla", // added language
  },

  // C# - Bangla
  {
    id: "7",
    title: "C# and ASP.NET MVC Full Bangla Tutorial",
    category: "C#",
    instructor: "Learn With Nirash",
    students: 1900,
    url: "https://www.youtube.com/playlist?list=PL_g-DE60bXDBpjMPUWGbmCLHnQDIIcw-6",
    language: "Bangla", // added language
  },
  {
    id: "8",
    title: "C# bangla tutorial | Basic to advance",
    category: "C#",
    instructor: "Learn Hunter",
    students: 1450,
    url: "https://www.youtube.com/playlist?list=PLbC4KRSNcMnqQakB2xlZPoaV6uau4wTIt",
    language: "Bangla", // added language
  },

  // C++ - Bangla
  {
    id: "9",
    title: "C++ Bangla Tutorial Course",
    category: "C++",
    instructor: "Anisul Islam",
    students: 2200,
    url: "https://www.youtube.com/playlist?list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL",
    language: "Bangla", // added language
  },
  {
    id: "10",
    title: "Object Oriented C++ | Bangla Tutorial",
    category: "C++",
    instructor: "Online School",
    students: 1700,
    url: "https://www.youtube.com/playlist?list=PLy7uM3PHzMF1hnqhFGE4_A8qTUfFmZ_3y",
    language: "Bangla", // added language
  },

  // Java - Bangla
  {
    id: "11",
    title: "Java Bangla Tutorials | CORE Java | Complete OOP",
    category: "Java",
    instructor: "Anisul Islam",
    students: 3100,
    url: "https://www.youtube.com/playlist?list=PLgH5QX0i9K3oAZUB2QXR-dZac0c9HNyRa",
    language: "Bangla", // added language
  },
  {
    id: "12",
    title: "Java Bangla (বাংলা) tutorial for beginners",
    category: "Java",
    instructor: "Time & Training",
    students: 2800,
    url: "https://youtube.com/playlist?list=PL82MewGFQkx1jjozz7I98Yjanw8n6p9HP",
    language: "Bangla", // added language
  },
  {
    id: "13",
    title: "Java For Beginners",
    category: "Java",
    instructor: "Learn With Tawhid",
    students: 2200,
    url: "https://www.youtube.com/playlist?list=PLvr0Ht-XkB_0KC2-N3hv0V3ib-Z6wKkAy",
    language: "Bangla", // added language
  },

  // JavaScript - Bangla
  {
    id: "14",
    title: "JavaScript All You Need to Know",
    category: "JavaScript",
    instructor: "Stack Learner",
    students: 4100,
    url: "https://www.youtube.com/playlist?list=PL_XxuZqN0xVAu_dWUVFbscqZdTzE8t6Z1",
    language: "Bangla", // added language
  },
  {
    id: "15",
    title: "JavaScript Bangla Tutorial Course 2021",
    category: "JavaScript",
    instructor: "Anisul Islam",
    students: 3500,
    url: "https://www.youtube.com/playlist?list=PLgH5QX0i9K3qzryglMjcyEktz4q7ySunX",
    language: "Bangla", // added language
  },
  {
    id: "16",
    title: "Modern JavaScript ES6 Bangla Tutorial",
    category: "JavaScript",
    instructor: "Sumit Saha",
    students: 3200,
    url: "https://www.youtube.com/playlist?list=PLHiZ4m8vCp9M6HVQv7a36cp8LKzyHIePr",
    language: "Bangla", // added language
  },

  // React - Bangla
  {
    id: "17",
    title: "React JS Tutorial Bangla Series for Beginners",
    category: "React",
    instructor: "Sumit Saha",
    students: 5200,
    url: "https://www.youtube.com/playlist?list=PLHiZ4m8vCp9M6HVQv7a36cp8LKzyHIePr",
    language: "Bangla", // added language
  },
  {
    id: "18",
    title: "Understand ReactJS Core Features",
    category: "React",
    instructor: "Stack Learner",
    students: 4800,
    url: "https://www.youtube.com/playlist?list=PL_XxuZqN0xVBANld2gDEE6_0G886zavUs",
    language: "Bangla", // added language
  },
  {
    id: "19",
    title: "১ ভিডিওতে রিয়্যাক্ট শিখুন ! ফুল কোর্স",
    category: "React",
    instructor: "Rabbil Hasan",
    students: 6100,
    url: "https://www.youtube.com/watch?v=6wilewRV3xQ",
    language: "Bangla", // added language
  },

  // Python - Bangla
  {
    id: "20",
    title: "Python Bangla Tutorial Course",
    category: "Python",
    instructor: "Anisul Islam",
    students: 4900,
    url: "https://www.youtube.com/playlist?list=PLgH5QX0i9K3rVu9cMJOKxJa0AuNELNsO9",
    language: "Bangla", // added language
  },
  {
    id: "21",
    title: "Python for beginners bangla tutorial",
    category: "Python",
    instructor: "Learn With Tawhid",
    students: 3900,
    url: "https://www.youtube.com/playlist?list=PLvr0Ht-XkB_0RkZxhwbqJqNQqZLJDhxFn",
    language: "Bangla", // added language
  },

  // Node.js - Bangla
  {
    id: "22",
    title: "Complete MERN Stack Course in Bangla",
    category: "Node.js",
    instructor: "Stack Learner",
    students: 5800,
    url: "https://www.youtube.com/watch?v=ewBBT6Iph0M&list=PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl",
    language: "Bangla", // added language
  },
  {
    id: "23",
    title: "Dive Into NodeJS",
    category: "Node.js",
    instructor: "Stack Learner",
    students: 4200,
    url: "https://www.youtube.com/playlist?list=PL_XxuZqN0xVDHFj-ecFSU0SU-B0TuJRk9",
    language: "Bangla", // added language
  },

  // Vue.js - Bangla
  {
    id: "24",
    title: "Vue js in Bangla. Latest Version with Projects",
    category: "Vue.js",
    instructor: "Rafee Amin",
    students: 2800,
    url: "https://www.youtube.com/playlist?list=PL6f7IPPkpDKn0iI2Y5dnEgyrEqw2VvJ2P",
    language: "Bangla", // added language
  },
  {
    id: "25",
    title: "Vue JS 3 Bangla Tutorial",
    category: "Vue.js",
    instructor: "Mamunur Rashid",
    students: 2400,
    url: "https://www.youtube.com/playlist?list=PLZ8kLhUbDAhADR0nUr2rwhOD0smxVZX-x",
    language: "Bangla", // added language
  },

  // HTML & CSS - Bangla
  {
    id: "26",
    title: "HTML Complete Course in Bangla 2021",
    category: "HTML and CSS",
    instructor: "Anisul Islam",
    students: 3400,
    url: "https://www.youtube.com/playlist?list=PLgH5QX0i9K3oHBr5dsumGwjUxByN5Lnw3",
    language: "Bangla", // added language
  },
  {
    id: "27",
    title: "CSS Complete Course in Bangla 2021",
    category: "HTML and CSS",
    instructor: "Anisul Islam",
    students: 3200,
    url: "https://www.youtube.com/playlist?list=PLgH5QX0i9K3qjCBXjTmv7Xeh8MDUUVJDO",
    language: "Bangla", // added language
  },

  // Angular - Bangla
  {
    id: "28",
    title: "Angular full tutorial series for Beginners in Bangla",
    category: "Angular",
    instructor: "Learn With Rashed",
    students: 2100,
    url: "https://www.youtube.com/playlist?list=PLBcycf_KNrYpgj_yzcNgW9I3_2fpiGXXg",
    language: "Bangla", // added language
  },

  // PHP - Bangla
  {
    id: "29",
    title: "PHP All You Need To Know",
    category: "PHP",
    instructor: "Stack Learner",
    students: 2600,
    url: "https://www.youtube.com/playlist?list=PL_XxuZqN0xVCFLIrGA1GaxacvPTDQcsMV",
    language: "Bangla", // added language
  },
  {
    id: "30",
    title: "PHP Bangla Tutorial - Basic To Advanced",
    category: "PHP",
    instructor: "JS Bangladesh",
    students: 2300,
    url: "https://www.youtube.com/playlist?list=PL4iFnndHldui-0507zycrQBo_HFU8-mi9",
    language: "Bangla", // added language
  },

  // Django - Bangla
  {
    id: "31",
    title: "Django Bangla Tutorial Course",
    category: "Django",
    instructor: "Anisul Islam",
    students: 2800,
    url: "https://www.youtube.com/playlist?list=PLgH5QX0i9K3oV_8e0tS-r9oVVVo2-gj4G",
    language: "Bangla", // added language
  },

  // MongoDB - Bangla
  {
    id: "32",
    title: "MongoDB Bangla tutorial series",
    category: "MongoDB",
    instructor: "Anisul Islam",
    students: 1900,
    url: "https://youtube.com/playlist?list=PLEYpvDF6qy8ZTUjMcg4WOUYMxQZDpRnBt",
    language: "Bangla", // added language
  },
  {
    id: "33",
    title: "Mastering MongoDB",
    category: "MongoDB",
    instructor: "Foyzul Karim",
    students: 1600,
    url: "https://www.youtube.com/playlist?list=PLEYpvDF6qy8Yo9SpzhniLCjgRIxCpo2ku",
    language: "Bangla", // added language
  },

  // MySQL - Bangla
  {
    id: "34",
    title: "MySql Database Bangla Tutorial Beginner to Advanced",
    category: "MySQL",
    instructor: "Shoaib Hossain",
    students: 2200,
    url: "https://www.youtube.com/playlist?list=PLH246IZCIBeA4h1R6fdgK06kj9lMb3joi",
    language: "Bangla", // added language
  },

  // Git - Bangla
  {
    id: "35",
    title: "Git & GitHub complete course Bangla",
    category: "Git",
    instructor: "Anisul Islam",
    students: 3100,
    url: "https://www.youtube.com/playlist?list=PLgH5QX0i9K3qAW8DT6I0XOxC23qnA4FL-",
    language: "Bangla", // added language
  },

  // Docker - Bangla
  {
    id: "36",
    title: "Docker Tutorial Course",
    category: "Docker",
    instructor: "Foyzul Karim",
    students: 1700,
    url: "https://www.youtube.com/playlist?list=PLEYpvDF6qy8Yo9SpzhniLCjgRIxCpo2ku",
    language: "Bangla", // added language
  },

  // Go - Bangla
  {
    id: "37",
    title: "Bangla Go/Golang Course",
    category: "Go",
    instructor: "Backend Ninja",
    students: 1400,
    url: "https://www.youtube.com/playlist?list=PLHkC-Z1xxZM7y5XxlZFQmI-M8jsAI2AQd",
    language: "Bangla", // added language
  },

  // Kotlin - Bangla
  {
    id: "38",
    title: "Kotlin For Android - Bangla",
    category: "Kotlin",
    instructor: "Touhid Apps!",
    students: 1200,
    url: "https://www.youtube.com/playlist?list=PLgyuGbgggWA3ORqemnq9adIzvNhSXjJTr",
    language: "Bangla", // added language
  },

  // Swift - Bangla
  {
    id: "39",
    title: "Swift Programming Language Bangla Tutorial",
    category: "Swift",
    instructor: "Learn Coding",
    students: 980,
    url: "#",
    language: "Bangla", // added language
  },

  // TypeScript - Bangla
  {
    id: "40",
    title: "TypeScript Bangla Tutorial",
    category: "TypeScript",
    instructor: "Stack Learner",
    students: 2400,
    url: "#",
    language: "Bangla", // added language
  },

  // ========== HINDI COURSES (from pasted data) ==========

  // Algorithms and Data Structures - Hindi
  {
    id: "41",
    title: "Complete C++ DSA Course | Data Structures & Algorithms Playlist",
    category: "Algorithms and Data Structures",
    instructor: "Apna College",
    students: 15000,
    url: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt",
    language: "Hindi",
  },
  {
    id: "42",
    title: "Complete C++ Placement DSA Course",
    category: "Algorithms and Data Structures",
    instructor: "CodeHelp by Babbar",
    students: 18000,
    url: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA",
    language: "Hindi",
  },
  {
    id: "43",
    title: "Data Structures and Algorithms Course in Hindi",
    category: "Algorithms and Data Structures",
    instructor: "CodeWithHarry",
    students: 12000,
    url: "https://www.youtube.com/playlist?list=PLu0W_9lII9ahIappRPNndnYuQy6WkpTzc",
    language: "Hindi",
  },
  {
    id: "44",
    title: "Data Structures and Algorithms Course in Hindi using C",
    category: "Algorithms and Data Structures",
    instructor: "DataFlair",
    students: 9500,
    url: "https://www.youtube.com/playlist?list=PLf0LpPWikpPfA_vez2NndnYuQy6WkpTzc",
    language: "Hindi",
  },
  {
    id: "45",
    title: "Data Structures and Algorithms for GATE — Complete Playlist",
    category: "Algorithms and Data Structures",
    instructor: "Gate CSE lectures by Amit Khurana",
    students: 22000,
    url: "https://www.youtube.com/playlist?list=PLC36xJgs4dxFCQVvjMrrjcY3XrcMm2GHy",
    language: "Hindi",
  },
  {
    id: "46",
    title: "Data Structures and Algorithms in Python",
    category: "Algorithms and Data Structures",
    instructor: "Jovian",
    students: 8000,
    url: "https://www.youtube.com/playlist?list=PLyMom0n-MBrpakdIZvnhd6PFUCKNAyKo1",
    language: "Hindi",
  },
  {
    id: "47",
    title: "DS & Algorithms Course Using Javascript",
    category: "Algorithms and Data Structures",
    instructor: "Technical Suneja",
    students: 10000,
    url: "https://www.youtube.com/playlist?list=PL_HlKez9XCSOi5thYDzipbJ2pEdzop7vx",
    language: "Hindi",
  },
  {
    id: "48",
    title: "Hindi Data Structures And Algorithms Tutorial Python",
    category: "Algorithms and Data Structures",
    instructor: "codebasics Hindi",
    students: 14000,
    url: "https://www.youtube.com/playlist?list=PLPbgcxheSpE3NlJ30EDpxNYU6P2Jylns8",
    language: "Hindi",
  },

  // Android - Hindi
  {
    id: "49",
    title: "Android App Development Course in 2024",
    category: "Android",
    instructor: "Saumya Singh",
    students: 11000,
    url: "https://www.youtube.com/playlist?list=PLTV_nsuD2lf4UCTV6xwvNPvFdmCNKyhc8",
    language: "Hindi",
  },
  {
    id: "50",
    title: "Android Development Tutorial for Beginners",
    category: "Android",
    instructor: "Anuj Bhaiya",
    students: 13000,
    url: "https://www.youtube.com/playlist?list=PLUcsbZa0qzu3Mri2tL1FzZy-5SX75UJfb",
    language: "Hindi",
  },
  {
    id: "51",
    title: "Android Development Tutorials in Hindi",
    category: "Android",
    instructor: "CodeWithHarry",
    students: 16000,
    url: "https://www.youtube.com/playlist?list=PLu0W_9lII9aiL0kysYlfSOUgY5rNlOhUd",
    language: "Hindi",
  },
  {
    id: "52",
    title: "Complete Android Development Course in Hindi",
    category: "Android",
    instructor: "Neat Roots",
    students: 9000,
    url: "https://www.youtube.com/playlist?list=PLUhfM8afLE_Ok-0Lx2v9hfrmbxi3GgsX1",
    language: "Hindi",
  },

  // C - Hindi
  {
    id: "53",
    title: "C Language for GATE — Complete Playlist",
    category: "C",
    instructor: "Gate CSE lectures by Amit Khurana",
    students: 18000,
    url: "https://www.youtube.com/playlist?list=PLC36xJgs4dxG-IqARhc23jYTDMYt7yvZP",
    language: "Hindi",
  },
  {
    id: "54",
    title: "C Language Tutorial for Beginners (with Notes & Practice Questions)",
    category: "C",
    instructor: "Apna College",
    students: 20000,
    url: "https://www.youtube.com/watch?v=irqbmMNs2Bo",
    language: "Hindi",
  },
  {
    id: "55",
    title: "C Language Tutorial For Beginners In Hindi (With Notes)",
    category: "C",
    instructor: "CodeWithHarry",
    students: 22000,
    url: "https://www.youtube.com/watch?v=ZSPZob_1TOk",
    language: "Hindi",
  },

  // C++ - Hindi
  {
    id: "56",
    title: "C++ and DSA Foundation Course",
    category: "C++",
    instructor: "College Wallah",
    students: 17000,
    url: "https://www.youtube.com/playlist?list=PLxgZQoSe9cg0df_GxVjz3DD_Gck5tMXAd",
    language: "Hindi",
  },
  {
    id: "57",
    title: "C++ Full Course | C++ Tutorial | Data Structures & Algorithms",
    category: "C++",
    instructor: "Apna College",
    students: 19000,
    url: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop",
    language: "Hindi",
  },

  // Java - Hindi
  {
    id: "58",
    title: "Java + Data Structures + Algorithms",
    category: "Java",
    instructor: "Apni Kaksha",
    students: 16000,
    url: "https://www.youtube.com/playlist?list=PLKKfKV1b9e8ps6dD3QA5KFfHdiWj9cB1s",
    language: "Hindi",
  },
  {
    id: "59",
    title: "Java + DSA",
    category: "Java",
    instructor: "Apna College",
    students: 18000,
    url: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop",
    language: "Hindi",
  },

  // Python - Hindi
  {
    id: "60",
    title: "Data Structures and Algorithms in Python",
    category: "Python",
    instructor: "Jovian",
    students: 14000,
    url: "https://www.youtube.com/playlist?list=PLyMom0n-MBrpakdIZvnhd6PFUCKNAyKo1",
    language: "Hindi",
  },

  // Angular - Hindi
  {
    id: "61",
    title: "Angular 12 - 13 tutorial in Hindi",
    category: "Angular",
    instructor: "Code Step By Step",
    students: 8500,
    url: "https://www.youtube.com/playlist?list=PL8p2I9GklV45--5t7_N4lveUI6Y31vQ6C",
    language: "Hindi",
  },
  {
    id: "62",
    title: "Angular 13 Tutorial in Hindi",
    category: "Angular",
    instructor: "Sahosoft Solutions",
    students: 7200,
    url: "https://www.youtube.com/playlist?list=PL_qizAfcpJ-N2mRgfQxnDgsv20daqwlfN",
    language: "Hindi",
  },
  {
    id: "63",
    title: "Learn Angular in one video (Hindi)",
    category: "Angular",
    instructor: "Code With Harry",
    students: 12000,
    url: "https://www.youtube.com/watch?v=0LhBvp8qpro&list=PLu0W_9lII9ahKZ42vg2w9ERPmShYbYAB7&index=21",
    language: "Hindi",
  },

  // Artificial Intelligence - Hindi
  {
    id: "64",
    title: "Artificial Intelligence (Complete Playlist)",
    category: "Artificial Intelligence",
    instructor: "Gate Smashers",
    students: 15000,
    url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI",
    language: "Hindi",
  },
  {
    id: "65",
    title: "Generative AI Series - Showcasing Generative AI By Building Projects",
    category: "Artificial Intelligence",
    instructor: "CodeWithHarry",
    students: 18000,
    url: "https://www.youtube.com/playlist?list=PLu0W_9lII9aiS4rUVp2jXwIvCruo27sG6",
    language: "Hindi",
  },

  // Bash and Shell - Hindi
  {
    id: "66",
    title: "Bash Scripting | Complete Course In Hindi",
    category: "Bash and Shell",
    instructor: "ENCODERSPRO",
    students: 9500,
    url: "https://www.youtube.com/playlist?list=PLDnEHblf8hExnR-Xpmrpu3GdeO_4YJ_tD",
    language: "Hindi",
  },
  {
    id: "67",
    title: "Shell Scripting and Bash Programming for Beginners In Hindi",
    category: "Bash and Shell",
    instructor: "LogicOps Lab - Hindi",
    students: 11000,
    url: "https://www.youtube.com/playlist?list=PLZqV_M3p_p10yhNExLIKj497ZkdUz1KuB",
    language: "Hindi",
  },

  // Blockchain - Hindi
  {
    id: "68",
    title: "Blockchain Full Course in Hindi",
    category: "Blockchain",
    instructor: "Code Eater",
    students: 12000,
    url: "https://www.youtube.com/playlist?list=PLgPmWS2dQHW-BRQCQCNYgmHUfCN115pn0",
    language: "Hindi",
  },
  {
    id: "69",
    title: "Complete Blockchain Development Course for Beginners in Hindi",
    category: "Blockchain",
    instructor: "web3Mantra",
    students: 10000,
    url: "https://www.youtube.com/watch?v=RkYVVC2vXho",
    language: "Hindi",
  },

  // C# - Hindi
  {
    id: "70",
    title: "C# Programming Complete in Hindi By Arvind",
    category: "C#",
    instructor: "Sarkar Study Waves Education",
    students: 9000,
    url: "https://www.youtube.com/playlist?list=PLOd2apPiwn-Z8GJiZs5HYb7HoiVvTV9H7",
    language: "Hindi",
  },
  {
    id: "71",
    title: "C# Tutorial In Hindi",
    category: "C#",
    instructor: "CodeWithHarry",
    students: 14000,
    url: "https://www.youtube.com/watch?v=SuLiu5AK9Ps",
    language: "Hindi",
  },

  // Cloud Computing - Hindi
  {
    id: "72",
    title: "Cloud Computing",
    category: "Cloud Computing",
    instructor: "5 Minutes Engineering",
    students: 13000,
    url: "https://www.youtube.com/playlist?list=PLYwpaL_SFmcCyQH0n9GHfwviu6KeJ46BV",
    language: "Hindi",
  },

  // DevOps - Hindi
  {
    id: "73",
    title: "Shell Scripting For DevOps 2024 (Hindi)",
    category: "DevOps",
    instructor: "TrainWithShubham",
    students: 11500,
    url: "https://www.youtube.com/playlist?list=PLlfy9GnSVerQu-uL0AdI3O5VzUmIv5pPf",
    language: "Hindi",
  },

  // Git and GitHub - Hindi
  {
    id: "74",
    title: "Git and GitHub complete course",
    category: "Git",
    instructor: "Various",
    students: 17000,
    url: "https://www.youtube.com/playlist?list=PLx3ETkZBB95jQO0d-bCCW1jG5L0E5K6hn",
    language: "Hindi",
  },

  // Machine Learning - Hindi
  {
    id: "75",
    title: "Machine Learning Complete Playlist",
    category: "Machine Learning",
    instructor: "AI Playlist",
    students: 16000,
    url: "https://www.youtube.com/playlist?list=PLKnIA16_Rmvbx0fzzMEL7FhMw5JWpF_Cm",
    language: "Hindi",
  },

  // Node.js - Hindi
  {
    id: "76",
    title: "Node.js Tutorial in Hindi",
    category: "Node.js",
    instructor: "CodeWithHarry",
    students: 15000,
    url: "https://www.youtube.com/playlist?list=PLu0W_9lII9agx66oZnT6IlwBXuy-nwSXL",
    language: "Hindi",
  },

  // React - Hindi
  {
    id: "77",
    title: "React JS Full Course In Hindi",
    category: "React",
    instructor: "CodeWithHarry",
    students: 19000,
    url: "https://www.youtube.com/playlist?list=PLu0W_9lII9agx66oZnT6IlwBXuy-nwSXL",
    language: "Hindi",
  },
]

export const courseDetailsMap: Record<string, CourseDetails> = (() => {
  const map: Record<string, CourseDetails> = {}

  coursesData.forEach((course) => {
    // Extract playlist ID from YouTube URL
    let playlistId = ""
    if (course.url.includes("list=")) {
      const match = course.url.match(/list=([a-zA-Z0-9_-]+)/)
      playlistId = match ? match[1] : ""
    }

    map[course.id] = {
      id: course.id,
      title: course.title,
      category: course.category,
      instructor: course.instructor,
      students: course.students,
      url: course.url,
      rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10, // Random rating between 3.5-5.0
      reviews: Math.floor(course.students * 0.15), // Estimated reviews
      description: `Master ${course.title} with this comprehensive course. Learn from industry experts and build real-world projects. Perfect for ${course.category} enthusiasts of all levels.`,
      duration: Math.ceil(course.students / 100) + 10, // Estimated duration based on students
      level: course.students > 15000 ? "Advanced" : course.students > 8000 ? "Intermediate" : "Beginner",
      language: course.language,
      youtubePlaylistId: playlistId,
      lessons: [
        {
          id: `${course.id}-1`,
          title: "Introduction & Course Overview",
          duration: 30,
          completed: false,
        },
        {
          id: `${course.id}-2`,
          title: "Getting Started & Setup",
          duration: 45,
          completed: false,
        },
        {
          id: `${course.id}-3`,
          title: "Core Concepts",
          duration: 60,
          completed: false,
        },
        {
          id: `${course.id}-4`,
          title: "Advanced Topics",
          duration: 75,
          completed: false,
        },
        {
          id: `${course.id}-5`,
          title: "Real-world Projects",
          duration: 90,
          completed: false,
        },
        {
          id: `${course.id}-6`,
          title: "Best Practices & Tips",
          duration: 45,
          completed: false,
        },
        {
          id: `${course.id}-7`,
          title: "Q&A and Final Review",
          duration: 30,
          completed: false,
        },
      ],
      resources: [
        {
          id: `${course.id}-r1`,
          title: "Complete Course Notes",
          type: "pdf",
          url: "#",
        },
        {
          id: `${course.id}-r2`,
          title: "Code Examples & Templates",
          type: "code",
          url: "#",
        },
        {
          id: `${course.id}-r3`,
          title: "Best Practices Guide",
          type: "article",
          url: "#",
        },
        {
          id: `${course.id}-r4`,
          title: "Project Files",
          type: "code",
          url: "#",
        },
        {
          id: `${course.id}-r5`,
          title: "Additional Resources",
          type: "article",
          url: "#",
        },
      ],
    }
  })

  return map
})()
