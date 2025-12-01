interface MobileFiltersProps {
  categories: string[];
  languages: string[];
  selectedCategory: string | null;
  selectedLanguage: string | null;
  onSelectCategory: (c: string | null) => void;
  onSelectLanguage: (l: string | null) => void;
}

export default function MobileFilters({
  categories,
  languages,
  selectedCategory,
  selectedLanguage,
  onSelectCategory,
  onSelectLanguage,
}: MobileFiltersProps) {
  return (
    <div className="lg:hidden mb-6 space-y-4">
      <div>
        <p className="text-sm font-medium mb-2">Language</p>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => onSelectLanguage(null)}
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
              onClick={() => onSelectLanguage(lang)}
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

      <div>
        <p className="text-sm font-medium mb-2">Category</p>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => onSelectCategory(null)}
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
              onClick={() => onSelectCategory(cat)}
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
  );
}
