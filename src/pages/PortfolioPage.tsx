import React, { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, Globe, X } from 'lucide-react';
import {
  FEATURED_CLIENT_WEBSITES,
  PageId,
  PORTFOLIO_PROJECTS,
  ServiceCategory,
} from '../data/siteData';
import { LiveProject } from '../hooks/usePortfolioData';

interface PortfolioPageProps {
  onNavigate: (page: PageId, preselectedService?: ServiceCategory) => void;
  liveProjects: LiveProject[];
}

interface DisplayProject {
  id: string;
  title: string;
  category: ServiceCategory;
  isSample: boolean;
  image: string;
  summary: string;
  websiteUrl?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  deliverables?: string[];
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate, liveProjects }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | ServiceCategory>('All');
  const [selectedProject, setSelectedProject] = useState<DisplayProject | null>(null);

  const mappedLive: DisplayProject[] = liveProjects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    isSample: false,
    image: p.imageUrl,
    summary: p.description,
    websiteUrl: p.websiteUrl || undefined,
  }));

  const allProjects: DisplayProject[] =
    mappedLive.length > 0 ? [...mappedLive, ...PORTFOLIO_PROJECTS] : PORTFOLIO_PROJECTS;

  const filteredProjects =
    activeCategory === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* Live Client Websites Showcase */}
      <section className="mb-16 border-b border-[rgba(0,191,255,0.2)] pb-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#00BFFF]">Live Client Websites</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-[#F5F2EA] sm:text-5xl">
            Featured Web Projects
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#AAB4C5]">
            Explore live websites delivered for clients. Click any project below to visit the live
            site in a new tab.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_CLIENT_WEBSITES.map((site) => (
            <div
              key={site.id}
              className="card-electric flex flex-col justify-between rounded-xl p-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(0,191,255,0.3)] bg-[#101827] text-[#00BFFF] shadow-[0_0_14px_rgba(0,191,255,0.2)]">
                    <Globe className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-[#38BDF8]">{site.domain}</span>
                </div>
                <h2 className="mt-4 font-display text-lg font-bold text-[#F5F2EA]">{site.name}</h2>
                <p className="mt-1 text-xs font-medium text-[#00BFFF]">{site.category}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-[#AAB4C5]">{site.description}</p>
              </div>

              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-electric mt-6 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
              >
                <span>Visit Website</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#00BFFF]">Portfolio &amp; Client Work</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#F5F2EA] sm:text-4xl">
            Selected Digital Showcases
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#AAB4C5]">
            Explore real client projects and capability showcases across graphic design, video
            editing, and AI automation.
          </p>
        </div>

        {/* Category Filters */}
        <div
          role="tablist"
          aria-label="Filter portfolio projects by category"
          className="flex flex-wrap items-center gap-1 rounded-lg border border-[rgba(0,191,255,0.25)] bg-[#14243A] p-1"
        >
          {(['All', 'Website Design', 'Graphic Design', 'Video Editing', 'AI Automation'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`cursor-pointer rounded-md px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#00BFFF] to-[#2563EB] font-semibold text-[#F5F2EA] shadow-[0_0_12px_rgba(0,191,255,0.3)]'
                  : 'text-[#AAB4C5] hover:text-[#F5F2EA]'
              }`}
            >
              {cat === 'All' ? 'All Work' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setSelectedProject(project)}
            className="card-electric group flex cursor-pointer flex-col overflow-hidden rounded-xl text-left"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#101827]">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#AAB4C5]">
                  <span className="font-medium text-[#00BFFF]">{project.category}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{project.isSample ? 'Sample Placeholder' : 'Client Project'}</span>
                </div>
                <h2 className="mt-2 font-display text-xl font-semibold text-[#F5F2EA] transition-colors group-hover:text-[#38BDF8]">
                  {project.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#AAB4C5]">
                  {project.summary}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-[#38BDF8]">
                <span>Inspect Project Details</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a101b]/85 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[rgba(0,191,255,0.35)] bg-[#172338] shadow-[0_0_40px_rgba(0,191,255,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#101827]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="absolute right-4 top-4 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[rgba(0,191,255,0.35)] bg-[#101827]/90 text-[#F5F2EA] transition-colors hover:bg-[#00BFFF] hover:text-[#101827]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#AAB4C5]">
                <span className="font-medium text-[#00BFFF]">{selectedProject.category}</span>
                <span aria-hidden="true">&middot;</span>
                <span>
                  {selectedProject.isSample ? 'Sample Placeholder Project' : 'Published Client Work'}
                </span>
              </div>

              <h2
                id="modal-project-title"
                className="mt-2 font-display text-2xl font-bold text-[#F5F2EA] sm:text-3xl"
              >
                {selectedProject.title}
              </h2>

              {selectedProject.isSample && selectedProject.challenge ? (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <h3 className="text-xs font-semibold text-[#38BDF8]">The Challenge</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#AAB4C5]">
                      {selectedProject.challenge}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#38BDF8]">The Solution</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#AAB4C5]">
                      {selectedProject.solution}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#00BFFF]">Expected Outcome</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#F5F2EA]/90">
                      {selectedProject.outcome}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-[#AAB4C5]">
                  {selectedProject.summary}
                </p>
              )}

              <div className="mt-6 border-t border-[rgba(0,191,255,0.2)] pt-6">
                {selectedProject.deliverables && (
                  <p className="mb-5 text-xs font-medium text-[#AAB4C5]">
                    Deliverables: {selectedProject.deliverables.join(' · ')}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    {selectedProject.websiteUrl && (
                      <a
                        href={selectedProject.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-electric inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
                      >
                        <span>Visit Live Project</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const category = selectedProject.category;
                        setSelectedProject(null);
                        onNavigate('contact', category);
                      }}
                      className={`${
                        selectedProject.websiteUrl
                          ? 'border border-[rgba(0,191,255,0.4)] bg-[#101827] text-[#F5F2EA] hover:border-[#00BFFF] hover:text-[#38BDF8]'
                          : 'btn-electric'
                      } inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors`}
                    >
                      <span>Request a Similar Project</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="cursor-pointer text-sm font-medium text-[#AAB4C5] hover:text-[#38BDF8]"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
