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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    setLoggedIn(false);
    router.push("/");
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
            <Link href="/trips">Trips</Link>
          ) : (
            <Link href="/about">About</Link>
          )}
        </li>
        {loggedIn && (
          <li>
            <Link href="/food_map">Map</Link>
          </li>
        )}
        {loggedIn && (
          <li>
            <Link href="/gallery">Gallery</Link>
          </li>
        )}
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
