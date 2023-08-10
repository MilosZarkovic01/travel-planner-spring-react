import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './AllReservations.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AllReservations() {
    const [reservations, setReservations] = useState([]);
    const [searchReservationId, setSearchReservationId] = useState('');
    const [searchedReservation, setSearchedReservation] = useState(null);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false); // Dodato stanje
    const token = sessionStorage.getItem('token');

    const usenavigate = useNavigate();

    useEffect(() => {
        let role = sessionStorage.getItem('role');
        if (role === '' || role === null) {
            usenavigate('/login');
        }
        if (role === 'USER') {
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

    const handleSearchReservation = async () => {
        try {
            const response = await fetch(`http://localhost:8080/reservations/id/${searchReservationId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setSearchedReservation(data);
                setIsSearchPerformed(true);
            } else if (response.status === 404) {
                toast.error('Reservation not found');
                setSearchedReservation(null);
                setIsSearchPerformed(true);
            } else {
                console.log('Error fetching data');
                setSearchedReservation(null);
                setIsSearchPerformed(false);
            }
        } catch (error) {
            console.log('Error:', error);
            setSearchedReservation(null);
            setIsSearchPerformed(false); // Poništi stanje da je pretraga izvršena
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
                toast.success('Reservation is canceled!');
                fetchReservations();
                setSearchedReservation(null);
                setSearchReservationId('');
                setIsSearchPerformed(false);
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
                <div className='search-container'>
                    <input
                        type='text'
                        placeholder='Enter Reservation ID'
                        value={searchReservationId}
                        onChange={e => setSearchReservationId(e.target.value)}
                    />
                    <button className='btn btn-primary' onClick={handleSearchReservation}>Search</button>
                </div>
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
                        {searchedReservation ? (
                            <tr key={searchedReservation.reservationID}>
                                <td>{searchedReservation.reservationID}</td>
                                <td>{searchedReservation.dateOfReservation}</td>
                                <td>{searchedReservation.totalCost}€</td>
                                <td>
                                    <button
                                        className='delete-button'
                                        onClick={() => deleteReservation(searchedReservation.reservationID)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ) : isSearchPerformed ? null : (
                            reservations.map((reservation) => (
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default AllReservations;
