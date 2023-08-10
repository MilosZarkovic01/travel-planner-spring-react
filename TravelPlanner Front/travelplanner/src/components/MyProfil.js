import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import './MyProfile.css'
import { toast } from 'react-toastify';

function MyProfile() {
    const [user, setUser] = useState({
        firstName: sessionStorage.getItem('firstName'),
        lastName: sessionStorage.getItem('lastName'),
        phoneNumber: sessionStorage.getItem('phoneNumber')
    });

    const [reservations, setReservations] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
        sessionStorage.setItem(`${name}`, `${value}`);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/users/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
               
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (!response.ok) {
                    toast.error('Failed to update!')
                    throw new Error('Update failed');
                } else {
                    toast.success('Successfully updated!')
                    return response.text();
                }
            }).then(message => {
                console.log(message);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const email = sessionStorage.getItem('email');
            const token = sessionStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/reservations/${email}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setReservations(data);
        } catch (error) {
            console.log('Error fetching reservations:', error);
        }
    };
    return (
        <>
            <Navbar />
            <div className="profile-container">
                <div className="profile-avatar">
                    <img src='https://st2.depositphotos.com/5682790/10019/v/600/depositphotos_100190068-stock-illustration-businessman-office-avatar.jpg' alt="Avatar" />
                    <h3>{sessionStorage.getItem('email')}</h3>
                </div>
                <div className="profile-details">
                    <h2>My Profile</h2>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Phone Number:
                            <input
                                type="text"
                                name="phoneNumber"
                                value={user.phoneNumber}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <button className="profile-button" type="submit">
                            SAVE CHANGES
                        </button>
                    </form>
                </div>
            </div>
            <div className="reservations-container">
                <h2>My Reservations</h2>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Arrival-Departure Date</th>
                            <th>Accommodation</th>
                            <th>Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.reservationID}>
                                <td>{reservation.country}, {reservation.city}</td>
                                <td>{new Date(reservation.arrivalDate).toLocaleDateString()} - {new Date(reservation.departureDate).toLocaleDateString()}</td>
                                <td>{reservation.accommodation}</td>
                                <td>{reservation.totalCost}€</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}

export default MyProfile;
