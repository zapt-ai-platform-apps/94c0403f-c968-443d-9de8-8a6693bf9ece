import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchDevelopers } from '../services/developersService';
import * as Sentry from '@sentry/browser';

const DashboardContext = createContext(null);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('30d'); // '7d', '30d', '90d', 'all'

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log(`Fetching developer data for timeframe: ${timeframe}`);
        const data = await fetchDevelopers(timeframe);
        setDevelopers(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching developer data:', err);
        Sentry.captureException(err);
        setError('Failed to load developer data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [timeframe]);

  const getDumpers = () => {
    return [...developers].sort((a, b) => b.dumperRating - a.dumperRating);
  };

  const getBonders = () => {
    return [...developers].sort((a, b) => b.bondingRate - a.bondingRate);
  };

  const getPumpers = () => {
    return [...developers].sort((a, b) => b.pumpRate - a.pumpRate);
  };

  const getDeveloperById = (id) => {
    return developers.find(dev => dev.id === id) || null;
  };

  return (
    <DashboardContext.Provider value={{
      developers,
      loading,
      error,
      timeframe,
      setTimeframe,
      getDumpers,
      getBonders,
      getPumpers,
      getDeveloperById
    }}>
      {children}
    </DashboardContext.Provider>
  );
};