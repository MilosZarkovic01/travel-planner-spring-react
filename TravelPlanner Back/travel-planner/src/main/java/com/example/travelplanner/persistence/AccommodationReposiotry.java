package com.example.travelplanner.persistence;

import com.example.travelplanner.domain.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccommodationReposiotry extends JpaRepository<Accommodation, Long> {
    List<Accommodation> findByDestinationDestinationID(Long destinationID);

}
