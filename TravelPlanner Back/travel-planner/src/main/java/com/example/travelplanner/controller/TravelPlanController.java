package com.example.travelplanner.controller;

import com.example.travelplanner.domain.TravelPlan;
import com.example.travelplanner.service.TravelPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/travel-plans")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TravelPlanController {

    private final TravelPlanService travelPlanService;

    @GetMapping("/{destinationID}")
    public ResponseEntity<List<TravelPlan>> findAllTravelPlansForDestination(@PathVariable("destinationID") Long destinationID) {
        List<TravelPlan> travelPlans = travelPlanService.findAllTravelPlansForDestination(destinationID);
        if (travelPlans.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(travelPlans);
    }
}
