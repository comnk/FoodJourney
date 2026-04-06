import "./food_entry.scss";

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

      <div className="entry-content">
        <div className="entry-meta-row">
          <p className="entry-timestamp">
            <strong>Posted:</strong> {formatEntryTime(entry.time)}
          </p>
          <button>Share Entry</button>
          <DeleteEntryButton id={id} />
        </div>

        <h1 className="entry-title">{entry.dishName}</h1>

        <div className="entry-info-row">
          <p className="entry-restaurant">
            at <span>{entry.restaurantName}</span>
          </p>
          <p className="entry-rating">{"⭐".repeat(entry.rating)}</p>
        </div>

        <hr className="entry-rule" />

        <div className="entry-photo-wrap">
          <Image
            src={`/api/food_entry/${id}/photo`}
            alt={entry.dishName}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 760px"
          />
        </div>

        {entry.notes && (
          <div className="entry-card">
            <p className="entry-section-label">Notes</p>
            <p className="entry-notes">{entry.notes}</p>
          </div>
        )}

        {entry.tags?.length > 0 && (
          <div className="entry-card">
            <p className="entry-section-label">Tags</p>
            <ul className="entry-tags">
              {entry.tags.map((tag: string) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        )}

        {entry.latitude && entry.longitude && (
          <div className="entry-map-wrap">
            <EntryMap lat={entry.latitude} lng={entry.longitude} />
          </div>
        )}
      </div>
    </div>
  );
}
