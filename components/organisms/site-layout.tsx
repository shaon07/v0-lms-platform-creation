import type React from "react";
import Footer from "./footer";
import Header from "./header";

export default function SiteLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}>) {
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
    </div>
  );
}
