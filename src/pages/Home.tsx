import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getStores } from '../services/api';
import type { Store } from '../types';
import spriteHref from '../assets/sprite.svg';

// A curated list of high-quality pet images for the background
const backgroundImages = [
  'https://c.pxhere.com/photos/a3/cd/dog_weimaraner_portrait_remote_access-420058.jpg!d',
  'https://c.pxhere.com/photos/02/cf/dog_dalmatians_pet_dog_breed_animal_portrait_stains_dog_head_hundeportrait-1060806.jpg!d',
  'https://c.pxhere.com/photos/e0/cd/cat_red_cute_mackerel_tiger_sweet_cuddly_animal-497073.jpg!d',
  'https://c.pxhere.com/photos/a5/bf/cat_animal_pet_tabby_eye-18061.jpg!d',
  'https://c.pxhere.com/photos/8b/c2/sleeping_chameleon_yemen_chameleon_reptile_animal_green_head_eye_insect_eater-1009768.jpg!d',
  'https://c.pxhere.com/photos/5a/c8/hand_stroking_parrot_pet_bird_white_budgie-551592.jpg!d',
  'https://c.pxhere.com/photos/11/4d/photo-191618.jpg!d',
  'https://c.pxhere.com/photos/d5/a9/dog_labrador_light_brown_pet_hundeportrait_dog_head_in_the_free_profile-655507.jpg!d',
];

/**
 * @description The store selection page with a two-column layout and location/store filters.
 */
