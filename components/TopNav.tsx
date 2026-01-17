'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { useState, useEffect } from 'react';

export function TopNav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isDetailPage = pathname.startsWith('/cafe/') && pathname !== '/cafe';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      // Change style based on scroll position
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    {
      href: '/',
      label: 'Home',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      href: '/about',
      label: 'About',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        hidden ? '-translate-y-20 opacity-0' : 'translate-y-0 opacity-100'
      } ${
        isDetailPage && !scrolled ? 'top-6' : 'top-4'
      }`}
    >
      <div
        className={`flex items-center gap-1 px-1.5 py-1.5 rounded-full shadow-lg transition-all duration-300 ${
          isDetailPage && !scrolled
            ? 'bg-black/30 backdrop-blur-xl border border-white/20 shadow-black/20'
            : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-black/10 dark:shadow-black/30'
        }`}
      >
        {navLinks.map((link) => {
          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-500 text-white shadow-sm'
                  : isDetailPage && !scrolled
                    ? 'text-white/80 hover:text-white hover:bg-white/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {link.icon}
              {isActive && <span>{link.label}</span>}
            </Link>
          );
        })}

        <div className={`w-px h-6 mx-1 ${
          isDetailPage && !scrolled ? 'bg-white/30' : 'bg-gray-200 dark:bg-gray-700'
        }`} />

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors ${
            isDetailPage && !scrolled
              ? 'text-white/80 hover:text-white hover:bg-white/20'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
