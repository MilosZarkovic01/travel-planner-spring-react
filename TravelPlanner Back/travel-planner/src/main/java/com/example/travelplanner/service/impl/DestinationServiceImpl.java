package com.example.travelplanner.service.impl;

import com.example.travelplanner.domain.Destination;
import com.example.travelplanner.persistence.DestinationRepository;
import com.example.travelplanner.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DestinationServiceImpl implements DestinationService {

    private final DestinationRepository destinationRepository;

    @Autowired
    public DestinationServiceImpl(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    @Override
    public List<Destination> getFirstThreeDestinations() {
        return destinationRepository.findTop3();
    }

    @Override
    public Page<Destination> getDestinationsByPage(Pageable pageable) {
        return destinationRepository.findAll(pageable);
    }

    @Override
    public int getTotalDestinations() {
        return (int) destinationRepository.count();
    }

    @Override
    public Page<Destination> searchDestinations(String query, Pageable pageable) {
        return destinationRepository.findByCountryContainingIgnoreCaseOrCityContainingIgnoreCase(query, query, pageable);
    }
}
