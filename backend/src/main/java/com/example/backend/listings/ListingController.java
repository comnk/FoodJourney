package com.example.backend.listings;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/listing")
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @GetMapping("/new")
    public List<Listing> getListings(Model model) {
        return listingService.getListings();
    }

    @GetMapping("/{id}")
    public String getListingById(Model model) {
        return "Listing for here!";
    }
}
