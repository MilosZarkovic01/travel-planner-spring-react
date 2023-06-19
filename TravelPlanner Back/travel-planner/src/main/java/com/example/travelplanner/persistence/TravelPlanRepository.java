package com.example.travelplanner.persistence;

import com.example.travelplanner.domain.TravelPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TravelPlanRepository extends JpaRepository<TravelPlan, Long> {
    List<TravelPlan> findByDestinationDestinationID(Long destinationID);
}
