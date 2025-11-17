import React from 'react';
import { useStoreData } from '../../../contexts/StoreContext';

/**
 * @description The 'Shop' page for the Seaside store, displaying items with a unique light-blue theme.
 */
const Shop: React.FC = () => {
  const { shop_items: items } = useStoreData();
  return (
    <div>
      <h2 className="mb-12 text-center text-4xl font-bold text-sky-800">Our Products</h2>
      {items.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No products available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map(item => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img src={item.image_url} alt={item.name} className="h-64 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800">{item.name}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
                <p className="mt-4 text-right text-2xl font-bold text-sky-600">
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