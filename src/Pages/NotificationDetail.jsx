import React from "react";

const Notification = () => {
  const location = useLocation();
  const notifications = location.state?.notifications || []; // Get notifications from location state

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <Link
            key={index}
            to="/notification-detail"
            state={{ notification }} // Pass the selected notification to the detail page
            className="notification-item mb-4 p-4 border rounded shadow block hover:bg-gray-100"
          >
            <strong>{notification.message}</strong>
            <span className="notification-time block text-gray-500">
              {new Date(notification.timestamp).toLocaleString()}
            </span>
          </Link>
        ))
      ) : (
        <div className="notification-empty text-center">No notifications available</div>
      )}
    </div>
  );
};

export default Notification;