const Home: React.FC = () => {
  // --- State for data fetching ---
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- State for form selection ---
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  // --- State for dynamic image ---
  const [imageUrl, setImageUrl] = useState(
    () => backgroundImages[Math.floor(Math.random() * backgroundImages.length)]
  );
  const [imageOpacity, setImageOpacity] = useState(1);

  // --- Fetch stores on component mount ---
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const storesData = await getStores();
        const validStores = storesData.filter(store => store.id != null);
        setStores(validStores);
        setError(null);
      } catch (err) {
        setError('Failed to fetch stores. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  // --- Image change logic with transition ---
  const handleChangeImage = useCallback(() => {
    if (imageOpacity === 1) {
      setImageOpacity(0); // Start fade-out
    }
  }, [imageOpacity]);

  // --- Automatically change image every 10 seconds ---
  useEffect(() => {
    const imageChangeInterval = setInterval(() => {
      handleChangeImage();
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(imageChangeInterval);
  }, [handleChangeImage]);

  useEffect(() => {
    let timer: number;
    // When fade-out is complete (opacity is 0), preload and set the new image
    if (imageOpacity === 0) {
      timer = window.setTimeout(() => {
        let newImageUrl = imageUrl;
        // Ensure we get a different image
        while (newImageUrl === imageUrl) {
          newImageUrl = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
        }

        const img = new Image();
        img.src = newImageUrl;
        img.onload = () => {
          setImageUrl(newImageUrl);
          setImageOpacity(1); // Fade back in with the new image
        };
        img.onerror = () => {
          // If the new image fails to load, just fade back in with the old one
          setImageOpacity(1);
        };
      }, 500); // This duration should match the CSS transition duration
    }
    return () => window.clearTimeout(timer);
  }, [imageOpacity, imageUrl]);

  // --- Memoized derived state for locations and filtered stores ---
  const locations = useMemo(() => {
    const validLocations = stores.map(store => store.location).filter((loc): loc is string => !!loc);
    return [...new Set(validLocations)].sort();
  }, [stores]);

  const filteredStores = useMemo(() => {
    if (!selectedLocation) return [];
    return stores.filter(store => store.location === selectedLocation);
  }, [stores, selectedLocation]);

  // --- Event Handlers ---
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
    setSelectedStore(null);
  };

  const handleStoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const storeId = parseInt(e.target.value, 10);
    const store = stores.find(s => s.id === storeId) || null;
    setSelectedStore(store);
  };

  // --- Direct link from database for Google Maps ---
  const googleMapsUrl = selectedStore?.google_maps_url || '#';

  const selectStyles =
    "mt-2 block w-full cursor-pointer appearance-none rounded-lg border-0 bg-white py-3 px-4 pr-12 text-slate-900 shadow-md ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-darkOrange-500 sm:text-base sm:leading-6 disabled:cursor-not-allowed disabled:bg-slate-200/70 disabled:text-slate-500 transition-shadow duration-200 hover:ring-2 hover:ring-inset hover:ring-darkOrange-500";

  return (
    <div className="flex min-h-screen font-sans">
      {/* Left side: Image Panel */}
      <div className="relative hidden w-1/2 bg-slate-800 lg:block">
        <div
          className="h-full w-full bg-cover bg-center transition-opacity duration-500 ease-in-out"
          style={{
            backgroundImage: `url('${imageUrl}')`,
            opacity: imageOpacity,
          }}
        ></div>
        {/* Feathered Edge Effect */}
        <div className="pointer-events-none absolute top-0 right-0 h-full bg-gradient-to-l from-brandBlue-100 to-transparent"></div>
      </div>

      {/* Right side: Selection Panel */}
      <div className="relative flex w-full items-center justify-center overflow-hidden bg-brandBlue-100 p-8 lg:w-1/2">
        {/* Background SVG Pattern */}
        <div className="absolute top-0 left-0 h-full w-full transform-gpu bg-hero-pattern bg-repeat opacity-10 scale-150 -rotate-12"></div>

        {/* Back to Landing Page Arrow */}
        <Link
          to="/"
          className="absolute top-6 left-6 z-20 rounded-full p-2 text-slate-600 transition-colors hover:bg-black/10 hover:text-slate-800"
          aria-label="Back to Home"
          title="Back to Home"
        >
          <svg className="h-12 w-12" aria-hidden="true">
            <use href={`${spriteHref}#arrow-left-2`} />
          </svg>
        </Link>

        <div className="relative z-10 w-full max-w-md text-center">
          {/* Logo */}
          <svg className="mx-auto mb-6 h-28 w-28" aria-label="PetCareGo Logo" role="img">
            <use href={`${spriteHref}#pet-shop`} />
          </svg>

          <h1 className="mb-2 text-5xl font-extrabold text-slate-800">Find a Clinic</h1>
          <p className="mb-8 text-lg text-slate-600">Select a location to see available veterinary clinics.</p>

          {loading && <p className="text-lg text-slate-500">Loading locations...</p>}
          {error && <p className="text-lg font-semibold text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="space-y-6 text-left">
              {/* Location Dropdown */}
              <div>
                <label htmlFor="location" className="block text-lg font-semibold leading-6 text-slate-700">
                  Location
                </label>
                <div className="relative">
                  <select id="location" name="location" value={selectedLocation} onChange={handleLocationChange} className={selectStyles}>
                    <option value="">-- Select a Location --</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[0.75rem]">
                    <svg className="h-[1.25em] w-[1.25em] text-slate-900" aria-hidden="true">
                      <use href={`${spriteHref}#arrow-down`} />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Store Dropdown */}
              <div>
                <label htmlFor="store" className="block text-lg font-semibold leading-6 text-slate-700">
                  Clinic
                </label>
                <div className="relative">
                  <select
                    id="store"
                    name="store"
                    value={selectedStore?.id.toString() || ''}
                    onChange={handleStoreChange}
                    disabled={!selectedLocation || !filteredStores.length}
                    className={selectStyles}
                  >
                    <option value="">-- Select a Clinic --</option>
                    {filteredStores.map(store => (
                      <option key={store.id} value={store.id.toString()}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[0.75rem]">
                    <svg className="h-[1.25em] w-[1.25em] text-slate-900" aria-hidden="true">
                      <use href={`${spriteHref}#arrow-down`} />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Selected Store Details (conditional) */}
              {selectedStore && (
                <div className="animate-fade-in mt-8 transform rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <h2 className="text-3xl font-bold text-slate-800">{selectedStore.name}</h2>
                  <p className="mt-1 text-base text-slate-600">{selectedStore.location}</p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <Link
                      to={`/store/${selectedStore.slug}`}
                      className="flex flex-1 items-center justify-center gap-2 transform rounded-full bg-darkOrange-600 px-4 py-3 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-darkOrange-500 focus:outline-none focus:ring-4 focus:ring-darkOrange-300"
                    >
                      <svg className="h-5 w-5" style={{ filter: 'brightness(0) invert(1)' }} aria-hidden="true">
                        <use href={`${spriteHref}#logout-3`} />
                      </svg>
                      <span>Visit Page</span>
                    </Link>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 transform rounded-full bg-brandBlue-600 px-4 py-3 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-brandBlue-500 focus:outline-none focus:ring-4 focus:ring-brandBlue-300"
                    >
                      <svg className="h-5 w-5" style={{ filter: 'brightness(0) invert(1)' }} aria-hidden="true">
                        <use href={`${spriteHref}#map-point-wave`} />
                      </svg>
                      <span>View on Map</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;