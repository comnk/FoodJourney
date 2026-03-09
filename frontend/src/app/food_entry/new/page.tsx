import Navbar from "@/components/Navbar/Navbar";
import "./food_entry_new.scss";
import FoodEntryForm from "@/components/FoodEntryForm/FoodEntryForm";

export default function NewFoodEntryPage() {
  return (
    <div>
      <Navbar />
      <FoodEntryForm />
    </div>
  );
}
