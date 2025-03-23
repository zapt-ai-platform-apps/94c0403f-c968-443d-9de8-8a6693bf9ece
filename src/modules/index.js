import pumpFunWebSocketService from './dashboard/internal/pumpFunWebSocketService';

/**
 * Initialize all modules
 * @returns {Promise<void>}
 */
export async function initializeModules() {
  try {
    console.log('Initializing modules...');
    
    // Initialize WebSocket connection to Pump.fun
    await pumpFunWebSocketService.connect();
    console.log('WebSocket connection initialized successfully');
    
    // Add other module initializations here in the future if needed
    
  } catch (error) {
    console.error('Error initializing modules:', error);
    // We don't throw here to allow the app to continue loading even if module init fails
  }
}