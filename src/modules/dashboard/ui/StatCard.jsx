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
  return (
    <div className="card flex items-center">
      <div className={`rounded-full p-3 mr-4 ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}