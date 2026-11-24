import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageId, SITE_CONFIG } from '../data/siteData';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

const CORE_SKILLS = [
  {
    area: 'Graphic Design',
    items: 'Brand Identity · Social Media Systems · Flyers & Collateral · Business Presentations',
  },
  {
    area: 'Video Editing',
    items: 'YouTube Storytelling · Reels & TikTok · Motion Graphics · Subtitles & Pacing',
  },
  {
    area: 'AI Automation',
    items: 'Workflow Automation · AI Chatbots · Lead Follow-Up Systems · Tool Integration',
  },
];

const PHILOSOPHY_PILLARS = [
  {
    title: 'Clarity Over Clutter',
    description:
      'Every graphic, video cut, and automation workflow is designed with a single goal: making your message clearer and your operations smoother.',
  },
  {
    title: 'Creativity Meets Technology',
    description:
      'Combining visual storytelling with practical AI automation lets businesses stand out publicly while running efficiently behind the scenes.',
  },
  {
    title: 'Built Around Your Goals',
    description:
      'No generic templates or unnecessary complexity. Solutions are tailored to the exact audience you want to reach and the time you want to save.',
  },
];

const TOOLS_STACK = [
  { group: 'Design & Visuals', tools: 'Adobe Photoshop · Illustrator · Figma · Canva' },
  { group: 'Video & Motion', tools: 'Adobe Premiere Pro · After Effects · CapCut · DaVinci Resolve' },
  { group: 'AI & Automation', tools: 'Make · Zapier · n8n · OpenAI / Gemini APIs · Custom Chatbots' },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* Intro Split */}
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="text-sm font-medium text-[#00BFFF]">About KBAmidele Dev</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-[#F5F2EA] sm:text-5xl">
            Driven by Creativity, Digital Technology, and Meaningful Growth
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#AAB4C5]">
            KBAmidele Dev is a digital creative studio focused on helping businesses, entrepreneurs,
            and content creators bridge the gap between great ideas and high-impact digital
            execution.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#AAB4C5]">
            I believe modern brands need more than isolated deliverables. They need visuals that
            command attention, videos that tell compelling stories, and intelligent AI workflows
            that eliminate repetitive manual work—all working together seamlessly.
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="btn-electric inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
            >
              <span>Work With Me</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Professional Founder Portrait */}
        <div className="lg:col-span-5">
          <div className="relative h-full min-h-[360px] overflow-hidden rounded-2xl border border-[rgba(0,191,255,0.35)] bg-[#172338] shadow-[0_0_32px_rgba(0,191,255,0.18)]">
            <img
              src={SITE_CONFIG.founderPortrait}
              alt="KBAmidele Dev Founder Portrait"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-top"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#101827]/85 via-[#101827]/30 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-[#F5F2EA]">
              <span className="font-display font-semibold">KBAmidele Dev</span>
              <span className="text-[#38BDF8]">Creative &amp; AI Specialist</span>
            </div>
          </div>
        </div>
      </div>

      {/* Working Philosophy */}
      <section className="mt-20 border-t border-[rgba(0,191,255,0.2)] pt-16">
        <p className="text-sm font-medium text-[#38BDF8]">Working Philosophy</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#F5F2EA]">
          How I Approach Every Project
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PHILOSOPHY_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="card-electric rounded-xl p-6"
            >
              <h3 className="font-display text-lg font-semibold text-[#F5F2EA]">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#AAB4C5]">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Tools Grid */}
      <section className="mt-20 grid grid-cols-1 gap-10 border-t border-[rgba(0,191,255,0.2)] pt-16 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-[#00BFFF]">Core Capabilities</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-[#F5F2EA]">
            Skills &amp; Specializations
          </h2>
          <div className="mt-6 space-y-5">
            {CORE_SKILLS.map((skill) => (
              <div
                key={skill.area}
                className="card-electric rounded-xl p-5"
              >
                <h3 className="font-display text-base font-semibold text-[#F5F2EA]">
                  {skill.area}
                </h3>
                <p className="mt-1.5 text-sm text-[#AAB4C5]">{skill.items}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-[#38BDF8]">Technology &amp; Craft</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-[#F5F2EA]">
            Tools &amp; Platforms
          </h2>
          <div className="mt-6 space-y-5">
            {TOOLS_STACK.map((stack) => (
              <div
                key={stack.group}
                className="card-electric rounded-xl p-5"
              >
                <h3 className="font-display text-base font-semibold text-[#F5F2EA]">
                  {stack.group}
                </h3>
                <p className="mt-1.5 text-sm text-[#AAB4C5]">{stack.tools}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
