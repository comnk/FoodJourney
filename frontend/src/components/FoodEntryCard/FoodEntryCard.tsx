import Link from "next/link";
import "./FoodEntryCard.scss";
import Image from "next/image";
import { FoodEntry } from "@/types/FoodEntry";

export default function FoodEntryCard({ entry }: { entry: FoodEntry }) {
  return (
    <div key={entry.id} className="food-entry-card">
      <Link href={`/food_entry/${entry.id}`}>
        {entry.dishName} at {entry.restaurantName}
      </Link>
      <Image
        src={`/api/food_entry/${entry.id}/photo`}
        alt={entry.dishName}
        width={100}
        height={60}
      />
      <p>Rating: {"⭐".repeat(entry.rating)}</p>
      <p>Tags: {entry.tags.join(", ")}</p>
      <p>Posted At: {entry.time}</p>
    </div>
  );
}
