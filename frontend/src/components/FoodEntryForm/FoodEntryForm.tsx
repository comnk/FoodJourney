"use client";

import { useState, useRef } from "react";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import "./FoodEntryForm.scss";
import { useRouter } from "next/navigation";
import { useGoogleMaps } from "../GoogleMapsProvider/GoogleMapsProvider";
import Image from "next/image";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = { lat: 39.8283, lng: -98.5795 };

export default function FoodEntryForm() {
  const router = useRouter();
  const [hasSelectedPlace, setHasSelectedPlace] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [formData, setFormData] = useState<{
    restaurantName: string;
    dishName: string;
    rating: number;
    photo: File | null;
    notes: string;
  }>({
    restaurantName: "",
    dishName: "",
    rating: 0,
    photo: null,
    notes: "",
  });

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(defaultCenter);

  const { isLoaded } = useGoogleMaps();

  if (!isLoaded) return <div>Loading map…</div>;

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    const location = place?.geometry?.location;

    if (location) {
      setSelectedLocation({ lat: location.lat(), lng: location.lng() });
      setHasSelectedPlace(true);
      setFormData((prev) => ({
        ...prev,
        restaurantName: place.name || prev.restaurantName,
      }));
    }
  };

  const handleSubmission = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.photo) {
      setError("Please select a photo");
      return;
    }
    if (formData.rating < 1 || formData.rating > 5) {
      setError("Rating must be between 1 and 5");
      return;
    }

    try {
      const params = new URLSearchParams({
        restaurantName: formData.restaurantName,
        dishName: formData.dishName,
        rating: formData.rating.toString(),
        notes: formData.notes,
        ...(selectedLocation && {
          latitude: selectedLocation.lat.toString(),
          longitude: selectedLocation.lng.toString(),
        }),
      });

      const response = await fetch(
        `http://localhost:8080/api/food_entry/new?${params.toString()}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      if (!response.ok) {
        setError("Failed to submit food entry");
        return;
      }

      const entry = await response.json();

      const photoForm = new FormData();
      photoForm.append("file", formData.photo);

      const photoResponse = await fetch(
        `http://localhost:8080/api/food_entry/${entry.id}/photo`,
        {
          method: "POST",
          body: photoForm,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      if (photoResponse.ok) {
        router.push(`/food_entry/${entry.id}`);
      } else {
        setError("Failed to upload photo");
      }
    } catch {
      setError("An error occurred while submitting the food entry");
    }
  };

  return (
    <div className="food-entry-page">
      <h1>New Entry</h1>
      <p className="page-subtitle">Document a dish worth remembering.</p>

      <div className="form-card">
        <form className="form" onSubmit={handleSubmission}>
          <div className="field">
            <label htmlFor="restaurantName">Restaurant</label>
            <Autocomplete
              onLoad={(ref) => (autocompleteRef.current = ref)}
              onPlaceChanged={handlePlaceChanged}
            >
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                placeholder="Search for a restaurant…"
                onChange={(e) =>
                  setFormData({ ...formData, restaurantName: e.target.value })
                }
                required
              />
            </Autocomplete>

            <div className="map-section">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={selectedLocation ?? defaultCenter}
                zoom={hasSelectedPlace ? 17.5 : 4}
              >
                {hasSelectedPlace && <Marker position={selectedLocation!} />}
              </GoogleMap>
            </div>
          </div>

          <hr className="form-divider" />

          <div className="field">
            <label htmlFor="dishName">Dish Name</label>
            <input
              type="text"
              id="dishName"
              name="dishName"
              placeholder="e.g. Tonkotsu Ramen"
              onChange={(e) =>
                setFormData({ ...formData, dishName: e.target.value })
              }
              required
            />
          </div>

          <div className="field">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              placeholder="1–5"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rating: parseInt(e.target.value) || 0,
                })
              }
              required
            />
            <span className="rating-hint">1 = poor · 5 = exceptional</span>
          </div>

          <div className="field">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              placeholder="What made this meal memorable?"
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          <hr className="form-divider" />

          <div className="field photo-upload">
            <label>Photo</label>
            <div className="photo-dropzone">
              <span className="dropzone-icon">📷</span>
              <p>Click to choose a photo</p>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    photo: e.target.files?.[0] ?? null,
                  })
                }
                required
              />
            </div>

            {formData.photo && (
              <div className="photo-preview">
                <Image
                  src={URL.createObjectURL(formData.photo)}
                  alt="Preview"
                  width={300}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Save Entry
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
