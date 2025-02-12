import React, { useState } from 'react';
import { TEInput, TERipple } from "tw-elements-react";

const InputForm = ({ onSubmit }) => {
  const [numberPlate, setNumberPlate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ numberPlate, phoneNumber, amount });
    setNumberPlate('');
    setPhoneNumber('');
    setAmount('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" >
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-8">Parking Service </h2>
        <form
  style={{
    marginLeft: '20%',
    border: '2px solid green',
    width: '60%',
    borderRadius: '20px',
      minHeight: 'calc(40vh - 50px)', // Adjust based on the desired space
      paddingBottom: '20px', // Adds space between the form and the last content
  }}
  className="space-y-8"
  onSubmit={handleSubmit}
>
          {/* Number Plate */}
          <div className="mb-6" style={{}} >
            <label className="block text-sm font-medium text-gray-700 mb-2"></label><br />
            <input 
              type="text"
              textAlign="center"
              placeholder="Enter Vehicle Number Plate"
              value={numberPlate}
              onChange={(e) => setNumberPlate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2"></label><br />
            <input
              style={{ }} 
              type="text"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2"></label><br />
            <input
              style={{ }} 
              type="number"
              placeholder="Enter amount in Ksh"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{borderRadius:'4px', backgroundColor:'transparent'}}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Send Prompt
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
