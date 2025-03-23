import React from 'react';
import { useDashboard } from '../api';

/**
 * Component for selecting the dashboard timeframe
 */
export default function TimeframeSelector() {
  const { timeframe, setTimeframe } = useDashboard();
  
  return (
    <div className="flex items-center mb-6">
      <span className="text-gray-300 mr-3 font-medium">Timeframe:</span>
      <div className="flex bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <button
          className={`px-3 py-1 text-sm ${timeframe === '7d' ? 'bg-green-800 text-white' : 'text-gray-300 hover:bg-gray-700'} cursor-pointer transition-colors`}
          onClick={() => setTimeframe('7d')}
        >
          7 Days
        </button>
        <button
          className={`px-3 py-1 text-sm ${timeframe === '30d' ? 'bg-green-800 text-white' : 'text-gray-300 hover:bg-gray-700'} cursor-pointer transition-colors`}
          onClick={() => setTimeframe('30d')}
        >
          30 Days
        </button>
        <button
          className={`px-3 py-1 text-sm ${timeframe === '90d' ? 'bg-green-800 text-white' : 'text-gray-300 hover:bg-gray-700'} cursor-pointer transition-colors`}
          onClick={() => setTimeframe('90d')}
        >
          90 Days
        </button>
        <button
          className={`px-3 py-1 text-sm ${timeframe === 'all' ? 'bg-green-800 text-white' : 'text-gray-300 hover:bg-gray-700'} cursor-pointer transition-colors`}
          onClick={() => setTimeframe('all')}
        >
          All Time
        </button>
      </div>
    </div>
  );
}