/**
 * Central module exports and initialization
 */
import { eventBus } from './core';

// Initialize function for all modules
export async function initializeModules() {
  console.log('Initializing all modules...');
  
  // Subscribe to important events for logging/debugging
  eventBus.subscribe('dashboard/timeframe-changed', (timeframe) => {
    console.log('Timeframe changed:', timeframe);
  });
  
  eventBus.subscribe('developers/developer-loaded', (developer) => {
    console.log('Developer loaded:', developer.id);
  });
  
  console.log('All modules initialized');
}

// Re-export everything from individual module APIs
export * from './core';
export * from './dashboard/api';
export * from './developers/api';
export * from './projects/api';
export * from './layout/api';