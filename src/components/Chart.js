import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { calculate } from '../utils';

function calculateChartValue(val) {
  let value = val.replaceAll(' ', '').trim();

  const data = new Array(10).fill().map((elem, x) => {
    let _value = value.slice().split('y=')[1]?.replaceAll('x', x);
    _value = _value.replaceAll(`sin(${x})`, String(Math.sin(x)).slice(0, 17));
    _value = _value.replaceAll(`cos(${x})`, String(Math.cos(x)).slice(0, 17));

    const y = calculate(_value);

    return {
      y,
    };
  });

  return data;
}

export function Chart({ value }) {
  const data = calculateChartValue(value);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 40,
          right: 30,
          left: 40,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="y" stroke="#4ac722" />
      </LineChart>
    </ResponsiveContainer>
  );
}
