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
        <h1
          className="text-8xl md:text-[10rem] font-light leading-none"
          style={{
            color: "#d4a843",
            fontFamily: "Georgia, 'Times New Roman', serif",
            letterSpacing: "0.08em",
          }}
        >
          S
          <span
            className="inline-block text-6xl md:text-8xl align-middle mx-2 md:mx-4"
            style={{
              color: "rgba(212, 168, 67, 0.3)",
              fontFamily: "Georgia, 'Times New Roman', serif",
              transform: "scaleX(-1)",
            }}
          >
            S
          </span>
        </h1>

        <div
          className="mt-6 text-sm md:text-base tracking-[0.25em]"
          style={{
            color: "rgba(212, 168, 67, 0.5)",
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
