import Navbar from "@/components/navbar/navbar";
import "./app.scss";
import AutoCarousel from "@/components/autoplay-carousel/autoplay-carousel";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div>
        <h2>Welcome to SkillSwap!</h2>
      </div>
      <AutoCarousel />
    </main>
  );
}
