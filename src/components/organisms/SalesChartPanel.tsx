'use client';
import React, { useState } from 'react';
import useSWR from 'swr';
import ChartSwitcher, { ChartType } from '../molecules/ChartSwitcher';
import Input from '../atoms/Input';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

type SalesData = { year: number; sales: number };

const fetcher = (url: string) => fetch(url).then(res => res.json());

// Fallback mock data
const fallbackData: SalesData[] = [
  { year: 2022, sales: 120000 },
  { year: 2023, sales: 175000 },
  { year: 2024, sales: 210000 },
];

const COLORS = ['#16a34a', '#22d3ee', '#f59e42'];

const SalesChartPanel: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [threshold, setThreshold] = useState<number>(0);

  const { data, error, isLoading } = useSWR('/api/sales', fetcher, { fallbackData });
  const filteredData = ((data as SalesData[]) || fallbackData).filter((d) => d.sales >= threshold);

  let chartElement: React.ReactElement | null = null;
  if (chartType === 'bar') {
    chartElement = (
      <BarChart data={filteredData}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#16a34a" />
      </BarChart>
    );
  } else if (chartType === 'line') {
    chartElement = (
      <LineChart data={filteredData}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#16a34a" strokeWidth={3} />
      </LineChart>
    );
  } else if (chartType === 'pie') {
    chartElement = (
      <PieChart>
        <Pie
          data={filteredData}
          dataKey="sales"
          nameKey="year"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {filteredData.map((entry, idx: number) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Sales Overview (2022-2024)</h2>
      <div className="flex items-center gap-4 mb-4">
        <span className="font-medium">Sales Threshold:</span>
        <Input
          type="number"
          min={0}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          placeholder="Enter minimum sales"
          className="w-40"
        />
      </div>
      <ChartSwitcher chartType={chartType} onChange={setChartType} />
      <div className="h-80">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-lg text-gray-500">Loading sales data...</div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">Failed to load data.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {chartElement}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SalesChartPanel; 