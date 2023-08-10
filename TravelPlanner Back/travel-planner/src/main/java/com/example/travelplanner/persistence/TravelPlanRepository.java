package com.example.travelplanner.persistence;

import com.example.travelplanner.domain.TravelPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TravelPlanRepository extends JpaRepository<TravelPlan, Long> {
    List<TravelPlan> findByDestinationDestinationID(Long destinationID);
    TravelPlan findByTravelplanID(Long travelPlanID);

    @Query("select t from TravelPlan t where t.destination.id = ?1 and t.arrivalDate >= ?2 and t.departureDate <= ?3")
    List<TravelPlan> findByDestinationIdAndArrivalDateGreaterThanEqualAndDepartureDateLessThanEqual(Long destinationId, LocalDate dateFrom, LocalDate dateTo);
}
