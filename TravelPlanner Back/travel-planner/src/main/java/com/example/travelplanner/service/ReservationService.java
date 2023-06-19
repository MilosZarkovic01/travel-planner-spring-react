package com.example.travelplanner.service;

import com.example.travelplanner.domain.Reservation;
import org.springframework.stereotype.Service;

@Service
public interface ReservationService {
    Reservation createReservation(Reservation reservation);
}
