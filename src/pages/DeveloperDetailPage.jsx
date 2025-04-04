import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchDeveloperById } from '../services/developersService';
import RatingBadge from '../components/developers/RatingBadge';
import ProjectsTable from '../components/projects/ProjectsTable';
import * as Sentry from '@sentry/browser';

export default function DeveloperDetailPage() {
  const { id } = useParams();
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadDeveloper = async () => {
      try {
        setLoading(true);
        const data = await fetchDeveloperById(id);
        setDeveloper(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching developer details:', err);
        Sentry.captureException(err);
        setError('Failed to load developer details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadDeveloper();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
        <p>{error}</p>
      </div>
    );
  }
  
  if (!developer) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-4">Developer Not Found</h2>
        <p className="text-gray-600 mb-4">The developer you're looking for does not exist or has been removed.</p>
        <Link to="/" className="button-primary">
          Return to Dashboard
        </Link>
      </div>
    );
  }
  
  // Calculate success rate and other metrics
  const successRate = developer.totalProjects > 0 
    ? ((developer.successfulProjects / developer.totalProjects) * 100).toFixed(0) 
    : 0;
    
  const rugRate = developer.totalProjects > 0 
    ? ((developer.ruggedProjects / developer.totalProjects) * 100).toFixed(0) 
    : 0;
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center mb-6">
          <img 
            src={developer.profilePic} 
            alt={`${developer.name} profile`} 
            className="h-24 w-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h1 className="text-2xl font-bold">{developer.name}</h1>
            <p className="text-gray-500 mb-2">{developer.address}</p>
            <div className="flex items-center">
              <span className="mr-2">Dumper Rating:</span>
              <RatingBadge rating={developer.dumperRating} />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500 mb-1">Total Projects</p>
            <p className="text-xl font-bold">{developer.totalProjects}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500 mb-1">Success Rate</p>
            <p className="text-xl font-bold">{successRate}%</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500 mb-1">Bonding Rate</p>
            <p className="text-xl font-bold">{developer.bondingRate}%</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500 mb-1">Rug Rate</p>
            <p className="text-xl font-bold">{rugRate}%</p>
          </div>
        </div>
        
        {developer.extendedStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500 mb-1">Avg Hold Time</p>
              <p className="text-xl font-bold">{developer.extendedStats.avgHoldTime} days</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500 mb-1">Total Volume</p>
              <p className="text-xl font-bold">${(developer.extendedStats.totalVolume / 1000).toFixed(1)}k</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500 mb-1">Investor Count</p>
              <p className="text-xl font-bold">{developer.extendedStats.investorCount}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500 mb-1">Avg Project Lifespan</p>
              <p className="text-xl font-bold">{developer.extendedStats.avgProjectLifespan} days</p>
            </div>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-bold mb-4">Project History</h2>
          <ProjectsTable projects={developer.projects} />
        </div>
      </div>
    </div>
  );
}