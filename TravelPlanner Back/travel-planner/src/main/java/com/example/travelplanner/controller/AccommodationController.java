package com.example.travelplanner.controller;

import com.example.travelplanner.domain.Accommodation;
import com.example.travelplanner.service.AccommodationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accommodations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AccommodationController {
    private final AccommodationService accommodationService;


    @GetMapping("/{destinationID}")
    public ResponseEntity<List<Accommodation>> findsAllAccommodationsForDestination(@PathVariable("destinationID") Long destinationID) {
        List<Accommodation> accommodations = accommodationService.findAccommodatiosByDestination(destinationID);
        if (accommodations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(accommodations);
    }

}
