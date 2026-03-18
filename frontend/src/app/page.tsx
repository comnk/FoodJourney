import Navbar from "@/components/Navbar/Navbar";
import "./home.scss";
import StarComponent from "@/components/ui/Star/Star";
import Link from "next/dist/client/link";

export default function Home() {
  return (
    <div className="homepage">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>Track unforgettable meals.</h1>
          <h1 className="highlight">
            Discover and share your culinary adventures.
          </h1>

          <p>
            Save dishes you try while traveling, tag great budget eats, avoid
            tourist traps, and build custom food routes — all in one place.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">
              <Link href="/register">Try It Out!</Link>
            </button>
            <button className="secondary-btn">
              <Link href="/login">Log in</Link>
            </button>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How it works</h2>

        <ol className="steps">
          <li className="step">
            <h3>Log what you eat</h3>
            <p>Upload photos, add location, rate value, tag budget.</p>
          </li>

          <li className="step">
            <h3>Organize by trip</h3>
            <p>Group meals into trips like “Italy 2025”.</p>
          </li>

          <li className="step">
            <h3>Build food routes</h3>
            <p>Create custom Google Maps routes from your favorites.</p>
          </li>
        </ol>
      </section>
      <section className="example-timeline">
        <h2>Your food memories, beautifully organized</h2>

        <div className="timeline">
          <div className="timeline-item">
            <span className="date">Mar 14</span>
            <div className="entry-preview">
              <h4>Carbonara</h4>
              <p>Rome, Italy</p>
              <div className="meta">
                <span className="price">$$</span>
                <span className="rating">
                  <StarComponent rating={4.5} />
                </span>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <span className="date">Mar 15</span>
            <div className="entry-preview">
              <h4>Gelato</h4>
              <p>Florence, Italy</p>
              <div className="meta">
                <span className="price">$</span>
                <span className="rating">
                  <StarComponent rating={3} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <h2>Ready to start your first food trip?</h2>
        <Link href="/login" className="cta-btn">
          Create your first trip
        </Link>
      </section>
    </div>
  );
}
