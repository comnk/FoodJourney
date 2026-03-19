"use client";

import FoodEntryCard from "@/components/FoodEntryCard/FoodEntryCard";
import Navbar from "@/components/Navbar/Navbar";
import { FoodEntry } from "@/types/FoodEntry";
import { useEffect, useState } from "react";

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
    <div>
      <Navbar />
      <h1>Gallery</h1>
      <div className="entries-section">
        <h2>Your Food Entries</h2>
        {loading && <p>Loading...</p>}
        {entries.length === 0 && !loading ? (
          <p>You have no food entries yet. Start by adding a new meal!</p>
        ) : (
          <ul>
            {entries.map((entry) => (
              <FoodEntryCard key={entry.id} entry={entry} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
