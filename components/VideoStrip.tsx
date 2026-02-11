"use client";

import { useRef, useEffect, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import VideoCard from "./VideoCard";

const videos = [
  "/videos/frame1.mp4",
  "/videos/frame2.mp4",
  "/videos/frame3.mp4",
  "/videos/frame4.mp4",
];

const PANEL_COUNT = videos.length;

export default function VideoStrip() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(runwayRef);
  const [panelWidth, setPanelWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (panelRef.current) {
        setPanelWidth(panelRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const clampedProgress = Math.max(0, Math.min(1, progress));
  const totalShift = panelWidth * (PANEL_COUNT - 1);
  const translateX = -(clampedProgress * totalShift);

  // Zoom-in entry effect
  const entering = progress < 0;
  const entryT = entering ? Math.max(0, 1 + progress * 2) : 1;
  const scale = entering ? 0.7 + entryT * 0.3 : 1;
  const opacity = entering ? entryT : 1;

  const centerOffset = panelWidth > 0 ? (window.innerWidth - panelWidth) / 2 : 0;

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
            transform: `translateX(${centerOffset + translateX}px) scale(${scale})`,
            opacity,
            transformOrigin: "center center",
          }}
        >
          {videos.map((src, i) => {
            // Which fractional index is currently centered
            const activeIndex = clampedProgress * (PANEL_COUNT - 1);
            // Video is "active" when it's within ~0.4 of center (~70% on screen)
            // progress > 0.02 ensures horizontal scroll has properly begun
            const isActive = progress > 0.02 && Math.abs(i - activeIndex) < 0.4;
            return (
              <VideoCard
                key={src}
                ref={i === 0 ? panelRef : undefined}
                src={src}
                active={isActive}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
