"use client";

import LoginForm from "@/components/forms/LoginForm/LoginForm";
import "./login.scss";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/login");
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="login-page">
      <Navbar />
      <h1>Login Page</h1>
      <LoginForm />
    </div>
  );
}
