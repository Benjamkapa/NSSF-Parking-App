import React, { useState } from "react";
import { FaFilter, FaPrint } from "react-icons/fa"; // Importing filter and print icons from react-icons

// Sample data for the table
const usersData = [
  { name: "John Doe", personalNumber: "123-456-789" },
  { name: "Jane Smith", personalNumber: "987-654-321" },
];

const AccountInformation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

  // Filter users based on the search query
  const filteredUsers = usersData
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.personalNumber.includes(searchQuery)
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
    const printContents = document.getElementById("accountTable").innerHTML;
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
    return sortConfig.direction === "ascending" ? " " : " ";
  };

  return (
    <div style={{marginInline:'10.2rem',maxWidth:"1024px", width:"100%" ,padding: "20px", fontFamily: "Arial, sans-serif", marginLeft:'auto', marginRight:"auto"}}>
      <h2>Account Information</h2>
        <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {/* Filter Input with Icon Inside */}
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
                  float:"left",
                  padding: "7px 30px", // Ensure space for the icon
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
                  border: "none",
                  backgroundColor: "rgba(25, 26, 23, 0.733)",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Print
              </button>
            </div>
          </div>

      {/* Table Section */}
      <div id="accountTable" style={{ overflowX: "auto", border: "1px solid #4F7200", borderRadius: "5px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "rgba(29, 134, 61, 0.726)" }}>
            <tr>
              <th
                style={{
                  padding: "10px",
                  borderBottom: "2px solid #ddd",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("name")}
              >
                Name{renderSortIndicator("name")}
              </th>
              <th
                style={{
                  padding: "10px",
                  borderBottom: "2px solid #ddd",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("personalNumber")}
              >
                Personal Number{renderSortIndicator("personalNumber")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user.name}</td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user.personalNumber}</td>
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

export default AccountInformation;
