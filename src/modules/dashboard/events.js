/**
 * Event definitions for the Dashboard module
 */
export const events = {
  TIMEFRAME_CHANGED: 'dashboard/timeframe-changed',
  DATA_LOADED: 'dashboard/data-loaded',
  DATA_LOAD_ERROR: 'dashboard/data-load-error',
  
  // WebSocket events
  PUMPFUN_WEBSOCKET_CONNECTED: 'dashboard/pumpfun-websocket-connected',
  PUMPFUN_WEBSOCKET_DISCONNECTED: 'dashboard/pumpfun-websocket-disconnected',
  PUMPFUN_WEBSOCKET_ERROR: 'dashboard/pumpfun-websocket-error',
  PUMPFUN_WEBSOCKET_MAX_RETRIES_REACHED: 'dashboard/pumpfun-websocket-max-retries-reached',
  PUMPFUN_DEVELOPERS_UPDATED: 'dashboard/pumpfun-developers-updated',
  PUMPFUN_PROJECTS_UPDATED: 'dashboard/pumpfun-projects-updated',
  PUMPFUN_TOKENS_UPDATED: 'dashboard/pumpfun-tokens-updated',
  PUMPFUN_TRANSACTIONS_UPDATED: 'dashboard/pumpfun-transactions-updated',
  PUMPFUN_DATA_RECEIVED: 'dashboard/pumpfun-data-received'
};