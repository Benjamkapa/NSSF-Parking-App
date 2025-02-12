import React from "react";
import { useLocation } from "react-router-dom";
import { FaChevronLeft } from 'react-icons/fa6';
import { Link } from "react-router-dom";

const Notification = () => {
  const location = useLocation();
  const notifications = location.state?.notifications || []; // Get notifications from location state

  return (
    
  <div className="notify">
    <div className="p-6 max-w-3xl mx-auto">
    <Link 
      to="/" 
      className="back-icon" 
      title="Home" 
      style={{
        padding: "0.6rem",
        color:"#000",
        borderRadius: "50%",
        // backgroundColor: "rgb(211, 208, 208)",
        marginRight: "40rem",
        cursor: "pointer",
        display: "inline-flex", // Ensure the link behaves like a button
        // alignItems: "center", // Center the icon vertically
        // justifyContent: "center" // Center the icon horizontally
      }}
    >
      <FaChevronLeft style={{ fontSize: "1rem" }} /> {/* Use FaChevronLeft icon */}
    </Link>
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
            <ul style={{display:'flex', listStyle:'none', justifyContent:'space-around', gap:'4rem', textAlign:'left'}}>
            <li>
            <div key={index} className="notification-item mb-4 p-4 border rounded shadow">
            <strong>{notification.message}</strong> <br />
            <span className="notification-time block text-gray-500">
            </span>
          </div>
            </li>
            <li>
            {new Date(notification.timestamp).toLocaleString()}
            </li>
          </ul>
          
        ))
      ) : (
        <div className="notification-empty text-center">No notifications available</div>
      )}
    </div>
    </div>
  );
};

export default Notification;