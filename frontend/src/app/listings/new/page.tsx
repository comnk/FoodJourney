"use client";

import Navbar from "@/components/navbar/navbar";
import { useState } from "react";
import "./new-listing.scss";

export default function NewListingPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "SKILL",
    direction: "OFFER",
    category: "Repair Services",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Add your submit logic here
    console.log("Form submitted:", form);
  };

  return (
    <div className="new-listing-page">
      <Navbar />
      <div className="container">
        <div className="header">
          <h2>Create New Listing</h2>
          <p>Share a skill or item with your community</p>
        </div>
        <form onSubmit={handleSubmit} className="listing-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter a descriptive title"
              minLength={3}
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Provide details about what you're offering or requesting"
              minLength={10}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="categories">Category</label>
            <select
              id="categories"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="Repair Services">Repair Services</option>
              <option value="Tutoring">Tutoring</option>
              <option value="Coaching">Coaching</option>
            </select>
          </div>

          <div className="form-group">
            <label>What are you listing?</label>
            <div className="button-group">
              <button
                type="button"
                className={form.type === "SKILL" ? "active" : ""}
                onClick={() => setForm({ ...form, type: "SKILL" })}
              >
                Skill
              </button>
              <button
                type="button"
                className={form.type === "ITEM" ? "active" : ""}
                onClick={() => setForm({ ...form, type: "ITEM" })}
              >
                Item
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Are you offering or requesting?</label>
            <div className="button-group">
              <button
                type="button"
                className={form.direction === "OFFER" ? "active" : ""}
                onClick={() => setForm({ ...form, direction: "OFFER" })}
              >
                Offer
              </button>
              <button
                type="button"
                className={form.direction === "REQUEST" ? "active" : ""}
                onClick={() => setForm({ ...form, direction: "REQUEST" })}
              >
                Request
              </button>
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="submit-button">
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
}
