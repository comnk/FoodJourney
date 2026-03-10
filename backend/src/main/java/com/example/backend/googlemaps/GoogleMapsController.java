package com.example.backend.googlemaps;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.maps.model.GeocodingResult;

@RestController
public class GoogleMapsController {
    private final GoogleMapsService googleMapsService;

    public GoogleMapsController(GoogleMapsService googleMapsService) {
        this.googleMapsService = googleMapsService;
    }

    @GetMapping("/geocode")
    public GeocodingResult[] geocodeAddress(@RequestParam String address) throws Exception {
        return googleMapsService.geocodeAddress(address);
    }

}