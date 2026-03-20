import DeleteEntryButton from "@/components/DeleteEntryButton/DeleteEntryButton";
import EntryMap from "@/components/EntryMap/EntryMap";
import Navbar from "@/components/Navbar/Navbar";
import { formatEntryTime } from "@/utils/formatEntryTime";
import Image from "next/image";

type Params = Promise<{ id: string }>;

export default async function FoodEntryPage({ params }: { params: Params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:8080/api/food_entry/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Entry fetch failed:", res.status);
  }

  const entry = await res.json();

  return (
    <div className="food-entry-page">
      <Navbar />
      <p>
        <b>Posted:</b> {formatEntryTime(entry.time)}
      </p>
      <DeleteEntryButton id={id} />
      <h1>{entry.dishName}</h1>
      <p>Restaurant: {entry.restaurantName}</p>
      <p>Rating: {"⭐".repeat(entry.rating)}</p>
      <Image
        src={`/api/food_entry/${id}/photo`}
        alt={entry.dishName}
        width={500}
        height={300}
      />
      <div>
        <h2>Notes:</h2>
        <p>{entry.notes}</p>
      </div>
      <div>
        <h2>Tags:</h2>
        <ul>
          {entry.tags.map((tag: string) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      {entry.latitude && entry.longitude && (
        <EntryMap lat={entry.latitude} lng={entry.longitude} />
      )}
    </div>
  );
}
