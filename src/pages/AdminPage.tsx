import React, { useEffect, useRef, useState } from 'react';
import {
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  User,
} from 'firebase/auth';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Globe,
  ImagePlus,
  Loader2,
  Lock,
  LogOut,
  MessageSquareQuote,
  FolderPlus,
  Trash2,
} from 'lucide-react';
import { ADMIN_EMAIL, auth, googleProvider } from '../firebase';
import { FEATURED_CLIENT_WEBSITES, ServiceCategory } from '../data/siteData';
import {
  compressImageToDataUrl,
  createProject,
  createTestimonial,
  LiveProject,
  LiveTestimonial,
  removeProject,
  removeTestimonial,
} from '../hooks/usePortfolioData';

interface AdminPageProps {
  projects: LiveProject[];
  testimonials: LiveTestimonial[];
}

const CATEGORIES: ServiceCategory[] = [
  'Website Design',
  'Graphic Design',
  'Video Editing',
  'AI Automation',
];

function formatAuthError(err: unknown): string {
  const code =
    typeof err === 'object' && err !== null && 'code' in err
      ? String((err as { code?: unknown }).code)
      : '';

  switch (code) {
    case 'auth/cancelled-popup-request':
      return 'Another sign-in window was already open. Please wait a moment and click Sign in once.';
    case 'auth/popup-closed-by-user':
      return 'The Google sign-in window was closed before completing login. Please try again.';
    case 'auth/popup-blocked':
      return 'Your browser blocked the sign-in popup. Allow popups for this site or use the Redirect Sign-In option below.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized in Firebase Authentication. Add this domain under Firebase Console → Authentication → Settings → Authorized domains.';
    default:
      return err instanceof Error
        ? err.message
        : 'Unable to complete Google sign-in. Please try again.';
  }
}

