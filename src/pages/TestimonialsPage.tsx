import React from 'react';
import { ArrowRight, User } from 'lucide-react';
import { PageId, SAMPLE_TESTIMONIALS } from '../data/siteData';
import { LiveTestimonial } from '../hooks/usePortfolioData';

interface TestimonialsPageProps {
  onNavigate: (page: PageId) => void;
  liveTestimonials: LiveTestimonial[];
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({
  onNavigate,
  liveTestimonials,
}) => {
  const hasLive = liveTestimonials.length > 0;
  const items = hasLive
    ? liveTestimonials.map((t) => ({ ...t, isSample: false }))
    : SAMPLE_TESTIMONIALS;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-[#00BFFF]">Client Feedback</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-[#F5F2EA] sm:text-5xl">
          Testimonials
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#AAB4C5]">
          {hasLive
            ? 'Genuine feedback from clients across Graphic Design, Video Editing, and AI Automation.'
            : 'This section showcases client feedback across Graphic Design, Video Editing, and AI Automation. The cards below are sample placeholders until you publish your first client review from the Admin Dashboard.'}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="card-electric flex flex-col justify-between rounded-2xl p-7"
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-[#AAB4C5]">
                <span className="font-medium text-[#00BFFF]">{item.service}</span>
                {item.isSample && (
                  <>
                    <span aria-hidden="true">&middot;</span>
                    <span>Sample Content</span>
                  </>
                )}
              </div>

              <blockquote className="mt-5 text-sm leading-relaxed text-[#F5F2EA]/90">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </div>

            <div className="mt-8 flex items-center gap-3.5 border-t border-[rgba(0,191,255,0.2)] pt-5">
              <div
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(0,191,255,0.3)] bg-[#101827] text-[#38BDF8]"
              >
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-[#F5F2EA]">
                  {item.clientName}
                </p>
                <p className="text-xs text-[#AAB4C5]">{item.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-[rgba(0,191,255,0.3)] bg-gradient-to-r from-[#14243A] to-[#172338] p-8 sm:p-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#F5F2EA]">
              Ready to Be the Next Success Story?
            </h2>
            <p className="mt-2 text-sm text-[#AAB4C5]">
              Let&apos;s collaborate on your next graphic design, video editing, or AI automation
              project.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="btn-electric inline-flex min-h-[46px] shrink-0 cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold whitespace-nowrap"
          >
            <span>Start a Project</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
