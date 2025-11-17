import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Landing from '../pages/Landing';
import Home from '../pages/Home';
import StorePageLoader from '../components/common/StorePageLoader';
import DynamicStoreLayout from '../pages/DynamicStoreLayout';

/**
 * @description Defines the application's routes using React Router.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'find-a-store',
        element: <Home />,
      },
      {
        path: 'store/:storeSlug',
        element: <DynamicStoreLayout />,
        children: [
          {
            index: true,
            element: <StorePageLoader pageName="About" />,
          },
          {
            path: 'about',
            element: <StorePageLoader pageName="About" />,
          },
          {
            path: 'shop',
            element: <StorePageLoader pageName="Shop" />,
          },
          {
            path: 'appointments',
            element: <StorePageLoader pageName="Appointments" />,
          },
        ],
      },
    ],
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;