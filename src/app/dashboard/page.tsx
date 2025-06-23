import React from 'react';
import SalesChartPanel from '../../components/organisms/SalesChartPanel';

const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-8">Dashboard</h1>
      <SalesChartPanel />
    </main>
  );
};

export default DashboardPage; 