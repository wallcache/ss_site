"use client";

import { useRef, useEffect, useCallback, useState } from "react";
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
  const panelRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(runwayRef);
  const snapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSnapping = useRef(false);
  const [panelWidth, setPanelWidth] = useState(0);

  // Measure panel width on mount and resize
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
  const activeIndex = Math.round(clampedProgress * (PANEL_COUNT - 1));

  // Translate: center each panel in the viewport
  // At progress=0, first panel centered. At progress=1, last panel centered.
  const totalShift = panelWidth * (PANEL_COUNT - 1);
  const translateX = -(clampedProgress * totalShift);

  // Zoom-in entry effect
  const entering = progress < 0;
  const entryT = entering ? Math.max(0, 1 + progress * 2) : 1;
  const scale = entering ? 0.7 + entryT * 0.3 : 1;
  const opacity = entering ? entryT : 1;

  // Snap to nearest panel
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

  // Center offset: shift strip so first panel starts centered in viewport
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
          {videos.map((src, i) => (
            <VideoCard
              key={src}
              ref={i === 0 ? panelRef : undefined}
              src={src}
              active={i === activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
