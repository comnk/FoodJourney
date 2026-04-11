"use client";

import Link from "next/link";
import { useState } from "react";

import "./LoginForm.scss";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem("token", token);
        window.dispatchEvent(new Event("storage"));
        router.push("/dashboard");
      } else {
        const errorMessage = await response.text();
        console.error("Login failed:", response.status, errorMessage);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
      <p>Forgot Password?</p>
      <button type="submit">Login</button>
      <p>
        You do not have an account? Register <Link href="/register">here</Link>!
      </p>
    </form>
  );
}
