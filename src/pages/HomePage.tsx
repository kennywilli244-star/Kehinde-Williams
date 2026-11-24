import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Cpu,
  Film,
  Palette,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Starfield } from '../components/Starfield';
import {
  FAQ_ITEMS,
  PageId,
  PORTFOLIO_PROJECTS,
  PROBLEM_SOLUTIONS,
  ServiceCategory,
  SERVICES,
  SITE_CONFIG,
  WORKING_PROCESS,
} from '../data/siteData';

interface HomePageProps {
  onNavigate: (page: PageId, preselectedService?: ServiceCategory) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [psFilter, setPsFilter] = useState<'All' | ServiceCategory>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredPairs =
    psFilter === 'All'
      ? PROBLEM_SOLUTIONS
      : PROBLEM_SOLUTIONS.filter((item) => item.category === psFilter);

  const serviceIcon = (title: ServiceCategory) => {
    switch (title) {
      case 'Graphic Design':
        return (
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(0,191,255,0.3)] bg-[#101827]/90 text-[#00BFFF] shadow-[0_0_16px_rgba(0,191,255,0.22)]">
            <Palette className="h-5 w-5" />
          </span>
        );
      case 'Video Editing':
        return (
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(56,189,248,0.3)] bg-[#101827]/90 text-[#38BDF8] shadow-[0_0_16px_rgba(56,189,248,0.22)]">
            <Film className="h-5 w-5" />
          </span>
        );
      case 'AI Automation':
        return (
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(37,99,235,0.4)] bg-[#101827]/90 text-[#00BFFF] shadow-[0_0_16px_rgba(0,191,255,0.24)]">
            <Cpu className="h-5 w-5" />
          </span>
        );
    }
  };

