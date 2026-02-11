"use client";

import { useState, useEffect, useCallback } from "react";
import SplashScreen from "@/components/SplashScreen";
import VideoStrip from "@/components/VideoStrip";

const TOTAL_VIDEOS = 4;

export default function Home() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const handleLoadProgress = useCallback(
    (loaded: number, total: number) => {
      setLoadProgress(loaded / total);
      if (loaded >= total) {
        setReady(true);
      }
    },
    []
  );

  // Block scrolling until videos are ready
  useEffect(() => {
    if (ready) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  return (
    <main>
      <SplashScreen loadProgress={loadProgress} ready={ready} />
      <div style={{ height: "30vh" }} />
      <VideoStrip onLoadProgress={handleLoadProgress} />
    </main>
  );
}
