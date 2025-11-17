import { createContext, useContext } from 'react';
import type { StoreWithShopItems } from '../types';

/**
 * @description Context to provide store data to nested child routes.
 */
const StoreContext = createContext<StoreWithShopItems | null>(null);

/**
 * @description Custom hook to easily access the store data from the context.
 */
export const useStoreData = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStoreData must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = StoreContext.Provider;