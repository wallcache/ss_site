"use client";

interface VideoCardProps {
  src: string;
  eager?: boolean;
}

export default function VideoCard({ src, eager = false }: VideoCardProps) {
  return (
    <div className="w-screen h-screen flex-shrink-0 relative">
      <video
        className="w-full h-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload={eager ? "auto" : "none"}
      />
    </div>
  );
}
