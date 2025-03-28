import React from 'react';

const AlertMessage = ({ message, type }) => {
  if (!message) return null; // Don't render if there's no message

  const alertStyle = {
    position: 'absolute',
    top: '5rem',
    left: '55%',
    width: '40%',
    transform: 'translateX(-50%)',
    boxShadow: '0 0 10px rgb(0, 0, 0, 0.2)',
    padding: '10px',
    borderRadius: '5px',
    zIndex: 1000,
  };

  const successStyle = {
    ...alertStyle,
    backgroundColor: 'rgb(167, 194, 197, 0.8)',
    color: 'rgb(8, 122, 63)',
  };

  const errorStyle = {
    ...alertStyle,
    backgroundColor: 'rgba(221, 80, 80, 0.4)',
    color: 'red',
  };

  return (
    <div style={type === 'error' ? errorStyle : successStyle}>
      {message}
    </div>
  );
};

export default AlertMessage;
