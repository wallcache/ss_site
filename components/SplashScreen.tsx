"use client";

const seeded = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const stars = Array.from({ length: 18 }, (_, i) => ({
  top: seeded(i) * 90 + 5,
  left: seeded(i + 50) * 90 + 5,
  size: 8 + seeded(i + 100) * 16,
  duration: 3 + seeded(i + 150) * 5,
  delay: seeded(i + 200) * 6,
}));

/* 4-pointed diamond star SVG */
function DiamondStar({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
    </svg>
  );
}

interface SplashScreenProps {
  loadProgress: number; // 0 to 1
  ready: boolean;
}

export default function SplashScreen({ loadProgress, ready }: SplashScreenProps) {
  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0d0618" }}
    >
      {/* Diamond stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className="star-diamond"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <DiamondStar size={s.size} />
        </div>
      ))}

      {/* Content */}
      <div className="text-center relative z-10 px-4">
        <div
          className="text-xs md:text-sm tracking-[0.35em] uppercase mb-8 font-light"
          style={{ color: "rgba(212, 168, 67, 0.45)" }}
        >
          The stars have aligned
        </div>

        <h1 className="leading-none" style={{ letterSpacing: "-0.02em" }}>
          <span
            className="inline-block text-7xl md:text-9xl font-light italic"
            style={{ color: "#d4a843" }}
          >S</span><span
            className="inline-block text-7xl md:text-9xl font-light italic"
            style={{ color: "#d4a843", transform: "scaleX(-1)" }}
          >S</span>
        </h1>

        <div
          className="mt-5 text-sm md:text-base tracking-[0.25em] font-light"
          style={{ color: "rgba(212, 168, 67, 0.5)" }}
        >
          Sara &amp; Sevveriano
        </div>
      </div>

      {/* Bottom: loading bar or scroll prompt */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center">
        {!ready ? (
          /* Loading bar */
          <div className="w-48 md:w-64">
            <div
              className="h-px rounded-full overflow-hidden"
              style={{ background: "rgba(212, 168, 67, 0.15)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${loadProgress * 100}%`,
                  background: "rgba(212, 168, 67, 0.5)",
                  transition: "width 0.4s ease-out",
                }}
              />
            </div>
          </div>
        ) : (
          /* Scroll prompt — fades in */
          <div
            style={{
              animation: "fadeIn 0.8s ease-out forwards",
            }}
          >
            <div
              className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3 font-light"
              style={{ color: "rgba(212, 168, 67, 0.3)" }}
            >
              Scroll for your invitation
            </div>
            <div className="animate-bounce">
              <div
                className="w-px h-6 mx-auto"
                style={{ background: "linear-gradient(to bottom, rgba(212, 168, 67, 0.3), transparent)" }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
