package com.example.travelplanner.service;

import com.example.travelplanner.domain.TravelPlan;

import java.time.LocalDate;
import java.util.List;

public interface TravelPlanService {
    List<TravelPlan> findAllTravelPlansForDestination(Long destinationID);
    List<TravelPlan> findTravelPlansFromTo(Long destinationID, LocalDate dateFrom, LocalDate dateTo);
}
