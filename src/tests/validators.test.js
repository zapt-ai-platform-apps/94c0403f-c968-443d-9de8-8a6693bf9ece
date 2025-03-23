import { describe, it, expect, vi } from 'vitest';
import { validateDeveloper, validateDeveloperId } from '../modules/developers/validators';
import { validateTimeframe } from '../modules/dashboard/validators';
import { validateProjects } from '../modules/projects/validators';

// Mock Sentry to avoid actual error reporting during tests
vi.mock('@sentry/browser', () => ({
  captureException: vi.fn()
}));

describe('Validator Functions', () => {
  describe('validateDeveloper', () => {
    it('should validate a valid developer object', () => {
      const developer = {
        id: '1',
        name: 'Test Developer',
        address: '0x123456789',
        totalProjects: 10,
        dumperRating: 7.5,
        bondingRate: 80
      };
      
      expect(() => validateDeveloper(developer)).not.toThrow();
    });
    
    it('should throw on missing required fields', () => {
      const developer = {
        id: '1',
        name: 'Test Developer'
        // Missing other required fields
      };
      
      expect(() => validateDeveloper(developer)).toThrow();
    });
  });
  
  describe('validateDeveloperId', () => {
    it('should validate a valid developer ID', () => {
      expect(() => validateDeveloperId('1')).not.toThrow();
    });
    
    it('should throw on empty ID', () => {
      expect(() => validateDeveloperId('')).toThrow();
    });
    
    it('should throw on non-string ID', () => {
      expect(() => validateDeveloperId(123)).toThrow();
    });
  });
  
  describe('validateTimeframe', () => {
    it('should validate valid timeframe values', () => {
      expect(() => validateTimeframe('7d')).not.toThrow();
      expect(() => validateTimeframe('30d')).not.toThrow();
      expect(() => validateTimeframe('90d')).not.toThrow();
      expect(() => validateTimeframe('all')).not.toThrow();
    });
    
    it('should throw on invalid timeframe values', () => {
      expect(() => validateTimeframe('1d')).toThrow();
      expect(() => validateTimeframe('invalid')).toThrow();
    });
  });
  
  describe('validateProjects', () => {
    it('should validate a valid projects array', () => {
      const projects = [
        {
          id: 'p1',
          name: 'Project 1',
          status: 'success'
        },
        {
          id: 'p2',
          name: 'Project 2',
          status: 'rugged'
        }
      ];
      
      expect(() => validateProjects(projects)).not.toThrow();
    });
    
    it('should throw on non-array input', () => {
      expect(() => validateProjects('not an array')).toThrow();
    });
    
    it('should throw on invalid project in array', () => {
      const projects = [
        {
          id: 'p1',
          name: 'Project 1',
          status: 'success'
        },
        {
          id: 'p2',
          name: 'Project 2',
          status: 'invalid' // Invalid status
        }
      ];
      
      expect(() => validateProjects(projects)).toThrow();
    });
  });
});