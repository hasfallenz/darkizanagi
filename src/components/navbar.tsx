'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { SearchModal } from './search';
import { Search as SearchIcon, Menu, X } from 'lucide-react';
import { Post } from '@/types';

interface NavbarProps {
  posts?: Post[];
}

export function Navbar({ posts = [] }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Listen for '/' key to trigger search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (
        e.key === '/' &&
        !isSearchOpen &&
        activeTag !== 'input' &&
        activeTag !== 'textarea'
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md transition-colors">
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Left: Logo / Brand */}
          <div className="flex items-center z-10">
            <Link
              href="/"
              className="flex items-center hover:opacity-90 transition-opacity shrink-0"
              aria-label="darkizanagi home"
            >
              <Image
                src="/logo.png"
                alt="darkizanagi"
                width={200}
                height={66}
                priority
                className="h-8 sm:h-10 md:h-12 w-auto object-contain dark:invert dark:brightness-125 transition-all"
              />
            </Link>
          </div>

          {/* Center: Floating Nav Links Pill (Centered on screen) */}
          <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 px-1.5 py-1 rounded-full border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/70 dark:bg-neutral-900/70 backdrop-blur-md gap-0.5 shadow-sm">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-800 shadow-xs font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 z-10">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search articles"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/40 text-xs transition-colors cursor-pointer"
            >
              <SearchIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-neutral-200/60 dark:bg-neutral-800 rounded text-neutral-500 dark:text-neutral-400 border border-neutral-300/60 dark:border-neutral-700/60">
                /
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md px-4 py-3 flex flex-col gap-1.5 animate-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal
        posts={posts}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
