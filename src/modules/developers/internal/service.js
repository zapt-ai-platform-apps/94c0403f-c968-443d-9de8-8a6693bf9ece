import * as Sentry from '@sentry/browser';
import { fetchDeveloperById } from '../../dashboard/internal/data';
import { eventBus } from '../../core/events';
import { events } from '../events';
import { validateDeveloper, validateDeveloperId } from '../validators';

/**
 * Load a developer by ID
 * @param {string} id - Developer ID
 * @returns {Promise<Object>} - Developer data
 */
export const loadDeveloperById = async (id) => {
  try {
    // Validate the ID
    const validatedId = validateDeveloperId(id, {
      actionName: 'loadDeveloperById',
      location: 'developers/service.js',
      direction: 'incoming',
      moduleFrom: 'UI',
      moduleTo: 'developers'
    });
    
    console.log(`Loading developer with ID: ${validatedId}`);
    
    const developer = await fetchDeveloperById(validatedId);
    
    // Validate the response
    const validatedDeveloper = validateDeveloper(developer, {
      actionName: 'loadDeveloperById',
      location: 'developers/service.js',
      direction: 'incoming',
      moduleFrom: 'API',
      moduleTo: 'developers'
    });
    
    // Publish loaded event
    eventBus.publish(events.DEVELOPER_LOADED, validatedDeveloper);
    
    return validatedDeveloper;
  } catch (error) {
    console.error('Error loading developer:', error);
    Sentry.captureException(error);
    
    // Publish error event
    eventBus.publish(events.DEVELOPER_LOAD_ERROR, {
      id,
      message: 'Failed to load developer data',
      error
    });
    
    throw error;
  }
};

/**
 * Calculate developer success rate
 * @param {Object} developer - Developer data
 * @returns {string} - Success rate percentage
 */
export const calculateSuccessRate = (developer) => {
  if (!developer || developer.totalProjects <= 0) return '0';
  return ((developer.successfulProjects / developer.totalProjects) * 100).toFixed(0);
};

/**
 * Calculate developer rug rate
 * @param {Object} developer - Developer data
 * @returns {string} - Rug rate percentage
 */
export const calculateRugRate = (developer) => {
  if (!developer || developer.totalProjects <= 0) return '0';
  return ((developer.ruggedProjects / developer.totalProjects) * 100).toFixed(0);
};