package com.example.travelplanner.service.impl;

import com.example.travelplanner.domain.Accommodation;
import com.example.travelplanner.persistence.AccommodationReposiotry;
import com.example.travelplanner.service.AccommodationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccommodationServiceImpl implements AccommodationService {

    private final AccommodationReposiotry accommodationReposiotry;

    @Override
    public List<Accommodation> findAccommodatiosByDestination(Long destinationID) {
        List<Accommodation> accommodations = accommodationReposiotry.findByDestinationDestinationID(destinationID);
        if (accommodations == null) {
            accommodations = new ArrayList<>();
        }
        return accommodations;
    }

}
