import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar"
import Footer from './Footer'
import './Destinations.css'
import { Link } from 'react-router-dom';

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/destinations/all', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
    })
      .then(response => response.json())
      .then(data => {
        setDestinations(data);
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredDestinations = destinations.filter(destination => {
    return destination.country.toLowerCase().includes(searchTerm.toLowerCase())
      || destination.city.toLowerCase().includes(searchTerm.toLowerCase())
  });

  return (
    <div>
      <Navbar />
      <div id="destination" className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="search-button"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {filteredDestinations.map(destination => (
            <div className="col-md-4 mb-3" key={destination.destinationID}>
              <div className="card">
                <img
                  src={require(`../images/card${destination.destinationID}.jpg`)}
                  className="card-img-top"
                  alt={destination.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{destination.country}, {destination.city}</h5>
                  <Link to={`/destinations/${destination.destinationID}`} state={destination} className='btn btn-primary'>
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Destinations