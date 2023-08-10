import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import Footer from './Footer';
import './Destinations.css';

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchDestinations();
  }, [currentPage]);

  useEffect(() => {
    fetch('http://localhost:8080/destinations/totalPages', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
    })
      .then(response => response.json())
      .then(data => {
        setTotalPages(data);
      });
  }, []);

  const fetchDestinations = () => {
    fetch(`http://localhost:8080/destinations/page?page=${currentPage}&size=6`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
    })
      .then(response => response.json())
      .then(data => {
        setDestinations(data.content);
      });
  };

  const handleSearchRequest = () => {
    fetch(`http://localhost:8080/destinations/search?query=${searchTerm}&page=${currentPage}&size=6`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 204) {
          return []; // Empty array for no content
        } else if (response.ok) {
          return response.json();
        } else {
          throw new Error('An error occurred during search.');
        }
      })
      .then(data => {
        if (Array.isArray(data) && data.length === 0) {
          toast.info('No matches found.', {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
          });
        } else {
          setDestinations(data.content);
          setTotalPages(data.totalPages);
        }
      })
      .catch(error => {
        console.error('Error searching destinations:', error);
        toast.error('An error occurred while searching. Please try again.', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      });
  };
  
  
  
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

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
                onClick={handleSearchRequest}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {destinations.map(destination => (
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
        <div className="pagination-container">
          <button
            className="btn btn-secondary"
            disabled={currentPage === 0}
            onClick={handlePreviousPage}
          >
            Previous
          </button>
          <div className="pagination-pages">
            <span className="pagination-current">Page {currentPage + 1}</span>
            <span className="pagination-total">of {totalPages}</span>
          </div>
          <button
            className="btn btn-secondary"
            disabled={currentPage === totalPages - 1}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default Destinations;
