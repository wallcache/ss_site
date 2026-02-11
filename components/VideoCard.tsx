"use client";

import { useEffect, useRef, useState, forwardRef } from "react";

interface VideoCardProps {
  src: string;
}

const VideoCard = forwardRef<HTMLDivElement, VideoCardProps>(
  function VideoCard({ src }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const observeRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);

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

    // Play from start when visible, pause + reset when not
    useEffect(() => {
      const el = observeRef.current;
      const video = videoRef.current;
      if (!el || !video) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.currentTime = 0;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    return (
      <div
        ref={ref}
        className="flex-shrink-0 relative flex items-center justify-center"
        style={{ height: "100%", padding: "2vh 8px" }}
      >
        <div
          ref={observeRef}
          className="relative"
          style={{
            height: "100%",
            aspectRatio: "9 / 16",
            maxWidth: "calc(100vw - 32px)",
            borderRadius: "20px",
            border: "1px solid rgba(212,168,67,0.45)",
            boxShadow: "0 4px 60px rgba(0,0,0,0.8), 0 0 100px rgba(13,6,24,0.6)",
            clipPath: "inset(0 round 20px)",
          }}
        >
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10"
                 style={{ background: "#0d0618" }}>
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
            className="w-full h-full object-contain"
            src={src}
            muted
            loop
            playsInline
            preload="auto"
            onSeeked={() => setLoaded(true)}
          />
        </div>
      </div>
    );
  }
);

export default VideoCard;
