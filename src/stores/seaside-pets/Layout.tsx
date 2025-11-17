import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams, useLocation } from 'react-router-dom';
import { useStoreData } from '../../contexts/StoreContext';

/**
 * @description The responsive, unique layout for the Seaside Pets store, featuring a collapsible sidebar.
 */
const SeasidePetsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { storeSlug } = useParams<{ storeSlug: string }>();
  const storeData = useStoreData();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center rounded-md px-4 py-3 text-gray-200 transition-colors duration-200 hover:bg-sky-600 hover:text-white ${
      isActive ? 'bg-sky-700 font-semibold text-white' : ''
    }`;

  const SidebarContent = () => (
    <>
      <div className="flex flex-col items-center border-b border-sky-700 p-6">
        <img
          src="https://www.svgrepo.com/show/500123/turtle.svg"
          alt="Seaside Pets Logo"
          className="mb-4 h-20 w-20"
        />
        <h1 className="text-center text-xl font-bold tracking-wider">{storeData.name}</h1>
      </div>
      <nav className="flex-grow p-4">
        <NavLink to={`/store/${storeSlug}/about`} className={navLinkClasses}>
          About Us
        </NavLink>
        <NavLink to={`/store/${storeSlug}/shop`} className={navLinkClasses} end>
          Shop
        </NavLink>
        <NavLink to={`/store/${storeSlug}/appointments`} className={navLinkClasses}>
          Appointments
        </NavLink>
      </nav>
      <div className="p-4">
        <Link
          to="/find-a-store"
          className="inline-flex w-full items-center justify-center rounded-md bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-sky-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Selection
        </Link>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-sky-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 transform flex-col bg-sky-800 text-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <header className="flex items-center justify-between bg-sky-800 p-4 text-white shadow-md md:hidden">
          <h1 className="text-lg font-bold">{storeData.name}</h1>
          <button onClick={() => setSidebarOpen(true)} className="rounded p-2 hover:bg-sky-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </header>

        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
};

export default SeasidePetsLayout;