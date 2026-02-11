"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import VideoCard from "./VideoCard";

const videos = [
  "/videos/curtain_final_mp4.mp4",
  "/videos/cameos_card.mp4",
  "/videos/legos_card.mp4",
  "/videos/lovers_card.mp4",
];

const PANEL_COUNT = videos.length;

interface VideoStripProps {
  onLoadProgress?: (loaded: number, total: number) => void;
}

export default function VideoStrip({ onLoadProgress }: VideoStripProps) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(runwayRef);
  const [panelWidth, setPanelWidth] = useState(0);
  const [stripWidth, setStripWidth] = useState(0);
  const loadedCount = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (panelRef.current) setPanelWidth(panelRef.current.offsetWidth);
      if (stripRef.current) setStripWidth(stripRef.current.scrollWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleVideoReady = useCallback(() => {
    loadedCount.current += 1;
    onLoadProgress?.(loadedCount.current, PANEL_COUNT);
  }, [onLoadProgress]);

  const clampedProgress = Math.max(0, Math.min(1, progress));
  const vw = typeof window !== "undefined" ? window.innerWidth : 0;
  const totalShift = Math.max(0, stripWidth - panelWidth);
  const translateX = -(clampedProgress * totalShift);

  // Zoom-in entry effect
  const entering = progress < 0;
  const entryT = entering ? Math.max(0, 1 + progress * 2) : 1;
  const scale = entering ? 0.7 + entryT * 0.3 : 1;
  const opacity = entering ? entryT : 1;

  const centerOffset = panelWidth > 0 ? (vw - panelWidth) / 2 : 0;

  // How many panels fit in the viewport — determines active threshold
  const visibleHalf = panelWidth > 0 ? vw / panelWidth / 2 : 0.5;
  const activeThreshold = visibleHalf + 0.2;

  return (
    <div
      ref={runwayRef}
      className="relative"
      style={{ height: `${PANEL_COUNT * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        <div
          ref={stripRef}
          className="flex h-full will-change-transform"
          style={{
            transform: `translateX(${centerOffset + translateX}px) scale(${scale})`,
            opacity,
            transformOrigin: "center center",
          }}
        >
          {videos.map((src, i) => {
            const activeIndex = clampedProgress * (PANEL_COUNT - 1);
            const dist = Math.abs(i - activeIndex);
            const isActive =
              i === 0
                ? progress > -0.25 && dist < activeThreshold
                : dist < activeThreshold;
            return (
              <VideoCard
                key={src}
                ref={i === 0 ? panelRef : undefined}
                src={src}
                active={isActive}
                onReady={handleVideoReady}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
