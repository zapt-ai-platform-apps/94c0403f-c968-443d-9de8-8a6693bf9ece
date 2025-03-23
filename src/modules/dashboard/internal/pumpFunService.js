import * as Sentry from '@sentry/browser';

/**
 * Service for fetching data from Pump.fun API
 */

// Base API URL for Pump.fun
const API_BASE_URL = 'https://api.pump.fun';

/**
 * Fetch developers data from Pump.fun
 * @param {string} timeframe - Time period to filter by
 * @returns {Promise<Array>} - Array of developer data
 */
export const fetchPumpFunDevelopers = async (timeframe = '30d') => {
  try {
    console.log(`Fetching Pump.fun developer data for timeframe: ${timeframe}`);
    
    // Convert timeframe to API format if needed
    const apiTimeframe = convertTimeframeFormat(timeframe);
    
    // Make API request
    const response = await fetch(`${API_BASE_URL}/v1/developers?timeframe=${apiTimeframe}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from Pump.fun: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return transformDevelopersData(data);
  } catch (error) {
    console.error('Error fetching Pump.fun developers data:', error);
    Sentry.captureException(error);
    throw new Error('Failed to fetch Pump.fun developer data');
  }
};

/**
 * Fetch a single developer by ID from Pump.fun
 * @param {string} id - Developer ID
 * @returns {Promise<Object>} - Developer data
 */
export const fetchPumpFunDeveloperById = async (id) => {
  try {
    console.log(`Fetching Pump.fun developer with ID: ${id}`);
    
    const response = await fetch(`${API_BASE_URL}/v1/developers/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch developer from Pump.fun: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return transformDeveloperData(data);
  } catch (error) {
    console.error('Error fetching Pump.fun developer by ID:', error);
    Sentry.captureException(error);
    throw new Error('Failed to fetch Pump.fun developer data');
  }
};

/**
 * Transform raw API data into application format
 * @param {Array} data - Raw developer data from API
 * @returns {Array} - Transformed developer data
 */
function transformDevelopersData(data) {
  // Transform API format to match our application format
  return data.map(developer => transformDeveloperData(developer));
}

/**
 * Transform a single developer's data
 * @param {Object} developer - Raw developer data
 * @returns {Object} - Transformed developer data
 */
function transformDeveloperData(developer) {
  return {
    id: developer.id || developer.address,
    name: developer.name || `Developer-${developer.address.substring(0, 6)}`,
    address: developer.address,
    profilePic: developer.profilePic || 'https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=100&height=100',
    totalProjects: developer.totalProjects || 0,
    successfulProjects: developer.successfulProjects || 0,
    ruggedProjects: developer.ruggedProjects || 0,
    bondingRate: developer.bondingRate || 0,
    pumpRate: developer.pumpRate || 0,
    averageReturn: developer.averageReturn || 0,
    dumperRating: developer.dumperRating || 0,
    projects: (developer.projects || []).map(project => ({
      id: project.id,
      name: project.name,
      launchDate: project.launchDate || 'Unknown',
      status: project.rugPulled ? 'rugged' : 'success',
      bondedCurve: !!project.bondedCurve,
      initialPrice: project.initialPrice || 0,
      peakPrice: project.peakPrice || 0,
      returnRate: project.returnRate || 0
    }))
  };
}

/**
 * Convert application timeframe format to API format
 */
function convertTimeframeFormat(timeframe) {
  switch (timeframe) {
    case '7d': return 'week';
    case '30d': return 'month';
    case '90d': return 'quarter';
    case 'all': return 'all';
    default: return 'month';
  }
}