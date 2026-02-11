"use client";

export default function SplashScreen() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white">
          SS
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/60 tracking-widest uppercase">
          Scroll to explore
        </p>
        <div className="mt-8 animate-bounce">
          <svg
            className="w-6 h-6 mx-auto text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
