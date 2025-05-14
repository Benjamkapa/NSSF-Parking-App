import React, { useState, useEffect, lazy, Suspense } from 'react';
import './Home.css';
import 'react-datepicker/dist/react-datepicker.css';

// Lazy load ChartComponent
const ChartComponent = lazy(() => import('./ChartComponent'));

// Helper function to aggregate vehicle counts by 30-minute intervals for the last 180 minutes
const aggregateVehicleCountsByInterval = (transactions) => {
  const now = new Date();
  const roundedMinutes = now.getMinutes() < 30 ? 0 : 30;
  const baseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), roundedMinutes, 0, 0);

  const intervals = 6;
  const countsByInterval = Array(intervals).fill(0);

  transactions.forEach((tx) => {
    const timestamp = tx.updatedAt || tx.createdAt;
    if (!timestamp) return;

    const dateObj = new Date(timestamp);
    const diffMs = baseTime - dateObj;
    const diffMinutes = diffMs / (1000 * 60);

    if (diffMinutes >= 0 && diffMinutes <= 180) {
      const intervalIndex = Math.floor(diffMinutes / 30);
      if (intervalIndex < intervals) {
        countsByInterval[intervals - 1 - intervalIndex] += 1;
      }
    }
  });

  const labels = [];
  for (let i = intervals - 1; i >= 0; i--) {
    const labelDate = new Date(baseTime.getTime() - i * 30 * 60 * 1000);
    const hours = labelDate.getHours().toString().padStart(2, '0');
    const minutes = labelDate.getMinutes().toString().padStart(2, '0');
    labels.push(`${hours}:${minutes}`);
  }

  return countsByInterval.map((count, idx) => ({
    interval: labels[idx],
    count,
  }));
};


  

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // 👈 Grand total

  
useEffect(() => {
    const fetchAllAndSumPayments = async () => {
      let page = 1;
      let total = 0;
      let done = false;
      const limit = 100; // adjust if server supports more

      try {
        while (!done) {
          const res = await fetch(`https://monitor.tililtech.com/api/v1/nssf/payments?page=${page}&limit=${limit}`);
          if (!res.ok) throw new Error("Failed to fetch page " + page);
          const data = await res.json();

          const pageSum = data.payments.reduce((acc, item) => {
            const amt = parseFloat(item.amount);
            return acc + (isNaN(amt) ? 0 : amt);
          }, 0);

          total += pageSum;
          if (page >= data.totalPages) {
            done = true;
          } else {
            page++;
          }
        }

        setTotalAmount(total);
      } catch (err) {
        console.error("Error calculating totalAmount:", err);
      }
    };

    fetchAllAndSumPayments();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('https://monitor.tililtech.com/api/v1/nssf/payments?limit=1000', {
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTransactions(data.payments || []);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();

    // Add auto-refresh every 10 seconds
    const intervalId = setInterval(() => {
      fetchTransactions();
    }, 20000); // 20 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      const aggregatedData = aggregateVehicleCountsByInterval(transactions);
      setChartData(aggregatedData);
    } else {
      setChartData([]);
    }
  }, [transactions]);

  return (
    <div className="home-container">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="tab-grid">
        <ul className="bottomtab">
          <li>
            <a href="/parking-service">
              <div className="tab parking-service">
                <div className="tab-link">
                  <i className="fas fa-parking"></i>
                  <span>Pay Parking</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="/payments">
              <div className="tab payment-transaction">
                <div className="tab-link">
                  <i className="fas fa-credit-card"></i>
                  <span>Payment</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div
        className="line-graph-section"
        style={{
          marginTop: '50px',
          maxWidth: '650px',
          marginLeft: 'auto',
          marginRight: 'auto',
          background: 'rgba(167, 194, 197, 0.2)',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 5px 6px rgba(181, 201, 203, 0.7)',
        }}
      >
        <h3 style={{ marginBottom: '16px' }}>Exiting Vehicles Rate</h3>
        <Suspense fallback={<div>Loading chart...</div>}>
          <ChartComponent data={chartData} />
        </Suspense>
      </div>
        <div>
          <p><strong>Total Amount: Ksh. {totalAmount.toLocaleString()}</strong></p>
        </div>
    </div>
  );
};

export default Home;
