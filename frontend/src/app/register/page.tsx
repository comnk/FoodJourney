"use client";

import Navbar from "@/components/navbar/navbar";
import Link from "next/link";
import { useState } from "react";

import "./register.scss";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Navbar />
      <main className="register-page">
        <h2>Register</h2>
        <div>
          <form className="register-form">
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
        <div className="register-links">
          <p>
            Already have an account? Log in{" "}
            <Link href="/login" className="link">
              here
            </Link>
            !
          </p>
        </div>
      </main>
    </>
  );
}
