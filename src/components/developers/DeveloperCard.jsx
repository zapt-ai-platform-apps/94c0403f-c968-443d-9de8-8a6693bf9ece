import React from 'react';
import { Link } from 'react-router-dom';
import RatingBadge from './RatingBadge';

export default function DeveloperCard({ developer }) {
  const { id, name, address, profilePic, totalProjects, successfulProjects, ruggedProjects, bondingRate, dumperRating } = developer;
  
  // Calculate success rate
  const successRate = totalProjects > 0 ? ((successfulProjects / totalProjects) * 100).toFixed(0) : 0;
  const rugRate = totalProjects > 0 ? ((ruggedProjects / totalProjects) * 100).toFixed(0) : 0;
  
  return (
    <div className="card flex flex-col h-full">
      <div className="flex items-center mb-4">
        <img 
          src={profilePic} 
          alt={`${name} profile`} 
          className="h-12 w-12 rounded-full mr-3 object-cover"
        />
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-xs text-gray-500 truncate w-32 md:w-auto" title={address}>
            {address.substring(0, 8)}...{address.substring(address.length - 4)}
          </p>
        </div>
        <div className="ml-auto">
          <RatingBadge rating={dumperRating} />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-500">Projects</p>
          <p className="font-bold">{totalProjects}</p>
        </div>
        <div className="text-center p-2 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-500">Success Rate</p>
          <p className="font-bold">{successRate}%</p>
        </div>
        <div className="text-center p-2 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-500">Bonding Rate</p>
          <p className="font-bold">{bondingRate}%</p>
        </div>
        <div className="text-center p-2 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-500">Rug Rate</p>
          <p className="font-bold">{rugRate}%</p>
        </div>
      </div>
      
      <div className="mt-auto">
        <Link 
          to={`/developer/${id}`} 
          className="button-primary w-full text-center inline-block"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}