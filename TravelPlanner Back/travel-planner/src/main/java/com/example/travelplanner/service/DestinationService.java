package com.example.travelplanner.service;

import com.example.travelplanner.domain.Destination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DestinationService {
    List<Destination> getFirstThreeDestinations();
    Page<Destination> getDestinationsByPage(Pageable pageable);
    int getTotalDestinations();
    Page<Destination> searchDestinations(String query, Pageable pageable);
}

