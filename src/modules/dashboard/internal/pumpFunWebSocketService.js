import * as Sentry from '@sentry/browser';
import { eventBus } from '../../core/events';
import { events } from '../events';

/**
 * Service for connecting to Pump.fun WebSocket API and processing real-time data
 */
class PumpFunWebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 2000; // Start with 2s delay
  }

  /**
   * Connect to Pump.fun WebSocket API
   * @returns {Promise} - Resolves when connected
   */
  connect() {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        console.log('WebSocket already connected');
        return resolve();
      }

      console.log('Connecting to Pump.fun WebSocket API...');
      
      try {
        this.socket = new WebSocket('wss://pumpportal.fun/api/data');
        
        this.socket.onopen = () => {
          console.log('Connected to Pump.fun WebSocket API');
          this.isConnected = true;
          this.reconnectAttempts = 0;
          resolve();
          
          // Notify subscribers that we're connected
          eventBus.publish(events.PUMPFUN_WEBSOCKET_CONNECTED, {
            timestamp: new Date().toISOString()
          });
        };
        
        this.socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.processWebSocketData(data);
          } catch (error) {
            console.error('Error processing WebSocket message:', error);
            Sentry.captureException(error);
          }
        };
        
        this.socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          Sentry.captureException(error);
          
          // Notify subscribers about the error
          eventBus.publish(events.PUMPFUN_WEBSOCKET_ERROR, {
            error: 'WebSocket connection error',
            timestamp: new Date().toISOString()
          });
        };
        
        this.socket.onclose = () => {
          console.log('WebSocket connection closed');
          this.isConnected = false;
          
          // Notify subscribers that we're disconnected
          eventBus.publish(events.PUMPFUN_WEBSOCKET_DISCONNECTED, {
            timestamp: new Date().toISOString()
          });
          
          // Try to reconnect if not explicitly closed by the user
          this.handleReconnect();
        };
      } catch (error) {
        console.error('Error creating WebSocket connection:', error);
        Sentry.captureException(error);
        reject(error);
      }
    });
  }

  /**
   * Handle reconnection logic with exponential backoff
   */
  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts - 1);
      
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`);
      
      setTimeout(() => {
        this.connect().catch(error => {
          console.error('Reconnection attempt failed:', error);
        });
      }, delay);
    } else {
      console.error('Maximum reconnection attempts reached');
      eventBus.publish(events.PUMPFUN_WEBSOCKET_MAX_RETRIES_REACHED, {
        attempts: this.reconnectAttempts,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Process incoming WebSocket data and emit events with transformed data
   * @param {Object} data - Raw WebSocket data
   */
  processWebSocketData(data) {
    console.log('Received WebSocket data:', data.type || 'unknown type');
    
    // Check the data type/format and process accordingly
    if (data.type === 'developers') {
      // Transform developer data to match our application format
      const transformedData = this.transformDevelopersData(data.developers);
      
      // Emit event with the processed data
      eventBus.publish(events.PUMPFUN_DEVELOPERS_UPDATED, transformedData);
    } else if (data.type === 'projects') {
      // Handle project updates
      const transformedData = this.transformProjectsData(data.projects);
      
      // Emit event with the processed data
      eventBus.publish(events.PUMPFUN_PROJECTS_UPDATED, transformedData);
    } else if (data.type === 'tokens') {
      // Handle token updates
      eventBus.publish(events.PUMPFUN_TOKENS_UPDATED, data.tokens);
    } else if (data.type === 'transactions') {
      // Handle transaction updates
      eventBus.publish(events.PUMPFUN_TRANSACTIONS_UPDATED, data.transactions);
    } else {
      // For any other data type, just pass it through
      eventBus.publish(events.PUMPFUN_DATA_RECEIVED, data);
    }
  }

  /**
   * Transform raw WebSocket developer data to match our application format
   * @param {Array} developers - Raw developer data
   * @returns {Array} - Transformed developer data
   */
  transformDevelopersData(developers) {
    if (!Array.isArray(developers)) {
      console.warn('Received non-array developers data:', developers);
      return [];
    }

    // Apply similar transformation as in pumpFunService.js
    return developers.map(developer => ({
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
    }));
  }

  /**
   * Transform raw WebSocket project data to match our application format
   * @param {Array} projects - Raw project data
   * @returns {Array} - Transformed project data
   */
  transformProjectsData(projects) {
    if (!Array.isArray(projects)) {
      console.warn('Received non-array projects data:', projects);
      return [];
    }
    
    return projects.map(project => ({
      id: project.id,
      name: project.name,
      launchDate: project.launchDate || 'Unknown',
      status: project.rugPulled ? 'rugged' : 'success',
      bondedCurve: !!project.bondedCurve,
      initialPrice: project.initialPrice || 0,
      peakPrice: project.peakPrice || 0,
      returnRate: project.returnRate || 0,
      developerId: project.developerId || project.developerAddress
    }));
  }

  /**
   * Disconnect from the WebSocket API
   */
  disconnect() {
    if (this.socket && this.isConnected) {
      console.log('Disconnecting from Pump.fun WebSocket API');
      this.socket.close();
      this.isConnected = false;
    }
  }

  /**
   * Check if the WebSocket is currently connected
   * @returns {boolean} - Connection status
   */
  isActive() {
    return this.isConnected;
  }
}

// Create singleton instance
const pumpFunWebSocketService = new PumpFunWebSocketService();

export default pumpFunWebSocketService;