export type PageId =
  | 'home'
  | 'services'
  | 'portfolio'
  | 'about'
  | 'testimonials'
  | 'contact'
  | 'admin';

export type ServiceCategory =
  | 'Website Design'
  | 'Graphic Design'
  | 'Video Editing'
  | 'AI Automation';

/**
 * Configurable contact details for KBAmidele Dev.
 * Replace these placeholder values with your real email address and WhatsApp number.
 */
export const SITE_CONFIG = {
  brandName: 'KBAmidele Dev',
  tagline: 'Create. Automate. Grow.',
  availabilityText: 'Available for new creative & automation projects',
  heroImage: '/src/assets/images/hero_galaxy_nebula_1795005998817.jpg',
  founderPortrait: '/assets/aistudio/Polished_Tech_Professional_Portrait_f5a419fe.png',
  aiWorkflowImage: '/assets/aistudio/sdfghjmnbvcdxcvbn_bvfghnj_143fbacf.jpg',
  videoEditingImages: [
    {
      src: '/assets/aistudio/Video_Editing__Ravindran_Swamikant_385a2d7a.jpg',
      alt: 'Creative Video Editing & Motion Graphics Studio Setup',
      caption: 'Story-Driven Editing & Motion Graphics',
    },
    {
      src: '/assets/aistudio/Fast-Track_Video_Montage_Services_8a37e07e.jpg',
      alt: 'Multi-Track Professional Video Editing Timeline Workstation',
      caption: 'Precision Multi-Track Timeline & Color Workflow',
    },
  ],
  aiAutomationImages: [
    {
      src: '/assets/aistudio/sdfghjmnbvcdxcvbn_bvfghnj_143fbacf.jpg',
      alt: 'AI Automation Workflow — Let AI Handle the Admin',
      caption: 'Automated Admin, Scheduling & Reporting',
    },
    {
      src: '/assets/aistudio/AI_tools_and_Automation_Systems_e38fd943.jpg',
      alt: 'Connected AI Tools and Business Automation Systems',
      caption: 'Integrated AI Tools & Growth Systems',
    },
  ],
  contact: {
    // Configure your real email and WhatsApp number here
    email: 'your-email@kbamidele.dev',
    emailConfigured: false,
    whatsappNumber: '', // Example: '2348012345678' (country code + number, no + or spaces)
    whatsappDisplay: 'Configure your WhatsApp number in siteData.ts',
    responseTime: 'Usually responds within 24 hours',
  },
};

export interface FeaturedWebsite {
  id: string;
  name: string;
  domain: string;
  url: string;
  category: string;
  description: string;
}

export const FEATURED_CLIENT_WEBSITES: FeaturedWebsite[] = [
  {
    id: 'site-yuyu',
    name: 'Yuyu.ng',
    domain: 'yuyu.ng',
    url: 'https://yuyu.ng',
    category: 'Web & Digital Experience',
    description: 'Modern digital platform designed for fast discovery, clean navigation, and brand impact.',
  },
  {
    id: 'site-ziofahomes',
    name: 'Ziofa Homes',
    domain: 'ziofahomes.com',
    url: 'https://ziofahomes.com',
    category: 'Real Estate & Hospitality',
    description: 'Clean, conversion-focused website showcasing properties and streamlined client inquiries.',
  },
  {
    id: 'site-packwoodstation',
    name: 'Packwood Station',
    domain: 'packwoodstation.com',
    url: 'https://packwoodstation.com',
    category: 'Brand & Web Presence',
    description: 'Engaging online storefront and brand destination crafted for clear visual storytelling.',
  },
  {
    id: 'site-justforyoudayspa',
    name: 'Just For You Day Spa',
    domain: 'justforyoudayspa.com',
    url: 'https://justforyoudayspa.com',
    category: 'Wellness & Booking',
    description: 'Welcoming spa and wellness website highlighting services, treatments, and effortless bookings.',
  },
];

