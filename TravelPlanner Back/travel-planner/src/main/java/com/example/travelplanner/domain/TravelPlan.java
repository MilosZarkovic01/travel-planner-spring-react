package com.example.travelplanner.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "travel_plan")
public class TravelPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long travelplanID;

    private LocalDate arrivalDate;
    private LocalDate departureDate;
    private BigDecimal price;
    private int numberOfSeats;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_fk")
    @JsonBackReference
    private Destination destination;

    @OneToMany(mappedBy = "travelPlan", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Activity> activities;

    @OneToMany(mappedBy = "travelPlan", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Reservation> reservations;

}
