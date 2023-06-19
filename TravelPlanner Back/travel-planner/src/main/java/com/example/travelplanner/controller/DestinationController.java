package com.example.travelplanner.controller;

import com.example.travelplanner.domain.Destination;
import com.example.travelplanner.service.DestinationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/destinations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DestinationController {

    private final DestinationService destinationService;

    @GetMapping
    public ResponseEntity<List<Destination>> getFirstThreeDestinations(){
        List<Destination> destinations = destinationService.getFirstThreeDestinations();
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Destination>> getAllDestinations() {
        List<Destination> destinations = destinationService.getAllDestinations();
        return ResponseEntity.ok(destinations);
    }
}
