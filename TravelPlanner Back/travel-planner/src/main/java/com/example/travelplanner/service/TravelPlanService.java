package com.example.travelplanner.service;

import com.example.travelplanner.domain.TravelPlan;

import java.util.List;

public interface TravelPlanService {
    List<TravelPlan> findAllTravelPlansForDestination(Long destinationID);
}
