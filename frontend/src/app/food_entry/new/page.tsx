import Navbar from "@/components/Navbar/Navbar";
import "./food_entry_new.scss";
import FoodEntryForm from "@/components/forms/FoodEntryForm/FoodEntryForm";

export default function NewFoodEntryPage() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <FoodEntryForm />
    </div>
  );
}
