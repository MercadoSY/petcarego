import React from 'react';
import { useStoreData } from '../../../contexts/StoreContext';

/**
 * @description The 'About Us' page for the Happy Paws store, with content from the context.
 */
const About: React.FC = () => {
  const storeData = useStoreData();
  return (
    <div className="overflow-hidden rounded-2xl border-4 border-green-300 bg-white shadow-xl">
      <div className="bg-green-100 p-8">
        <div className="flex flex-col items-center gap-4 text-center text-green-900">
          <img
            src="https://www.svgrepo.com/show/321202/paw-heart.svg"
            alt="Happy Paws Logo"
            className="h-16 w-16"
          />
          <h2
            className="text-4xl font-bold"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
          >
            About Happy Paws
          </h2>
        </div>
      </div>
      <div className="p-8">
        <p className="whitespace-pre-wrap text-lg leading-relaxed text-stone-700">
          {storeData.about_us}
        </p>
      </div>
    </div>
  );
};

export default About;