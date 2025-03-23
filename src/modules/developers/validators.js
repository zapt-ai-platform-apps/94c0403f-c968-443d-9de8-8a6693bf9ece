import { createValidator } from '../core/validators';

/**
 * Validates a developer object
 */
export const validateDeveloper = createValidator(
  (developer) => {
    // Check required fields
    const required = ['id', 'name', 'address', 'totalProjects', 'dumperRating', 'bondingRate'];
    
    for (const field of required) {
      if (developer[field] === undefined) {
        throw new Error(`Developer is missing required field: ${field}`);
      }
    }
    
    // Type validations
    if (typeof developer.id !== 'string') {
      throw new Error(`Developer id must be a string`);
    }
    
    if (typeof developer.name !== 'string') {
      throw new Error(`Developer name must be a string`);
    }
    
    if (typeof developer.totalProjects !== 'number' && isNaN(Number(developer.totalProjects))) {
      throw new Error(`Developer totalProjects must be a number`);
    }
    
    return developer;
  },
  'Developer'
);

/**
 * Validates a developer id
 */
export const validateDeveloperId = createValidator(
  (id) => {
    if (typeof id !== 'string' || !id) {
      throw new Error(`Developer id must be a non-empty string`);
    }
    return id;
  },
  'DeveloperId'
);