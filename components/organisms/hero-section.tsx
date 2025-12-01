"use client";

import { Button } from "@/components/atoms";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-20">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
        <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <span className="text-sm font-medium text-primary">
            ✨ Learn Coding Today
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
          Master Programming with{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Expert-Led Courses
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Learn from industry experts. Cover every programming language and
          framework you need to succeed in your coding journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 gap-2 w-full sm:w-auto"
            onClick={() => {
              const element = document.getElementById("learning-paths-section");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              } else {
                window.location.href = "/#learning-paths-section";
              }
            }}
          >
            Start Learning <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-transparent"
            onClick={() => {
              const element = document.getElementById("courses-section");
              if (element)
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              else window.location.href = "/#courses-section";
            }}
          >
            Explore Courses
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 text-center">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-primary">500+</p>
            <p className="text-sm text-muted-foreground">Courses</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-accent">50K+</p>
            <p className="text-sm text-muted-foreground">Students</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-secondary">
              100+
            </p>
            <p className="text-sm text-muted-foreground">Topics</p>
          </div>
        </div>
      </div>
    </section>
  );
}
