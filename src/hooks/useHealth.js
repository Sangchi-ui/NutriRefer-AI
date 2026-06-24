import { useContext } from 'react';
import { HealthContext } from '../context/HealthContext';

/**
 * Custom hook to safely access the global HealthContext.
 * 
 * @returns {Object} The health context value containing states and actions.
 * @throws {Error} If used outside of a HealthProvider.
 */
export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
