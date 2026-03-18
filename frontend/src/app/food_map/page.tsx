"use client";

import { FoodEntry } from "@/components/FoodEntryCard/FoodEntryCard";
import { useGoogleMaps } from "@/components/GoogleMapsProvider/GoogleMapsProvider";
import Navbar from "@/components/Navbar/Navbar";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useEffect, useCallback, useRef } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "8px",
};

const defaultCenter = { lat: 39.8283, lng: -98.5795 };
const defaultZoom = 4;

export default function FoodMapPage() {
  const { isLoaded } = useGoogleMaps();
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<FoodEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/food_entry/my_entries",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch food entries");
        }

        const data = await response.json();
        setEntries(data);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  useEffect(() => {
    if (!mapRef.current || mappableEntries.length === 0) return;

    if (mappableEntries.length === 1) {
      mapRef.current.setCenter({
        lat: mappableEntries[0].latitude!,
        lng: mappableEntries[0].longitude!,
      });
      mapRef.current.setZoom(14);
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    mappableEntries.forEach((entry) => {
      bounds.extend({ lat: entry.latitude!, lng: entry.longitude! });
    });
    mapRef.current.fitBounds(bounds, 60);
  }, [entries, mapRef.current]);

  if (!isLoaded || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const mappableEntries = entries.filter(
    (entry) =>
      entry.latitude !== undefined &&
      entry.longitude !== undefined &&
      !isNaN(entry.latitude) &&
      !isNaN(entry.longitude),
  );

  return (
    <div>
      <Navbar />
      <div className="map-section">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={defaultZoom}
          onLoad={onMapLoad}
        >
          {mappableEntries.map((entry) => (
            <Marker
              key={entry.id}
              position={{ lat: entry.latitude!, lng: entry.longitude! }}
              onClick={() => setSelectedEntry(entry)}
            />
          ))}

          {selectedEntry &&
            selectedEntry.latitude &&
            selectedEntry.longitude && (
              <InfoWindow
                position={{
                  lat: selectedEntry.latitude,
                  lng: selectedEntry.longitude,
                }}
                onCloseClick={() => setSelectedEntry(null)}
              >
                <div>
                  <h3>{selectedEntry.restaurantName}</h3>
                  <p>
                    <strong>Dish:</strong> {selectedEntry.dishName}
                  </p>
                  <p>
                    <strong>Rating:</strong> {selectedEntry.rating} / 5
                  </p>
                  {selectedEntry.notes && (
                    <p>
                      <strong>Notes:</strong> {selectedEntry.notes}
                    </p>
                  )}
                  <a href={`/food_entry/${selectedEntry.id}`}>View Details</a>
                </div>
              </InfoWindow>
            )}
        </GoogleMap>
      </div>
    </div>
  );
}
