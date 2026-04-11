"use client";

import "./trips_page.scss";

import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import { useState } from "react";

export default function TripsPage() {
  const [trips, setTrips] = useState([]);

  return (
    <div className="trips-page">
      <Navbar />
      <h1>Trips</h1>
      {trips.length === 0 ? (
        <div>
          <p>You have no trips yet. Start by creating a new trip!</p>
          <Link href="/trips/new" className="cta-btn">
            Add your first trip!
          </Link>
        </div>
      ) : (
        <p>Your trips will be listed here.</p>
      )}
    </div>
  );
}
