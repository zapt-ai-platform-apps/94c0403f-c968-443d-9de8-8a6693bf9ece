import * as Sentry from '@sentry/browser';
import { fetchPumpFunDevelopers, fetchPumpFunDeveloperById } from './pumpFunService';

// Fallback mock data in case the API fails
const mockDevelopers = [
  {
    id: '1',
    name: 'TopBuilder',
    address: '0x1a2b3c4d5e6f7g8h9i0j',
    profilePic: 'https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=100&height=100',
    totalProjects: 12,
    successfulProjects: 10,
    ruggedProjects: 1,
    bondingRate: 83,
    pumpRate: 75,
    averageReturn: 320,
    dumperRating: 9.2,
    projects: [
      { 
        id: 'p1', 
        name: 'MoonShot', 
        launchDate: '2023-10-15', 
        status: 'success',
        bondedCurve: true,
        initialPrice: 0.0001,
        peakPrice: 0.0023,
        returnRate: 2200
      },
      { 
        id: 'p2', 
        name: 'RocketFuel', 
        launchDate: '2023-11-22', 
        status: 'success',
        bondedCurve: true,
        initialPrice: 0.0005,
        peakPrice: 0.0015,
        returnRate: 200
      },
      { 
        id: 'p3', 
        name: 'StarDust', 
        launchDate: '2024-01-05', 
        status: 'rugged',
        bondedCurve: false,
        initialPrice: 0.00075,
        peakPrice: 0.0009,
        returnRate: 20
      }
    ]
  },
  // Additional mock data entries removed for brevity
];

/**
 * Fetch developers data - tries to fetch from Pump.fun API first, falls back to mock data
 * @param {string} timeframe - Time period to filter by
 * @returns {Promise<Array>} - Array of developer data
 */
export const fetchDevelopers = async (timeframe = '30d') => {
  try {
    console.log(`Fetching developer data for timeframe: ${timeframe}`);
    
    // Try to fetch real data from Pump.fun
    try {
      const realData = await fetchPumpFunDevelopers(timeframe);
      console.log(`Successfully fetched ${realData.length} developers from Pump.fun`);
      return realData;
    } catch (apiError) {
      console.warn('Failed to fetch from Pump.fun API, falling back to mock data:', apiError);
      Sentry.captureException(apiError, {
        tags: { 
          dataSource: 'pumpfun_api',
          fallback: 'mock_data'
        }
      });
      
      // Fallback to mock data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      // Adjust ratings slightly based on timeframe to simulate changes
      let filteredDevelopers = [...mockDevelopers];
      if (timeframe === '7d') {
        filteredDevelopers = filteredDevelopers.map(dev => ({
          ...dev,
          dumperRating: Math.min(10, Math.max(0, parseFloat(dev.dumperRating) + (Math.random() * 0.6 - 0.3))).toFixed(1)
        }));
      } else if (timeframe === '90d') {
        filteredDevelopers = filteredDevelopers.map(dev => ({
          ...dev,
          dumperRating: Math.min(10, Math.max(0, parseFloat(dev.dumperRating) + (Math.random() * 1.4 - 0.7))).toFixed(1)
        }));
      }
      
      return filteredDevelopers;
    }
  } catch (error) {
    console.error('Error fetching developers:', error);
    Sentry.captureException(error);
    throw new Error('Failed to fetch developer data');
  }
};

/**
 * Fetch a single developer by ID - tries Pump.fun API first, falls back to mock data
 * @param {string} id - Developer ID
 * @returns {Promise<Object>} - Developer data
 */
export const fetchDeveloperById = async (id) => {
  try {
    console.log(`Fetching developer with ID: ${id}`);
    
    // Try to fetch real data
    try {
      const developer = await fetchPumpFunDeveloperById(id);
      return developer;
    } catch (apiError) {
      console.warn('Failed to fetch developer from Pump.fun API, falling back to mock data:', apiError);
      
      // Fallback to mock data
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      
      const developer = mockDevelopers.find(dev => dev.id === id);
      
      if (!developer) {
        throw new Error('Developer not found');
      }
      
      // Add extra stats for detail view if needed
      return {
        ...developer,
        extendedStats: {
          avgHoldTime: Math.floor(Math.random() * 30) + 1, // days
          totalVolume: Math.floor(Math.random() * 1000000) + 10000, // in USD
          investorCount: Math.floor(Math.random() * 5000) + 100,
          avgProjectLifespan: Math.floor(Math.random() * 90) + 10 // days
        }
      };
    }
  } catch (error) {
    console.error('Error fetching developer by ID:', error);
    Sentry.captureException(error);
    throw new Error('Failed to fetch developer data');
  }
};