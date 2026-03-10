"use client";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMaps } from "../GoogleMapsProvider/GoogleMapsProvider";

export default function EntryMap({ lat, lng }: { lat: number; lng: number }) {
  const { isLoaded } = useGoogleMaps();

  if (!isLoaded) return <div>Loading map...</div>;

  const position = { lat: lat, lng: lng };

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "300px" }}
      center={position}
      zoom={17.5}
    >
      <Marker position={position} />
    </GoogleMap>
  );
}
