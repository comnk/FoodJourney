package com.example.backend.googlemaps;

import org.springframework.stereotype.Service;

import com.google.maps.GeoApiContext;
import com.google.maps.model.GeocodingResult;

@Service
public class GoogleMapsService {
    private final GeoApiContext geoApiContext;

    public GoogleMapsService(GeoApiContext geoApiContext) {
        this.geoApiContext = geoApiContext;
    }

    public GeocodingResult[] geocodeAddress(String address) throws Exception {
        return com.google.maps.GeocodingApi.geocode(geoApiContext, address).await();
    }
}
