import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FoodEntry } from "@/types/FoodEntry";
import Link from "next/link";

export default function FoodEntryCarousel({
  entries,
}: {
  entries: FoodEntry[];
}) {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      swipeable={true}
      emulateTouch={true}
    >
      {entries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.restaurantName}</h3>
          <p>
            <strong>Dish:</strong> {entry.dishName}
          </p>
          <p>
            <strong>Rating:</strong> {"⭐".repeat(entry.rating)}
          </p>
          {entry.notes && (
            <p>
              <strong>Notes:</strong> {entry.notes}
            </p>
          )}
          <button>
            <Link href={`/food_entry/${entry.id}`}>View Details</Link>
          </button>
        </div>
      ))}
    </Carousel>
  );
}
