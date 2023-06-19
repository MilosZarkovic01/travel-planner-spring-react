import React, { useEffect, useState } from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {

    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        getAllDestinations();
    }, []);

    function getAllDestinations() {
        fetch('http://localhost:8080/destinations', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setDestinations(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    return (
        <div className='cards'>
            <h1>Check out these EPIC Destinations!</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        {destinations.map((destination) => (
                            <CardItem
                                key = {destination.destinationID}
                                path={`/destinations/${destination.destinationID}`}
                                name={destination.name}
                                description={destination.description}
                                city={destination.city}
                                country={destination.country}
                                destinationID={destination.destinationID}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards;