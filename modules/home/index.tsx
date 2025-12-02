"use client";

import CourseGrid from "@/components/molecules/course-grid";
import SearchBar from "@/components/molecules/search-bar";
import CategorySidebar from "@/components/organisms/category-sidebar";
import HeroSection from "@/components/organisms/hero-section";
import LearningDashboard from "@/components/organisms/learning-dashboard";
import LearningPathsSection from "@/components/organisms/learning-paths";
import { coursesData } from "@/lib/courses-data";
import MobileFilters from "@/modules/home/features/MobileFilters";
import { useEffect, useMemo, useState } from "react";

export default function HomeContainer() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const coursesSection = document.getElementById("courses-section");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedCategory, selectedLanguage, searchQuery]);

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesCategory =
        !selectedCategory || course.category === selectedCategory;
      const matchesLanguage =
        !selectedLanguage || course.language === selectedLanguage;
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesLanguage && matchesSearch;
    });
  }, [selectedCategory, selectedLanguage, searchQuery]);

  const categories = Array.from(
    new Set(coursesData.map((c) => c.category))
  ).sort();
  const languages = Array.from(
    new Set(coursesData.map((c) => c.language))
  ).sort();

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <section className="px-4 md:px-6 py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <LearningDashboard />
        </div>
      </section>

      <section className="px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <LearningPathsSection />
        </div>
      </section>

      <div
        id="courses-section"
        className="flex gap-6 px-4 md:px-6 py-8 max-w-7xl mx-auto"
      >
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <CategorySidebar
            categories={categories}
            languages={languages}
            selectedCategory={selectedCategory}
            selectedLanguage={selectedLanguage}
            onSelectCategory={setSelectedCategory}
            onSelectLanguage={setSelectedLanguage}
          />
        </aside>

        <main className="flex-1">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <MobileFilters
            categories={categories}
            languages={languages}
            selectedCategory={selectedCategory}
            selectedLanguage={selectedLanguage}
            onSelectCategory={setSelectedCategory}
            onSelectLanguage={setSelectedLanguage}
          />

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
