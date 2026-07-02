import { useState, useEffect } from 'react';
import { Menu, X, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onVaultClick: () => void;
  onContactClick: () => void;
}

export default function Navbar({ onVaultClick, onContactClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [logoError, setLogoError] = useState(false);

  const sectionIds = ['home', 'about', 'events', 'team', 'gallery', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy: highlight whichever section is currently in view
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that's most visible right now
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        // Counts a section as "active" once it crosses the middle band of the viewport,
        // accounting for the fixed navbar height up top
        rootMargin: '-100px 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { label: 'Home', sectionId: 'home' },
    { label: 'About', sectionId: 'about' },
    { label: 'Events', sectionId: 'events' },
    { label: 'Team', sectionId: 'team' },
    { label: 'Gallery', sectionId: 'gallery' },
    { label: 'Contact', sectionId: 'contact' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 px-4 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#030509]/80 backdrop-blur-md border-b border-white/5 py-3 md:py-4 shadow-lg shadow-black/20' 
          : 'py-3 md:py-5 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          
          {/* Logo with elegant hover animation */}
          <div 
            onClick={() => scrollToSection('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none relative"
            aria-label="DCDC SRMIST Home"
          >
            <div className="relative overflow-hidden rounded-xl border border-white/20 group-hover:border-[#E5B93C]/60 bg-[#090D16]/90 p-1 w-14 h-14 flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:shadow-[0_8px_24px_rgba(229,185,60,0.2)] group-hover:scale-105 active:scale-95">
              {/* Animated glass shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />
              
              {!logoError ? (
                <img
                  src="data:image/jpeg;base64,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"
                  alt="DCDC Logo"
                  className="w-full h-full object-contain transition-all duration-300"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-full h-full relative rounded-lg bg-gradient-to-tr from-[#0C1220] to-[#05080E] flex items-center justify-center overflow-hidden">
                  {/* Miniature decorative circuits */}
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-[#E5B93C]/40" />
                  <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-[#3B82F6]/40" />
                  
                  {/* Diagonal DCDC Text */}
                  <span className="font-sans font-black text-white text-[12px] md:text-[14px] uppercase tracking-wide transform -rotate-12 select-none">
                    DCDC
                  </span>
                </div>
              )}
            </div>
            
            {/* Context Logo Text in Navbar */}
            <div className="flex flex-col justify-center text-left transition-colors duration-300 gap-0.5">
              <span className="font-sans font-black tracking-[0.2em] text-white text-base md:text-lg group-hover:text-[#E2E8F0] leading-none">
                DCDC
              </span>
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-[#D8DEE8]/70 group-hover:text-[#E2E8F0]/90 leading-none">
                SRMIST
              </span>
            </div>
          </div>

          {/* Central Glassmorphic Pill Link Controls — absolutely centered */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center bg-[#0D1118]/80 backdrop-blur-md rounded-full px-2 py-2 border border-white/10 shadow-lg shadow-black/80 z-50">
            <div className="flex items-center gap-1.5">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  id={`nav-link-${item.sectionId}`}
                  onClick={() => {
                    setActiveSection(item.sectionId);
                    scrollToSection(item.sectionId);
                  }}
                  className={`px-6 py-2.5 text-sm font-medium tracking-wide rounded-full transition-all duration-300 cursor-pointer ${
                    activeSection === item.sectionId
                      ? 'bg-white/10 text-white shadow-inner font-semibold'
                      : 'text-[#D8DEE8]/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0D1118]/80 border border-white/10 text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-[60vh] bg-[#06080D]/95 backdrop-blur-xl z-40 pt-24 px-6 pb-8 border-b border-white/10 flex flex-col justify-between shadow-2xl"
          >
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#E5B93C] border-b border-white/5 pb-2">
                EXHIBITION CORRIDORS
              </span>
              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveSection(item.sectionId);
                      scrollToSection(item.sectionId);
                    }}
                    className={`text-left text-lg font-sans font-medium tracking-wide transition-colors ${
                      activeSection === item.sectionId ? 'text-white' : 'text-[#D8DEE8]/60 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}