import Link from "next/link";
import "./FoodEntryCard.scss";
import Image from "next/image";
import { FoodEntry } from "@/types/FoodEntry";
import { formatEntryTime } from "@/utils/formatEntryTime";

export default function FoodEntryCard({ entry }: { entry: FoodEntry }) {
  return (
    <div className="food-entry-card">
      <Link href={`/food_entry/${entry.id}`} className="card-photo">
        <Image
          src={`/api/food_entry/${entry.id}/photo`}
          alt={entry.dishName}
          fill
          sizes="(max-width: 600px) 100vw, 320px"
        />
      </Link>

      <div className="card-body">
        <Link href={`/food_entry/${entry.id}`} className="card-title">
          {entry.dishName}
        </Link>
        <p className="card-restaurant">{entry.restaurantName}</p>

        <div className="card-rating">{"⭐".repeat(entry.rating)}</div>

        {entry.tags?.length > 0 && (
          <div className="card-tags">
            {entry.tags.map((tag: string) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}

        <div className="card-footer">{formatEntryTime(entry.time)}</div>
      </div>
    </div>
  );
}
