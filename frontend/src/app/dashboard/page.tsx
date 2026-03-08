import Navbar from "@/components/Navbar/Navbar";
import "./dashboard.scss";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      <p>
        Welcome to the dashboard! Here you can find an overview of your recent
        trips and activities.
      </p>
      <div className="trips-section">
        <h2>Your Trips</h2>
        <div>
          <button>
            <Link href="">New Trip</Link>
          </button>
        </div>
      </div>
      <div className="meals-section">
        <h2>Your Meals</h2>
      </div>
      <div className="routes-section">
        <h2>Your Routes</h2>
      </div>
    </div>
  );
}
