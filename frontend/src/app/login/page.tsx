import LoginForm from "@/components/LoginForm/LoginForm";
import "./login.scss";
import Navbar from "@/components/Navbar/Navbar";

export default function Login() {
  return (
    <div className="login-page">
      <Navbar />
      <h1>Login Page</h1>
      <LoginForm />
    </div>
  );
}
