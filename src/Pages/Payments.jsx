import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaPrint, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoSearch, GoArrowLeft } from "react-icons/go";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Payments.css";

const Payments = () => {
  const [transactions, setTransactionData] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [pageSize, setPageSize] = useState(20);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const tableRef = useRef();

  const fetchTransactions = useCallback(() => {
    setLoading(true);

    let url = `https://monitor.tililtech.com/api/v1/nssf/payments?search=${searchQuery}&order=${sorting}&orderBy=${orderBy}&page=${currentPage}&limit=${pageSize}`;
    if (startDate && endDate) {
      url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Network error");
        return response.json();
      })
      .then((data) => {
        setTransactionData(data.payments);
        setTotalTransactions(data.total);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      });
  }, [searchQuery, sorting, orderBy, currentPage, pageSize, startDate, endDate]);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedFetchTransactions = useCallback(debounce(fetchTransactions, 300), [fetchTransactions]);

  useEffect(() => {
    debouncedFetchTransactions();
  }, [debouncedFetchTransactions]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    else if (sortConfig.key === key && sortConfig.direction === "desc") direction = "asc";

    setSortConfig({ key, direction });
    setSorting(direction);
    setOrderBy(key);
  };

  const renderSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";
    return `${phoneNumber.slice(0, 4)}****${phoneNumber.slice(-3)}`;
  };

  const handleAfterPrint = () => {
    window.location.reload();
  };

  useEffect(() => {
    window.onafterprint = handleAfterPrint;
    return () => {
      window.onafterprint = null;
    };
  }, []);

  const handlePrint = () => {
    const printContents = tableRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const handleStartDateChange = (date) => {
    if (endDate && date > endDate) {
      alert("Start date cannot be after end date");
      return;
    }
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    if (startDate && date < startDate) {
      alert("End date cannot be before start date");
      return;
    }
    setEndDate(date);
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

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="tableBody">
      <Link to="/" className="back-icon" title="Home"
        style={{
          padding: "0.6rem",
          color: "#000",
          borderRadius: "50%",
          float: "left",
          cursor: "pointer",
          display: "inline-flex",
        }}>
        <GoArrowLeft style={{ fontSize: "1rem" }} />
      </Link>

      <h2 style={{ color: '#000' }}>Payments</h2>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "10px" }}>
        <div className="filterUtil" style={{ position: "relative", maxWidth: "200px", display: "flex", gap: "5px" }}>
          <GoSearch size={17} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#444" }} />
          <div className="searcher">
            <input
              type="text"
              placeholder="Looking for..."
              title="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ backgroundColor: '#ccc', padding: "8px 35px", width: "100%", borderRadius: "50px", border: "none" }}
            />
          </div>
        </div>
      </div>

      <div className="listingP">
        Show
        <select
          style={{ borderRadius: '5px', backgroundColor: "transparent", color: "#000" }}
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        Entries
      </div>

      <div className="printUtil" style={{ textAlign: "right" }}>
        <button onClick={handlePrint} style={{ padding: "2px 8px", paddingLeft: "15px", paddingRight: "5px", fontSize: "1rem", borderRadius: "9px", cursor: "pointer" }}>
          <FaPrint style={{ marginRight: "10px", color: "#000" }} />
        </button>
      </div>

      {loading ? (
        <Skeleton count={20} height={40} />
      ) : (
        <div ref={tableRef} style={{ marginTop: "1vh", overflowX: "auto", border: "1px solid #4F7200", borderRadius: "5px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#0F7A41" }}>
              <tr>
                <th style={tableHeaderStyle}>Type</th>
                <th style={tableHeaderStyle}>M-Pesa Ref</th>
                <th style={tableHeaderStyle}>Amount</th>
                <th style={tableHeaderStyle}>Phone Number</th>
                <th style={tableHeaderStyle}>Number Plate</th>
                <th style={tableHeaderStyle} onClick={() => handleSort("createdAt")}>
                  Time{renderSortIndicator("createdAt")}
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={index} className={`text-center ${index % 2 === 0 ? 'bg-alternate' : ''}`}>
                    <td style={tableCellStyle}>{transaction.mpesa_ref ? "M-Pesa" : "Cash"}</td>
                    <td style={tableCellStyle}>{transaction.mpesa_ref || "N/A"}</td>
                    <td style={tableCellStyle}>{`Ksh. ${transaction.amount}`}</td>
                    <td style={tableCellStyle}>{transaction.phone_number ? formatPhoneNumber(transaction.phone_number) : "N/A"}</td>
                    <td style={tableCellStyle}>{transaction.number_plate?.toUpperCase()}</td>
                    <td style={tableCellStyle}>{formatDate(transaction.updatedAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: "10px", textAlign: "center" }}>No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="pagination-controls">
        <button
          style={{ borderRadius: "2vh", height: "2.2em" }}
          className="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          style={{ borderRadius: "2vh", height: "2.2em" }}
          className="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Payments;
