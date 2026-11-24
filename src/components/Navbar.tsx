import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { PageId } from '../data/siteData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'about', label: 'About' },
  { id: 'testimonials', label: 'Testimonials' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(0,191,255,0.2)] bg-[#101827]/88 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00BFFF]"
          aria-label="KBAmidele Dev Home"
        >
          <Logo />
        </button>

        {/* Zone 2: Primary Nav Links */}
        <nav aria-label="Primary Navigation" className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative cursor-pointer py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-150 ${
                  isActive
                    ? 'text-[#38BDF8]'
                    : 'text-[#AAB4C5] hover:text-[#F5F2EA] hover:drop-shadow-[0_0_8px_rgba(0,191,255,0.45)]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#38BDF8] shadow-[0_0_8px_rgba(0,191,255,0.7)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('contact')}
            className="btn-electric hidden cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFFF] sm:inline-flex"
          >
            Let&apos;s Work Together
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-[rgba(0,191,255,0.25)] text-[#F5F2EA] transition-colors hover:border-[#00BFFF] hover:bg-[#172338] md:hidden"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-[rgba(0,191,255,0.2)] bg-[#101827] px-4 py-4 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`flex min-h-[44px] w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#172338] text-[#00BFFF]'
                      : 'text-[#F5F2EA] hover:bg-[#172338]/70'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="btn-electric mt-3 flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold"
            >
              Let&apos;s Work Together
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
