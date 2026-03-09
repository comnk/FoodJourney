import Navbar from "@/components/Navbar/Navbar";
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
      <h1>{entry.dishName}</h1>
      <p>Restaurant: {entry.restaurantName}</p>
      <Image
        src={`/api/food_entry/${id}/photo`}
        alt={entry.dishName}
        width={500}
        height={300}
      />
    </div>
  );
}
