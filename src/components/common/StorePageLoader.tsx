import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

// Define the possible page names for type safety
type PageName = 'About' | 'Shop' | 'Appointments';

interface StorePageLoaderProps {
  pageName: PageName;
}

/**
 * @description Dynamically loads a page component from a specific store's directory.
 */
const StorePageLoader: React.FC<StorePageLoaderProps> = ({ pageName }) => {
  const { storeSlug } = useParams<{ storeSlug: string }>();

  if (!storeSlug) {
    return <div className="text-red-500">Error: No store specified in URL.</div>;
  }

  // Create a dynamically imported component based on URL params and props
  const PageComponent = lazy(() =>
    import(`../../stores/${storeSlug}/pages/${pageName}.tsx`)
      .catch(() => ({
        // This catch block creates a fallback component if the import fails.
        // This is crucial for handling cases where a store's UI hasn't been created yet.
        default: () => (
          <div className="text-center text-red-500">
            <h2 className="text-2xl font-bold">UI Not Found</h2>
            <p>The UI component for the "{pageName}" page of the "{storeSlug}" store has not been created.</p>
          </div>
        )
      }))
  );

  return (
    <Suspense fallback={<div className="text-center">Loading UI...</div>}>
      <PageComponent />
    </Suspense>
  );
};

export default StorePageLoader;