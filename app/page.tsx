import SplashScreen from "@/components/SplashScreen";
import VideoStrip from "@/components/VideoStrip";

export default function Home() {
  return (
    <main>
      <SplashScreen />
      <div style={{ height: "30vh" }} />
      <VideoStrip />
    </main>
  );
}
