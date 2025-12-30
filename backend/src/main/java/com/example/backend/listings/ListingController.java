package com.example.backend.listings;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/listing")
@CrossOrigin(origins = "http://localhost:3000")
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @GetMapping("/new")
    public List<Listing> getListings(Model model) {
        return listingService.getListings();
    }

    @PostMapping("/new")
    public String postListing(@ModelAttribute Listing listing, Model model) {
        model.addAttribute(listing);
        return "Listing posted!";
    }

    @GetMapping("/test")
    public String testListing() {
        return "TEST!";
    }

    @GetMapping("/{id}")
    public String getListingById(Model model) {
        return "Listing for here!";
    }
}
