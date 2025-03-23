import React from 'react';

/**
 * Dashboard statistic card component
 * 
 * @param {Object} props
 * @param {string} props.title - Title of the stat
 * @param {string|number} props.value - Value to display
 * @param {React.ReactNode} props.icon - Icon to display
 * @param {string} props.color - Background color for the icon
 */
export default function StatCard({ title, value, icon, color }) {
  // Convert old color scheme to new dark theme colors
  const getIconColor = () => {
    switch(color) {
      case 'bg-blue-500': return 'bg-blue-900 border border-blue-600';
      case 'bg-green-500': return 'bg-green-900 border border-success-border';
      case 'bg-yellow-500': return 'bg-yellow-900 border border-yellow-600';
      case 'bg-red-500': return 'bg-red-900 border border-danger-border';
      default: return 'bg-gray-800 border border-gray-700';
    }
  };
  
  return (
    <div className="card flex items-center border border-gray-800">
      <div className={`rounded-full p-3 mr-4 ${getIconColor()}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}