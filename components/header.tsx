"use client"

import Link from "next/link"
import { Play, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CodeLearn
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost">Explore Courses</Button>
          </Link>
          <Link href="/my-learning">
            <Button variant="ghost" className="gap-2">
              <BookOpen className="w-4 h-4" />
              My Learning
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Button size="sm" variant="outline">
            Menu
          </Button>
        </div>
      </nav>
    </header>
  )
}
