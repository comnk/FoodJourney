export default function HeroVideoBackground() {
  return (
    <div className="hero-video-background">
      <video autoPlay loop muted className="background-video">
        <source src="/videos/food-journey-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
