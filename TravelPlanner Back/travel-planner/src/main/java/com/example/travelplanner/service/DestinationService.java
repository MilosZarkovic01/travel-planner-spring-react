package com.example.travelplanner.service;

import com.example.travelplanner.domain.Destination;

import java.util.List;

public interface DestinationService {
    List<Destination> getFirstThreeDestinations();
    List<Destination> getAllDestinations();
}
