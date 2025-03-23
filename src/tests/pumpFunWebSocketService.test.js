import { describe, it, expect, vi, beforeEach } from 'vitest';
import pumpFunWebSocketService from '../modules/dashboard/internal/pumpFunWebSocketService';
import { eventBus } from '../modules/core/events';
import { events } from '../modules/dashboard/events';

// Mock WebSocket
global.WebSocket = vi.fn().mockImplementation(() => ({
  onopen: vi.fn(),
  onmessage: vi.fn(),
  onerror: vi.fn(),
  onclose: vi.fn(),
  close: vi.fn()
}));

// Mock Sentry to avoid actual error reporting during tests
vi.mock('@sentry/browser', () => ({
  captureException: vi.fn()
}));

describe('PumpFun WebSocket Service', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Reset service state
    pumpFunWebSocketService.isConnected = false;
    pumpFunWebSocketService.socket = null;
    pumpFunWebSocketService.reconnectAttempts = 0;
  });

  describe('connect', () => {
    it('should create a WebSocket connection to the correct URL', async () => {
      const connectPromise = pumpFunWebSocketService.connect();
      
      // Simulate connection opening
      pumpFunWebSocketService.socket.onopen();
      
      await connectPromise;
      
      expect(global.WebSocket).toHaveBeenCalledWith('wss://pumpportal.fun/api/data');
      expect(pumpFunWebSocketService.isConnected).toBe(true);
    });

    it('should publish a connected event when socket is opened', async () => {
      const publishSpy = vi.spyOn(eventBus, 'publish');
      const connectPromise = pumpFunWebSocketService.connect();
      
      // Simulate connection opening
      pumpFunWebSocketService.socket.onopen();
      
      await connectPromise;
      
      expect(publishSpy).toHaveBeenCalledWith(
        events.PUMPFUN_WEBSOCKET_CONNECTED,
        expect.objectContaining({ timestamp: expect.any(String) })
      );
    });
  });

  describe('disconnect', () => {
    it('should close the socket when disconnecting', async () => {
      // First connect
      const connectPromise = pumpFunWebSocketService.connect();
      pumpFunWebSocketService.socket.onopen();
      await connectPromise;
      
      // Then disconnect
      pumpFunWebSocketService.disconnect();
      
      expect(pumpFunWebSocketService.socket.close).toHaveBeenCalled();
      expect(pumpFunWebSocketService.isConnected).toBe(false);
    });
  });

  describe('message handling', () => {
    it('should process and publish developer updates', async () => {
      const publishSpy = vi.spyOn(eventBus, 'publish');
      
      // Connect
      const connectPromise = pumpFunWebSocketService.connect();
      pumpFunWebSocketService.socket.onopen();
      await connectPromise;
      
      // Mock message data
      const mockData = {
        type: 'developers',
        developers: [
          {
            id: '1',
            name: 'Test Developer',
            address: '0x123456',
            totalProjects: 5
          }
        ]
      };
      
      // Simulate message
      pumpFunWebSocketService.socket.onmessage({ 
        data: JSON.stringify(mockData) 
      });
      
      // Manually call processWebSocketData since the mock doesn't trigger it
      pumpFunWebSocketService.processWebSocketData(mockData);
      
      // Should publish the developers updated event
      expect(publishSpy).toHaveBeenCalledWith(
        events.PUMPFUN_DEVELOPERS_UPDATED,
        expect.arrayContaining([
          expect.objectContaining({
            id: '1',
            name: 'Test Developer'
          })
        ])
      );
    });
    
    it('should handle invalid data gracefully', () => {
      // Connect
      const connectPromise = pumpFunWebSocketService.connect();
      pumpFunWebSocketService.socket.onopen();
      
      // Test with various invalid data formats
      expect(() => pumpFunWebSocketService.transformDevelopersData(null)).not.toThrow();
      expect(() => pumpFunWebSocketService.transformDevelopersData(undefined)).not.toThrow();
      expect(() => pumpFunWebSocketService.transformDevelopersData('not an array')).not.toThrow();
      expect(() => pumpFunWebSocketService.transformProjectsData(null)).not.toThrow();
      
      // Should return empty arrays for invalid inputs
      expect(pumpFunWebSocketService.transformDevelopersData(null)).toEqual([]);
      expect(pumpFunWebSocketService.transformProjectsData('not an array')).toEqual([]);
    });
  });
});