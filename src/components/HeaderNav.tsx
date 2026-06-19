import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Menu, X, Vault, Calendar, Info, Mail, Layout, Home } from 'lucide-react';

interface HeaderNavProps {
  currentView: 'list' | 'isometric';
  onViewChange: (view: 'list' | 'isometric') => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function HeaderNav({
  currentView,
  onViewChange,
  selectedCategory,
  onCategoryChange
}: HeaderNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '#home', icon: Home },
    { name: 'ABOUT', href: '#about', icon: Info },
    { name: 'EVENTS', href: '#events', icon: Calendar, active: true },
    { name: 'VAULT', href: '#vault', icon: Vault },
    { name: 'GALLERY', href: '#gallery', icon: Layout },
    { name: 'CONTACT', href: '#contact', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-[#050b1a]/70 backdrop-blur-xl border-b border-sky-500/30 px-4 md:px-8 flex items-center transition-all duration-300">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between h-full">
        {/* LOGO AND BRANDING */}
        <div className="flex items-center gap-3">
          {/* HIGH-FIDELITY VECTOR DCDC DIAGONAL LOGO */}
          <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(244,63,94,0.15)] border border-white/10 select-none flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect width="100" height="100" fill="#030816" />
              <defs>
                <linearGradient id="magenta-corner" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff465b" />
                  <stop offset="50%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#9f1239" />
                </linearGradient>
                <linearGradient id="cyan-corner" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0891b2" />
                  <stop offset="50%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <linearGradient id="orange-corner" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
              </defs>
              <polygon points="0,0 45,0 0,45" fill="url(#orange-corner)" opacity="0.95" />
              <polygon points="100,100 55,100 100,55" fill="url(#cyan-corner)" opacity="0.95" />
              <g stroke="#ffffff" strokeWidth="1.2" opacity="0.4">
                <line x1="10" y1="5" x2="5" y2="10" />
                <line x1="25" y1="5" x2="5" y2="25" />
                <line x1="40" y1="40" x2="60" y2="60" />
                <line x1="95" y1="75" x2="75" y2="95" />
                <line x1="95" y1="90" x2="90" y2="95" />
              </g>
              <polygon points="2,100 100,2 100,45 45,100" fill="#000000" />
              <polygon points="0,100 100,0 100,28 28,100" fill="#030712" />
              <g strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
                <line x1="0" y1="100" x2="100" y2="0" stroke="#ffffff" strokeWidth="0.8" />
                <line x1="30" y1="100" x2="100" y2="30" stroke="url(#magenta-corner)" />
                <line x1="0" y1="70" x2="70" y2="0" stroke="#10b981" />
              </g>
              <circle cx="35" cy="45" r="2.5" fill="#f43f5e" />
              <circle cx="65" cy="55" r="2.5" fill="#0ea5e9" />
              <circle cx="85" cy="65" r="1.5" fill="#eab308" />
              <circle cx="15" cy="35" r="1.5" fill="#10b981" />
              <text 
                x="50" 
                y="55" 
                fill="#ffffff" 
                fontSize="27" 
                fontWeight="950" 
                fontFamily="system-ui, -apple-system, sans-serif" 
                textAnchor="middle" 
                transform="rotate(-44 50 55) scale(1.1, 0.9)"
                className="select-none font-black"
                style={{ letterSpacing: '-0.02em' }}
              >
                DCDC
              </text>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-lg tracking-tighter leading-none">DCDC</span>
            <span className="text-slate-500 text-[7px] font-mono tracking-[0.3em] uppercase mt-0.5 hidden sm:block">KIT MANIPAL</span>
          </div>
        </div>

        {/* WEB NAVIGATION (HIDDEN ON MOBILE) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-[9px] lg:text-[10px] font-mono tracking-[0.2em] lg:tracking-[0.25em] text-slate-400 font-semibold h-full">
          {navLinks.filter(l => !['GALLERY', 'CONTACT'].includes(l.name)).map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className={`transition-all duration-300 relative h-full flex items-center ${link.active ? 'text-white font-bold' : 'hover:text-white'}`}
            >
              {link.name}
              {link.active && <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />}
            </a>
          ))}
        </nav>

        {/* MOBILE ACTIONS (VISIBLE ON MOBILE ONLY) */}
        <div className="md:hidden flex items-center gap-3">
          {/* Hamburger Menu Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-11 h-11 flex items-center justify-center rounded-[12px] bg-slate-900/50 backdrop-blur-lg border border-sky-500/30 text-sky-400 shadow-[0_0_12px_rgba(14,165,233,0.15)] transition-all active:bg-sky-500/10"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Hamburger actions could go here */}
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 top-[72px] bg-black/60 backdrop-blur-sm z-[45]"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-[72px] right-4 left-4 bg-[#070d1d]/90 backdrop-blur-2xl border border-sky-500/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(14,165,233,0.1)] p-5 z-[50] grid grid-cols-2 gap-3"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-white/5 transition-all active:scale-95 ${link.active ? 'bg-sky-500/10 border-sky-500/30 text-white' : 'bg-white/5 text-slate-400'}`}
                  >
                    <Icon className={`w-5 h-5 ${link.active ? 'text-sky-400' : 'text-slate-500'}`} />
                    <span className="text-[10px] font-mono font-bold tracking-widest">{link.name}</span>
                  </a>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
