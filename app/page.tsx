"use client";

import HomeContainer from "@/modules/home";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <HomeContainer />
    </Suspense>
  );
}
