import Link from "next/link";
import "./navbar.scss";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link href="/" className="logo">
          SkillSwap
        </Link>
      </div>
      <div>
        <ul className="navbar-links">
          <li>
            <Link href="/listings/new">Create Listing</Link>
          </li>
          <li>
            <Link href="/requests">Swap Requests</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link href="/login">Log In</Link>
      </div>
    </nav>
  );
}
