"use client";

import CategorySidebar from "@/components/organisms/category-sidebar";
import Footer from "@/components/organisms/footer";
import Header from "@/components/organisms/header";
import { coursesData } from "@/lib/courses-data";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SiteLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}>) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  // Open drawer with animation
  function openDrawer() {
    setIsDrawerVisible(true);
    // Trigger reflow, then set open state for CSS transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsDrawerOpen(true));
    });
  }

  // Close drawer with animation
  function closeDrawer() {
    setIsDrawerOpen(false);
    // Wait for transition to complete before hiding
    setTimeout(() => setIsDrawerVisible(false), 300);
  }

  useEffect(() => {
    const onOpen = () => openDrawer();
    window.addEventListener("open-category-sidebar", onOpen as EventListener);
    return () =>
      window.removeEventListener(
        "open-category-sidebar",
        onOpen as EventListener
      );
  }, []);

  const categories = Array.from(
    new Set(coursesData.map((c) => c.category))
  ).sort();
  const languages = Array.from(
    new Set(coursesData.map((c) => c.language))
  ).sort();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setSelectedCategory(params.get("category"));
    setSelectedLanguage(params.get("language"));
  }, []);

  function handleSelect(category: string | null, language: string | null) {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (language) params.set("language", language);
    const qs = params.toString();
    router.push(`/${qs ? `?${qs}` : ""}`);
    setSelectedCategory(category);
    setSelectedLanguage(language);
    closeDrawer();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex gap-6">
          {sidebar ? (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              {sidebar}
            </aside>
          ) : null}

          <main className="flex-1">{children}</main>
        </div>
      </div>

      <Footer />

      {/* Mobile drawer (global) with slide animation */}
      {isDrawerVisible && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
              isDrawerOpen ? "opacity-50" : "opacity-0"
            }`}
            onClick={closeDrawer}
            aria-hidden
          />

          <aside
            className={`fixed left-0 top-0 bottom-0 w-80 max-w-full bg-background shadow-md transform transition-transform duration-300 ease-in-out ${
              isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="FreeLearn"
                  className="w-8 h-8 rounded-md"
                />
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-md hover:bg-muted"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-full overflow-y-auto">
              {sidebar ? (
                sidebar
              ) : (
                <CategorySidebar
                  categories={categories}
                  languages={languages}
                  selectedCategory={selectedCategory}
                  selectedLanguage={selectedLanguage}
                  onSelectCategory={(c) => handleSelect(c, selectedLanguage)}
                  onSelectLanguage={(l) => handleSelect(selectedCategory, l)}
                />
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
