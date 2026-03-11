package com.example.backend.foodentry;

import java.time.LocalDateTime;

import com.example.backend.users.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "foodEntries")
public class FoodEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String restaurantName;
    private String dishName;
    private Double rating;
    private String notes;
    private LocalDateTime time;
    private String photoPath;
    private String photoContentType;
    private Double latitude;
    private Double longitude;
}
