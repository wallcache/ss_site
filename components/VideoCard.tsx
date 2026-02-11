"use client";

import { useEffect, useRef } from "react";

interface VideoCardProps {
  src: string;
  eager?: boolean;
  active: boolean;
}

export default function VideoCard({ src, eager = false, active }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

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
      className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center"
      style={{ background: "#1a0a2e" }}
    >
      <video
        ref={videoRef}
        className="max-w-full max-h-full object-contain"
        src={src}
        muted
        loop
        playsInline
        preload={eager ? "auto" : "none"}
      />
    </div>
  );
}
