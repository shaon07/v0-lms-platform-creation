"use client";

import CategorySidebar from "@/components/category-sidebar";
import CourseGrid from "@/components/course-grid";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import LearningDashboard from "@/components/learning-dashboard";
import LearningPathsSection from "@/components/learning-paths";
import SearchBar from "@/components/search-bar";
import { coursesData } from "@/lib/courses-data";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null); // added language state
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const coursesSection = document.getElementById("courses-section");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedCategory, selectedLanguage, searchQuery]); // added selectedLanguage to dependency

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesCategory =
        !selectedCategory || course.category === selectedCategory;
      const matchesLanguage =
        !selectedLanguage || course.language === selectedLanguage; // added language filtering
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesLanguage && matchesSearch; // added matchesLanguage
    });
  }, [selectedCategory, selectedLanguage, searchQuery]); // added selectedLanguage

  const categories = Array.from(
    new Set(coursesData.map((c) => c.category))
  ).sort();
  const languages = Array.from(
    new Set(coursesData.map((c) => c.language))
  ).sort(); // extract unique languages

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      {/* Learning Dashboard */}
      <section className="px-4 md:px-6 py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <LearningDashboard />
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <LearningPathsSection />
        </div>
      </section>

      <div
        id="courses-section"
        className="flex gap-6 px-4 md:px-6 py-8 max-w-7xl mx-auto"
      >
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <CategorySidebar
            categories={categories}
            languages={languages} // pass languages
            selectedCategory={selectedCategory}
            selectedLanguage={selectedLanguage} // pass selectedLanguage
            onSelectCategory={setSelectedCategory}
            onSelectLanguage={setSelectedLanguage} // pass language handler
          />
        </aside>

        {/* Main Content - Added left margin to account for fixed sidebar */}
        <main className="flex-1">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Mobile Filters */}
          <div className="lg:hidden mb-6 space-y-4">
            {/* Language Filter Mobile */}
            <div>
              <p className="text-sm font-medium mb-2">Language</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedLanguage(null)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedLanguage === null
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  All
                </button>
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedLanguage === lang
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter Mobile */}
            <div>
              <p className="text-sm font-medium mb-2">Category</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === null
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  All
                </button>
                {categories.slice(0, 5).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {selectedLanguage && selectedCategory
                  ? `${selectedLanguage} - ${selectedCategory} Courses`
                  : selectedLanguage
                  ? `${selectedLanguage} Courses`
                  : selectedCategory
                  ? `${selectedCategory} Courses`
                  : "All Courses"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {filteredCourses.length} courses found
              </p>
            </div>
          </div>

          <CourseGrid courses={filteredCourses} />

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No courses found matching your criteria.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
