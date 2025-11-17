import React, { lazy, Suspense, useEffect, useState, useMemo } from 'react'; // Import useMemo
import { Outlet, useParams, Link, useLocation } from 'react-router-dom';
import type { StoreWithShopItems } from '../types';
import { getStoreBySlug } from '../services/api';
import { StoreProvider } from '../contexts/StoreContext';

/**
 * @description Fetches store data and dynamically loads the correct Layout for that store.
 */
const DynamicStoreLayout: React.FC = () => {
  const { storeSlug } = useParams<{ storeSlug: string }>();
  const location = useLocation();
  const [storeData, setStoreData] = useState<StoreWithShopItems | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storeSlug) return;
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getStoreBySlug(storeSlug);
        if (data) setStoreData(data);
        else setError(`Store "${storeSlug}" not found.`);
      } catch (err) {
        setError('Failed to fetch store data.');
      } finally {
        setLoading(false);
      }
    };
    fetchStoreData();
  }, [storeSlug]);

  // --- PERFORMANCE FIX IS HERE ---
  // Memoize the lazy-loaded component. It will only be re-created when storeSlug changes.
  const StoreLayoutComponent = useMemo(() => {
    if (!storeSlug) return null;
    return lazy(() =>
      import(`../stores/${storeSlug}/Layout.tsx`)
        .catch(() => ({
          default: () => <div className="p-8 text-center text-red-500">Layout for "{storeSlug}" not found.</div>
        }))
    );
  }, [storeSlug]);

  if (loading) {
    return <div className="p-8 text-center">Loading store layout...</div>;
  }

  if (error || !storeData || !StoreLayoutComponent) {
    return (
      <div className="p-8 text-center text-red-500">
        <h2>{error || 'Store data could not be loaded.'}</h2>
        <Link to="/find-a-store" className="text-blue-500 hover:underline">Return to Store Selection</Link>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="p-8 text-center">Loading UI...</div>}>
      <StoreProvider value={storeData}>
        <StoreLayoutComponent>
          {/* The key on the Outlet is still crucial for swapping the page content */}
          <Outlet key={location.pathname} />
        </StoreLayoutComponent>
      </StoreProvider>
    </Suspense>
  );
};

export default DynamicStoreLayout;