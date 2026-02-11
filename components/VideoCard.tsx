"use client";

import { useEffect, useRef, useState } from "react";

interface VideoCardProps {
  src: string;
  active: boolean;
}

export default function VideoCard({ src, active }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (active) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [active]);

  return (
    <div
      className="flex-shrink-0 relative flex items-center justify-center"
      style={{
        width: "100vw",
        height: "100%",
        padding: "2vh 6px",
      }}
    >
      <div
        className="relative h-full rounded-sm overflow-hidden"
        style={{
          aspectRatio: "9 / 16",
          maxWidth: "calc(100vw - 12px)",
          boxShadow: "0 4px 60px rgba(0,0,0,0.8), 0 0 100px rgba(13,6,24,0.6)",
        }}
      >
        {/* Loading spinner */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10"
               style={{ background: "#0d0618" }}>
            <div
              className="w-8 h-8 rounded-full border-2 animate-spin"
              style={{
                borderColor: "rgba(212,168,67,0.15)",
                borderTopColor: "rgba(212,168,67,0.5)",
              }}
            />
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
