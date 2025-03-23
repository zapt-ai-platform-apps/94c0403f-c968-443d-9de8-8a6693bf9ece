import { createValidator } from '../core/validators';

/**
 * Validates a project object
 */
export const validateProject = createValidator(
  (project) => {
    // Check required fields
    const required = ['id', 'name', 'status'];
    
    for (const field of required) {
      if (project[field] === undefined) {
        throw new Error(`Project is missing required field: ${field}`);
      }
    }
    
    // Type validations
    if (typeof project.id !== 'string') {
      throw new Error(`Project id must be a string`);
    }
    
    if (typeof project.name !== 'string') {
      throw new Error(`Project name must be a string`);
    }
    
    if (!['success', 'rugged'].includes(project.status)) {
      throw new Error(`Project status must be 'success' or 'rugged'`);
    }
    
    return project;
  },
  'Project'
);

/**
 * Validates an array of projects
 */
export const validateProjects = createValidator(
  (projects) => {
    if (!Array.isArray(projects)) {
      throw new Error('Projects must be an array');
    }
    
    return projects.map(project => {
      try {
        return validateProject(project, {
          actionName: 'validateProjects',
          location: 'projects/validators.js',
          direction: 'internal'
        });
      } catch (error) {
        console.error(`Invalid project in array:`, project, error);
        throw error;
      }
    });
  },
  'Projects'
);