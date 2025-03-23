import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPumpFunDevelopers, fetchPumpFunDeveloperById } from '../modules/dashboard/internal/pumpFunService';

// Mock fetch
global.fetch = vi.fn();

// Mock Sentry to avoid actual error reporting during tests
vi.mock('@sentry/browser', () => ({
  captureException: vi.fn()
}));

describe('Pump.fun API Service', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('fetchPumpFunDevelopers', () => {
    it('should fetch developers with correct timeframe parameter', async () => {
      // Mock successful response
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ([{ 
          id: '1', 
          name: 'TestDev',
          address: '0x123456',
          totalProjects: 5,
          dumperRating: 7.5
        }])
      });

      await fetchPumpFunDevelopers('30d');
      
      // Check if fetch was called with the correct URL
      expect(fetch).toHaveBeenCalledWith('https://api.pump.fun/v1/developers?timeframe=month');
    });

    it('should transform API data to application format', async () => {
      // Sample API response data
      const apiData = [{
        id: '1',
        address: '0x123456',
        name: 'TestDev',
        totalProjects: 5,
        ruggedProjects: 1
      }];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => apiData
      });

      const result = await fetchPumpFunDevelopers();
      
      // Check transformed structure
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('address');
      expect(result[0]).toHaveProperty('totalProjects');
      expect(result[0]).toHaveProperty('projects');
    });

    it('should handle API errors gracefully', async () => {
      // Mock failed response
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await expect(fetchPumpFunDevelopers()).rejects.toThrow('Failed to fetch Pump.fun developer data');
    });
  });

  describe('fetchPumpFunDeveloperById', () => {
    it('should fetch a single developer with the correct ID', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ 
          id: '123', 
          name: 'Developer123',
          address: '0x123456',
          totalProjects: 5
        })
      });

      await fetchPumpFunDeveloperById('123');
      
      // Check if fetch was called with the correct URL
      expect(fetch).toHaveBeenCalledWith('https://api.pump.fun/v1/developers/123');
    });

    it('should handle API errors when fetching a single developer', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Developer Not Found'
      });

      await expect(fetchPumpFunDeveloperById('nonexistent')).rejects.toThrow('Failed to fetch Pump.fun developer data');
    });
  });
});