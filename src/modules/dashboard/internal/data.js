import * as Sentry from '@sentry/browser';

// Sample mock data for developers
const mockDevelopers = [
  {
    id: '1',
    name: 'TopBuilder',
    address: '0x1a2b3c4d5e6f7g8h9i0j',
    profilePic: 'https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=100&height=100',
    totalProjects: 12,
    successfulProjects: 10,
    ruggedProjects: 1,
    bondingRate: 83, // percentage
    pumpRate: 75,
    averageReturn: 320, // percentage
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
  {
    id: '2',
    name: 'CryptoWizard',
    address: '0xa1b2c3d4e5f6g7h8i9j0',
    profilePic: 'https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=100&height=100',
    totalProjects: 8,
    successfulProjects: 7,
    ruggedProjects: 0,
    bondingRate: 87.5, // percentage
    pumpRate: 80,
    averageReturn: 275, // percentage
    dumperRating: 8.9,
    projects: [
      { 
        id: 'p4', 
        name: 'GalaxyQuest', 
        launchDate: '2023-09-30', 
        status: 'success',
        bondedCurve: true,
        initialPrice: 0.0002,
        peakPrice: 0.0012,
        returnRate: 500
      },
      { 
        id: 'p5', 
        name: 'NebulaToken', 
        launchDate: '2023-12-10', 
        status: 'success',
        bondedCurve: true,
        initialPrice: 0.0003,
        peakPrice: 0.0008,
        returnRate: 166
      }
    ]
  },
  {
    id: '3',
    name: 'RugPuller9000',
    address: '0xz9y8x7w6v5u4t3s2r1q',
    profilePic: 'https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=100&height=100',
    totalProjects: 15,
    successfulProjects: 3,
    ruggedProjects: 11,
    bondingRate: 20, // percentage
    pumpRate: 90,
    averageReturn: -40, // negative indicates loss
    dumperRating: 1.2,
    projects: [
      { 
        id: 'p6', 
        name: 'ScamCoin', 
        launchDate: '2023-08-20', 
        status: 'rugged',
        bondedCurve: false,
        initialPrice: 0.0008,
        peakPrice: 0.0025,
        returnRate: -100
      },
      { 
        id: 'p7', 
        name: 'RugMatic', 
        launchDate: '2023-11-05', 
        status: 'rugged',
        bondedCurve: false,
        initialPrice: 0.0006,
        peakPrice: 0.001,
        returnRate: -100
      }
    ]
  },
  {
    id: '4',
    name: 'BuilderBob',
    address: '0xm1n2o3p4q5r6s7t8u9',
    profilePic: 'https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=100&height=100',
    totalProjects: 6,
    successfulProjects: 5,
    ruggedProjects: 0,
    bondingRate: 83.3, // percentage
    pumpRate: 65,
    averageReturn: 180, // percentage
    dumperRating: 7.8,
    projects: [
      { 
        id: 'p8', 
        name: 'SteadyGainer', 
        launchDate: '2023-10-05', 
        status: 'success',
        bondedCurve: true,
        initialPrice: 0.0004,
        peakPrice: 0.001,
        returnRate: 150
      }
    ]
  },
  {
    id: '5',
    name: 'MidRanger',
    address: '0xe9f8g7h6i5j4k3l2m1',
    profilePic: 'https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=100&height=100',
    totalProjects: 10,
    successfulProjects: 5,
    ruggedProjects: 3,
    bondingRate: 50, // percentage
    pumpRate: 60,
    averageReturn: 90, // percentage
    dumperRating: 5.5,
    projects: [
      { 
        id: 'p9', 
        name: 'MiddleGround', 
        launchDate: '2023-11-15', 
        status: 'success',
        bondedCurve: true,
        initialPrice: 0.0003,
        peakPrice: 0.0006,
        returnRate: 100
      },
      { 
        id: 'p10', 
        name: 'AvgToken', 
        launchDate: '2024-01-20', 
        status: 'rugged',
        bondedCurve: false,
        initialPrice: 0.0005,
        peakPrice: 0.0007,
        returnRate: -60
      }
    ]
  }
];

// Add more mock data
for (let i = 6; i <= 20; i++) {
  const successRate = Math.random();
  const bondRate = Math.random() * 100;
  const pumpRate = Math.random() * 100;
  const rugRate = Math.random() * 0.5; // Up to 50% rug rate
  
  // Calculate a rating between 0-10 weighted by success and bonding rate
  const rating = (successRate * 5) + ((bondRate/100) * 3) + ((1-rugRate) * 2);
  
  mockDevelopers.push({
    id: `${i}`,
    name: `Developer${i}`,
    address: `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`,
    profilePic: 'https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=100&height=100',
    totalProjects: Math.floor(Math.random() * 15) + 1,
    successfulProjects: Math.floor((Math.random() * 15) * successRate),
    ruggedProjects: Math.floor((Math.random() * 15) * rugRate),
    bondingRate: bondRate.toFixed(1),
    pumpRate: pumpRate.toFixed(1),
    averageReturn: (Math.random() * 400 - 100).toFixed(1),
    dumperRating: rating.toFixed(1),
    projects: [
      { 
        id: `p${i}0`, 
        name: `Project${i}0`, 
        launchDate: '2023-12-01', 
        status: Math.random() > 0.3 ? 'success' : 'rugged',
        bondedCurve: Math.random() > 0.5,
        initialPrice: (Math.random() * 0.001).toFixed(6),
        peakPrice: (Math.random() * 0.01).toFixed(6)
      }
    ]
  });
}

/**
 * Fetch developers data
 * @param {string} timeframe - Time period to filter by
 * @returns {Promise<Array>} - Array of developer data
 */
export const fetchDevelopers = async (timeframe = '30d') => {
  try {
    console.log(`Fetching developer data for timeframe: ${timeframe}`);
    
    // In a real implementation, this would call an API that scrapes Pump.fun
    // For now, we'll simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter or adjust data based on timeframe
    let filteredDevelopers = [...mockDevelopers];
    
    // Adjust ratings slightly based on timeframe to simulate changes over time
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
  } catch (error) {
    console.error('Error fetching developers:', error);
    Sentry.captureException(error);
    throw new Error('Failed to fetch developer data');
  }
};

/**
 * Fetch a single developer by ID
 * @param {string} id - Developer ID
 * @returns {Promise<Object>} - Developer data
 */
export const fetchDeveloperById = async (id) => {
  try {
    console.log(`Fetching developer with ID: ${id}`);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const developer = mockDevelopers.find(dev => dev.id === id);
    
    if (!developer) {
      throw new Error('Developer not found');
    }
    
    // In a real implementation, this might include additional details
    // not shown in the list view
    return {
      ...developer,
      extendedStats: {
        avgHoldTime: Math.floor(Math.random() * 30) + 1, // days
        totalVolume: Math.floor(Math.random() * 1000000) + 10000, // in USD
        investorCount: Math.floor(Math.random() * 5000) + 100,
        avgProjectLifespan: Math.floor(Math.random() * 90) + 10 // days
      }
    };
  } catch (error) {
    console.error('Error fetching developer by ID:', error);
    Sentry.captureException(error);
    throw new Error('Failed to fetch developer data');
  }
};