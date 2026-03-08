import Navbar from "@/components/Navbar/Navbar";
import "./new_trip.scss";

export default function NewTripPage() {
  return (
    <div>
      <Navbar />
      <div className="new-trip-section">
        <h1>New Trip</h1>
        <p>Here you can create a new trip.</p>
      </div>
    </div>
  );
}