export interface ProblemSolutionPair {
  id: string;
  category: ServiceCategory;
  problem: string;
  solution: string;
  impact: string;
}

export const PROBLEM_SOLUTIONS: ProblemSolutionPair[] = [
  {
    id: 'ps-1',
    category: 'Graphic Design',
    problem: 'Poor-quality graphics that fail to attract customers.',
    solution: 'Professional and attention-grabbing graphic designs.',
    impact: 'Builds immediate visual credibility and stops the scroll.',
  },
  {
    id: 'ps-2',
    category: 'Video Editing',
    problem: 'Unprofessional videos that struggle to engage audiences.',
    solution: 'High-quality video editing that tells compelling stories.',
    impact: 'Increases viewer retention across YouTube, Reels, and TikTok.',
  },
  {
    id: 'ps-3',
    category: 'AI Automation',
    problem: 'Time wasted on repetitive business tasks.',
    solution: 'Intelligent automation that saves time.',
    impact: 'Frees up hours every week so you can focus on growth.',
  },
  {
    id: 'ps-4',
    category: 'Graphic Design',
    problem: 'Difficulty creating consistent social media content.',
    solution: 'Creative content that strengthens brand identity.',
    impact: 'Establishes a recognizable, cohesive visual presence.',
  },
  {
    id: 'ps-5',
    category: 'AI Automation',
    problem: 'Complicated workflows and inefficient operations.',
    solution: 'Streamlined workflows that improve productivity.',
    impact: 'Connects your tools into a smooth, reliable system.',
  },
  {
    id: 'ps-6',
    category: 'AI Automation',
    problem: 'Difficulty using AI tools effectively.',
    solution: 'Practical AI-powered business solutions.',
    impact: 'Turns complex AI capabilities into everyday business results.',
  },
];

export interface ServiceDetail {
  id: string;
  title: ServiceCategory;
  shortDescription: string;
  overview: string;
  deliverables: string[];
  problemsSolved: string[];
  clientBenefits: string[];
  ctaLabel: string;
}

export const SERVICES: ServiceDetail[] = [
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    shortDescription:
      'Strategic visual identities, social media systems, and marketing assets crafted to capture attention and elevate your brand.',
    overview:
      'Strong visual communication is the first impression your audience experiences. I design cohesive, high-impact visual assets tailored to your brand personality and business goals—from foundational logos to everyday marketing collateral.',
    deliverables: [
      'Logo design and brand identity',
      'Social media graphics',
      'Flyers and promotional designs',
      'Marketing materials',
      'Business presentations',
    ],
    problemsSolved: [
      'Inconsistent visuals that make your brand look forgettable or amateur',
      'Low click-through and engagement on promotional campaigns',
      'Hours lost trying to assemble presentations and social posts from scratch',
    ],
    clientBenefits: [
      'A distinct, professional look that builds instant trust with prospects',
      'Ready-to-use templates and print/digital-ready source files',
      'Visual consistency across every touchpoint of your business',
    ],
    ctaLabel: 'Start a Graphic Design Project',
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    shortDescription:
      'Retention-focused editing, motion graphics, and storytelling built for YouTube creators, brands, and short-form social channels.',
    overview:
      'Video is the highest-converting medium online, but raw footage alone rarely holds attention. I transform your recordings into polished, well-paced stories with clean cuts, motion graphics, sound design, and dynamic subtitles.',
    deliverables: [
      'YouTube video editing',
      'Instagram Reels and TikTok videos',
      'Promotional and advertising videos',
      'Motion graphics',
      'Subtitles, transitions, and storytelling',
    ],
    problemsSolved: [
      'Viewers dropping off in the first few seconds due to slow pacing',
      'Unpolished audio, flat visuals, and inconsistent publishing schedules',
      'Difficulty repurposing long-form content into engaging vertical clips',
    ],
    clientBenefits: [
      'Higher audience retention and stronger viewer-to-follower conversion',
      'Platform-optimized formats tailored for YouTube, Reels, and TikTok',
      'Consistent, broadcast-grade quality without spending days in an editor',
    ],
    ctaLabel: 'Start a Video Editing Project',
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    shortDescription:
      'Custom workflow automation, AI chatbots, and smart tool integrations that eliminate manual busywork and scale your operations.',
    overview:
      'Modern businesses should not be slowed down by repetitive manual tasks. I design and build practical AI-powered workflows and assistants that connect your existing tools, respond to customers faster, and keep leads moving.',
    deliverables: [
      'Business workflow automation',
      'AI chatbot development',
      'Customer support automation',
      'AI tool integration',
      'Lead management and automated follow-ups',
    ],
    problemsSolved: [
      'Hours wasted on manual data entry, inbox triage, and repetitive follow-ups',
      'Slow response times causing warm leads to go cold',
      'Disconnected apps and underutilized AI tools that add complexity instead of clarity',
    ],
    clientBenefits: [
      '24/7 automated responses and instant lead qualification',
      'Cleaner, error-free operational workflows that scale with your business',
      'Practical, maintainable systems designed around your actual daily processes',
    ],
    ctaLabel: 'Start an AI Automation Project',
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const WORKING_PROCESS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We start by understanding your business, audience, current bottlenecks, and specific goals so every decision has a clear purpose.',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'I map out the right creative direction or automation architecture—defining deliverables, timelines, and the tools required for impact.',
  },
  {
    number: '03',
    title: 'Creation',
    description:
      'I execute the design, edit, or automation build with close attention to detail, visual polish, and real-world usability.',
  },
  {
    number: '04',
    title: 'Delivery',
    description:
      'You receive the finalized assets or live workflow along with clear walkthroughs and post-delivery support to ensure smooth adoption.',
  },
];

