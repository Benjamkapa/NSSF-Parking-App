import React, { useState } from 'react';
import axios from 'axios';
import './Input.css';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';

const ParkingService = () => {
  const [payment_method, setpayment_method] = useState('mpesa');
  const [reg_no, setRegNo] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation: Ensure required fields are filled
    if (!reg_no || !amount || (payment_method === 'mpesa' && !phone)) {
      alert('Please fill out all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare the data to be sent to the endpoint
      const paymentData = {
        reg_no,
        phone: payment_method === 'mpesa' ? phone : null, // Only include phone if payment_method is M-Pesa
        amount,
        payment_method,
      };

      // Define the URL for both M-Pesa and cash payments
      const url = 'https://nssf2.tililtechnologies.com/initiate_parking_payment';

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
        alert('Payment initiation failed!');
      } else {
        if (payment_method === 'mpesa') {
          alert('STK Push to phone Successful!');
        } else {
          alert('Cash payment recorded successfully');
        }
      }

    } catch (error) {
      console.error('Error during payment:', error);
      alert('Error during payment');
    } finally {
      // Reset form fields
      setRegNo('');
      setPhone('');
      setAmount('');
      setpayment_method('mpesa');
      setIsSubmitting(false);
    }
  };

  const buttonText = isSubmitting
    ? 'Sending...'
    : payment_method === 'mpesa'
    ? 'Send M-Pesa Prompt'
    : 'Record Cash Payment';

  return (
    <div>
      <div className="p-6 max-w-3xl mx-auto">
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
          <FaChevronLeft style={{ fontSize: '1rem' }} />
        </Link>
        <h1 className="text-2xl font-bold mb-4">Parking</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
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
            <br />
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
            <br />
            {/* Submit Button */}
            <tr>
              <td>
                <button type="submit" className={isSubmitting ? 'loading' : ''} disabled={isSubmitting}>
                  {isSubmitting ? <span className="loading-dots"><span>.</span><span>.</span><span>.</span></span> : buttonText}
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