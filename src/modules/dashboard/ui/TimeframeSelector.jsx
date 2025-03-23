import React from 'react';
import { useDashboard } from '../api';

/**
 * Component for selecting the dashboard timeframe
 */
export default function TimeframeSelector() {
  const { timeframe, setTimeframe } = useDashboard();
  
  return (
    <div className="flex items-center mb-6">
      <span className="text-gray-700 mr-3 font-medium">Timeframe:</span>
      <div className="flex bg-gray-200 rounded-lg overflow-hidden">
        <button
          className={`px-3 py-1 text-sm ${timeframe === '7d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-300'} cursor-pointer transition-colors`}
          onClick={() => setTimeframe('7d')}
        >
          7 Days
        </button>
        <button
          className={`px-3 py-1 text-sm ${timeframe === '30d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-300'} cursor-pointer transition-colors`}
          onClick={() => setTimeframe('30d')}
        >
          30 Days
        </button>
        <button
          className={`px-3 py-1 text-sm ${timeframe === '90d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-300'} cursor-pointer transition-colors`}
          onClick={() => setTimeframe('90d')}
        >
          90 Days
        </button>
        <button
          className={`px-3 py-1 text-sm ${timeframe === 'all' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-300'} cursor-pointer transition-colors`}
          onClick={() => setTimeframe('all')}
        >
          All Time
        </button>
      </div>
    </div>
  );
}