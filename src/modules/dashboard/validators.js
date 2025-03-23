import { createValidator } from '../core/validators';

/**
 * Validates a timeframe value
 */
export const validateTimeframe = createValidator(
  (timeframe) => {
    const validTimeframes = ['7d', '30d', '90d', 'all'];
    if (!validTimeframes.includes(timeframe)) {
      throw new Error(`Invalid timeframe: ${timeframe}. Must be one of: ${validTimeframes.join(', ')}`);
    }
    return timeframe;
  },
  'Timeframe'
);

/**
 * Validates dashboard data
 */
export const validateDashboardData = createValidator(
  (data) => {
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array');
    }
    
    // Validate each developer has required fields
    return data.map(developer => {
      const required = ['id', 'name', 'dumperRating', 'bondingRate', 'totalProjects'];
      
      for (const field of required) {
        if (developer[field] === undefined) {
          throw new Error(`Developer is missing required field: ${field}`);
        }
      }
      
      return developer;
    });
  },
  'DashboardData'
);