export const AdminPage: React.FC<AdminPageProps> = ({ projects, testimonials }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'testimonials'>('projects');
  const signInLockRef = useRef(false);

  // Project Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('Graphic Design');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [projectStatus, setProjectStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [submittingProject, setSubmittingProject] = useState(false);

  // Testimonial Form State
  const [clientName, setClientName] = useState('');
  const [role, setRole] = useState('');
  const [service, setService] = useState<ServiceCategory>('Graphic Design');
  const [quote, setQuote] = useState('');
  const [testimonialStatus, setTestimonialStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [submittingTestimonial, setSubmittingTestimonial] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Complete any pending redirect sign-in result
    getRedirectResult(auth).catch((err) => {
      if (isMounted) {
        setAuthError(formatAuthError(err));
      }
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (isMounted) {
        setUser(currentUser);
        setAuthReady(true);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const isAuthorizedAdmin =
    Boolean(user) &&
    user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
    user?.emailVerified === true;

  const handleGoogleSignIn = async () => {
    if (signInLockRef.current || signingIn) return;
    signInLockRef.current = true;
    setSigningIn(true);
    setAuthError(null);

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setAuthError(formatAuthError(err));
    } finally {
      signInLockRef.current = false;
      setSigningIn(false);
    }
  };

  const handleGoogleRedirectSignIn = async () => {
    if (signInLockRef.current || signingIn) return;
    signInLockRef.current = true;
    setSigningIn(true);
    setAuthError(null);

    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      setAuthError(formatAuthError(err));
      signInLockRef.current = false;
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    setAuthError(null);
    await signOut(auth);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectStatus(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setProjectStatus({ type: 'error', text: 'Please upload a valid image file (PNG, JPG, WebP).' });
      return;
    }

    try {
      const compressed = await compressImageToDataUrl(file);
      setImagePreview(compressed);
    } catch {
      setProjectStatus({ type: 'error', text: 'Could not process image. Please try another file.' });
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjectStatus(null);

    if (!title.trim()) {
      setProjectStatus({ type: 'error', text: 'Please enter a project title.' });
      return;
    }
    if (!description.trim()) {
      setProjectStatus({ type: 'error', text: 'Please enter a project description.' });
      return;
    }
    if (!imagePreview) {
      setProjectStatus({ type: 'error', text: 'Please upload a project preview image.' });
      return;
    }

    setSubmittingProject(true);
    try {
      await createProject({
        title,
        category,
        websiteUrl,
        description,
        imageUrl: imagePreview,
      });
      setTitle('');
      setWebsiteUrl('');
      setDescription('');
      setImagePreview('');
      setProjectStatus({
        type: 'success',
        text: 'Project published! It is now live on your public Portfolio page.',
      });
    } catch {
      setProjectStatus({
        type: 'error',
        text: 'Failed to publish project. Please verify you are signed in with your admin Gmail.',
      });
    } finally {
      setSubmittingProject(false);
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestimonialStatus(null);

    if (!clientName.trim() || !role.trim() || !quote.trim()) {
      setTestimonialStatus({
        type: 'error',
        text: 'Please fill in the client name, role/company, and review quote.',
      });
      return;
    }

    setSubmittingTestimonial(true);
    try {
      await createTestimonial({
        clientName,
        role,
        service,
        quote,
      });
      setClientName('');
      setRole('');
      setQuote('');
      setTestimonialStatus({
        type: 'success',
        text: 'Testimonial published! It is now live on your public Testimonials page.',
      });
    } catch {
      setTestimonialStatus({
        type: 'error',
        text: 'Failed to publish testimonial. Please verify you are signed in with your admin Gmail.',
      });
    } finally {
      setSubmittingTestimonial(false);
    }
  };

  if (!authReady) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="text-sm text-[#AAB4C5]">Checking admin session...</p>
      </div>
    );
  }

  // Gate 1: Not Signed In
  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 sm:px-6">
        <div className="card-electric rounded-2xl p-8 text-center sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(0,191,255,0.35)] bg-[#101827] text-[#00BFFF] shadow-[0_0_24px_rgba(0,191,255,0.22)]">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-[#F5F2EA]">
            Owner Admin Dashboard
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#AAB4C5]">
            This workspace is restricted strictly to the KBAmidele Dev owner account. Sign in with
            your authorized Gmail to upload client projects and testimonials.
          </p>

          {authError && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-left text-sm text-red-200"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="button"
            disabled={signingIn}
            onClick={handleGoogleSignIn}
            className="btn-electric mt-8 inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {signingIn && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>{signingIn ? 'Signing in with Google...' : 'Sign in with Google'}</span>
          </button>

          <button
            type="button"
            disabled={signingIn}
            onClick={handleGoogleRedirectSignIn}
            className="mt-3 inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-lg border border-[rgba(0,191,255,0.3)] bg-[#101827]/80 px-5 py-2.5 text-xs font-medium text-[#AAB4C5] transition-colors hover:border-[#00BFFF] hover:text-[#38BDF8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Having popup issues? Use Redirect Sign-In instead
          </button>
        </div>
      </div>
    );
  }

  // Gate 2: Signed In With Unauthorized Email
  if (!isAuthorizedAdmin) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 sm:px-6">
        <div className="card-electric rounded-2xl p-8 text-center sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/40 bg-red-500/10 text-red-300">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-[#F5F2EA]">Access Restricted</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#AAB4C5]">
            Signed in as <span className="font-semibold text-[#F5F2EA]">{user.email}</span>. Only
            the owner&apos;s authorized Gmail account can access this dashboard.
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-7 inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-[rgba(0,191,255,0.35)] bg-[#101827] px-5 py-2.5 text-sm font-semibold text-[#F5F2EA] transition-colors hover:border-[#00BFFF] hover:text-[#38BDF8]"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    );
  }

  // Authorized Owner Dashboard
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[rgba(0,191,255,0.2)] pb-8 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-[#00BFFF]">Personal Admin Dashboard</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-[#F5F2EA] sm:text-4xl">
            Manage Portfolio &amp; Reviews
          </h1>
          <p className="mt-1.5 text-xs text-[#AAB4C5]">
            Signed in as <span className="text-[#F5F2EA]">{user.email}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-[rgba(0,191,255,0.35)] bg-[#172338] px-4 py-2 text-sm font-semibold text-[#F5F2EA] transition-colors hover:border-[#00BFFF] hover:text-[#38BDF8]"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('projects')}
          className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
            activeTab === 'projects'
              ? 'btn-electric'
              : 'border border-[rgba(0,191,255,0.25)] bg-[#14243A] text-[#AAB4C5] hover:text-[#F5F2EA]'
          }`}
        >
          <FolderPlus className="h-4 w-4" />
          <span>Projects ({projects.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('testimonials')}
          className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
            activeTab === 'testimonials'
              ? 'btn-electric'
              : 'border border-[rgba(0,191,255,0.25)] bg-[#14243A] text-[#AAB4C5] hover:text-[#F5F2EA]'
          }`}
        >
          <MessageSquareQuote className="h-4 w-4" />
          <span>Testimonials ({testimonials.length})</span>
        </button>
      </div>

      {/* PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Upload Project Form */}
          <div className="lg:col-span-6">
            <form onSubmit={handleAddProject} className="card-electric space-y-5 rounded-2xl p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-[#F5F2EA]">Upload New Project</h2>

              {projectStatus && (
                <div
                  role="alert"
                  className={`flex items-start gap-3 rounded-lg border p-4 text-sm ${
                    projectStatus.type === 'success'
                      ? 'border-[#00BFFF]/40 bg-[#00BFFF]/10 text-[#F5F2EA]'
                      : 'border-red-400/40 bg-red-500/10 text-red-200'
                  }`}
                >
                  {projectStatus.type === 'success' ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00BFFF]" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                  )}
                  <span>{projectStatus.text}</span>
                </div>
              )}

              <div>
                <label htmlFor="proj-title" className="block text-sm font-medium text-[#F5F2EA]">
                  Project Title
                </label>
                <input
                  id="proj-title"
                  type="text"
                  required
                  maxLength={120}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Nova Brand Identity & Web Launch"
                  className="mt-2 block w-full rounded-lg border border-[rgba(0,191,255,0.25)] bg-[#101827] px-4 py-3 text-sm text-[#F5F2EA] placeholder-[#AAB4C5]/60 focus:border-[#00BFFF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="proj-category" className="block text-sm font-medium text-[#F5F2EA]">
                    Project Category
                  </label>
                  <select
                    id="proj-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                    className="mt-2 block w-full rounded-lg border border-[rgba(0,191,255,0.25)] bg-[#101827] px-4 py-3 text-sm text-[#F5F2EA] focus:border-[#00BFFF] focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="proj-url" className="block text-sm font-medium text-[#F5F2EA]">
                    Website / Live Link (Optional)
                  </label>
                  <input
                    id="proj-url"
                    type="url"
                    maxLength={500}
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="mt-2 block w-full rounded-lg border border-[rgba(0,191,255,0.25)] bg-[#101827] px-4 py-3 text-sm text-[#F5F2EA] placeholder-[#AAB4C5]/60 focus:border-[#00BFFF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="proj-desc" className="block text-sm font-medium text-[#F5F2EA]">
                  Project Description
                </label>
                <textarea
                  id="proj-desc"
                  rows={4}
                  required
                  maxLength={2000}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the client's challenge, your creative or automation solution, and the outcome..."
                  className="mt-2 block w-full rounded-lg border border-[rgba(0,191,255,0.25)] bg-[#101827] px-4 py-3 text-sm text-[#F5F2EA] placeholder-[#AAB4C5]/60 focus:border-[#00BFFF] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="proj-image" className="block text-sm font-medium text-[#F5F2EA]">
                  Project Preview Image
                </label>
                <label
                  htmlFor="proj-image"
                  className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[rgba(0,191,255,0.4)] bg-[#101827] p-6 text-center transition-colors hover:border-[#00BFFF]"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Uploaded project preview"
                      className="max-h-52 w-full rounded-lg object-cover"
                    />
                  ) : (
                    <>
                      <ImagePlus className="h-7 w-7 text-[#00BFFF]" />
                      <span className="mt-2 text-sm font-medium text-[#F5F2EA]">
                        Click to upload project image
                      </span>
                      <span className="mt-1 text-xs text-[#AAB4C5]">
                        PNG, JPG, or WebP — automatically optimized for fast loading
                      </span>
                    </>
                  )}
                  <input
                    id="proj-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="sr-only"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={submittingProject}
                className="btn-electric inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold disabled:opacity-60"
              >
                {submittingProject ? 'Publishing Project...' : 'Publish Project to Portfolio'}
              </button>
            </form>
          </div>

          {/* Published Projects & Live Websites List */}
          <div className="space-y-8 lg:col-span-6">
            <div>
              <h2 className="font-display text-xl font-bold text-[#F5F2EA]">
                Featured Live Websites ({FEATURED_CLIENT_WEBSITES.length})
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {FEATURED_CLIENT_WEBSITES.map((site) => (
                  <div
                    key={site.id}
                    className="card-electric flex flex-col justify-between rounded-xl p-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-[#00BFFF]" />
                        <span className="font-display text-sm font-semibold text-[#F5F2EA]">
                          {site.name}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-xs text-[#38BDF8]">{site.domain}</p>
                    </div>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-electric mt-4 inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold"
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-[#F5F2EA]">
                Uploaded Client Projects
              </h2>
              {projects.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-[rgba(0,191,255,0.2)] bg-[#172338]/50 p-8 text-center">
                  <p className="text-sm text-[#AAB4C5]">
                    No additional client projects uploaded yet. Use the form on the left to publish
                    a new project.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="card-electric flex flex-col gap-4 rounded-xl p-4 sm:flex-row sm:items-center"
                    >
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="h-24 w-full shrink-0 rounded-lg object-cover sm:w-32"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-[#00BFFF]">{proj.category}</p>
                        <h3 className="truncate font-display text-base font-semibold text-[#F5F2EA]">
                          {proj.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs text-[#AAB4C5]">
                          {proj.description}
                        </p>
                        {proj.websiteUrl && (
                          <a
                            href={proj.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#38BDF8] hover:underline"
                          >
                            <span>Visit Website</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProject(proj.id)}
                        aria-label={`Delete ${proj.title}`}
                        className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-red-400/30 bg-red-500/10 text-red-300 transition-colors hover:bg-red-500/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TESTIMONIALS TAB */}
      {activeTab === 'testimonials' && (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Upload Testimonial Form */}
          <div className="lg:col-span-6">
            <form
              onSubmit={handleAddTestimonial}
              className="card-electric space-y-5 rounded-2xl p-6 sm:p-8"
            >
              <h2 className="font-display text-xl font-bold text-[#F5F2EA]">
                Add Client Testimonial
              </h2>

              {testimonialStatus && (
                <div
                  role="alert"
                  className={`flex items-start gap-3 rounded-lg border p-4 text-sm ${
                    testimonialStatus.type === 'success'
                      ? 'border-[#00BFFF]/40 bg-[#00BFFF]/10 text-[#F5F2EA]'
                      : 'border-red-400/40 bg-red-500/10 text-red-200'
                  }`}
                >
                  {testimonialStatus.type === 'success' ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00BFFF]" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                  )}
                  <span>{testimonialStatus.text}</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="test-name" className="block text-sm font-medium text-[#F5F2EA]">
                    Client Name
                  </label>
                  <input
                    id="test-name"
                    type="text"
                    required
                    maxLength={100}
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g., Sarah Johnson"
                    className="mt-2 block w-full rounded-lg border border-[rgba(0,191,255,0.25)] bg-[#101827] px-4 py-3 text-sm text-[#F5F2EA] placeholder-[#AAB4C5]/60 focus:border-[#00BFFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="test-role" className="block text-sm font-medium text-[#F5F2EA]">
                    Role / Company
                  </label>
                  <input
                    id="test-role"
                    type="text"
                    required
                    maxLength={120}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g., Founder, BrightPath Media"
                    className="mt-2 block w-full rounded-lg border border-[rgba(0,191,255,0.25)] bg-[#101827] px-4 py-3 text-sm text-[#F5F2EA] placeholder-[#AAB4C5]/60 focus:border-[#00BFFF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="test-service" className="block text-sm font-medium text-[#F5F2EA]">
                  Service Provided
                </label>
                <select
                  id="test-service"
                  value={service}
                  onChange={(e) => setService(e.target.value as ServiceCategory)}
                  className="mt-2 block w-full rounded-lg border border-[rgba(0,191,255,0.25)] bg-[#101827] px-4 py-3 text-sm text-[#F5F2EA] focus:border-[#00BFFF] focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="test-quote" className="block text-sm font-medium text-[#F5F2EA]">
                  Client Review
                </label>
                <textarea
                  id="test-quote"
                  rows={4}
                  required
                  maxLength={1200}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Paste your client's genuine feedback here..."
                  className="mt-2 block w-full rounded-lg border border-[rgba(0,191,255,0.25)] bg-[#101827] px-4 py-3 text-sm text-[#F5F2EA] placeholder-[#AAB4C5]/60 focus:border-[#00BFFF] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submittingTestimonial}
                className="btn-electric inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold disabled:opacity-60"
              >
                {submittingTestimonial ? 'Publishing Review...' : 'Publish Testimonial'}
              </button>
            </form>
          </div>

          {/* Published Testimonials List */}
          <div className="lg:col-span-6">
            <h2 className="font-display text-xl font-bold text-[#F5F2EA]">
              Published Client Testimonials
            </h2>
            {testimonials.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-[rgba(0,191,255,0.2)] bg-[#172338]/50 p-8 text-center">
                <p className="text-sm text-[#AAB4C5]">
                  No client testimonials uploaded yet. Add your first review using the form on the
                  left.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="card-electric flex items-start justify-between gap-4 rounded-xl p-5"
                  >
                    <div>
                      <p className="text-xs font-medium text-[#00BFFF]">{item.service}</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#F5F2EA]/90">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <p className="mt-3 text-xs font-semibold text-[#F5F2EA]">
                        {item.clientName}{' '}
                        <span className="font-normal text-[#AAB4C5]">&middot; {item.role}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTestimonial(item.id)}
                      aria-label={`Delete testimonial from ${item.clientName}`}
                      className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-red-400/30 bg-red-500/10 text-red-300 transition-colors hover:bg-red-500/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
