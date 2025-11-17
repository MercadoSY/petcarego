import React from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import spriteHref from '../../assets/sprite.svg';

/**
 * @description The unique layout for the Happy Paws store, featuring a top navigation bar.
 */
const HappyPawsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { storeSlug } = useParams<{ storeSlug: string }>();

  const navLinkClasses =
    'px-6 py-3 rounded-full text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-600 focus:ring-white';
  const activeNavLinkClasses = 'bg-white text-emerald-800 shadow';
  const inactiveNavLinkClasses = 'text-emerald-100 hover:bg-emerald-500/75 hover:text-white';

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <header className="sticky top-0 z-10 bg-emerald-600 shadow-lg">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center">
            <div className="absolute left-0">
              <Link
                to="/find-a-store"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:inline">Change Clinic</span>
              </Link>
            </div>

            <Link
              to={`/store/${storeSlug}/about`}
              className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3"
            >
              <svg className="h-10 w-10" aria-label="Happy Paws Logo" role="img">
                <use href={`${spriteHref}#paw-heart`} />
              </svg>
              <h1
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
              >
                Happy Paws Clinic
              </h1>
            </Link>
          </div>
        </div>
        <nav className="bg-emerald-600/80 backdrop-blur-sm">
          <div className="container mx-auto flex justify-center p-2">
            <ul className="flex items-center gap-2 rounded-full bg-emerald-700/50 p-1 sm:gap-4">
              <li>
                <NavLink
                  to={`/store/${storeSlug}/about`}
                  className={({ isActive }) =>
                    `${navLinkClasses} ${isActive ? activeNavLinkClasses : inactiveNavLinkClasses}`
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/store/${storeSlug}/shop`}
                  className={({ isActive }) =>
                    `${navLinkClasses} ${isActive ? activeNavLinkClasses : inactiveNavLinkClasses}`
                  }
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/store/${storeSlug}/appointments`}
                  className={({ isActive }) =>
                    `${navLinkClasses} ${isActive ? activeNavLinkClasses : inactiveNavLinkClasses}`
                  }
                >
                  Appointments
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
};

export default HappyPawsLayout;