import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import darkLogo from "../assets/dark.png"; // Adjust path if necessary
import { FaBell } from "react-icons/fa";
import "./Layout.css"; // Import the CSS file

const Layout = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const notificationSoundRef = useRef(null);
  const dropdownRef = useRef(null);

  const addNotification = (data) => {
    const { message, reg_no, phone, amount } = data;

    // Add a timestamp to the notification
    const newNotification = {
      message,
      reg_no,
      phone,
      amount,
      timestamp: new Date().toISOString(), // Add current timestamp
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setNotificationCount((prev) => prev + 1);

    // Play sound for new notification
    if (notificationSoundRef.current) {
      notificationSoundRef.current
        .play()
        .catch((error) => console.error("Error playing notification sound:", error));
    }
  };

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:9823/events");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        addNotification(data);
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("Error with SSE connection:", error);
      eventSource.close();
      setTimeout(connectSSE, 5000);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleNotificationClick = () => {
    if (notificationCount > 0) setNotificationCount(0); // Reset count when opened
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowNotificationDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="layout-container">
      <audio ref={notificationSoundRef} src="/Notification.mp3" preload="auto" />

      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src={darkLogo} alt="NSSF Logo" className="logo" />
          </Link>
        </div>

        <div className="header-right">
          <div className="notification-container">
            <FaBell
              className="notification-icon"
              title="Notifications"
              onClick={handleNotificationClick}
            />
            {notificationCount > 0 && (
              <span className="notification-badge">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}

            {showNotificationDropdown && (
              <div className="notification-dropdown" ref={dropdownRef}>
                <div className="notification-list">
                  {notifications.length > 0 ? (
                    notifications.slice(0, 4).map((notification, index) => (
                      <div key={index} className="notification-item">
                        <strong>
                          {notification.reg_no} Ksh. {notification.amount}
                        </strong>
                        <span className="notification-time">
                          {new Date(notification.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="notification-empty">No notifications</div>
                  )}
                </div>
                {notifications.length > 4 && (
                  <div className="notification-footer">
                    <Link 
                      to="/payments" 
                      className="see-more-link" 
                      state={{ notifications }}
                    >
                      See More
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">&copy;2025 National Social Security Fund</footer>
    </div>
  );
};

export default Layout;
