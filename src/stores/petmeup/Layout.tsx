import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStoreData } from '../../contexts/StoreContext';

/**
 * @description The unique layout for the Seaside Pets store, featuring a sidebar navigation.
 */
const SeasidePetsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { storeSlug } = useParams<{ storeSlug: string }>();
  const storeData = useStoreData(); // Can use context here too!

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="flex w-64 flex-col bg-teal-800 p-4 text-white">
        <h1 className="mb-8 text-center text-2xl font-bold">{storeData.name}</h1>
        <nav className="flex flex-col space-y-2">
          <Link to={`/store/${storeSlug}/about`} className="rounded-md px-4 py-2 hover:bg-teal-700">About Us</Link>
          <Link to={`/store/${storeSlug}/shop`} className="rounded-md px-4 py-2 hover:bg-teal-700">Shop</Link>
          <Link to={`/store/${storeSlug}/appointments`} className="rounded-md px-4 py-2 hover:bg-teal-700">Appointments</Link>
        </nav>
        <div className="mt-auto">
          <Link to="/find-a-store" className="inline-flex items-center text-sm hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
            Back to Selection
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-50 p-8">
        {children}
      </main>
    </div>
  );
};

export default SeasidePetsLayout;