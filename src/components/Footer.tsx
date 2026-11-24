import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { PageId, SITE_CONFIG } from '../data/siteData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(0,191,255,0.2)] bg-[#14243A]/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="cursor-pointer rounded-lg text-left"
            >
              <Logo />
            </button>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#AAB4C5]">
              Helping businesses, entrepreneurs, and content creators turn ideas into digital
              impact through graphic design, video editing, and intelligent AI automation.
            </p>
            <p className="mt-4 text-xs font-medium text-[#38BDF8]">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-[#F5F2EA]">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#AAB4C5]">
              {(
                [
                  { id: 'home', label: 'Home' },
                  { id: 'services', label: 'Services' },
                  { id: 'portfolio', label: 'Portfolio' },
                  { id: 'about', label: 'About Me' },
                  { id: 'testimonials', label: 'Testimonials' },
                  { id: 'contact', label: 'Contact' },
                ] as { id: PageId; label: string }[]
              ).map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="cursor-pointer transition-colors hover:text-[#00BFFF]"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-[#F5F2EA]">Ready to Start?</h3>
            <p className="mt-4 text-sm leading-relaxed text-[#AAB4C5]">
              Have a brand, video, or automation project in mind? Let&apos;s discuss your goals and
              build a tailored digital solution.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[rgba(0,191,255,0.4)] bg-[#172338] px-4 py-2.5 text-sm font-semibold text-[#F5F2EA] transition-all duration-150 hover:border-[#00BFFF] hover:text-[#38BDF8] hover:shadow-[0_0_18px_rgba(0,191,255,0.22)]"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[rgba(0,191,255,0.18)] pt-8 text-xs text-[#AAB4C5] sm:flex-row sm:items-center">
          <p>&copy; {year} {SITE_CONFIG.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Graphic Design &middot; Video Editing &middot; AI Automation</span>
            <span aria-hidden="true">&middot;</span>
            <button
              type="button"
              onClick={() => onNavigate('admin')}
              className="cursor-pointer text-[#AAB4C5] transition-colors hover:text-[#00BFFF]"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
