"use client";

import { useState } from "react";
import "./FoodEntryForm.scss";

export default function FoodEntryForm() {
  const [formData, setFormData] = useState<{
    restaurantName: string;
    dishName: string;
    photo: File | null;
  }>({
    restaurantName: "",
    dishName: "",
    photo: null,
  });

  const handleSubmission = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.photo) {
      console.error("No photo selected");
      return;
    }

    try {
      const params = new URLSearchParams({
        restaurantName: formData.restaurantName,
        dishName: formData.dishName,
      });

      const response = await fetch(
        `http://localhost:8080/api/food_entry/new?${params.toString()}`,
        {
          method: "POST",
          body: formData.photo,
        },
      );

      if (!response.ok) {
        console.error("Failed to submit food entry: ", response.statusText);
        return;
      }

      const entry = await response.json();

      const photoForm = new FormData();
      photoForm.append("file", formData.photo);

      const photoResponse = await fetch(
        `http://localhost:8080/api/food_entry/${entry.id}/photo`,
        { method: "POST", body: photoForm },
      );

      if (photoResponse.ok) {
        console.log("Food entry submitted successfully!");
        setFormData({
          restaurantName: "",
          dishName: "",
          photo: null,
        });
      } else {
        console.error("Photo upload failed:", photoResponse.statusText);
      }
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };

  return (
    <div>
      <h1>Food Entry Form</h1>
      <form className="form" onSubmit={handleSubmission}>
        <div>
          <label htmlFor="restaurantName">Restaurant Name:</label>
          <input
            type="text"
            id="restaurantName"
            name="restaurantName"
            onChange={(e) =>
              setFormData({ ...formData, restaurantName: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="dishName">Dish Name:</label>
          <input
            type="text"
            id="dishName"
            name="dishName"
            onChange={(e) =>
              setFormData({ ...formData, dishName: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, photo: e.target.files?.[0] ?? null })
            }
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
