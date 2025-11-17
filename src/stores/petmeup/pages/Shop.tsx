import React from 'react';
import { useStoreData } from '../../../contexts/StoreContext';

/**
 * @description The 'Shop' page for the Seaside store, displaying items with a unique theme.
 */
const Shop: React.FC = () => {
  const { shop_items: items } = useStoreData();
  return (
    <div className="rounded-lg border border-indigo-300 bg-indigo-100 p-6">
      <h2 className="mb-8 text-center text-3xl font-bold text-indigo-800">Our Products</h2>
      {items.length === 0 ? (
        <p className="text-center text-indigo-700">No products available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map(item => (
            <div key={item.id} className="overflow-hidden rounded-lg bg-white shadow-md">
              <img src={item.image_url} alt={item.name} className="h-56 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
                <p className="mt-4 text-right text-lg font-bold text-indigo-600">
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