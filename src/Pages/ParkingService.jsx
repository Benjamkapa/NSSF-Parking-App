import React, { useState } from 'react';
import axios from 'axios';
import './Input.css';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaBackwardFast, FaBrave, FaChevronDown, FaChevronLeft, FaChevronUp, FaCircleLeft, FaGofore, FaLeftLong, FaLeftRight } from 'react-icons/fa6';

const ParkingService = () => {
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [reg_no, setRegNo] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation: Ensure required fields are filled
    if (!reg_no || !amount || (paymentMethod === 'mpesa' && !phone)) {
      alert('Please fill out all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      if (paymentMethod === 'mpesa') {
        // Call the API for M-Pesa payment
        const response = await axios.post(
          'https://nssf2.tililtechnologies.com/initiate_parking_payment',
          {
            phone,
            reg_no,
            amount,
          },
          {
            headers: {
              "Content-Type": "application/json"
            },
          }
        );

        if (response.data.status === 'fail') {
          alert('Payment initiation failed!');
        } else {
          alert(`M-Pesa payment prompt sent to phone.`);
        }
      } else {
        // Handle cash payment scenario
        alert(`Cash payment recorded Successfully`);
      }
    } catch (error) {
      console.error('Error during payment:', error);
      alert(
        'An error occurred while processing your payment. Please try again.'
      );
    }

    // Reset form fields
    setRegNo('');
    setPhone('');
    setAmount('');
    setPaymentMethod('mpesa');
    setIsSubmitting(false);
  };

  const buttonText = isSubmitting
    ? 'Sending...'
    : paymentMethod === 'mpesa'
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
      <h1 className="text-2xl font-bold mb-4">Parking</h1>
      <form onSubmit={handleSubmit} autoComplete='off'>
      <table>
          {/* Payment Method Selection */}
          <tr>
            <td>
              <div className="radio-group">
                <input
                  type="radio"
                  id="mpesa"
                  name="paymentMethod"
                  value="mpesa"
                  checked={paymentMethod === 'mpesa'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="mpesa">M-Pesa</label>
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="cash">Cash</label>
              </div>
            </td>
          </tr>
          <br />
          {/* Vehicle Registration Number */}
          <tr>
            <td>
              <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
                <i 
                  className="fas fa-car" 
                  style={{
                    position: "absolute",
                    padding: "1.2rem",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#888",
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
                    paddingLeft: "60px", // Space for the icon
                    width: "100%",
                    height: "30px",
                    borderRadius: "10rem",
                    border: "1px solid #000",
                  }}
                />
              </div>
            </td>
          </tr>


          {/* Phone Number for M-Pesa */}
          {paymentMethod === 'mpesa' && (
           <tr>
           <td>
             <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
               <i 
                 className="fas fa-phone-alt" 
                 style={{
                   position: "absolute",
                   padding: "1.2rem",
                   top: "50%",
                   left: "10px",
                   transform: "translateY(-50%)",
                   color: "#888",
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
                   width: "100%",
                   paddingLeft: "60px", // Space for the icon
                   height: "30px",
                   borderRadius: "10rem",
                   border: "1px solid #000",
                 }}
               />
             </div>
           </td>
         </tr>
         
          )}

          {/* Amount */}
          <tr>
        <td>
       <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
        <i 
        className="fas fa-money-bill-wave" 
        style={{
          position: "absolute",
          padding: "1.2rem",
          top: "50%",
          left:"10px",
          transform: "translateY(-50%)",
          color: "#888",
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
          paddingLeft: "60px", // Space for the icon
          width: "100%",
          height: "30px",
          borderRadius: "10rem",
          border: "1px solid #000",
              }}
            />
          </div>
        </td>
      </tr>

      <br />
          {/* Submit Button */}
          <tr>
            <td>
              <button type="submit" disabled={isSubmitting}>
                {buttonText}
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