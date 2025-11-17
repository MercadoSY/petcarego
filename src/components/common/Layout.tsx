import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * @description A general layout component that provides a consistent structure for pages.
 */
const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* A shared header could go here if needed */}
      <main>
        {/* The Outlet component renders the matched child route component */}
        <Outlet />
      </main>
      {/* A shared footer could go here */}
    </div>
  );
};

export default Layout;