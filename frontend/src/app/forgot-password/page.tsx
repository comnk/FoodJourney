"use client";

import Navbar from "@/components/navbar/navbar";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <>
      <Navbar />
      <main>
        <h2>Forgot Password?</h2>
        <p>Enter email here</p>
        <div>
          <form>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="submit" />
          </form>
        </div>
      </main>
    </>
  );
}