export interface PortfolioProject {
  id: string;
  title: string;
  category: ServiceCategory;
  isSample: boolean;
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  deliverables: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'sample-brand-identity',
    title: 'Modern Brand Identity & Stationery System',
    category: 'Graphic Design',
    isSample: true,
    image: '/src/assets/images/portfolio_brand_identity_1795005998468.jpg',
    summary:
      'Sample showcase illustrating a cohesive logo mark, color system, and print stationery suite for a forward-thinking digital brand.',
    challenge:
      'Sample Scenario: A growing business struggled with fragmented visuals across business cards, packaging, and digital channels, reducing perceived brand value.',
    solution:
      'Sample Approach: Developed a unified visual identity featuring a geometric emblem, disciplined dark-and-lime palette, and print-ready collateral templates.',
    outcome:
      'Sample Expected Outcome: A cohesive, immediately recognizable brand presence ready for both physical and digital touchpoints.',
    deliverables: ['Logo Suite', 'Brand Guidelines', 'Stationery & Packaging Mockups'],
  },
  {
    id: 'sample-social-campaign',
    title: 'High-Impact Social Media & Flyer Campaign',
    category: 'Graphic Design',
    isSample: true,
    image: '/src/assets/images/portfolio_social_campaign_1795005999425.jpg',
    summary:
      'Sample showcase demonstrating bold typographic posters, promotional flyers, and structured social media templates.',
    challenge:
      'Sample Scenario: Promotional announcements were blending into crowded social feeds and failing to drive event or product interest.',
    solution:
      'Sample Approach: Created a modular campaign kit combining high-contrast typography, clear hierarchy, and reusable layouts for rapid publishing.',
    outcome:
      'Sample Expected Outcome: Stronger visual consistency, faster content production, and higher audience engagement across campaigns.',
    deliverables: ['Promotional Flyers', 'Social Media Templates', 'Campaign Art Direction'],
  },
  {
    id: 'sample-video-storytelling',
    title: 'Cinematic YouTube & Short-Form Video Production',
    category: 'Video Editing',
    isSample: true,
    image: '/src/assets/images/portfolio_video_editing_1795005999647.jpg',
    summary:
      'Sample showcase highlighting pacing, color grading, motion graphics, and subtitle design for creators and brands.',
    challenge:
      'Sample Scenario: Raw talking-head and product footage lacked narrative momentum, causing viewers to click away within the first 30 seconds.',
    solution:
      'Sample Approach: Rebuilt the edit around a strong opening hook, clean color grading, kinetic callouts, sound design, and vertical Reels/TikTok cutdowns.',
    outcome:
      'Sample Expected Outcome: Polished, retention-driven videos that hold viewer attention and communicate the brand message clearly.',
    deliverables: ['YouTube Master Edit', 'Reels & TikTok Cutdowns', 'Motion Graphics & Subtitles'],
  },
  {
    id: 'sample-ai-workflow',
    title: 'Intelligent Lead Management & Support Automation',
    category: 'AI Automation',
    isSample: true,
    image: '/src/assets/images/portfolio_ai_automation_1795005999137.jpg',
    summary:
      'Sample showcase illustrating an automated lead capture, AI qualification, and CRM follow-up pipeline.',
    challenge:
      'Sample Scenario: Incoming inquiries sat unanswered for hours while team members manually copied details between forms, email, and spreadsheets.',
    solution:
      'Sample Approach: Architected an automated workflow integrating an AI assistant, instant lead routing, and scheduled personalized follow-ups.',
    outcome:
      'Sample Expected Outcome: Faster response times, zero manual data entry, and a reliable system that nurtures prospects automatically.',
    deliverables: ['Workflow Architecture', 'AI Assistant Integration', 'Automated Follow-Up System'],
  },
];

