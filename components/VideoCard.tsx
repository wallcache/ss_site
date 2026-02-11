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
      className="h-full flex-shrink-0 relative flex items-center justify-center"
      style={{ width: "100vw", padding: "0 6px" }}
    >
      <div
        className="relative w-full h-full rounded-sm overflow-hidden"
        style={{
          boxShadow: "0 0 40px rgba(0,0,0,0.7), 0 0 80px rgba(13,6,24,0.5)",
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
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
