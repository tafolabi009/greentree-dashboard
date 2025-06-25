'use client';
import React, { useState } from 'react';
import useSWR from 'swr';
import ChartSwitcher, { ChartType } from '../molecules/ChartSwitcher';
import Input from '../atoms/Input';
import { Bar, Line, Pie as ChartJSPie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement, 
  Tooltip as ChartJSTooltip, 
  Legend as ChartJSLegend,
  Title
} from 'chart.js';
import type { TooltipItem } from 'chart.js';

type SalesData = { year: number; sales: number };

const fetcher = (url: string) => fetch(url).then(res => res.json());

// Fallback mock data - updated to match API
const fallbackData: SalesData[] = [
  { year: 2020, sales: 85000 },
  { year: 2021, sales: 95000 },
  { year: 2022, sales: 120000 },
  { year: 2023, sales: 175000 },
  { year: 2024, sales: 210000 },
  { year: 2025, sales: 185000 },
];

const COLORS = ['#16a34a', '#22d3ee', '#f59e42', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#10b981'];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement, 
  ChartJSTooltip, 
  ChartJSLegend,
  Title
);

const SalesChartPanel: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [threshold, setThreshold] = useState<number>(0);

  const { data, error, isLoading } = useSWR('/api/sales', fetcher, { fallbackData });
  const filteredData = ((data as SalesData[]) || fallbackData).filter((d) => d.sales >= threshold);

  // Common chart data
  const chartData = {
    labels: filteredData.map((d) => `Year ${d.year}`),
    datasets: [
      {
        label: 'Sales',
        data: filteredData.map((d) => d.sales),
        backgroundColor: chartType === 'pie' ? COLORS.slice(0, filteredData.length) : '#16a34a',
        borderColor: chartType === 'line' ? '#16a34a' : '#16a34a',
        borderWidth: chartType === 'line' ? 3 : 0,
        pointBackgroundColor: '#16a34a',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: chartType !== 'pie',
        position: 'top' as const,
        labels: { font: { size: 14 } },
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: TooltipItem<'bar' | 'line' | 'pie'>) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw as number || 0;
            return `${label}: $${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: chartType !== 'pie' ? {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: number | string) {
            return '$' + Number(value).toLocaleString();
          },
        },
      },
    } : undefined,
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'pie':
        return <ChartJSPie data={chartData} options={chartOptions} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-green-700">Sales Overview (2020-2025)</h2>
      
      {/* Mobile-first responsive layout */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <span className="font-medium text-sm sm:text-base">Sales Threshold:</span>
        <Input
          type="number"
          min={0}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          placeholder="Enter minimum sales"
          className="w-full sm:w-40"
        />
      </div>
      
      <ChartSwitcher chartType={chartType} onChange={setChartType} />
      
      {/* Responsive chart container */}
      <div className="h-64 sm:h-80 md:h-96 w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-lg text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mr-3"></div>
            Loading sales data...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">
            <div className="text-center">
              <div className="text-2xl mb-2">⚠️</div>
              Failed to load data.
            </div>
          </div>
        ) : filteredData.length > 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full h-full">
              {renderChart()}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              No data available for chart
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesChartPanel; 