import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const PaymentChart = ({ cashPayments, mpesaPayments }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Cash', 'M-Pesa'],
        datasets: [
          {
            label: 'Payments',
            data: [cashPayments, mpesaPayments],
            backgroundColor: ['#FF6384', '#36A2EB'],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [cashPayments, mpesaPayments]);

  return <canvas ref={chartRef} />;
};

export default PaymentChart;