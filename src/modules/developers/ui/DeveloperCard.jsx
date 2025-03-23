import React from 'react';
import { Link } from 'react-router-dom';
import RatingBadge from './RatingBadge';
import { calculateSuccessRate, calculateRugRate } from '../internal/service';

/**
 * Card component for displaying a developer summary
 * 
 * @param {Object} props
 * @param {Object} props.developer - Developer data
 */
export default function DeveloperCard({ developer }) {
  const { id, name, address, profilePic, totalProjects, bondingRate, dumperRating } = developer;
  
  // Calculate metrics
  const successRate = calculateSuccessRate(developer);
  const rugRate = calculateRugRate(developer);
  
  // Determine card style based on dumper rating
  const numRating = parseFloat(dumperRating);
  const cardClass = numRating >= 6 ? 'card-developer-high' : 'card-developer-low';
  
  return (
    <div className={cardClass}>
      <div className="flex items-center mb-4">
        <img 
          src={profilePic} 
          alt={`${name} profile`} 
          className="h-12 w-12 rounded-full mr-3 object-cover"
        />
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-xs text-gray-400 truncate w-32 md:w-auto" title={address}>
            {address.substring(0, 8)}...{address.substring(address.length - 4)}
          </p>
        </div>
        <div className="ml-auto">
          <RatingBadge rating={dumperRating} />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400">Projects</p>
          <p className="font-bold text-white">{totalProjects}</p>
        </div>
        <div className="text-center p-2 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400">Success Rate</p>
          <p className="font-bold text-white">{successRate}%</p>
        </div>
        <div className="text-center p-2 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400">Bonding Rate</p>
          <p className="font-bold text-white">{bondingRate}%</p>
        </div>
        <div className="text-center p-2 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400">Rug Rate</p>
          <p className="font-bold text-white">{rugRate}%</p>
        </div>
      </div>
      
      <div className="mt-auto">
        <Link 
          to={`/developer/${id}`} 
          className="button-primary w-full text-center inline-block cursor-pointer"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}