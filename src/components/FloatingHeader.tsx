import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Layers, Sparkles } from 'lucide-react';

export default function FloatingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 py-4 pointer-events-none">
      {/* Floating Pill Design */}
      <div 
        className={`mx-auto w-full max-w-2xl bg-[#1c1c1c]/90 backdrop-blur-xl border border-neutral-800/80 rounded-full shadow-[0_12px_45px_rgba(0,0,0,0.4)] px-4 py-2 flex items-center justify-between pointer-events-auto transition-all duration-300 ${
          scrolled ? 'scale-[0.98] shadow-[0_12px_50px_rgba(0,0,0,0.5)]' : 'scale-100'
        }`}
      >
        {/* Logo Section */}
        <a href="#hero" className="flex items-center gap-2 group pl-2">
          {/* Custom Futureblox Logo Icon */}
          <div className="flex items-end gap-1.5 h-5">
            <div className="w-2.5 h-5 bg-neutral-100 rounded-full group-hover:bg-blue-500 transition-colors duration-300" />
            <div className="w-2.5 h-3.5 bg-neutral-100 rounded-full group-hover:bg-blue-500 transition-colors duration-300" />
          </div>
          <span className="font-semibold text-white tracking-tight text-sm md:text-base">
            Futureblox
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-medium text-neutral-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <div className="relative group/menu cursor-pointer flex items-center gap-1 hover:text-white transition-colors">
            <span>About us</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
          <a href="#blog" className="hover:text-white transition-colors">Blog</a>
        </nav>

        {/* Right Call To Action Action */}
        <div className="flex items-center gap-2">
          <button 
            type="button"
            className="hidden md:block bg-[#0061FF] hover:bg-[#1a75ff] active:scale-95 text-white font-medium text-xs py-1.5 px-4 rounded-full transition-all tracking-wide shadow-lg shadow-blue-500/10"
          >
            Get it now
          </button>
          
          {/* Mobile menu toggle */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-all pointer-events-auto"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slideout */}
      {mobileMenuOpen && (
        <div className="absolute top-20 inset-x-4 bg-[#1c1c1c]/95 backdrop-blur-xl border border-neutral-800/80 rounded-3xl p-6 shadow-2xl pointer-events-auto flex flex-col gap-4 md:hidden">
          <div className="flex flex-col gap-3 font-medium text-neutral-300">
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-4 rounded-xl hover:bg-neutral-800/70 transition-all"
            >
              Features
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-4 rounded-xl hover:bg-neutral-800/70 transition-all"
            >
              Pricing
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-4 rounded-xl hover:bg-neutral-800/70 transition-all flex items-center justify-between"
            >
              <span>About us</span>
              <ChevronDown className="w-4 h-4 text-neutral-500" />
            </a>
            <a 
              href="#blog" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-4 rounded-xl hover:bg-neutral-800/70 transition-all"
            >
              Blog
            </a>
          </div>
          <hr className="border-neutral-800/60" />
          <button 
            type="button"
            className="w-full text-center bg-[#0061FF] hover:bg-[#1a75ff] text-white py-3 rounded-xl font-medium shadow-lg shadow-blue-500/10"
          >
            Get it now
          </button>
        </div>
      )}
    </header>
  );
}
