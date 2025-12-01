"use client";

import CategorySidebar from "@/components/category-sidebar";
import { Button } from "@/components/ui/button";
import { coursesData } from "@/lib/courses-data";
import { BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(coursesData.map((c) => c.category))).sort(),
    []
  );
  const languages = useMemo(
    () => Array.from(new Set(coursesData.map((c) => c.language))).sort(),
    []
  );

  const handleSelectCategory = useCallback((category: string | null) => {
    // dispatch event so page-level state can react
    window.dispatchEvent(
      new CustomEvent("selectCategory", { detail: { category } })
    );
    setOpen(false);
  }, []);

  const handleSelectLanguage = useCallback((language: string | null) => {
    window.dispatchEvent(
      new CustomEvent("selectLanguage", { detail: { language } })
    );
    setOpen(false);
  }, []);

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
          <Button
            size="sm"
            variant="outline"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {/* Mobile slide-over drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setOpen(false)}
        />

        <aside
          className={`fixed top-0 left-0 bottom-0 w-72 max-w-full bg-background shadow-lg transform transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="FreeLearn"
                className="w-8 h-8 rounded-md"
              />
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="h-full overflow-y-auto">
            <CategorySidebar
              categories={categories}
              languages={languages}
              selectedCategory={null}
              selectedLanguage={null}
              onSelectCategory={handleSelectCategory}
              onSelectLanguage={handleSelectLanguage}
            />
          </div>
        </aside>
      </div>
    </header>
  );
}
