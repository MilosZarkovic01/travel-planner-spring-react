import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './DestinationDetails.css'
import Navbar from './Navbar'
import Footer from './Footer'
import AccommodationOverview from './AccommodationOverview'
import TravelPlanCard from './TravelPlanCard'
import ReservationPopUp from './ReservationPopUp'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


function DestinationsDetails() {
    const location = useLocation();
    const dest = location.state;

    const [selectedAccommodation, setSelectedAccommodation] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const [planChange, setPlanChange] = useState(0);

    const [isSearched, setIsSearched] = useState(false);
    const [searchedTravelPlans, setSearchedTravelPlans] = useState([]);


    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    const handleSearch = async (dateFrom, dateTo) => {
        try {
            if (!dateFrom || !dateTo) {
                toast.warning('Please select both Arrival and Departure dates');
                return;
            }

            const formattedDateFrom = formatDateForJava(dateFrom);
            const formattedDateTo = formatDateForJava(dateTo);

            const response = await fetch(`http://localhost:8080/travel-plans/${dest.destinationID}/${formattedDateFrom}/${formattedDateTo}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setSearchedTravelPlans(data);
                console.log('Searched Travel Plans:', data);
                setIsSearched(true);
                console.log('Is Searched:', isSearched);
            } else if (response.status === 204) {
                toast.error('No content found.');
                return;
            } else {
                toast.error('Error fetching data');
            }
        } catch (error) {
            toast.error('Failed!');
        }
    };

    const formatDateForJava = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const handleReservationClick = () => {
        if (selectedPlan === null) {
            toast.warning("Please select Travel Plan");
            return;
        }
        if (selectedAccommodation === null) {
            toast.warning("Please select Accommodation");
            return;
        }
        setShowPopup(true);
    };

    const handleConfirmReservation = async () => {
        try {
            const userEmail = sessionStorage.getItem('email');
            const userResponse = await fetch(`http://localhost:8080/users/email?email=${encodeURIComponent(userEmail)}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            const userData = await userResponse.json();

            if (!userData) {
                console.log('Error while fetching user with email: ' + userEmail);
                return;
            }


            const reservation = {
                dateOfReservation: new Date().toISOString(),
                totalCost: totalPrice,
                accommodation: selectedAccommodation,
                user: userData,
                travelPlan: {
                    ...selectedPlan,
                    destination: dest
                },
                selectedActivities: selectedActivities
            };


            console.log(JSON.stringify(reservation));

            // Slanje rezervacije na backend
            const response = await fetch('http://localhost:8080/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(reservation)
            });

            if (response.ok) {
                toast.success('Reservation successfully made!');

                setPlanChange(prevChange => prevChange + 1);
                const updatedPlan = { ...selectedPlan };
                updatedPlan.numberOfSeats -= 1;

                setSelectedPlan(updatedPlan);
                setShowPopup(false);
            } else if (response.status === 400) {
                toast.error('Just sold out!');
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error('Error');
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };


    return (
        <div>
            <Navbar />
            <div className='destination'>
                <h1>{dest.country}, {dest.city} </h1>
                <div className='dest'>
                    <div className='dest-text'>
                        <h2>{dest.name}</h2>
                        <div className="description">
                            {dest.description.split('\n').map((sentence, index) => (
                                <p key={index}>{sentence.trim()}</p>
                            ))}
                        </div>
                    </div>
                    <div className='image'>
                        <img src={require(`../images/card${dest.destinationID}.jpg`)} alt='img' />
                        <img src={require(`../images/card${dest.destinationID}.jpg`)} alt='img' />
                    </div>
                </div>
            </div>
            <div className='date-picker-container'>
                <div className='date-picker'>
                    <label>From:</label>
                    <DatePicker selected={dateFrom} onChange={date => setDateFrom(date)} />
                </div>
                <div className='date-picker'>
                    <label>To:</label>
                    <DatePicker selected={dateTo} onChange={date => setDateTo(date)} />
                </div>
                <button className='btn btn-primary' onClick={() => handleSearch(dateFrom, dateTo)}>Search</button>
            </div>
            <TravelPlanCard
                destinationID={dest.destinationID}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                selectedActivities={selectedActivities}
                setSelectedActivities={setSelectedActivities}
                searchedTravelPlans={searchedTravelPlans}
                isSearched={isSearched}
                key={planChange}
            />
            <AccommodationOverview
                destinationID={dest.destinationID}
                selectedAccommodation={selectedAccommodation}
                setSelectedAccommodation={setSelectedAccommodation}
            />
            <div className="reservation-button-container">
                <button className="btn btn-primary reservation-button" onClick={handleReservationClick}>Make Reservation</button>
            </div>
            {showPopup && (
                <ReservationPopUp
                    selectedAccommodation={selectedAccommodation}
                    selectedPlan={selectedPlan}
                    selectedActivities={selectedActivities}
                    onClose={handleClosePopup}
                    onConfirm={handleConfirmReservation}
                    setTotalPrice={setTotalPrice}
                />
            )}
            <Footer />
        </div>
    )
}

export default DestinationsDetails