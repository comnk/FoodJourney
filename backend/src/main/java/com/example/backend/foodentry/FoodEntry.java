package com.example.backend.foodentry;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "foodEntries")
public class FoodEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String restaurantName;
    private String dishName;
    private Integer rating;
    private String note;
    private String photoPath;
    private String photoContentType;
}