export interface TestimonialPlaceholder {
  id: string;
  clientName: string;
  role: string;
  service: ServiceCategory;
  quote: string;
  isSample: boolean;
}

export const SAMPLE_TESTIMONIALS: TestimonialPlaceholder[] = [
  {
    id: 't-1',
    clientName: 'Client Name Placeholder',
    role: 'Founder / Business Owner',
    service: 'Graphic Design',
    quote:
      'Sample placeholder for genuine client feedback. Once you complete your brand identity or social media design project, place your client’s real words here describing the transformation.',
    isSample: true,
  },
  {
    id: 't-2',
    clientName: 'Client Name Placeholder',
    role: 'Content Creator / YouTuber',
    service: 'Video Editing',
    quote:
      'Sample placeholder for genuine client feedback. Highlight how your video editing, storytelling, and pacing helped a creator or brand improve audience engagement.',
    isSample: true,
  },
  {
    id: 't-3',
    clientName: 'Client Name Placeholder',
    role: 'Operations Lead / Entrepreneur',
    service: 'AI Automation',
    quote:
      'Sample placeholder for genuine client feedback. Showcase how your AI workflow or chatbot automation saved time and simplified daily business operations.',
    isSample: true,
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What types of clients do you work with?',
    answer:
      'I work with businesses, entrepreneurs, startups, and content creators who want to strengthen their visual brand, publish engaging video content, or save time through practical AI automation.',
  },
  {
    question: 'Can I combine multiple services in one project?',
    answer:
      'Yes. Many clients pair graphic design with video editing for a consistent content presence, or combine creative assets with AI automation to streamline how they capture and follow up with leads.',
  },
  {
    question: 'How do we get started on a project?',
    answer:
      'Simply reach out through the Contact page with a brief overview of your goals and preferred service. I will review your inquiry and follow up to schedule a discovery conversation.',
  },
  {
    question: 'Do I need technical knowledge to use your AI automation solutions?',
    answer:
      'Not at all. Every automation workflow or AI chatbot is built to be practical and easy to manage, and I provide a clear walkthrough upon delivery so you feel confident using it.',
  },
  {
    question: 'Are revisions included in design and video projects?',
    answer:
      'Yes. Clear feedback rounds are built into the creation process so we can refine the visuals, pacing, or messaging until the final deliverable meets your expectations.',
  },
];
