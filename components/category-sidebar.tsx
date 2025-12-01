"use client";

interface CategorySidebarProps {
  categories: string[];
  languages: string[];
  selectedCategory: string | null;
  selectedLanguage: string | null;
  onSelectCategory: (category: string | null) => void;
  onSelectLanguage: (language: string | null) => void;
}

export default function CategorySidebar({
  categories,
  languages,
  selectedCategory,
  selectedLanguage,
  onSelectCategory,
  onSelectLanguage,
}: CategorySidebarProps) {
  return (
    <div className="sticky top-0 md:top-20 h-[calc(100vh-80px)] w-64 border-r bg-background overflow-y-auto">
      <div className="space-y-6 p-6">
        {/* Language Filter */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Language</h3>
          <div className="space-y-2">
            <button
              onClick={() => onSelectLanguage(null)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedLanguage === null
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              All Languages
            </button>
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => onSelectLanguage(language)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedLanguage === language
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Category</h3>
          <div className="space-y-2">
            <button
              onClick={() => onSelectCategory(null)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
