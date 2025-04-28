// src/components/ChartComponent.jsx
import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const ChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data.length > 0 ? data : [{ interval: '00:00', count: 0 }]} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="gradientTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(1, 122, 58)" stopOpacity={1} />
            <stop offset="100%" stopColor="rgb(1, 122, 58)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="interval" label={{ position: 'insideBottomRight', offset: -5 }} />
        <YAxis label={{ value: 'Vehicle(s)', angle: -90, position: 'insideLeft' }} allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="count"
          stroke="transparent"
          fill="url(#gradientTop)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
