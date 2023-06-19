import React, { useState } from 'react'
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
        sessionStorage.setItem(`${name}`,`${value}`);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/users/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (!response.ok) {
                    toast.error('Failed')
                    throw new Error('Update failed');
                } else {
                    toast.success('Success')
                    return response.text();
                }
            }).then(message => {
                console.log(message);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
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
            <Footer />
        </>
    );
}

export default MyProfile;
