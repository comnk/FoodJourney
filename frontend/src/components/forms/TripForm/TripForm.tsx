"use client";

import React, { useState } from "react";
import "./TripForm.scss";
import { useRouter } from "next/navigation";

export default function TripForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tripName: "",
    description: "",
    startDate: "",
    endDate: "",
    bannerPhoto: null as File | null,
  });

  const handleFormSubmission = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a trip.");
      return;
    }

    const res = fetch("/api/trips/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create trip");
        }
        return response.json();
      })
      .then((data) => {
        alert("Trip created successfully!");
        router.push(`/trips/${data.id}`);
      })
      .catch((error) => {
        console.error("Error creating trip:", error);
        alert("An error occurred while creating the trip.");
      });
  };

  return (
    <form className="trip-form">
      <input
        type="text"
        placeholder="Trip Name"
        className="trip-name-input"
        value={formData.tripName}
        onChange={(e) => setFormData({ ...formData, tripName: e.target.value })}
      />
      <textarea
        placeholder="Trip Description"
        className="trip-description-input"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      ></textarea>
      <input
        type="date"
        className="trip-date-input"
        min={new Date().toISOString().split("T")[0]}
        value={formData.startDate}
        onChange={(e) =>
          setFormData({ ...formData, startDate: e.target.value })
        }
      />
      <input
        type="date"
        className="trip-date-input"
        min={new Date().toISOString().split("T")[0]}
        value={formData.endDate}
        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
      />
      <input type="file" className="trip-banner-photo-input" accept="image/*" />
      <button
        type="submit"
        className="submit-button"
        onClick={handleFormSubmission}
      >
        Create Trip
      </button>
    </form>
  );
}
