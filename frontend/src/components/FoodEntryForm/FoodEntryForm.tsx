"use client";

import { useState, useRef } from "react";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import "./FoodEntryForm.scss";
import { useRouter } from "next/navigation";
import { useGoogleMaps } from "../GoogleMapsProvider/GoogleMapsProvider";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "8px",
  marginTop: "12px",
};

const defaultCenter = { lat: 39.8283, lng: -98.5795 };

export default function FoodEntryForm() {
  const router = useRouter();
  const [hasSelectedPlace, setHasSelectedPlace] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [formData, setFormData] = useState<{
    restaurantName: string;
    dishName: string;
    photo: File | null;
  }>({
    restaurantName: "",
    dishName: "",
    photo: null,
  });

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(defaultCenter);

  const { isLoaded } = useGoogleMaps();

  if (!isLoaded) return <div>Loading...</div>;

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
      console.error("No photo selected");
      return;
    }

    try {
      const params = new URLSearchParams({
        restaurantName: formData.restaurantName,
        dishName: formData.dishName,
        ...(selectedLocation && {
          lat: selectedLocation.lat.toString(),
          lng: selectedLocation.lng.toString(),
        }),
      });

      const response = await fetch(
        `http://localhost:8080/api/food_entry/new?${params.toString()}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
        setFormData({ restaurantName: "", dishName: "", photo: null });
        setSelectedLocation(null);
        router.push(`/food_entry/${entry.id}`);
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
          <Autocomplete
            onLoad={(ref) => (autocompleteRef.current = ref)}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              id="restaurantName"
              name="restaurantName"
              onChange={(e) =>
                setFormData({ ...formData, restaurantName: e.target.value })
              }
              required
            />
          </Autocomplete>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={selectedLocation ?? defaultCenter}
            zoom={hasSelectedPlace ? 17.5 : 4}
          >
            {hasSelectedPlace && <Marker position={selectedLocation!} />}
          </GoogleMap>
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