  return (
    <div>
      {/* 1. HIGH-CONVERTING HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[rgba(0,191,255,0.2)]">
        {/* Background Galaxy/Nebula Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${SITE_CONFIG.heroImage})` }}
          aria-hidden="true"
        />
        {/* Measured Dark Navy Overlay Scrim for High Legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#101827]/80 via-[#101827]/72 to-[#101827]"
          aria-hidden="true"
        />
        {/* Subtle Animated Blue Starfield */}
        <Starfield className="opacity-80" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pb-28 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            {/* Clean Unboxed Availability & Discipline Kicker */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[#AAB4C5]">
              <span className="text-[#38BDF8]">{SITE_CONFIG.availabilityText}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{SITE_CONFIG.tagline}</span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-[#F5F2EA] sm:text-5xl lg:text-6xl">
              Your Ideas Deserve More Than Ordinary.{' '}
              <span className="text-electric-gradient">
                Let&apos;s Create Something Extraordinary.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#AAB4C5] sm:text-lg">
              I help businesses, entrepreneurs, and content creators overcome creative and
              operational challenges through professional graphic design, engaging video editing,
              and intelligent AI automation.
            </p>

            {/* Primary Electric Blue & Secondary Outlined CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="btn-electric inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold whitespace-nowrap"
              >
                <span>Explore My Services</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-lg border border-[rgba(0,191,255,0.45)] bg-[#14243A]/45 px-6 py-3 text-sm font-semibold text-[#F5F2EA] whitespace-nowrap backdrop-blur-sm transition-all duration-150 hover:border-[#00BFFF] hover:bg-[#14243A]/80 hover:text-[#38BDF8] hover:shadow-[0_0_20px_rgba(0,191,255,0.22)]"
              >
                <span>Let&apos;s Work Together</span>
              </button>
            </div>
          </motion.div>

          {/* 3-Column Digital Skills Strip */}
          <div className="mt-16 grid grid-cols-1 gap-5 border-t border-[rgba(0,191,255,0.2)] pt-10 md:grid-cols-3">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => onNavigate('services')}
                className="card-electric group cursor-pointer rounded-xl p-6 text-left hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  {serviceIcon(service.title)}
                  <ArrowUpRight className="h-4 w-4 text-[#AAB4C5] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#00BFFF]" />
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold text-[#F5F2EA] group-hover:text-[#38BDF8] transition-colors">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#AAB4C5]">
                  {service.shortDescription}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PROBLEM & SOLUTION TRANSFORMATION SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#00BFFF]">From Friction to Impact</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#F5F2EA] sm:text-4xl">
              Struggling to Grow Your Brand? Here Is How We Solve It.
            </h2>
            <p className="mt-3 text-base text-[#AAB4C5]">
              Every project starts by identifying what is slowing down your brand or operations—and
              replacing it with a clear, high-performing digital solution.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter problems and solutions by discipline"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-[rgba(0,191,255,0.25)] bg-[#14243A] p-1"
          >
            {(['All', 'Graphic Design', 'Video Editing', 'AI Automation'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={psFilter === tab}
                onClick={() => setPsFilter(tab)}
                className={`cursor-pointer rounded-md px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                  psFilter === tab
                    ? 'bg-gradient-to-r from-[#00BFFF] to-[#2563EB] font-semibold text-[#F5F2EA] shadow-[0_0_12px_rgba(0,191,255,0.3)]'
                    : 'text-[#AAB4C5] hover:text-[#F5F2EA]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredPairs.map((pair) => (
            <div
              key={pair.id}
              className="card-electric flex flex-col justify-between rounded-xl p-6"
            >
              <div>
                <p className="text-xs font-medium text-[#38BDF8]">{pair.category}</p>

                <div className="mt-4">
                  <p className="text-xs font-semibold text-[#AAB4C5]">The Challenge</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#F5F2EA]/80">
                    {pair.problem}
                  </p>
                </div>

                <div className="my-4 h-px bg-[rgba(0,191,255,0.2)]" />

                <div>
                  <p className="text-xs font-semibold text-[#00BFFF]">The Solution</p>
                  <p className="mt-1.5 font-display text-base font-semibold text-[#F5F2EA]">
                    {pair.solution}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-[#38BDF8]">{pair.impact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FOUR-STEP WORKING PROCESS */}
      <section className="border-y border-[rgba(0,191,255,0.2)] bg-[#14243A]/55">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#00BFFF]">How We Work Together</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#F5F2EA] sm:text-4xl">
              A Clear, Four-Step Process Built for Results
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORKING_PROCESS.map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-[rgba(0,191,255,0.25)] bg-[#101827]/90 p-6 transition-all duration-150 hover:border-[#38BDF8] hover:shadow-[0_0_20px_rgba(0,191,255,0.16)]"
              >
                <span className="font-mono text-2xl font-semibold tabular-nums text-[#00BFFF]">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-[#F5F2EA]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#AAB4C5]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SAMPLE PORTFOLIO PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#38BDF8]">Selected Showcases</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#F5F2EA] sm:text-4xl">
              Explore What We Can Build Together
            </h2>
            <p className="mt-2 text-sm text-[#AAB4C5]">
              Note: Projects below are clearly marked sample showcases demonstrating service
              capabilities until real client projects are uploaded.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('portfolio')}
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#00BFFF] whitespace-nowrap transition-colors hover:text-[#38BDF8] hover:underline"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PORTFOLIO_PROJECTS.slice(0, 2).map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onNavigate('portfolio')}
              className="card-electric group cursor-pointer overflow-hidden rounded-xl text-left"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#101827]">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-[#AAB4C5]">
                  <span className="font-medium text-[#00BFFF]">{project.category}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>Sample Placeholder</span>
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold text-[#F5F2EA] transition-colors group-hover:text-[#38BDF8]">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#AAB4C5]">{project.summary}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="border-t border-[rgba(0,191,255,0.2)] bg-[#14243A]/45">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <p className="text-sm font-medium text-[#00BFFF]">Common Questions</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#F5F2EA] sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-10 divide-y divide-[rgba(0,191,255,0.18)] rounded-xl border border-[rgba(0,191,255,0.25)] bg-[#101827]">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-semibold text-[#F5F2EA]">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#AAB4C5] transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-[#00BFFF]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm leading-relaxed text-[#AAB4C5]">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FINAL CONVERSION CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[rgba(0,191,255,0.35)] bg-gradient-to-br from-[#14243A] via-[#172338] to-[#101827] p-8 shadow-[0_0_40px_rgba(0,191,255,0.12)] sm:p-12 lg:p-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#F5F2EA] sm:text-4xl">
              Your Business Deserves Better Digital Solutions.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#AAB4C5]">
              Whether you need standout graphics, engaging videos, or time-saving AI automation,
              let&apos;s turn your ideas into measurable digital impact.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="btn-electric inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
              >
                <span>Start Your Project</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-lg border border-[rgba(0,191,255,0.35)] px-6 py-3 text-sm font-semibold text-[#F5F2EA] transition-all duration-150 hover:border-[#00BFFF] hover:text-[#38BDF8]"
              >
                <span>Learn About KBAmidele Dev</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
