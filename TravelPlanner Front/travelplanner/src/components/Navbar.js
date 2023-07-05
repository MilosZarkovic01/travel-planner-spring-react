import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [localTime, setLocalTime] = useState('');


    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const role = sessionStorage.getItem('role');

    const fetchLocalTime = async () => {
        try {
            const response = await fetch(`https://worldtimeapi.org/api/timezone/Europe/Belgrade`, {
                method: 'GET'
            });
            const data = await response.json();
            const time = data.datetime.slice(11, 16);
            setLocalTime(time);
        } catch (error) {
            console.log('Error fetching travel plans:', error);
        }
    };



    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        fetchLocalTime();
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        TravelPLANNER
                        <i class='fas fa-globe-africa fa-spin'></i>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/destinations' className='nav-links' onClick={closeMobileMenu}>
                                Destinations
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/my-profil' className='nav-links' onClick={closeMobileMenu}>
                                My Profil
                            </Link>
                        </li>
                        {role === 'ADMIN' && ( // Provera role za prikazivanje novog list item-a
                            <li className='nav-item'>
                                <Link to='/all-reservations' className='nav-links' onClick={closeMobileMenu}>
                                    All reservations
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                    <div className='local-time'>{localTime} Belgrade</div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;