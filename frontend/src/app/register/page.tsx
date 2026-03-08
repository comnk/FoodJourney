import Navbar from "@/components/Navbar/Navbar";
import "./register.scss";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

export default function RegisterPage() {
  return (
    <div>
      <Navbar />
      <h1>Register Page</h1>
      <RegisterForm />
    </div>
  );
}
