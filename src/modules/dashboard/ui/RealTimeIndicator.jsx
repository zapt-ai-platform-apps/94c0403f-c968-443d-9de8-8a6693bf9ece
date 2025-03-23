import React from 'react';
import { useDashboard } from '../api';

/**
 * Component to display real-time connection status
 */
export default function RealTimeIndicator() {
  const { isRealTimeActive } = useDashboard();
  
  return (
    <div className="flex items-center">
      <div className={`h-2 w-2 rounded-full mr-2 ${isRealTimeActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
      <span className="text-xs text-gray-400">
        {isRealTimeActive ? 'Real-time updates active' : 'Real-time updates disconnected'}
      </span>
    </div>
  );
}