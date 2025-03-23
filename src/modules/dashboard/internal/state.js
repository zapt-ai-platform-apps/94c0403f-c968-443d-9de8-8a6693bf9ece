import { useState, useEffect } from 'react';
import { loadDashboardData, getDumpers, getBonders, getPumpers } from './service';
import { validateTimeframe } from '../validators';
import { eventBus } from '../../core/events';
import { events } from '../events';

/**
 * Custom hook for dashboard state management
 * @returns {Object} Dashboard state and methods
 */
export const useDashboardState = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframeState] = useState('30d');

  // Set timeframe with validation
  const setTimeframe = (newTimeframe) => {
    try {
      // Validate timeframe before setting
      const validatedTimeframe = validateTimeframe(newTimeframe, {
        actionName: 'setTimeframe',
        location: 'dashboard/state.js',
        direction: 'incoming',
        moduleFrom: 'UI',
        moduleTo: 'dashboard'
      });
      
      setTimeframeState(validatedTimeframe);
      
      // Publish timeframe change event
      eventBus.publish(events.TIMEFRAME_CHANGED, validatedTimeframe);
    } catch (err) {
      console.error('Invalid timeframe:', err);
      // In case of invalid timeframe, fall back to default
      setTimeframeState('30d');
    }
  };

  // Load data when timeframe changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await loadDashboardData(timeframe);
        setDevelopers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load developer data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeframe]);

  // Derived data selectors
  const getDumpersData = () => getDumpers(developers);
  const getBondersData = () => getBonders(developers);
  const getPumpersData = () => getPumpers(developers);
  
  const getDeveloperById = (id) => {
    return developers.find(dev => dev.id === id) || null;
  };

  return {
    // State
    developers,
    loading,
    error,
    timeframe,
    
    // Actions
    setTimeframe,
    
    // Selectors
    getDumpers: getDumpersData,
    getBonders: getBondersData,
    getPumpers: getPumpersData,
    getDeveloperById
  };
};