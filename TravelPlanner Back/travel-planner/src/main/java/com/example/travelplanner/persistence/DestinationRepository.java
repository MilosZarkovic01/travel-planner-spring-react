package com.example.travelplanner.persistence;

import com.example.travelplanner.domain.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {
    @Query(value = "SELECT * FROM destination LIMIT 3",nativeQuery = true)
    List<Destination> findTop3();
}
