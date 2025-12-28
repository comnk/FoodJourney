"use client";

import { useState } from "react";
import "./login.scss";
import Link from "next/link";
import Navbar from "@/components/navbar/navbar";
import Form from "next/form";

export default function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <Navbar />
      <main className="login-page">
        <h2>Login</h2>
        <div>
          <form className="login-form">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" />
          </form>
        </div>
        <div className="login-links">
          <p>
            Forgot your password? Click{" "}
            <Link href="/forgot-password" className="link">
              here
            </Link>
            !
          </p>
          <p>
            New to the platform? Sign up{" "}
            <Link href="/register" className="link">
              here
            </Link>
            !
          </p>
        </div>
      </main>
    </>
  );
}
