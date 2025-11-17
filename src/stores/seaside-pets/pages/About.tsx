import React from 'react';
import { useStoreData } from '../../../contexts/StoreContext';

/**
 * @description The 'About Us' page for the Seaside store, with a unique light-blue theme.
 */
const About: React.FC = () => {
  const storeData = useStoreData();
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
      <h2 className="mb-4 border-b-2 border-sky-100 pb-4 text-3xl font-bold text-sky-800 md:text-4xl">
        Welcome to Seaside Pet Hospital
      </h2>
      <p className="whitespace-pre-wrap pt-4 text-base leading-relaxed text-gray-700 md:text-lg">
        {storeData.about_us}
      </p>
    </div>
  );
};

export default About;