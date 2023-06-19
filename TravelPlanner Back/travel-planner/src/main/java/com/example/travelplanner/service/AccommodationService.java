package com.example.travelplanner.service;

import com.example.travelplanner.domain.Accommodation;

import java.util.List;

public interface AccommodationService {
    List<Accommodation> findAccommodatiosByDestination(Long destinationID);
}
