'use client';

import Link from 'next/link';
import Image from 'next/image';
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

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: '/', label: 'Explore' },
    { href: '/about', label: 'About' },
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
        className={`flex items-center gap-1 px-1.5 py-1.5 rounded-full transition-all duration-300 ${
          isDetailPage && !scrolled
            ? 'bg-black/30 backdrop-blur-xl border border-white/15 shadow-lg shadow-black/20'
            : 'bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border border-stone-200/60 dark:border-stone-700/60 shadow-lg shadow-stone-900/5 dark:shadow-black/20'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center pl-1 pr-0.5">
          <Image
            src="/images/logo-icon.svg"
            alt="Siem Reap Cafe Finder"
            width={30}
            height={30}
            className="object-contain"
          />
        </Link>

        <div className="w-px h-5 bg-stone-200/60 dark:bg-stone-700/40" />

        {navLinks.map((link) => {
          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900'
                  : isDetailPage && !scrolled
                    ? 'text-white/80 hover:text-white hover:bg-white/15'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        <div className={`w-px h-5 ${
          isDetailPage && !scrolled ? 'bg-white/20' : 'bg-stone-200/60 dark:bg-stone-700/40'
        }`} />

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors ${
            isDetailPage && !scrolled
              ? 'text-white/80 hover:text-white hover:bg-white/15'
              : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
