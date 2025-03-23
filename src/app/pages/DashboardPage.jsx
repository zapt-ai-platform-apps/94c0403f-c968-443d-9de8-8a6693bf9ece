import React from 'react';
import { useDashboard, TimeframeSelector, StatCard, DeveloperDistributionChart } from '@/modules/dashboard/api';
import { TopDevelopersTable } from '@/modules/developers/api';

export default function DashboardPage() {
  const { 
    developers, 
    loading, 
    error, 
    getDumpers,
    getBonders
  } = useDashboard();
  
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
  
  // Calculate overall stats
  const totalDevelopers = developers.length;
  const averageDumperRating = developers.reduce((sum, dev) => sum + parseFloat(dev.dumperRating), 0) / totalDevelopers;
  const averageBondingRate = developers.reduce((sum, dev) => sum + parseFloat(dev.bondingRate), 0) / totalDevelopers;
  const ruggedProjectsCount = developers.reduce((sum, dev) => sum + dev.ruggedProjects, 0);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Dump.fun Dashboard</h1>
        <TimeframeSelector />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Developers" 
          value={totalDevelopers}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>}
          color="bg-blue-500"
        />
        <StatCard 
          title="Avg Dumper Rating" 
          value={averageDumperRating.toFixed(1)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>}
          color="bg-green-500"
        />
        <StatCard 
          title="Avg Bonding Rate" 
          value={`${averageBondingRate.toFixed(1)}%`}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>}
          color="bg-yellow-500"
        />
        <StatCard 
          title="Rugged Projects" 
          value={ruggedProjectsCount}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>}
          color="bg-red-500"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DeveloperDistributionChart developers={developers} />
        <TopDevelopersTable developers={getDumpers()} title="Top Dumpers" />
      </div>
      
      <div className="mb-8">
        <TopDevelopersTable developers={getBonders()} title="Top Bonders" />
      </div>
    </div>
  );
}