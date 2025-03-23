import React, { createContext, useContext } from 'react';
import { useDashboardState } from '../internal/state';

// Create context
const DashboardContext = createContext(null);

/**
 * Custom hook to access dashboard context
 * @returns {Object} Dashboard context
 */
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};

/**
 * Provider component for dashboard state
 */
export default function DashboardProvider({ children }) {
  const dashboardState = useDashboardState();
  
  return (
    <DashboardContext.Provider value={dashboardState}>
      {children}
    </DashboardContext.Provider>
  );
}