"use client";

import Flipbook from "@/components/Flipbook/Flipbook";
import Navbar from "@/components/Navbar/Navbar";

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <h1>About Us</h1>
      <p>
        Welcome to our website! We are dedicated to providing the best service
        possible.
      </p>
      <p>
        Our team is passionate about delivering high-quality products and
        exceptional customer support.
      </p>
      <p>
        Thank you for visiting our site, and we hope you have a great
        experience!
      </p>
      <Flipbook />
    </div>
  );
}
