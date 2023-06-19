import React, { useEffect, useState } from 'react'
import './TravelPlanCard.css'
import Activities from './Activities';


function TravelPlanCard({ destinationID, selectedPlan, setSelectedPlan, selectedActivities, setSelectedActivities }) {

    const [travelPlans, setTravelPlans] = useState([]);
    const [planChange, setPlanChange] = useState(0);

    useEffect(() => {
        const fetchTravelPlans = async () => {
            try {
                const response = await fetch(`http://localhost:8080/travel-plans/${destinationID}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
                });
                const data = await response.json();
                setTravelPlans(data);
            } catch (error) {
                console.log('Error fetching travel plans:', error);
            }
        };
        fetchTravelPlans();
    }, [destinationID]);

    const handleClick = (plan) => {
        if (plan.numberOfSeats !== 0) {
            setSelectedPlan(plan);
            setPlanChange(prevChange => prevChange + 1);
            console.log(plan);
        }
    };

    useEffect(() => {
        if (selectedPlan) {
            setSelectedActivities([]);
            setPlanChange(prevChange => prevChange + 1);
        }
    }, [selectedPlan]);

    return (
        <div>
            <h2 className="title">Choose your Travel Plan <i class="fas fa-map"></i> :</h2>
            <div className="travel-plan-container">
                <div className="plan-container">
                    {travelPlans.map((plan) => {
                        const arrivalDate = new Date(plan.arrivalDate);
                        const year = arrivalDate.getFullYear();
                        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][arrivalDate.getDay()];
                        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][arrivalDate.getMonth()];
                        const dayOfMonth = arrivalDate.getDate();
                        return (
                            <div className="plan-card" key={plan.travelplanID} onClick={() => handleClick(plan)}>
                                <div className="plan-info">
                                    <p className="year">{year}</p>
                                    <p className="day">{dayOfWeek}</p>
                                    <p className="month">{month}</p>
                                    <p className="number">{dayOfMonth}</p>
                                    <p className='price'>Price: {plan.price}€</p>
                                    {plan.numberOfSeats === 0 && (
                                        <div className="sold-out-overlay">
                                            <p>SOLD OUT</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {selectedPlan && selectedPlan.numberOfSeats !== 0 &&
                <Activities
                    travelPlan={selectedPlan}
                    selectedActivities={selectedActivities}
                    setSelectedActivities={setSelectedActivities}
                    key={planChange}
                />}
        </div>
    );

}

export default TravelPlanCard