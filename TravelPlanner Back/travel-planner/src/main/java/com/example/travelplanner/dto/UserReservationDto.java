package com.example.travelplanner.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserReservationDto {
    private Long reservationID;
    private LocalDate arrivalDate;
    private LocalDate departureDate;
    private String country;
    private String city;
    private String accommodation;
    private BigDecimal totalCost;
}
