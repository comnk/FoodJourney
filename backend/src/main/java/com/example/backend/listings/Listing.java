package com.example.backend.listings;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "listings")
public class Listing {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long listingId;

    public String title;
    public String description;
    public String category;
    public String swapType;
    public String indicator;

    protected Listing() {
    }

    public Listing(String title, String description, String category, String swapType, String indicator) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.swapType = swapType;
        this.indicator = indicator;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
