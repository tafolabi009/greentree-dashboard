import React from 'react';
import SalesChartPanel from '../../components/organisms/SalesChartPanel';

const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-10 px-4 sm:px-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-6 sm:mb-8">
        GreenTree Dashboard
      </h1>
      <SalesChartPanel />
    </main>
  );
};

export default DashboardPage; 