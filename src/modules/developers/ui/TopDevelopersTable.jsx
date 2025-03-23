import React from 'react';
import { Link } from 'react-router-dom';
import RatingBadge from './RatingBadge';

/**
 * Table displaying top developers
 * 
 * @param {Object} props
 * @param {Array} props.developers - List of developers to display
 * @param {string} props.title - Title for the table
 */
export default function TopDevelopersTable({ developers, title }) {
  return (
    <div className="bg-gray-900 rounded-lg shadow overflow-hidden border border-gray-700">
      <div className="px-4 py-3 border-b border-gray-700">
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Developer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Projects
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Bonding Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Dumper Rating
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {developers.slice(0, 5).map((developer) => {
              const numRating = parseFloat(developer.dumperRating);
              const rowBorderClass = numRating >= 6 
                ? 'border-l-4 border-success-border' 
                : 'border-l-4 border-danger-border';
              
              return (
                <tr key={developer.id} className={`hover:bg-gray-800 ${rowBorderClass}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={developer.profilePic} 
                        alt={`${developer.name} profile`} 
                        className="h-8 w-8 rounded-full object-cover mr-3"
                      />
                      <div>
                        <div className="font-medium text-white">
                          <Link to={`/developer/${developer.id}`} className="hover:text-green-400">
                            {developer.name}
                          </Link>
                        </div>
                        <div className="text-xs text-gray-400 truncate w-28" title={developer.address}>
                          {developer.address.substring(0, 6)}...{developer.address.substring(developer.address.length - 4)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {developer.totalProjects}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {typeof developer.bondingRate === 'number' 
                      ? `${developer.bondingRate.toFixed(1)}%` 
                      : `${developer.bondingRate}%`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RatingBadge rating={developer.dumperRating} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-gray-700 text-right">
        <Link to="/dumpers" className="text-sm text-green-400 hover:text-green-300 font-medium cursor-pointer">
          View All →
        </Link>
      </div>
    </div>
  );
}