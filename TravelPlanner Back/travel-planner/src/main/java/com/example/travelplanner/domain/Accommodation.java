package com.example.travelplanner.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Accommodation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long accommodationID;

    private String name;
    private String description;
    private String address;
    private BigDecimal pricePerNight;
    private int numberOfRooms;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_fk")
    @JsonBackReference
    private Destination destination;

    @OneToMany(mappedBy = "accommodation",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Reservation> reservations;
}
