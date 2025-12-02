"use client";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 text-sm text-muted-foreground flex items-center justify-between">
        <div>© {new Date().getFullYear()} FreeLearn. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/terms" className="hover:underline">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
