import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import TimeframeSelector from '../components/dashboard/TimeframeSelector';
import DevelopersList from '../components/developers/DevelopersList';

export default function PumperLeaderboard() {
  const { loading, error, getPumpers } = useDashboard();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
        <p>{error}</p>
      </div>
    );
  }
  
  const pumpers = getPumpers();
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Top Pumpers Leaderboard</h1>
        <TimeframeSelector />
      </div>
      <p className="text-gray-600 mb-6">
        Developers ranked by their Pump Rate - a measure of how successful they are at increasing the value 
        of their projects. Higher percentages indicate developers with better price performance.
      </p>
      
      <DevelopersList developers={pumpers} title="All Pumpers" />
    </div>
  );
}