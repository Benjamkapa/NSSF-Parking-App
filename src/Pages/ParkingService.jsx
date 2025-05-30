import React, { useState } from 'react';
import AlertMessage from './AlertMessage'; // Import the new AlertMessage component

import axios from 'axios';
import './Input.css';
import { Link } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';

const ParkingService = () => {
  const [payment_method, setpayment_method] = useState('mpesa');
  const [reg_no, setRegNo] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Convert vehicle number plate to uppercase
    const uppercasedRegNo = reg_no.toUpperCase();
  
    // Validation: Ensure required fields are filled
    if (!uppercasedRegNo || !amount || (payment_method === 'mpesa' && !phone)) {
      alert('Please fill out all required fields.');
      setIsSubmitting(false);
      return;
    }
  
    // Validation: Ensure number plate has between 5 and 10 characters
    if (uppercasedRegNo.length < 6 || uppercasedRegNo.length > 8) {
      const alertMessage = 'Number plate must have between 6 and 8 characters';
      const alertElement = document.createElement('div');
      alertElement.textContent = alertMessage;
      alertElement.style.position = 'absolute';
      alertElement.style.top = '5rem';
      alertElement.style.left = '55%';
      alertElement.style.width = '40%';
      alertElement.style.transform = 'translateX(-50%)';
      alertElement.style.boxShadow = '0 0 10px  rgb(0, 0, 0, 0.2)';
      alertElement.style.backgroundColor = 'rgba(221, 80, 80, 0.4)';
      alertElement.style.color = 'red';
      alertElement.style.padding = '10px';
      alertElement.style.borderRadius = '5px';
      document.body.appendChild(alertElement);
  
      setTimeout(() => {
        document.body.removeChild(alertElement);
      }, 4000);
      
  
      setIsSubmitting(false);
      return;
    }
  
    try {
      let paymentData = null;
      // Prepare the data to be sent to the endpoint
      if (payment_method === 'mpesa') {
        paymentData = {
          reg_no: uppercasedRegNo,
          phone,
          amount,
          payment_method,
        };
      } else {
        paymentData = {
          number_plate: uppercasedRegNo,
          amount,
        };
      }
  
      // Define the URL for both M-Pesa and cash payments
      const url = payment_method === 'mpesa' ? 'https://nssf2.tililtechnologies.com/initiate_parking_payment' : 'https://monitor.tililtech.com/api/v1/nssf/record-payment';
  
      // Post data to the endpoint
      const response = await axios.post(
        url,
        paymentData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.status === 'fail') {
        setAlert({ message: 'Payment initiation failed!', type: 'error' });
      } else {
        const successMessage = payment_method === 'mpesa' 
          ? 'STK Push to Phone Initiated Successfully' 
          : 'Cash Payment Recorded Successfully';
        setAlert({ message: successMessage, type: 'success' });
      }

    } catch (error) {
      console.error('Error during payment:', error);
    } finally {
      setRegNo('');
      setPhone('');
      setAmount('');
      setpayment_method('mpesa');
      setIsSubmitting(false);
      setTimeout(() => setAlert({ message: '', type: '' }), 5000); // Clear alert after 5 seconds

    }
  };

  const buttonText = isSubmitting
    ? 'Sending...'
    : payment_method === 'mpesa'
    ? 'Send M-Pesa Prompt'
    : 'Record Cash Payment';

  return (
    <div>
      <div className="Parking-service_bd">
        <Link
          to="/"
          className="back-icon"
          title="Home"
          style={{
            padding: '0.6rem',
            color: '#000',
            borderRadius: '50%',
            marginRight: '40rem',
            cursor: 'pointer',
            display: 'inline-flex',
          }}
        >
          <GoArrowLeft style={{ fontSize: '1rem' }} />
        </Link>
        <h1 className="text-2xl font-bold mb-4">Pay Parking</h1>
        <form onSubmit={handleSubmit} autoComplete="off"> 
          <AlertMessage message={alert.message} type={alert.type} /> {/* Display alert message */}

          <table>
            {/* Payment Method Selection */}
            <tr>
              <td>
                <div className="radio-group">
                  <input
                    type="radio"
                    id="mpesa"
                    name="payment_method"
                    value="mpesa"
                    checked={payment_method === 'mpesa'}
                    onChange={(e) => setpayment_method(e.target.value)}
                  />
                  <label htmlFor="mpesa">M-Pesa</label>
                  <input
                    type="radio"
                    id="cash"
                    name="payment_method"
                    value="cash"
                    checked={payment_method === 'cash'}
                    onChange={(e) => setpayment_method(e.target.value)}
                  />
                  <label htmlFor="cash">Cash</label>
                </div>
              </td>
            </tr>
            {/* Vehicle Registration Number */}
            <tr>
              <td>
                <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                  <i
                    className="fas fa-car"
                    style={{
                      position: 'absolute',
                      padding: '1.2rem',
                      left: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#888',
                    }}
                  ></i>
                  <input
                    type="text"
                    id="reg_no"
                    value={reg_no}
                    onChange={(e) => setRegNo(e.target.value)}
                    placeholder="Vehicle Number Plate"
                    required
                    style={{
                      paddingLeft: '60px',
                      width: '100%',
                      height: '30px',
                      borderRadius: '10rem',
                      border: '1px solid #000',
                    }}
                  />
                </div>
              </td>
            </tr>
            {/* Phone Number for M-Pesa */}
            {payment_method === 'mpesa' && (
              <tr>
                <td>
                  <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                    <i
                      className="fas fa-phone-alt"
                      style={{
                        position: 'absolute',
                        padding: '1.2rem',
                        top: '50%',
                        left: '10px',
                        transform: 'translateY(-50%)',
                        color: '#888',
                      }}
                    ></i>
                    <input
                      type="number"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      required
                      style={{
                        width: '100%',
                        paddingLeft: '60px',
                        height: '30px',
                        borderRadius: '10rem',
                        border: '1px solid #000',
                      }}
                    />
                  </div>
                </td>
              </tr>
            )}
            {/* Amount */}
            <tr>
              <td>
                <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                  <i
                    className="fas fa-money-bill-wave"
                    style={{
                      position: 'absolute',
                      padding: '1.2rem',
                      top: '50%',
                      left: '10px',
                      transform: 'translateY(-50%)',
                      color: '#888',
                    }}
                  ></i>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount in Ksh"
                    required
                    style={{
                      paddingLeft: '60px',
                      width: '100%',
                      height: '30px',
                      borderRadius: '10rem',
                      border: '1px solid #000',
                    }}
                  />
                </div>
              </td>
            </tr>
            {/* Submit Button */}
            <tr>
              <td>
                <button type="submit" className={isSubmitting ? 'loading' : ''} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="loading-indicator">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  ) : (
                    buttonText 
                  )}
                </button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
};

export default ParkingService;
