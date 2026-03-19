"use client";

import { useGoogleMaps } from "@/components/GoogleMapsProvider/GoogleMapsProvider";
import Navbar from "@/components/Navbar/Navbar";
import FoodEntryCarousel from "@/components/FoodEntryCarousel/FoodEntryCarousel";
import { FoodEntry } from "@/types/FoodEntry";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useEffect, useCallback, useRef } from "react";

interface LocationGroup {
  lat: number;
  lng: number;
  entries: FoodEntry[];
}

const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "8px",
};

const defaultCenter = { lat: 39.8283, lng: -98.5795 };
const defaultZoom = 4;

function groupEntriesByLocation(entries: FoodEntry[]): LocationGroup[] {
  const locationMap: { [key: string]: FoodEntry[] } = {};

  entries.forEach((entry) => {
    if (entry.latitude !== undefined && entry.longitude !== undefined) {
      const key = `${entry.latitude.toFixed(4)}_${entry.longitude.toFixed(4)}`;
      if (!locationMap[key]) {
        locationMap[key] = [];
      }
      locationMap[key].push(entry);
    }
  });

  return Object.entries(locationMap).map(([key, groupEntries]) => {
    const [lat, lng] = key.split("_").map(Number);
    return { lat, lng, entries: groupEntries };
  });
}

export default function FoodMapPage() {
  const { isLoaded } = useGoogleMaps();
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<LocationGroup | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const locationGroups = groupEntriesByLocation(entries);

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
          {locationGroups.map((group, i) => (
            <Marker
              key={i}
              position={{ lat: group.lat, lng: group.lng }}
              onClick={() => setSelectedGroup(group)}
              label={
                group.entries.length > 1
                  ? {
                      text: String(group.entries.length),
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }
                  : undefined
              }
            />
          ))}

          {selectedGroup && (
            <InfoWindow
              position={{ lat: selectedGroup.lat, lng: selectedGroup.lng }}
              onCloseClick={() => setSelectedGroup(null)}
            >
              <FoodEntryCarousel entries={selectedGroup.entries} />
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
