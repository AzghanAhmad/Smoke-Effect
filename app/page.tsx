"use client";

import SmokeEffect from "./components/SmokeEffect";

export default function Home() {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Smoke Effect Canvas */}
      <SmokeEffect />
      
      {/* Text on the right side */}
      <div className="relative z-10 flex flex-col items-end justify-center h-full pointer-events-none pr-12 md:pr-16 lg:pr-24">
        <div className="text-right space-y-4">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight select-none">
            Smoke Effect
          </h1>
          <p className="text-gray-400 text-lg md:text-xl lg:text-2xl font-light tracking-wide select-none">
            Interactive particle animation
          </p>
        </div>
      </div>
    </div>
  );
}
