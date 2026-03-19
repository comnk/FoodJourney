package com.example.backend.foodentry;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.users.User;

public interface FoodEntryRepository extends JpaRepository<FoodEntry, Long> {
    List<FoodEntry> findByUser(User user);

    Iterable<FoodEntry> findTop3ByUserOrderByTimeDesc(User user);
}
