package com.example.backend.foodentry;

import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/food_entry")
public class FoodEntryController {
    private final FoodEntryService service;

    public FoodEntryController(FoodEntryService service) {
        this.service = service;
    }

    @PostMapping("/new")
    public ResponseEntity<FoodEntry> createFoodEntry(
            @RequestParam String restaurantName,
            @RequestParam String dishName,
            @RequestParam Double rating,
            @RequestParam String notes,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude,
            @AuthenticationPrincipal UserDetails userDetails) {
        FoodEntry entry = service.createFoodEntry(restaurantName, dishName, rating, notes, latitude, longitude,
                userDetails.getUsername());
        return ResponseEntity.ok(entry);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodEntry> getFoodEntry(@PathVariable Long id) {
        FoodEntry entry = service.getFoodEntry(id);
        return ResponseEntity.ok(entry);
    }

    @GetMapping("/my_entries")
    public ResponseEntity<Iterable<FoodEntry>> getAllFoodEntries(@AuthenticationPrincipal UserDetails userDetails) {
        Iterable<FoodEntry> entries = service.getFoodEntriesByUsername(userDetails.getUsername());
        return ResponseEntity.ok(entries);
    }

    @PostMapping("/{id}/photo")
    public ResponseEntity<String> uploadPhoto(
            @PathVariable Long id,
            @RequestParam() MultipartFile file) throws IOException {

        service.setPhoto(id, file);
        return ResponseEntity.ok("Photo uploaded");
    }

    @GetMapping("/{id}/photo")
    public ResponseEntity<Resource> getPhoto(@PathVariable Long id) throws IOException {
        FoodEntryService.PhotoResult result = service.getPhoto(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(result.contentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"photo\"")
                .body(result.resource());
    }
}
