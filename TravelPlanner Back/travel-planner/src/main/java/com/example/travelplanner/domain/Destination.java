package com.example.travelplanner.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long destinationID;

    private String name;
    private String description;
    private String city;
    private String country;

    @Lob
    private byte[] coverPhoto;

    @OneToMany(mappedBy = "destination",fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Accommodation> accommodations;

    @OneToMany(mappedBy = "destination",fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<TravelPlan> travelPlans;
}
