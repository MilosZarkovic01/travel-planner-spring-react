package com.example.travelplanner.service.impl;

import com.example.travelplanner.domain.Reservation;
import com.example.travelplanner.domain.TravelPlan;
import com.example.travelplanner.persistence.ReservationRepository;
import com.example.travelplanner.persistence.TravelPlanRepository;
import com.example.travelplanner.service.ReservationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final TravelPlanRepository travelPlanRepository;

    @Transactional
    @Override
    public Reservation createReservation(Reservation reservation) {
        Reservation savedReservation = reservationRepository.save(reservation);

        TravelPlan travelPlan = savedReservation.getTravelPlan();
        travelPlan.setNumberOfSeats(travelPlan.getNumberOfSeats() - 1);
        travelPlanRepository.save(travelPlan);

        return savedReservation;
    }
}

