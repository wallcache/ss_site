"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a progress value from 0→1 as the user scrolls through
 * the referenced runway element. Can go negative if user scrolls
 * above the runway (used for zoom-out effect).
 */
export function useScrollProgress(runwayRef: React.RefObject<HTMLDivElement>) {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const el = runwayRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const runwayHeight = el.offsetHeight - window.innerHeight;
        // How far we've scrolled into the runway
        // rect.top starts positive (below viewport), goes negative as we scroll
        const scrolled = -rect.top;
        const raw = runwayHeight > 0 ? scrolled / runwayHeight : 0;
        setProgress(raw);
      }
      rafId.current = requestAnimationFrame(update);
    };

    rafId.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId.current);
  }, [runwayRef]);

  return progress;
}
