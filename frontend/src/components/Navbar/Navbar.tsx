import Link from "next/link";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        FoodJourney
      </Link>

      <ul className="nav-links">
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/login" className="login-btn">
            Log in
          </Link>
        </li>
      </ul>
    </nav>
  );
}
