"use client";

import { useRef, useEffect, useCallback } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import VideoCard from "./VideoCard";

const videos = [
  { src: "/videos/frame1.mp4", eager: true },
  { src: "/videos/frame2.mp4", eager: true },
  { src: "/videos/fram3.mp4", eager: false },
  { src: "/videos/frame4.mp4", eager: false },
];

const PANEL_COUNT = videos.length;

export default function VideoStrip() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(runwayRef);
  const snapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSnapping = useRef(false);

  // Clamp progress for horizontal movement: 0 → 1
  const clampedProgress = Math.max(0, Math.min(1, progress));

  // Which panel (0-3) is currently most visible
  const activeIndex = Math.round(clampedProgress * (PANEL_COUNT - 1));

  // translateX: 0vw → -300vw (4 panels, shift by 3 to reveal all)
  const translateX = clampedProgress * -(PANEL_COUNT - 1) * 100;

  // Zoom-out effect when scrolling above the runway (progress < 0)
  const zoomOut = progress < 0;
  const scale = zoomOut ? Math.max(0.85, 1 + progress * 0.15) : 1;
  const opacity = zoomOut ? Math.max(0.6, 1 + progress * 0.4) : 1;

  // Snap to nearest video panel after scrolling stops
  const snapToNearest = useCallback(() => {
    const el = runwayRef.current;
    if (!el || isSnapping.current) return;

    const runwayHeight = el.offsetHeight - window.innerHeight;
    if (runwayHeight <= 0) return;

    const scrolled = -el.getBoundingClientRect().top;
    const currentProgress = scrolled / runwayHeight;

    // Only snap if we're within the runway
    if (currentProgress < 0 || currentProgress > 1) return;

    const nearestIndex = Math.round(currentProgress * (PANEL_COUNT - 1));
    const targetProgress = nearestIndex / (PANEL_COUNT - 1);
    const targetScrollTop = el.offsetTop + targetProgress * runwayHeight;

    isSnapping.current = true;
    window.scrollTo({ top: targetScrollTop, behavior: "smooth" });
    setTimeout(() => { isSnapping.current = false; }, 600);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (isSnapping.current) return;
      if (snapTimeout.current) clearTimeout(snapTimeout.current);
      snapTimeout.current = setTimeout(snapToNearest, 150);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (snapTimeout.current) clearTimeout(snapTimeout.current);
    };
  }, [snapToNearest]);

  return (
    <div
      ref={runwayRef}
      className="relative"
      style={{ height: `${PANEL_COUNT * 100}vh` }}
    >
      {/* Sticky container pinned to viewport */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        <div
          className="flex h-full will-change-transform"
          style={{
            transform: `translateX(${translateX}vw) scale(${scale})`,
            opacity,
            transformOrigin: "center center",
          }}
        >
          {videos.map((video, i) => (
            <VideoCard
              key={video.src}
              src={video.src}
              eager={video.eager}
              active={i === activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
