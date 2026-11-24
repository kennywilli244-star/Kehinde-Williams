import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Mail, MessageSquare, Send } from 'lucide-react';
import { ServiceCategory, SITE_CONFIG } from '../data/siteData';

interface ContactPageProps {
  preselectedService?: ServiceCategory;
}

interface FormState {
  name: string;
  email: string;
  service: string;
  budget: string;
  description: string;
}

const BUDGET_OPTIONS = [
  'Under $250',
  '$250 – $500',
  '$500 – $1,500',
  '$1,500 – $3,000',
  '$3,000+',
  'Not sure yet — let’s discuss',
];

const SERVICE_OPTIONS = [
  'Website Design',
  'Graphic Design',
  'Video Editing',
  'AI Automation',
  'Multiple Services',
];

export const ContactPage: React.FC<ContactPageProps> = ({ preselectedService }) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    service: preselectedService || 'Graphic Design',
    budget: '',
    description: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!form.name.trim()) {
      setErrorMessage('Please enter your name so I know who to address.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!form.budget) {
      setErrorMessage('Please select an estimated project budget range.');
      return;
    }

    if (form.description.trim().length < 15) {
      setErrorMessage('Please share a brief description of your project (at least 15 characters).');
      return;
    }

    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      service: preselectedService || 'Graphic Design',
      budget: '',
      description: '',
    });
    setErrorMessage(null);
    setSubmitted(false);
  };

  const whatsappUrl = SITE_CONFIG.contact.whatsappNumber
    ? `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
        'Hello KBAmidele Dev, I would like to discuss a project.'
      )}`
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-[#00BFFF]">Contact</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-[#F5F2EA] sm:text-5xl">
          Let&apos;s Turn Your Ideas Into Digital Impact
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#AAB4C5]">
          Tell me about your project, goals, and timeline. I will review your inquiry and follow up
          with clear next steps.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="card-electric rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#00BFFF]/15 text-[#00BFFF] shadow-[0_0_20px_rgba(0,191,255,0.25)]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold text-[#F5F2EA]">
                  Inquiry Received
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#AAB4C5]">
                  Thank you, <span className="font-semibold text-[#F5F2EA]">{form.name}</span>. Your{' '}
                  <span className="font-semibold text-[#F5F2EA]">{form.service}</span> project
                  inquiry has been recorded. I will follow up at{' '}
                  <span className="font-semibold text-[#F5F2EA]">{form.email}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-7 inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-lg border border-[rgba(0,191,255,0.35)] bg-[#101827] px-5 py-2.5 text-sm font-semibold text-[#F5F2EA] transition-colors hover:border-[#00BFFF] hover:text-[#38BDF8]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {errorMessage && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-[#F5F2EA]"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full name"
                      className="mt-2 block w-full rounded-lg border border-[rgba(0,191,255,0.25)] bg-[#101827] px-4 py-3 text-sm text-[#F5F2EA] placeholder-[#AAB4C5]/60 focus:border-[#00BFFF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-[#F5F2EA]"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="mt-2 block w-full rounded-lg border border-[rgba(0,191,255,0.25)] bg-[#101827] px-4 py-3 text-sm text-[#F5F2EA] placeholder-[#AAB4C5]/60 focus:border-[#00BFFF] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-sm font-medium text-[#F5F2EA]"
                    >
                      Service Needed
                    </label>
                    <select
                      id="contact-service"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="mt-2 block w-full rounded-lg border border-[rgba(0,191,255,0.25)] bg-[#101827] px-4 py-3 text-sm text-[#F5F2EA] focus:border-[#00BFFF] focus:outline-none"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-budget"
                      className="block text-sm font-medium text-[#F5F2EA]"
                    >
                      Project Budget
                    </label>
                    <select
                      id="contact-budget"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="mt-2 block w-full rounded-lg border border-[rgba(0,191,255,0.25)] bg-[#101827] px-4 py-3 text-sm text-[#F5F2EA] focus:border-[#00BFFF] focus:outline-none"
                    >
                      <option value="">Select a budget range</option>
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-description"
                    className="block text-sm font-medium text-[#F5F2EA]"
                  >
                    Project Description
                  </label>
                  <textarea
                    id="contact-description"
                    rows={5}
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Share your goals, key deliverables, and ideal timeline..."
                    className="mt-2 block w-full rounded-lg border border-[rgba(0,191,255,0.25)] bg-[#101827] px-4 py-3 text-sm text-[#F5F2EA] placeholder-[#AAB4C5]/60 focus:border-[#00BFFF] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-electric inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold sm:w-auto"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Project Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Direct Contact Options (Configurable) */}
        <div className="space-y-6 lg:col-span-5">
          <div className="card-electric rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-[#F5F2EA]">Direct Contact</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#AAB4C5]">
              Prefer to reach out directly? Update your email and WhatsApp number in{' '}
              <span className="font-mono text-xs text-[#38BDF8]">src/data/siteData.ts</span> to
              activate one-click messaging.
            </p>

            <div className="mt-6 space-y-4">
              {/* Email Card */}
              <div className="rounded-xl border border-[rgba(0,191,255,0.2)] bg-[#101827] p-5">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#00BFFF]" />
                  <span className="font-display text-sm font-semibold text-[#F5F2EA]">
                    Email Contact
                  </span>
                </div>
                {SITE_CONFIG.contact.emailConfigured ? (
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="mt-2 block text-sm font-medium text-[#38BDF8] hover:underline"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                ) : (
                  <p className="mt-2 text-xs leading-relaxed text-[#AAB4C5]">
                    Configurable email placeholder ({SITE_CONFIG.contact.email}). Set{' '}
                    <span className="font-mono text-[#F5F2EA]">emailConfigured: true</span> with
                    your real address when ready.
                  </p>
                )}
              </div>

              {/* WhatsApp Card */}
              <div className="rounded-xl border border-[rgba(0,191,255,0.2)] bg-[#101827] p-5">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-[#38BDF8]" />
                  <span className="font-display text-sm font-semibold text-[#F5F2EA]">
                    WhatsApp Direct
                  </span>
                </div>
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-[#00BFFF] hover:underline"
                  >
                    Message on WhatsApp
                  </a>
                ) : (
                  <p className="mt-2 text-xs leading-relaxed text-[#AAB4C5]">
                    {SITE_CONFIG.contact.whatsappDisplay}
                  </p>
                )}
              </div>
            </div>

            <p className="mt-6 text-xs text-[#AAB4C5]">{SITE_CONFIG.contact.responseTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
