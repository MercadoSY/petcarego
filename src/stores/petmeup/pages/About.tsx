import React from 'react';
import { useStoreData } from '../../../contexts/StoreContext';

/**
 * @description The 'About Us' page for the Seaside store, with a unique purple theme.
 */
const About: React.FC = () => {
  const storeData = useStoreData();
  return (
    <div className="rounded-lg border border-purple-300 bg-purple-100 p-6">
      <h2 className="mb-4 text-3xl font-bold text-purple-800">Welcome to Seaside Pet Hospital</h2>
      <p className="whitespace-pre-wrap text-purple-700">{storeData.about_us}</p>
    </div>
  );
};

export default About;