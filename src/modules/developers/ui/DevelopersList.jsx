import React from 'react';
import DeveloperCard from './DeveloperCard';

/**
 * Component to display a list of developers
 * 
 * @param {Object} props
 * @param {Array} props.developers - List of developers to display
 * @param {string} props.title - Title for the list
 */
export default function DevelopersList({ developers, title }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      {developers.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No developers found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map(developer => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
        </div>
      )}
    </div>
  );
}