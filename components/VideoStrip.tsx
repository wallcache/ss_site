"use client";

import { useRef, useEffect, useCallback } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import VideoCard from "./VideoCard";

const videos = [
  "/videos/frame1.mp4",
  "/videos/frame2.mp4",
  "/videos/fram3.mp4",
  "/videos/frame4.mp4",
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

  // translateX: 0vw → -300vw
  const translateX = clampedProgress * -(PANEL_COUNT - 1) * 100;

  // Zoom-in entry: when progress < 0, we're above the runway
  // Scale from 0.7 → 1.0 as we enter, with fade
  const entering = progress < 0;
  const entryT = entering ? Math.max(0, 1 + progress * 2) : 1; // 0→1 over first half of approach
  const scale = entering ? 0.7 + entryT * 0.3 : 1;
  const opacity = entering ? entryT : 1;

  // Snap to nearest video panel after scrolling stops
  const snapToNearest = useCallback(() => {
    const el = runwayRef.current;
    if (!el || isSnapping.current) return;

    const runwayHeight = el.offsetHeight - window.innerHeight;
    if (runwayHeight <= 0) return;

    const scrolled = -el.getBoundingClientRect().top;
    const currentProgress = scrolled / runwayHeight;

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
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        <div
          className="flex h-full will-change-transform"
          style={{
            transform: `translateX(${translateX}vw) scale(${scale})`,
            opacity,
            transformOrigin: "center center",
          }}
        >
          {videos.map((src, i) => (
            <VideoCard
              key={src}
              src={src}
              active={i === activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
