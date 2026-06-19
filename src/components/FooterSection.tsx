import React from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Layers, 
  ExternalLink,
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  Check, 
  Bookmark,
  Sparkles,
  ArrowUp
} from 'lucide-react';

export const FooterSection: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = 2026;

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Project Vault', href: '#vault' },
    { name: 'Contact', href: '#contact-us-section' },
  ];

  const activities = [
    'Technical Workshops',
    'Project Innovation',
    'Achievements & Recognition',
    'Technical Talks',
    'Community Engagement',
  ];

  const resources = [
    { name: 'Project Repository', href: '#repo' },
    { name: 'Gallery Portfolio', href: '#gallery' },
    { name: 'Event Archive', href: '#archive' },
    { name: 'Announcements', href: '#announcements' },
    { name: 'Membership Info', href: '#membership' },
  ];

  return (
    <footer id="main-footer" className="bg-navy-950 text-ivory/90 pt-20 pb-10 relative overflow-hidden">
      {/* Structural Dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ivory-dark/20 to-transparent" />
      <div className="absolute -bottom-24 left-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
          
          {/* COLUMN 1: DCDC Logo & Description (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              {/* Logo icon */}
              <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center text-navy-900 border border-gold shadow-md">
                <Terminal className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-tight text-ivory flex items-center gap-1.5">
                  DCDC <span className="text-gold text-xs px-1.5 py-0.5 rounded bg-gold/10 font-mono">ECE</span>
                </span>
                <span className="text-[10px] text-ivory-light/50 tracking-wider font-semibold block uppercase">
                  Digital Comm. & Design Club
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-ivory-light/70 leading-relaxed">
              The Digital Communication & Design Club (DCDC) is a student-driven community under the Department of Electronics and Communication Engineering, fostering innovation, technical excellence, creativity, and collaborative learning.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] text-ivory-light/50 tracking-wider uppercase">
                SRMIST Ramapuram Student Chapter
              </span>
            </div>
          </div>

          {/* COLUMN 2: Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="font-display text-sm font-semibold text-gold tracking-wider uppercase border-l-2 border-gold pl-3">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-ivory-light/65 hover:text-gold hover:underline transition-all duration-200 flex items-center gap-1.5 group"
                    id={`footer-quick-link-${idx}`}
                  >
                    <span className="text-gold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[10px]">
                      ◆
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Club Activities (3 Cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="font-display text-sm font-semibold text-gold tracking-wider uppercase border-l-2 border-gold pl-3">
              Club Activities
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-sans">
              {activities.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-ivory-light/65">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/50 mt-1.5 flex-shrink-0" />
                  <span className="leading-tight">{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Resources (3 Cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="font-display text-sm font-semibold text-gold tracking-wider uppercase border-l-2 border-gold pl-3">
              Resources
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans">
              {resources.map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.href}
                    className="text-ivory-light/65 hover:text-gold hover:underline transition-all duration-200 flex items-center justify-between group"
                    id={`footer-resource-link-${idx}`}
                  >
                    <span className="truncate">{item.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-gold-light transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider above Copyright */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-ivory-dark/15 to-transparent my-4" />

        {/* Bottom Footer Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-8 pb-4">
          <div className="space-y-2 text-center lg:text-left">
            <span className="font-display font-bold text-sm tracking-wide text-ivory block">
              Digital Communication & Design Club (DCDC)
            </span>
            <span className="font-sans text-xs text-ivory-light/50 block">
              Department of Electronics & Communication Engineering
            </span>
            <span className="font-sans text-xs text-ivory-light/50 block">
              SRM Institute of Science and Technology, Ramapuram campus, Chennai.
            </span>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-3">
            {/* Social Icons inside Footer */}
            <div className="flex gap-3">
              {[
                { icon: <Instagram className="w-4 h-4" />, href: '#instagram', label: 'Instagram' },
                { icon: <Linkedin className="w-4 h-4" />, href: '#linkedin', label: 'LinkedIn' },
                { icon: <Youtube className="w-4 h-4" />, href: '#youtube', label: 'YouTube' },
                { icon: <Mail className="w-4 h-4" />, href: 'mailto:dcdc.ece.rmp@srmist.edu.in', label: 'Email' }
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  className="w-8 h-8 rounded-lg bg-navy-900 border border-ivory-dark/10 text-ivory/60 hover:text-gold hover:border-gold hover:bg-navy-800 flex items-center justify-center transition-all shadow-sm"
                  title={soc.label}
                  id={`footer-social-${idx}`}
                >
                  {soc.icon}
                </a>
              ))}
            </div>

            <button
              onClick={handleScrollToTop}
              className="px-3.5 py-1.5 rounded-full bg-navy-900 hover:bg-navy-800 border border-ivory-dark/15 text-gold-light text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm group cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Copyright & Disclaimer Block */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-ivory-dark/5 text-[11px] text-ivory-light/35 font-mono">
          <p className="text-center sm:text-left">
            © {currentYear} DCDC. All Rights Reserved. SRMIST Department of ECE.
          </p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/55" />
            <p className="text-center sm:text-right">
              Designed & Developed by <span className="text-gold/80 font-semibold">DCDC Technical Team</span>.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
