import { useState, useEffect, useCallback, useRef } from 'react';
import { loadDashboardData, getDumpers, getBonders, getPumpers } from './service';
import { validateTimeframe } from '../validators';
import { eventBus } from '../../core/events';
import { events } from '../events';
import pumpFunWebSocketService from './pumpFunWebSocketService';
import * as Sentry from '@sentry/browser';

/**
 * Custom hook for dashboard state management with real-time updates
 * @returns {Object} Dashboard state and methods
 */
export const useDashboardState = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframeState] = useState('30d');
  const [wsConnected, setWsConnected] = useState(false);
  const subscriptionsRef = useRef([]);
  const lastUpdateRef = useRef(null);

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

  // Update developers data when receiving new data from WebSocket
  const handleDevelopersUpdate = useCallback((updatedDevelopers) => {
    console.log(`Received real-time developers update: ${updatedDevelopers.length} developers`);
    lastUpdateRef.current = new Date();
    
    try {
      // Merge with existing data if needed or replace entirely
      setDevelopers(prevDevelopers => {
        if (prevDevelopers.length === 0) return updatedDevelopers;
        
        // Merge strategy: Replace existing developers and add new ones
        const mergedDevelopers = [...prevDevelopers];
        
        updatedDevelopers.forEach(updatedDev => {
          const existingIndex = mergedDevelopers.findIndex(dev => dev.id === updatedDev.id);
          if (existingIndex >= 0) {
            mergedDevelopers[existingIndex] = updatedDev;
          } else {
            mergedDevelopers.push(updatedDev);
          }
        });
        
        return mergedDevelopers;
      });
      
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error('Error processing developers update:', err);
      Sentry.captureException(err);
    }
  }, []);

  // Handle WebSocket connection status updates
  const handleWsStatusChange = useCallback((connected) => {
    console.log('WebSocket connection status changed:', connected);
    setWsConnected(connected);
  }, []);

  // Handle WebSocket errors
  const handleWsError = useCallback((errorData) => {
    console.error('WebSocket error:', errorData);
    Sentry.captureException(new Error(`WebSocket error: ${JSON.stringify(errorData)}`));
    setError(`Real-time connection error: ${errorData.error}`);
  }, []);

  // Load initial data and setup WebSocket connection
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Load initial data from API
        const data = await loadDashboardData(timeframe);
        setDevelopers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load developer data. Please try again later.');
        Sentry.captureException(err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch initial data
    fetchData();
    
    // Connect to WebSocket if not already connected
    if (!pumpFunWebSocketService.isActive()) {
      pumpFunWebSocketService.connect()
        .then(() => {
          console.log('Successfully connected to Pump.fun WebSocket');
        })
        .catch(error => {
          console.error('Failed to connect to WebSocket:', error);
          Sentry.captureException(error);
          setError('Failed to establish real-time connection. Data may not be up-to-date.');
        });
    }
    
    // Setup event subscriptions
    const subscriptions = [
      eventBus.subscribe(events.PUMPFUN_DEVELOPERS_UPDATED, handleDevelopersUpdate),
      eventBus.subscribe(events.PUMPFUN_WEBSOCKET_CONNECTED, () => handleWsStatusChange(true)),
      eventBus.subscribe(events.PUMPFUN_WEBSOCKET_DISCONNECTED, () => handleWsStatusChange(false)),
      eventBus.subscribe(events.PUMPFUN_WEBSOCKET_ERROR, handleWsError),
      eventBus.subscribe(events.PUMPFUN_WEBSOCKET_MAX_RETRIES_REACHED, () => {
        setError('Could not maintain real-time connection. Using most recent data available.');
      })
    ];
    
    // Store subscriptions for cleanup
    subscriptionsRef.current = subscriptions;
    
    // Cleanup: unsubscribe from events and disconnect WebSocket
    return () => {
      subscriptionsRef.current.forEach(unsubscribe => unsubscribe());
    };
  }, [timeframe, handleDevelopersUpdate, handleWsStatusChange, handleWsError]);

  // Derived data selectors
  const getDumpersData = useCallback(() => getDumpers(developers), [developers]);
  const getBondersData = useCallback(() => getBonders(developers), [developers]);
  const getPumpersData = useCallback(() => getPumpers(developers), [developers]);
  
  const getDeveloperById = useCallback((id) => {
    return developers.find(dev => dev.id === id) || null;
  }, [developers]);

  return {
    // State
    developers,
    loading,
    error,
    timeframe,
    isRealTimeActive: wsConnected,
    lastUpdate: lastUpdateRef.current,
    
    // Actions
    setTimeframe,
    
    // Selectors
    getDumpers: getDumpersData,
    getBonders: getBondersData,
    getPumpers: getPumpersData,
    getDeveloperById
  };
};