package com.example.backend.foodentry;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FoodEntryService {
    private final FoodEntryRepository repository;
    private static final String UPLOAD_DIR = "uploads/photos/";

    public FoodEntryService(FoodEntryRepository repository) {
        this.repository = repository;
    }

    public FoodEntry createFoodEntry(String restaurantName, String dishName) {
        FoodEntry entry = new FoodEntry();
        entry.setRestaurantName(restaurantName);
        entry.setDishName(dishName);
        return repository.save(entry);
    }

    public FoodEntry setPhoto(Long id, MultipartFile file) throws IOException {
        FoodEntry entry = repository.findById(id).orElseThrow(() -> new RuntimeException("Food entry not found"));
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path uploadDir = Paths.get(UPLOAD_DIR);
        Files.createDirectories(uploadDir);
        Files.copy(file.getInputStream(), uploadDir.resolve(filename), StandardCopyOption.REPLACE_EXISTING);

        if (file.getContentType() == null || !file.getContentType().startsWith("image/")) {
            throw new RuntimeException("Uploaded file is not an image");
        } else {
            entry.setPhotoPath(UPLOAD_DIR + filename);
            entry.setPhotoContentType(file.getContentType());
        }

        return repository.save(entry);
    }

    public PhotoResult getPhoto(Long id) throws IOException {
        FoodEntry entry = repository.findById(id).orElseThrow(() -> new RuntimeException("Entry not found"));

        if (entry.getPhotoPath() == null) {
            throw new RuntimeException("No photo for this entry");
        }

        Resource resource = new FileSystemResource(entry.getPhotoPath());

        if (!resource.exists()) {
            throw new RuntimeException("Photo file not found");
        }

        return new PhotoResult(resource, entry.getPhotoContentType());
    }

    public record PhotoResult(Resource resource, String contentType) {
    }
}
