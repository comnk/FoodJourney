"use client";

import { useRouter } from "next/navigation";

export default function DeleteEntryButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this entry?",
    );
    if (!confirmed) return;

    const res = await fetch(`http://localhost:8080/api/food_entry/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Entry deleted successfully");
      router.push("/dashboard");
    } else {
      alert("Failed to delete entry");
    }
  };

  return <button onClick={handleDelete}>Delete Entry</button>;
}
