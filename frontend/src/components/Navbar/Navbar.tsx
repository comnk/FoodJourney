"use client";

import Link from "next/link";
import "./Navbar.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => setLoggedIn(!!localStorage.getItem("token"));

    checkAuth();

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/user/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("storage"));
        setLoggedIn(false);
        console.log("Logout successful");
        router.push("/");
      } else {
        console.error("Logout failed: ", response.statusText);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <span
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => router.push(loggedIn ? "/dashboard" : "/")}
      >
        FoodJourney
      </span>

      <ul className="nav-links">
        <li>
          {loggedIn ? (
            <Link href="/food_entry/new">Add Food Entry</Link>
          ) : (
            <Link href="/about">About</Link>
          )}
        </li>
        <li>
          {loggedIn ? (
            <button onClick={handleLogout} className="login-btn">
              Log out
            </button>
          ) : (
            <Link href="/login" className="login-btn">
              Log in
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
