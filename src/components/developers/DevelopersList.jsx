import React from 'react';
import DeveloperCard from './DeveloperCard';

export default function DevelopersList({ developers, title }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      {developers.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No developers found</p>
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