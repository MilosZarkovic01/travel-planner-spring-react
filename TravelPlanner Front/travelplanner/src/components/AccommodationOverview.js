import React, { useEffect, useState } from 'react'
import './AccommodationOverview.css'

function AccommodationOverview({ destinationID, selectedAccommodation, setSelectedAccommodation }) {

    const [accommodations, setAccommodations] = useState([]);

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const response = await fetch(`http://localhost:8080/accommodations/${destinationID}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setAccommodations(data);
            } catch (error) {
                console.log('Error fetching accommodations:', error);
            }
        };

        fetchAccommodations();
    }, [destinationID]);

    const handleButtonClick = (accommodation) => {
        console.log(accommodation);
        setSelectedAccommodation((prevSelectedAccommodation) => {
            if (prevSelectedAccommodation === accommodation) {
                return null;
            } else {
                return accommodation;
            }
        });
    };

    return (
        <div className='accommodation-overview'>
            <h2 className='title'>Available Accommodations <i class="fas fa-bed"></i> :</h2>
            <div className='accommodation-list'>
                {accommodations.map((accommodation) => (
                    <div className='accommodation-item' key={accommodation.accommodationID}>
                        <h4>{accommodation.name}</h4>
                        <p>Address: {accommodation.address}</p>
                        <p>{accommodation.description}</p>
                        <p>Price per night: {accommodation.pricePerNight}</p>
                        <button
                            className={`selection-button ${selectedAccommodation === accommodation ? 'selected' : ''}`}
                            onClick={() => handleButtonClick(accommodation)}
                        >
                            {'\u2713'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AccommodationOverview