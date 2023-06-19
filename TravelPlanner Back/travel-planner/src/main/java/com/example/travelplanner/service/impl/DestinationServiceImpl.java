package com.example.travelplanner.service.impl;

import com.example.travelplanner.domain.Destination;
import com.example.travelplanner.persistence.DestinationRepository;
import com.example.travelplanner.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }
}
