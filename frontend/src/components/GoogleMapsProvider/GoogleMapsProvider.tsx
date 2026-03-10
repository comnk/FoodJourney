"use client";

import { createContext, useContext } from "react";
import { Libraries, useLoadScript } from "@react-google-maps/api";

const libraries: Libraries = ["places"];

const GoogleMapsContext = createContext<{ isLoaded: boolean }>({
  isLoaded: false,
});

export function GoogleMapsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

export function useGoogleMaps() {
  return useContext(GoogleMapsContext);
}
