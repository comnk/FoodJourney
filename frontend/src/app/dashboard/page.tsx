"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import "./dashboard.scss";
import Link from "next/link";
import Image from "next/image";

type FoodEntry = { id: string; dishName: string; restaurantName: string };

export default function DashboardPage() {
  const [entries, setEntries] = useState<FoodEntry[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/food_entry/my_entries", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEntries(data));
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
        {entries.length === 0 ? (
          <p>You have no food entries yet. Start by adding a new meal!</p>
        ) : (
          <ul>
            {entries.map((entry) => (
              <li key={entry.id}>
                <Link href={`/food_entry/${entry.id}`}>
                  {entry.dishName} at {entry.restaurantName}
                </Link>
                <Image
                  src={`/api/food_entry/${entry.id}/photo`}
                  alt={entry.dishName}
                  width={100}
                  height={60}
                />
              </li>
            ))}
          </ul>
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
