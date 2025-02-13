import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFilter, FaPrint, FaChevronLeft } from "react-icons/fa";

const Vehicle = () => {
  // State to hold vehicle data fetched from the API
  const [vehicleData, setVehicleData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const tableRef = useRef();

  // Fetch vehicle data from the API endpoint on component mount
  useEffect(() => {
    fetch("https://your-api.com/vehicles")
      .then((response) => response.json())
      .then((data) => {
        setVehicleData(data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
      });
  }, []);

  // Filter data based on search query
  const filteredVehicles = vehicleData
    .filter(
      (vehicle) =>
        vehicle.numberPlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.phoneNumber.includes(searchQuery) ||
        vehicle.servedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.key) {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (sortConfig.direction === "ascending") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      }
      return 0;
    });

  const handlePrint = () => {
    const printContents = tableRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const renderSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? " 🔼" : " 🔽";
  };

  return (
    <div className="tableBody">
      <Link 
        to="/" 
        className="back-icon" 
        title="Home" 
        style={{
          padding: "0.6rem",
          color: "#000",
          borderRadius: "50%",
          float: "left",
          cursor: "pointer",
          display: "inline-flex",
        }}
      >
        <FaChevronLeft style={{ fontSize: "1rem", borderRadius:"50%" }} /> 
      </Link>
      
      <h2>Vehicles</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Filter Input with Icon */}
        <div className="filterUtil" style={{ position: "relative", width: "40%", maxWidth: "400px" }}>
          <FaFilter
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#555",
            }}
          />
          <input
            type="text"
            placeholder="Filter Here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              float: "left",
              padding: "7px 30px",
              fontSize: "1rem",
              width: "60%",
              borderRadius: "5px",
              border: "1px solid #000",
            }}
          />
        </div>
      
        {/* Print Button */}
        <div className="printUtil">
          <FaPrint style={{ marginRight: "10px", color: "#888" }} />
          <button
            onClick={handlePrint}
            style={{
              padding: "10px 20px",
              color: "#000",
              outline: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Print
          </button>
        </div>
      </div>

      {/* Scrollable Table Wrapper */}
      <div
        ref={tableRef}
        style={{
          overflowX: "auto",
          border: "1px solid #4F7200",
          borderRadius: "5px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ backgroundColor: "#0F7A41" }}>
            <tr>
              <th style={tableHeaderStyle} onClick={() => handleSort("numberPlate")}>
                Number Plate{renderSortIndicator("numberPlate")}
              </th>
              {/* Additional headers can be added similarly */}
              <th style={tableHeaderStyle} onClick={() => handleSort("timeIn")}>
                Time{renderSortIndicator("timeIn")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>{vehicle.numberPlate}</td>
                  <td style={tableCellStyle}>{vehicle.timeIn}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ padding: "10px", textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  padding: "10px",
  borderBottom: "2px solid #ddd",
  color: "#fff",
  cursor: "pointer",
};

const tableCellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

export default Vehicle;