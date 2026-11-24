import React from 'react';
import { ArrowRight, Check, Cpu, Film, Palette } from 'lucide-react';
import { PageId, ServiceCategory, SERVICES, SITE_CONFIG } from '../data/siteData';

interface ServicesPageProps {
  onNavigate: (page: PageId, preselectedService?: ServiceCategory) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const getIcon = (title: ServiceCategory) => {
    switch (title) {
      case 'Graphic Design':
        return (
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,191,255,0.35)] bg-[#101827] text-[#00BFFF] shadow-[0_0_18px_rgba(0,191,255,0.22)]">
            <Palette className="h-5 w-5" />
          </span>
        );
      case 'Video Editing':
        return (
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(56,189,248,0.35)] bg-[#101827] text-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.22)]">
            <Film className="h-5 w-5" />
          </span>
        );
      case 'AI Automation':
        return (
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(37,99,235,0.45)] bg-[#101827] text-[#00BFFF] shadow-[0_0_18px_rgba(0,191,255,0.24)]">
            <Cpu className="h-5 w-5" />
          </span>
        );
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-[#00BFFF]">Services</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-[#F5F2EA] sm:text-5xl">
          Creative &amp; Automation Solutions Built to Grow Your Brand
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#AAB4C5] sm:text-lg">
          Three focused disciplines designed to help businesses, entrepreneurs, and content creators
          stand out visually, captivate audiences, and work smarter with AI.
        </p>
      </div>

      <div className="mt-14 space-y-12">
        {SERVICES.map((service, index) => (
          <section
            key={service.id}
            className="card-electric rounded-2xl p-6 sm:p-10"
          >
            <div className="flex flex-col justify-between gap-6 border-b border-[rgba(0,191,255,0.2)] pb-8 lg:flex-row lg:items-start">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3.5">
                  {getIcon(service.title)}
                  <span className="font-mono text-sm tabular-nums text-[#38BDF8]">
                    0{index + 1}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold text-[#F5F2EA] sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#AAB4C5]">{service.overview}</p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('contact', service.title)}
                className="btn-electric inline-flex min-h-[46px] shrink-0 cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold whitespace-nowrap"
              >
                <span>{service.ctaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Deliverables */}
              <div>
                <h3 className="font-display text-sm font-semibold text-[#F5F2EA]">
                  What This Service Involves
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#AAB4C5]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00BFFF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Problems Solved */}
              <div>
                <h3 className="font-display text-sm font-semibold text-[#F5F2EA]">
                  Problems It Solves
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.problemsSolved.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-[#AAB4C5]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Client Benefits */}
              <div>
                <h3 className="font-display text-sm font-semibold text-[#F5F2EA]">
                  Benefits You Receive
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.clientBenefits.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#F5F2EA]/90">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Video Editing Visual Showcase */}
            {service.id === 'video-editing' && (
              <div className="mt-10 border-t border-[rgba(0,191,255,0.2)] pt-8">
                <div className="max-w-2xl">
                  <p className="text-xs font-medium text-[#38BDF8]">
                    Post-Production &amp; Storytelling Craft
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-[#F5F2EA]">
                    Cut. Grade. Captivate.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#AAB4C5]">
                    Every frame is edited for audience retention—combining tight narrative pacing,
                    multi-track audio mixing, dynamic motion graphics, and platform-ready formatting
                    for YouTube, Reels, and TikTok.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {SITE_CONFIG.videoEditingImages.map((img) => (
                    <figure
                      key={img.src}
                      className="group overflow-hidden rounded-xl border border-[rgba(0,191,255,0.35)] bg-[#101827] shadow-[0_0_24px_rgba(0,191,255,0.16)] transition-all duration-200 hover:border-[#38BDF8] hover:shadow-[0_0_32px_rgba(0,191,255,0.28)]"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden bg-[#101827]">
                        <img
                          src={img.src}
                          alt={img.alt}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                      <figcaption className="border-t border-[rgba(0,191,255,0.15)] px-4 py-3 text-xs font-medium text-[#AAB4C5]">
                        {img.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {/* AI Automation Visual Workflow Showcase */}
            {service.id === 'ai-automation' && (
              <div className="mt-10 border-t border-[rgba(0,191,255,0.2)] pt-8">
                <div className="max-w-2xl">
                  <p className="text-xs font-medium text-[#38BDF8]">
                    Intelligent Workflow Architecture
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-[#F5F2EA]">
                    Automate. Organize. Streamline. Amplify.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#AAB4C5]">
                    From inbox management, scheduling, and automated reporting to data entry and
                    client follow-ups—intelligent AI workflows handle the admin so you can focus
                    on strategy and growth.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {SITE_CONFIG.aiAutomationImages.map((img) => (
                    <figure
                      key={img.src}
                      className="group overflow-hidden rounded-xl border border-[rgba(0,191,255,0.35)] bg-[#101827] shadow-[0_0_24px_rgba(0,191,255,0.16)] transition-all duration-200 hover:border-[#38BDF8] hover:shadow-[0_0_32px_rgba(0,191,255,0.28)]"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden bg-[#101827]">
                        <img
                          src={img.src}
                          alt={img.alt}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                      <figcaption className="border-t border-[rgba(0,191,255,0.15)] px-4 py-3 text-xs font-medium text-[#AAB4C5]">
                        {img.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};
