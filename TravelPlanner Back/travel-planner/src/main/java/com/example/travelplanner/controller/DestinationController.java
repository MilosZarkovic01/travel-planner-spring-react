package com.example.travelplanner.controller;

import com.example.travelplanner.domain.Destination;
import com.example.travelplanner.service.DestinationService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/destinations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DestinationController {

    private final DestinationService destinationService;

    @GetMapping
    public ResponseEntity<List<Destination>> getFirstThreeDestinations() {
        List<Destination> destinations = destinationService.getFirstThreeDestinations();
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Destination>> searchDestinations(
            @RequestParam String query,
            Pageable pageable
    ) {
        Page<Destination> searchResults = destinationService.searchDestinations(query, pageable);
        if (searchResults.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(searchResults);
        }
    }

    @GetMapping("/page")
    public ResponseEntity<Page<Destination>> getDestinationsByPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Destination> destinations = destinationService.getDestinationsByPage(pageable);
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/totalPages")
    public ResponseEntity<Integer> getTotalPages(
            @RequestParam(defaultValue = "6") int pageSize
    ) {
        int totalDestinations = destinationService.getTotalDestinations();
        int totalPages = (int) Math.ceil((double) totalDestinations / pageSize);
        return ResponseEntity.ok(totalPages);
    }
}
