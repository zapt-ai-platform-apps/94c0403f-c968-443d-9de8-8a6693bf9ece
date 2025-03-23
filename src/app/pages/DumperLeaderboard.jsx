import React from 'react';
import { useDashboard, TimeframeSelector, RealTimeIndicator } from '@/modules/dashboard/api';
import { DevelopersList } from '@/modules/developers/api';

export default function DumperLeaderboard() {
  const { loading, error, getDumpers } = useDashboard();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded mt-4">
        <p>{error}</p>
      </div>
    );
  }
  
  const dumpers = getDumpers();
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Top Dumpers Leaderboard</h1>
          <RealTimeIndicator />
        </div>
        <TimeframeSelector />
      </div>
      <p className="text-gray-400 mb-6">
        Developers ranked by their Dumper Rating - a composite score (0-10) based on project success, 
        bonding rate, and whether they've rugged projects. Higher scores indicate more reliable developers.
      </p>
      
      <DevelopersList developers={dumpers} title="All Dumpers" />
    </div>
  );
}