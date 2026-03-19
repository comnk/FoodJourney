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
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      <p>
        Welcome to the dashboard! Here you can find an overview of your recent
        food entries and activities.
      </p>
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
        {!loading && entries.length > 0 && (
          <Link href="/gallery">See All Food Entries</Link>
        )}
      </div>
      <div>
        <button>
          <Link href="/food_entry/new">New Food Entry</Link>
        </button>
      </div>
    </div>
  );
}
