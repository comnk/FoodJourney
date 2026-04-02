"use client";

import "./gallery.scss";

import FoodEntryCard from "@/components/FoodEntryCard/FoodEntryCard";
import Navbar from "@/components/Navbar/Navbar";
import { FoodEntry } from "@/types/FoodEntry";
import Link from "next/link";
import { useEffect, useState } from "react";

const SKELETON_COUNT = 6;

export default function GalleryPage() {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<FoodEntry[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/food_entry/my_entries", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="gallery-page">
      <Navbar />

      <header className="gallery-header">
        <p className="gallery-eyebrow">Your collection</p>
        <h1 className="gallery-title">
          Every dish, <em>recorded.</em>
        </h1>
        <p className="gallery-subtitle">
          Browse every meal you&apos;ve logged on your flavour journey.
        </p>
      </header>

      <hr className="gallery-rule" />

      <section className="gallery-section">
        {loading && (
          <div className="gallery-skeletons" aria-busy="true">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div className="skeleton-card" key={i}>
                <div className="skeleton-photo" />
                <div className="skeleton-body">
                  <div className="skeleton-line medium" />
                  <div className="skeleton-line short" />
                  <div className="skeleton-line full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && entries.length === 0 && (
          <div className="gallery-empty">
            <span className="empty-icon">🍽️</span>
            <p>Your gallery is empty. Start logging your meals!</p>
            <Link href="/food_entry/new" className="cta-btn">
              Add your first dish
            </Link>
          </div>
        )}

        {!loading && entries.length > 0 && (
          <>
            <p className="gallery-count">
              Showing <strong>{entries.length}</strong> entr
              {entries.length !== 1 ? "ies" : "y"}
            </p>
            <ul className="entries-grid">
              {entries.map((entry) => (
                <li key={entry.id}>
                  <FoodEntryCard entry={entry} />
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
