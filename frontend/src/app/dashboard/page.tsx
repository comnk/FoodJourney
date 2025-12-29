"use client";

import Navbar from "@/components/navbar/navbar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DashboardPage() {
  const [listing, setListing] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/listing/test")
      .then((res) => setListing(res.data)) // already JSON
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h2>Backend Response</h2>
        <p>{listing}</p>
      </div>
    </>
  );
}
