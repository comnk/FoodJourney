"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import "./dashboard.scss";
import Link from "next/link";
import FoodEntryCard from "@/components/FoodEntryCard/FoodEntryCard";
import { FoodEntry } from "@/types/FoodEntry";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<FoodEntry[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/food_entry/three_most_recent", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-page">
      <Navbar />

      <header className="dashboard-hero">
        <p className="dashboard-eyebrow">Your food diary</p>
        <h1 className="dashboard-title">
          Every meal,
          <br />
          <em>remembered.</em>
        </h1>
        <p className="dashboard-subtitle">
          An overview of your recent culinary adventures. Log a dish, rate it,
          and build your personal flavour atlas.
        </p>

        <Link href="/food_entry/new" className="cta-btn">
          New Food Entry
        </Link>
      </header>

      <hr className="dash-rule" />

      <section className="entries-section">
        <div className="entries-header">
          <h2 className="entries-title">Recent Entries</h2>
          {!loading && entries.length > 0 && (
            <Link href="/gallery" className="see-all-link">
              See all entries →
            </Link>
          )}
        </div>

        {loading && (
          <div
            className="loading-row"
            aria-busy="true"
            aria-label="Loading entries"
          >
            <div className="skeleton-card" />
            <div className="skeleton-card" />
            <div className="skeleton-card" />
          </div>
        )}

        {!loading && entries.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🍜</span>
            <p>
              No entries yet. Your first great meal is waiting to be logged.
            </p>
            <Link href="/food_entry/new" className="cta-btn">
              Add your first dish
            </Link>
          </div>
        )}

        {!loading && entries.length > 0 && (
          <ul className="entries-list">
            {entries.map((entry) => (
              <FoodEntryCard key={entry.id} entry={entry} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
