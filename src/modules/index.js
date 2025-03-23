/**
 * Central module exports and initialization
 */
import { eventBus } from './core';
import pumpFunWebSocketService from './dashboard/internal/pumpFunWebSocketService';
import * as Sentry from '@sentry/browser';

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
  
  // Connect to Pump.fun WebSocket for real-time updates
  try {
    await pumpFunWebSocketService.connect();
    console.log('Connected to Pump.fun real-time API');
    
    // Subscribe to websocket events for logging
    eventBus.subscribe('dashboard/pumpfun-developers-updated', (data) => {
      console.log(`Received update for ${data.length} developers`);
    });
    
    eventBus.subscribe('dashboard/pumpfun-projects-updated', (data) => {
      console.log(`Received update for ${data.length} projects`);
    });
    
    eventBus.subscribe('dashboard/pumpfun-websocket-disconnected', () => {
      console.warn('Disconnected from Pump.fun real-time API');
    });
  } catch (error) {
    console.error('Failed to connect to Pump.fun real-time API:', error);
    Sentry.captureException(error);
  }
  
  console.log('All modules initialized');
}

// Re-export everything from individual module APIs
export * from './core';
export * from './dashboard/api';
export * from './developers/api';
export * from './projects/api';
export * from './layout/api';