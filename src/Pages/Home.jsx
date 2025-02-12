import React from 'react';
import './Home.css'; // Import custom CSS

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Tab Grid Container */}
      <div className="tab-grid">
        <ul className='toptab'> 
          <li>
            <a href="/parking-service">
              <div className="tab parking-service">
                <div className="tab-link">
                  <i className="fas fa-parking"></i> {/* Parking Icon */}
                  <span>Parking</span>
                </div>
              </div>
            </a> 
          </li>
        </ul>
        <ul className='bottomtab'>
          <li>
            <a href="/vehicles">
              <div className="tab vehicle-details">
                <div className="tab-link">
                  <i className="fas fa-car"></i> {/* Car Icon */}
                  <span>Vehicles</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="/payments">
              <div className="tab payment-transaction">
                <div className="tab-link">
                  <i className="fas fa-credit-card"></i> {/* Credit Card Icon */}
                  <span>Payments</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;