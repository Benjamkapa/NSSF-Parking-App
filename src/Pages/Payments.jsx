import React, { useState, useRef, useEffect, useCallback } from "react";
import { use } from "react";
import { FaFilter, FaPrint, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Payments = () => {
  // State to hold transaction data fetched from the API
  const [transactions, setTransactionData] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0); // State to hold total number of transactions
  const [totalPages, setTotalPages] = useState(0); // State to hold total number of pages
  const [currentPage, setCurrentPage] = useState(0); // Hold state for the current page
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState("desc"); // asc or desc
  const [orderBy, setOrderBy] = useState("_id");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loading, setLoading] = useState(true); // Loading state
  const tableRef = useRef();
  // console.log(searchQuery);
  // console.log(sorting);
    

  // useEffect(() => {
  //   const meta = document.createElement('meta');
  //   meta.httpEquiv = "Content-Security-Policy";
  //   meta.content = "default-src https: http:; script-src https: http: 'unsafe-inline'; style-src https: http: 'unsafe-inline'; img-src https: http: data:; font-src https: http: data:;";
  //   document.getElementsByTagName('head')[0].appendChild(meta);
  //   setLoading(true); // Set loading to true when fetching starts
  
  //   fetch(`https://monitor.tililtech.com/api/v1/nssf/payments?search=${searchQuery}&order=${sorting}&orderBy=${orderBy}&page=${page}&limit=${pageSize}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // console.log("Payment transactions fetched successfully:", data);
  //       setTransactionData(data.payments);
  //       setTotalTransactions(data.total); // Set total number of transactions
  //       setTotalPages(data.totalPages); // Set total number of pages
  //       setCurrentPage(data.currentPage); // Set the current page data
  //       setLoading(false); // Set loading to false when data is fetched
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching payment transactions:", error);
  //       setLoading(false); // Set loading to false if an error occurs
  //     });
  // }, [searchQuery, sorting, orderBy, page, pageSize]);

  const fetchTransactions = useCallback(() => {
    setLoading(true); // Set loading to true when fetching starts

    fetch(`https://monitor.tililtech.com/api/v1/nssf/payments?search=${searchQuery}&order=${sorting}&orderBy=${orderBy}&page=${page}&limit=${pageSize}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Payment transactions fetched successfully:", data);
        setTransactionData(data.payments);
        setTotalTransactions(data.total); // Set total number of transactions
        setTotalPages(data.totalPages); // Set total number of 
        setTotalTransactions
        setCurrentPage(data.currentPage); // Set the current page data
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching payment transactions:", error);
        setLoading(false); // Set loading to false if an error occurs
      });
  }
  , [searchQuery, sorting, orderBy, page, pageSize]);

  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    }; 
  };

  // Debounce the fetchTransactions function
  const debouncedFetchTransactions = useCallback(debounce(fetchTransactions, 300), [fetchTransactions]);

  useEffect(() => {
    debouncedFetchTransactions();
  }
  , [debouncedFetchTransactions]);

  // Event listener for before and after print
  useEffect(() => {
    const handleBeforePrint = () => {
      const printContents = tableRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    };

    const handleAfterPrint = () => {
      window.location.reload();   
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

    



  // Print function
  const handlePrint = () => {
    const printContents = tableRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    // console.log("Printing...");
  };

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
    setSorting(direction); // Update the sorting state variable
    setOrderBy(key); // Update the orderBy state variable
  };

  const renderSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  // Pagination controls
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1); // Reset to first page
  };

  // Function to format phone number
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";
    return `${phoneNumber.slice(0, 4)}****${phoneNumber.slice(-3)}`;
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
        <FaChevronLeft style={{ fontSize: "1rem", borderRadius: "50%" }} />
      </Link>
      <h2>Payments</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Filter Input with Icon */}
        <div
          className="filterUtil"
          style={{ position: "relative", width: "40%", maxWidth: "400px" }}
        >
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

      {/* Display loading indicator if loading is true */}

      
      <div className="listingP">
        Show 
        <select style={{backgroundColor: "transparent",color: "#000"}}
          value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          {/* <option value={15}>15</option> */}
          <option value={20}>20</option>
          {/* <option value={20}>List All</option> */}
        </select>
        Entries
      </div>

      <br/>
      
      {loading ? (
        <div className="loading-indicator">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      ) : (
        <div ref={tableRef} style={{marginTop: "1vh", overflowX: "auto", border: "1px solid #4F7200", borderRadius: "5px"}}> 
          <table style={{ width: "100%", borderCollapse: "collapse"}}>
            <thead style={{ backgroundColor: "#0F7A41" }}>
              <tr>
                <th style={tableHeaderStyle}>
                  Type
                </th>
                <th style={tableHeaderStyle} >
                  M-Pesa Ref
                </th>
                <th style={tableHeaderStyle}>
                  Amount
                </th>
                <th style={tableHeaderStyle}>
                  Phone Number
                </th>
                <th style={tableHeaderStyle}>
                  Number Plate
                </th>
                <th style={tableHeaderStyle} onClick={() => handleSort("updatedAt")}>
                  Time{renderSortIndicator("updatedAt")}
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions?.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td style={tableCellStyle}>{transaction.mpesa_ref ? "M-Pesa" : "Cash"}</td>
                    <td style={tableCellStyle}>{transaction.mpesa_ref ? transaction.mpesa_ref : "N/A"}</td>
                    <td style={tableCellStyle}>{`Ksh. ${transaction.amount}`}</td>
                    <td style={tableCellStyle}>{transaction.phone_number ? formatPhoneNumber(transaction.phone_number): "N/A"}</td>
                    <td style={tableCellStyle}>{transaction.number_plate}</td>
                    <td style={tableCellStyle}>{formatDate(transaction.updatedAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: "10px", textAlign: "center" }}>
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button style={{borderRadius:'1vh', height:'2.2em'}} className="prev" title="Previous Page" onClick={() => handlePageChange(page - 1)} disabled={currentPage === 1}>
          <FaChevronLeft style={{borderRadius:'50%', padding:'5px'}}/>
        </button>
        <span>Page {currentPage} of {totalPages} Pages</span>
        <button style={{borderRadius:'1vh', height:'2.2em'}} className="next" title="Next Page" onClick={() => handlePageChange(page + 1)} disabled={currentPage === totalPages}>
          <FaChevronRight style={{borderRadius:'50%', padding:'5px'}}/>
        </button>
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

export default Payments;

const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleString("en-GB",{
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}