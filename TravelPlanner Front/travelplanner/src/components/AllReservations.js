import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './AllReservations.css';
import { useNavigate } from 'react-router-dom';

function AllReservations() {
    const [reservations, setReservations] = useState([]);
    const token = sessionStorage.getItem('token');


    const usenavigate = useNavigate();

    useEffect(() => {
        let role = sessionStorage.getItem('role');
        if (role === '' || role === null) {
            usenavigate('/login');
        }
        if(role === 'USER'){
            usenavigate('/');
        }
    }, []);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await fetch('http://localhost:8080/reservations', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setReservations(data);
        } catch (error) {
            console.log('Error fetching reservations:', error);
        }
    };

    const deleteReservation = async (reservationID) => {
        try {
            const response = await fetch(
                `http://localhost:8080/reservations/${reservationID}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                // Ako je brisanje uspelo, ažuriraj prikaz rezervacija
                fetchReservations();
            } else {
                console.log('Error deleting reservation');
            }
        } catch (error) {
            console.log('Error deleting reservation:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='all-reservations'>
                <h2>All Reservations</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Reservation ID</th>
                            <th>Date of Reservation</th>
                            <th>Total Cost</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.reservationID}>
                                <td>{reservation.reservationID}</td>
                                <td>{reservation.dateOfReservation}</td>
                                <td>{reservation.totalCost}€</td>
                                <td>
                                    <button
                                        className='delete-button'
                                        onClick={() => deleteReservation(reservation.reservationID)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default AllReservations;
