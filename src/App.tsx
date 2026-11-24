import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { PageId, ServiceCategory } from './data/siteData';
import { usePortfolioData } from './hooks/usePortfolioData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() =>
    window.location.hash === '#admin' ? 'admin' : 'home'
  );
  const [preselectedService, setPreselectedService] = useState<ServiceCategory | undefined>(
    undefined
  );

  const { projects, testimonials } = usePortfolioData();

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentPage('admin');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (page: PageId, service?: ServiceCategory) => {
    if (service) {
      setPreselectedService(service);
    }
    setCurrentPage(page);
    if (page === 'admin') {
      window.history.replaceState(null, '', '#admin');
    } else if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#101827] text-[#F5F2EA]">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'services' && <ServicesPage onNavigate={handleNavigate} />}
        {currentPage === 'portfolio' && (
          <PortfolioPage onNavigate={handleNavigate} liveProjects={projects} />
        )}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'testimonials' && (
          <TestimonialsPage onNavigate={handleNavigate} liveTestimonials={testimonials} />
        )}
        {currentPage === 'contact' && <ContactPage preselectedService={preselectedService} />}
        {currentPage === 'admin' && (
          <AdminPage projects={projects} testimonials={testimonials} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
