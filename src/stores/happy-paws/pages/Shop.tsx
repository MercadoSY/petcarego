import React from 'react';
import { useStoreData } from '../../../contexts/StoreContext';

const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z" />
  </svg>
);

/**
 * @description The 'Shop' page for the Happy Paws store, displaying items from the context.
 */
const Shop: React.FC = () => {
  const { shop_items: items } = useStoreData();
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4 text-center text-stone-700">
        <ShoppingBagIcon className="h-16 w-16 text-emerald-600" />
        <h2
          className="text-4xl font-bold"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
          Our Paw-some Shop
        </h2>
        <p className="max-w-2xl text-lg text-stone-600">
          Treat your furry friends with our curated selection of toys, treats, and healthcare
          products. Everything you need to keep their tails wagging!
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-stone-300 bg-stone-100 p-12 text-center">
          <p className="text-stone-500">
            Our shelves are currently empty, but we're working on stocking up with new goodies.
            Please check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:border-emerald-400 hover:shadow-lg"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-bold text-stone-800">{item.name}</h3>
                <p className="mt-2 flex-grow text-sm text-stone-600">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-black text-emerald-600">
                    ${item.price.toFixed(2)}
                  </p>
                  <button className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-amber-900 transition-colors hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;