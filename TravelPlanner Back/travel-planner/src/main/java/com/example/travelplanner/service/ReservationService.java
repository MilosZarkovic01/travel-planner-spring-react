package com.example.travelplanner.service;

import com.example.travelplanner.domain.Reservation;
import com.example.travelplanner.dto.ReservationDto;
import com.example.travelplanner.dto.UserReservationDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ReservationService {
    Reservation createReservation(Reservation reservation);
    List<ReservationDto> getAllReservations();
    Optional<Reservation> deleteReservation(Long reservationID);
    List<UserReservationDto> getUserReservationsByEmail(String email);
    Optional<Reservation> findById(Long reservationID);
}
