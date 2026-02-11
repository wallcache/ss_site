"use client";

export default function SplashScreen() {
  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, #3d1a5c 0%, #2a1040 50%, #1a0a2e 100%)" }}
    >
      {/* Decorative gold border */}
      <div
        className="absolute inset-4 md:inset-8 pointer-events-none"
        style={{ border: "1px solid rgba(212, 168, 67, 0.25)", borderRadius: "2px" }}
      />

      {/* Scattered gold stars */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-[#d4a843] animate-pulse"
          style={{
            top: `${10 + Math.sin(i * 1.7) * 40 + 40}%`,
            left: `${10 + Math.cos(i * 2.3) * 40 + 40}%`,
            opacity: 0.15 + (i % 5) * 0.08,
            fontSize: `${6 + (i % 4) * 3}px`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${2 + (i % 3)}s`,
          }}
        >
          &#10022;
        </div>
      ))}

      <div className="text-center relative z-10">
        {/* Couple initials */}
        <p
          className="text-sm md:text-base tracking-[0.4em] uppercase mb-6"
          style={{ color: "rgba(212, 168, 67, 0.5)" }}
        >
          The stars have aligned
        </p>

        <h1
          className="text-7xl md:text-9xl font-light tracking-wide"
          style={{
            color: "#d4a843",
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          S<span className="text-5xl md:text-7xl mx-1" style={{ color: "rgba(212, 168, 67, 0.4)" }}>&amp;</span>S
        </h1>

        <p
          className="mt-4 text-lg md:text-2xl tracking-wide"
          style={{
            color: "#d4a843",
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          Sara &amp; Sevveriano
        </p>

        {/* Divider ornament */}
        <div className="flex items-center justify-center gap-3 mt-6 mb-6">
          <div className="w-16 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212, 168, 67, 0.4))" }} />
          <span className="text-xs" style={{ color: "rgba(212, 168, 67, 0.4)" }}>&#10022;</span>
          <div className="w-16 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(212, 168, 67, 0.4))" }} />
        </div>

        <p
          className="text-xs md:text-sm tracking-[0.3em] uppercase"
          style={{ color: "rgba(212, 168, 67, 0.45)" }}
        >
          Scroll to explore
        </p>

        <div className="mt-8 animate-bounce">
          <svg
            className="w-5 h-5 mx-auto"
            style={{ color: "rgba(212, 168, 67, 0.3)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
