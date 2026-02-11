"use client";

import NebulaCanvas from "./NebulaCanvas";

// Deterministic pseudo-random from seed
const seeded = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const stars = Array.from({ length: 50 }, (_, i) => ({
  top: seeded(i) * 100,
  left: seeded(i + 50) * 100,
  size: 1 + seeded(i + 100) * 2,
  duration: 2 + seeded(i + 150) * 4,
  delay: seeded(i + 200) * 5,
}));

const shootingStars = Array.from({ length: 5 }, (_, i) => ({
  top: 5 + seeded(i + 300) * 40,
  left: seeded(i + 350) * 60,
  duration: 1.5 + seeded(i + 400) * 1.5,
  delay: i * 4 + seeded(i + 450) * 3,
}));

export default function SplashScreen() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* WebGL nebula background */}
      <NebulaCanvas />

      {/* Twinkling stars */}
      {stars.map((s, i) => (
        <div
          key={`star-${i}`}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((s, i) => (
        <div
          key={`shoot-${i}`}
          className="shooting-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Content */}
      <div className="text-center relative z-10 px-4">
        <div
          className="text-xs md:text-sm tracking-[0.35em] uppercase mb-8"
          style={{
            color: "rgba(212, 168, 67, 0.4)",
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          The stars have aligned
        </div>

        <h1
          className="leading-none"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            letterSpacing: "-0.02em",
          }}
        >
          <span
            className="inline-block text-7xl md:text-9xl"
            style={{
              color: "#d4a843",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >S</span><span
            className="inline-block text-7xl md:text-9xl"
            style={{
              color: "rgba(212, 168, 67, 0.35)",
              fontWeight: 300,
              fontStyle: "italic",
              transform: "scaleX(-1)",
            }}
          >S</span>
        </h1>

        <div
          className="mt-5 text-xs md:text-sm tracking-[0.25em]"
          style={{
            color: "rgba(212, 168, 67, 0.45)",
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          Sara &amp; Sevveriano
        </div>

        {/* Minimal scroll indicator */}
        <div className="mt-16 animate-bounce">
          <div
            className="w-px h-8 mx-auto"
            style={{ background: "linear-gradient(to bottom, rgba(212, 168, 67, 0.4), transparent)" }}
          />
        </div>
      </div>
    </section>
  );
}
