import React from 'react';
import './ReservationPopUp.css';

function ReservationPopUp({ selectedAccommodation, selectedActivities, selectedPlan, onClose, onConfirm, setTotalPrice }) {

    const arrivalDate = new Date(selectedPlan ? selectedPlan.arrivalDate : null);
    const departureDate = new Date(selectedPlan ? selectedPlan.departureDate : null);


    const calculateNumberOfDays = (arrivalDate, departureDate) => {
        const oneDay = 24 * 60 * 60 * 1000; // Number of miliseconds in one day
        const start = new Date(arrivalDate);
        const end = new Date(departureDate);
        const numberOfDays = Math.round(Math.abs((end - start) / oneDay));
        return numberOfDays;
    };


    const calculateTotalAmount = () => {
        const travelPlanPrice = selectedPlan ? selectedPlan.price : 0;
        const accommodationPrice = selectedAccommodation ? selectedAccommodation.pricePerNight * calculateNumberOfDays(selectedPlan.arrivalDate, selectedPlan.departureDate) : 0;
        const activitiesPrice = selectedActivities.reduce((total, activity) => total + activity.price, 0);
        setTotalPrice(travelPlanPrice + accommodationPrice + activitiesPrice);
        return travelPlanPrice + accommodationPrice + activitiesPrice;
    };

    const renderActivities = () => {
        if (selectedActivities.length === 0) {
            return <p className="no-activities">None</p>;
        }
        return (
            <ul className="activity-list">
                {selectedActivities.map((activity) => (
                    <li key={activity.id} className="activity">
                        <span className="activity-name">{activity.name}</span>
                        <span className="activity-price">({activity.price}€)</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="overlay" >
            <div className="reservation-popup">
                <div className="reservation-header">
                    <h3 className="confirmation-title">Confirmation</h3>
                    <p className="date">
                        <span className="bold-text">From:</span> {arrivalDate.toLocaleDateString()}{' '}
                        <span className="bold-text">To:</span> {departureDate.toLocaleDateString()}
                    </p>
                </div>
                <div className="reservation-body">
                    <div className="reservation-section">
                        <h4 className="section-title">Travel Plan:&nbsp;{selectedPlan.price}€</h4>
                    </div>
                    <div className="reservation-section">
                        <h4 className="section-title">Activities:</h4>
                        {renderActivities()}
                    </div>
                    <div className="reservation-section">
                        <h4 className="section-title">Accommodation:</h4>
                        <p className="accommodation">
                            {selectedAccommodation?.name}, {calculateNumberOfDays(arrivalDate, departureDate)} nights (
                            {selectedAccommodation?.pricePerNight}€ per night)
                        </p>
                    </div>
                    <div className="reservation-section">
                        <h4 className="section-title">Total Amount: {calculateTotalAmount()}€</h4>
                    </div>
                </div>
                <div className="reservation-footer">
                    <button className="btn btn-success confirm-button" onClick={onConfirm}>
                        Confirm
                    </button>
                    <button className="btn btn-danger cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div >
    );
}

export default ReservationPopUp;
