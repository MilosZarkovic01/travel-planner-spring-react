package com.example.travelplanner.service.impl;

import com.example.travelplanner.domain.TravelPlan;
import com.example.travelplanner.persistence.TravelPlanRepository;
import com.example.travelplanner.service.TravelPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TravelPlanServiceImpl implements TravelPlanService {

    private final TravelPlanRepository travelPlanRepository;

    @Override
    public List<TravelPlan> findAllTravelPlansForDestination(Long destinationID) {
        List<TravelPlan> travelPlans = travelPlanRepository.findByDestinationDestinationID(destinationID)
                .stream().filter((travelPlan) -> travelPlan.getArrivalDate().isAfter(LocalDate.now())).
                sorted(Comparator.comparing(TravelPlan::getArrivalDate)).toList();
        if (travelPlans.isEmpty()) {
            return new ArrayList<>();
        }
        return travelPlans;
    }
}
