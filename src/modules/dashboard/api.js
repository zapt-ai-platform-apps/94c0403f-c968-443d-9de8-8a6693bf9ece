/**
 * Public API for the Dashboard module
 */
import { useDashboardContext } from './ui/DashboardProvider';
import DashboardProvider from './ui/DashboardProvider';
import TimeframeSelector from './ui/TimeframeSelector';
import StatCard from './ui/StatCard';
import DeveloperDistributionChart from './ui/DeveloperDistributionChart';
import RealTimeIndicator from './ui/RealTimeIndicator';

// Re-export context hook with a more generic name
export const useDashboard = useDashboardContext;

// Export components that other modules can use
export {
  DashboardProvider,
  TimeframeSelector,
  StatCard,
  DeveloperDistributionChart,
  RealTimeIndicator
};

// Export events object
export { events } from './events';