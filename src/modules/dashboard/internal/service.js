import * as Sentry from '@sentry/browser';
import { fetchDevelopers } from './data';
import { eventBus } from '../../core/events';
import { events } from '../events';
import { validateDashboardData } from '../validators';

/**
 * Loads developer data for the dashboard
 * @param {string} timeframe - Time period to load data for 
 * @returns {Promise<Array>} - Array of developer data
 */
export const loadDashboardData = async (timeframe) => {
  try {
    console.log(`Loading dashboard data for timeframe: ${timeframe}`);
    const data = await fetchDevelopers(timeframe);
    
    // Validate data before publishing
    const validatedData = validateDashboardData(data, {
      actionName: 'loadDashboardData',
      location: 'dashboard/service.js',
      direction: 'incoming',
      moduleFrom: 'API',
      moduleTo: 'dashboard'
    });
    
    // Notify subscribers that data has been loaded
    eventBus.publish(events.DATA_LOADED, validatedData);
    
    return validatedData;
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    Sentry.captureException(error);
    
    // Publish error event
    eventBus.publish(events.DATA_LOAD_ERROR, { 
      message: 'Failed to load dashboard data',
      error 
    });
    
    throw error;
  }
};

/**
 * Get developers sorted by dumper rating
 * @param {Array} developers - List of developers 
 * @returns {Array} - Sorted developers
 */
export const getDumpers = (developers) => {
  return [...developers].sort((a, b) => b.dumperRating - a.dumperRating);
};

/**
 * Get developers sorted by bonding rate
 * @param {Array} developers - List of developers 
 * @returns {Array} - Sorted developers
 */
export const getBonders = (developers) => {
  return [...developers].sort((a, b) => b.bondingRate - a.bondingRate);
};

/**
 * Get developers sorted by pump rate
 * @param {Array} developers - List of developers 
 * @returns {Array} - Sorted developers
 */
export const getPumpers = (developers) => {
  return [...developers].sort((a, b) => b.pumpRate - a.pumpRate);
};