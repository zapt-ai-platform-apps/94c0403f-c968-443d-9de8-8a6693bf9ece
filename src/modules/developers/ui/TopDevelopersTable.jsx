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
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Developer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Projects
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bonding Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dumper Rating
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {developers.slice(0, 5).map((developer) => (
              <tr key={developer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      src={developer.profilePic} 
                      alt={`${developer.name} profile`} 
                      className="h-8 w-8 rounded-full object-cover mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        <Link to={`/developer/${developer.id}`} className="hover:text-blue-600">
                          {developer.name}
                        </Link>
                      </div>
                      <div className="text-xs text-gray-500 truncate w-28" title={developer.address}>
                        {developer.address.substring(0, 6)}...{developer.address.substring(developer.address.length - 4)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {developer.totalProjects}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {typeof developer.bondingRate === 'number' 
                    ? `${developer.bondingRate.toFixed(1)}%` 
                    : `${developer.bondingRate}%`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RatingBadge rating={developer.dumperRating} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-gray-200 text-right">
        <Link to="/dumpers" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All →
        </Link>
      </div>
    </div>
  );
}