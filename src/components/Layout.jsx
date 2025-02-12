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

  const addNotification = (message) => {
    const newNotification = {
      message,
      timestamp: Date.now(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
    setNotificationCount((prev) => prev + 1);

    if (notificationSoundRef.current) {
      notificationSoundRef.current.play().catch((error) => {
        console.error("Error playing notification sound:", error);
      });
    }
  };

  useEffect(() => {
    const eventSource = new EventSource("http://your-server-url/notifications");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      addNotification(data.message);
    };

    eventSource.onerror = (error) => {
      console.error("Error with Server-Sent Events connection:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleNotificationClick = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    setNotificationCount(0);
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
      <audio ref={notificationSoundRef} src="/Notification" preload="auto" />

      <header className="header">
        <div className="logo-container">
          <img src={darkLogo} alt="Logo" className="logo" />
        </div>

        <div className="header-right">
          <div className="notification-container">
            <FaBell
              className="notification-icon"
              title="Notifications"
              onClick={handleNotificationClick}
            />
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}

            {showNotificationDropdown && (
              <div className="notification-dropdown" ref={dropdownRef}>
                <div className="notification-list">
                  {notifications.length > 0 ? (
                    notifications.slice(0, 4).map((notification, index) => (
                      <div key={index} className="notification-item">
                        <strong>{notification.message}</strong>
                        <span className="notification-time">
                          {new Date(notification.timestamp).toLocaleTimeString()}
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
                      to="/notification" 
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