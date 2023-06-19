import React, { useState } from 'react'
import './Activities.css'

const Activities = ({ travelPlan, selectedActivities, setSelectedActivities }) => {

    const [sortedActivities, setSortedActivities] = useState([...travelPlan.activities]);
    const [showItems, setShowItems] = useState(false);

    const handleActivitySelection = (activity) => {
        if (selectedActivities.includes(activity)) {
            setSelectedActivities(selectedActivities.filter((selectedActivity) => selectedActivity !== activity));
        } else {
            setSelectedActivities([...selectedActivities, activity]);
        }
    };

    const handleSort = (option) => {
        let sorted;
        if (option === 'lowest') {
            sorted = [...sortedActivities].sort((a, b) => a.price - b.price);
        } else if (option === 'highest') {
            sorted = [...sortedActivities].sort((a, b) => b.price - a.price);
        } else {
            sorted = [...travelPlan.activities];
        }
        setSortedActivities(sorted);
    };

    return (
        <div className="activity-container">
            <h3>Select your Activities:</h3>
            <ul>
                {sortedActivities.map((activity, index) => (
                    <li className="activity-item" key={index}>
                        <div className='activity-info'>
                            <div className="activity-header">
                                <p className="activity-name">{activity.name}</p>
                                <p className="activity-price">({activity.price}€)</p>
                            </div>
                            <p className="activity-description">Desc: {activity.description}</p>
                        </div>
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={selectedActivities.includes(activity)}
                                onChange={() => handleActivitySelection(activity)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <div className="sort-container">
                <div className="dropdown">
                    <button
                        className="btn btn-primary sort-button"
                        type="button"
                        onClick={() => setShowItems(!showItems)}
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Sort by price
                    </button>
                    <ul className={`dropdown-menu ${showItems ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                        <li>
                            <button className="dropdown-item" onClick={() => handleSort('lowest')}>
                                Lowest first
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => handleSort('highest')}>
                                Highest first
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Activities;
