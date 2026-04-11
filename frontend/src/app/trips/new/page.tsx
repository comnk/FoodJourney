import TripForm from "@/components/forms/TripForm/TripForm";
import Navbar from "@/components/Navbar/Navbar";

export default function CreateNewTripPage() {
  return (
    <div className="create-new-trip-page">
      <Navbar />
      <h1>Create New Trip</h1>
      <TripForm />
    </div>
  );
}
