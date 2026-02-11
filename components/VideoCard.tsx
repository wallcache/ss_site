"use client";

import { useEffect, useRef, useState, forwardRef } from "react";

interface VideoCardProps {
  src: string;
  active: boolean;
  onReady?: () => void;
}

const VideoCard = forwardRef<HTMLDivElement, VideoCardProps>(
  function VideoCard({ src, active, onReady }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [loaded, setLoaded] = useState(false);
    const hasPlayedRef = useRef(false);

    // Signal ready as soon as metadata is available (reliable on mobile)
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
      const handleMeta = () => {
        setLoaded(true);
        onReady?.();
      };
      // Already loaded (cached)
      if (video.readyState >= 1) {
        handleMeta();
        return;
      }
      video.addEventListener("loadedmetadata", handleMeta, { once: true });
      return () => video.removeEventListener("loadedmetadata", handleMeta);
    }, [onReady]);

    // Force first frame to render (mobile Safari needs a seek to paint)
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
      const showFirstFrame = () => {
        video.currentTime = 0.001;
      };
      video.addEventListener("loadeddata", showFirstFrame, { once: true });
      return () => video.removeEventListener("loadeddata", showFirstFrame);
    }, []);

    // Play/pause based on active prop from scroll progress
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      if (active) {
        if (!hasPlayedRef.current) {
          // First time becoming active — start from beginning
          video.currentTime = 0;
          hasPlayedRef.current = true;
        }
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0.001;
        hasPlayedRef.current = false;
      }
    }, [active]);

    return (
      <div
        ref={ref}
        className="flex-shrink-0 relative flex items-center justify-center"
        style={{ height: "100%", padding: "2vh 8px" }}
      >
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
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
          style={{
            maxHeight: "96vh",
            maxWidth: "calc(100vw - 32px)",
            borderRadius: "20px",
            boxShadow: "0 4px 60px rgba(0,0,0,0.8), 0 0 100px rgba(13,6,24,0.6)",
            display: "block",
          }}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
    );
  }
);

export default VideoCard;
