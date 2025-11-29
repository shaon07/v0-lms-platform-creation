"use client";

import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src="/logo.png"
            alt="FreeLearn"
            className="w-10 h-10 rounded-lg"
          />
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={useCallback(() => {
              const el = document.getElementById("courses-section");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              } else {
                // fallback: navigate to home with hash
                window.location.href = "/#courses-section";
              }
            }, [])}
          >
            Explore Courses
          </Button>
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
  );
}
