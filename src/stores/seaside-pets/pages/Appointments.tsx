import React from 'react';
import { useStoreData } from '../../../contexts/StoreContext';

/**
 * @description The 'Shop' page for the Seaside store, displaying items with a unique light-blue theme.
 */
const Shop: React.FC = () => {
  const { shop_items: items } = useStoreData();
  return (
    <div>
      <h2 className="mb-8 text-center text-3xl font-bold text-sky-800 md:mb-12 md:text-4xl">
        Our Products
      </h2>
      {items.length === 0 ? (
        <p className="text-center text-lg text-gray-500 md:text-xl">
          No products available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {items.map(item => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img src={item.image_url} alt={item.name} className="h-56 w-full object-cover sm:h-64" />
              <div className="p-4 md:p-6">
                <h3 className="text-xl font-semibold text-gray-800 md:text-2xl">{item.name}</h3>
                <p className="mt-2 text-base text-gray-600">{item.description}</p>
                <p className="mt-4 text-right text-xl font-bold text-sky-600 md:text-2xl">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;