package com.example.travelplanner.domain;

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
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long reservationID;

    private LocalDate dateOfReservation;
    private BigDecimal totalCost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_fk")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accommodation_fk")
    private Accommodation accommodation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "travelplan_fk")
    private TravelPlan travelPlan;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "reservation_activity",
            joinColumns = @JoinColumn(name = "reservation_fk"),
            inverseJoinColumns = @JoinColumn(name = "activity_fk"))
    private List<Activity> selectedActivities;

}
