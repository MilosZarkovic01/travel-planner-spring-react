package com.example.travelplanner.controller;

import com.example.travelplanner.domain.TravelPlan;
import com.example.travelplanner.service.TravelPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    @GetMapping("/{destinationID}/{dateFrom}/{dateTo}")
    public ResponseEntity<List<TravelPlan>> findTravelPlansFromTo(
            @PathVariable("destinationID") Long destinationID,
            @PathVariable("dateFrom") LocalDate dateFrom,
            @PathVariable("dateTo") LocalDate dateTo) {
        List<TravelPlan> travelPlans = travelPlanService.findTravelPlansFromTo(destinationID,dateFrom, dateTo);
        if (travelPlans.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(travelPlans);
    }
}
