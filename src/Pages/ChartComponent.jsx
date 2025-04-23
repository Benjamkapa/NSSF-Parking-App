// src/components/ChartComponent.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const ChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data.length > 0 ? data : [{ interval: '00:00', count: 0 }]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="interval" label={{ position: 'insideBottomRight', offset: -5 }} />
        <YAxis label={{ value: 'Vehicle', angle: -90, position: 'insideLeft' }} allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="rgb(1,123,59)" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
