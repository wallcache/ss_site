"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import VideoCard from "./VideoCard";

const videos = [
  { src: "/videos/frame1.mp4", eager: true },
  { src: "/videos/frame2.mp4", eager: true },
  { src: "/videos/fram3.mp4", eager: false },
  { src: "/videos/frame4.mp4", eager: false },
];

export default function VideoStrip() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(runwayRef);

  // Clamp progress for horizontal movement: 0 → 1
  const clampedProgress = Math.max(0, Math.min(1, progress));

  // translateX: 0vw → -300vw (4 panels, shift by 3 to reveal all)
  const translateX = clampedProgress * -300;

  // Zoom-out effect when scrolling above the runway (progress < 0)
  const zoomOut = progress < 0;
  const scale = zoomOut ? Math.max(0.85, 1 + progress * 0.15) : 1;
  const opacity = zoomOut ? Math.max(0.6, 1 + progress * 0.4) : 1;

  return (
    <div
      ref={runwayRef}
      className="relative"
      style={{ height: "400vh" }}
    >
      {/* Sticky container pinned to viewport */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        <div
          className="flex h-full will-change-transform"
          style={{
            transform: `translateX(${translateX}vw) scale(${scale})`,
            opacity,
            transformOrigin: "center center",
            transition: "none",
          }}
        >
          {videos.map((video) => (
            <VideoCard
              key={video.src}
              src={video.src}
              eager={video.eager}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
