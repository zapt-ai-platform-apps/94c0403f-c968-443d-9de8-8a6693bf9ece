import React from 'react';
import { validateProjects } from '../validators';

/**
 * Table component for displaying projects
 * 
 * @param {Object} props
 * @param {Array} props.projects - List of projects to display
 */
export default function ProjectsTable({ projects }) {
  // Validate projects data
  let validatedProjects = [];
  try {
    validatedProjects = validateProjects(projects, {
      actionName: 'ProjectsTable render',
      location: 'projects/ui/ProjectsTable.jsx',
      direction: 'incoming',
      moduleFrom: 'UI',
      moduleTo: 'projects'
    });
  } catch (error) {
    console.error('Invalid projects data:', error);
    return (
      <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded">
        <p>Error displaying projects: {error.message}</p>
      </div>
    );
  }
  
  if (!validatedProjects || validatedProjects.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg shadow p-4 text-center">
        <p className="text-gray-400">No projects found</p>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-900 rounded-lg shadow overflow-hidden border border-gray-700">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="table-head">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Project Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Launch Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Bonded Curve
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Initial Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Peak Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Return
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {validatedProjects.map((project) => (
              <tr key={project.id} className="table-row">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-white">{project.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm table-cell">
                  {project.launchDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'success' 
                      ? 'bg-green-900 text-green-200 border border-success-border' 
                      : 'bg-red-900 text-red-200 border border-danger-border'
                  }`}>
                    {project.status === 'success' ? 'Success' : 'Rugged'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm table-cell">
                  {project.bondedCurve ? 'Yes' : 'No'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm table-cell">
                  {project.initialPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm table-cell">
                  {project.peakPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.returnRate !== undefined ? (
                    <span className={`text-sm ${project.returnRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {project.returnRate >= 0 ? '+' : ''}{project.returnRate}%
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}