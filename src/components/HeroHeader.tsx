import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Lightbulb, Compass, Award, Cpu, ShieldCheck } from 'lucide-react';
import { DCDCLogo } from './DCDCLogo';

export const HeroHeader: React.FC = () => {
  return (
    <header className="relative bg-navy-950 pt-28 pb-12 overflow-hidden text-ivory">
      {/* Mesh gradients for background depth */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-navy-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Embedded grid backdrop representing Communication Signals */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
        
        {/* Animated Brand Emblem replacing the removed cyan/blue tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="relative group cursor-pointer p-4">
            <div className="absolute inset-0 bg-gold/20 rounded-full filter blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
            <DCDCLogo size={80} className="relative z-10 drop-shadow-[0_4px_24px_rgba(245,158,11,0.5)] transform hover:scale-105 transition-transform duration-300" />
          </div>
        </motion.div>

        {/* Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ivory"
          >
            Digital Communication & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark drop-shadow-sm font-sans font-medium">Design Club</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-sm sm:text-lg text-ivory-light/75 leading-relaxed max-w-3xl mx-auto"
          >
            Fostering creative design paradigms, advanced signally and hardware design simulations, collaborative hardware-software development, and academic-industry communication models.
          </motion.p>
        </div>

        {/* Quick action ribbons and navigation pointers */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 pt-4"
        >
          <a
            href="#contact-us-section"
            className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-dark text-navy-900 font-bold text-sm tracking-wide shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            Connect With Us
          </a>
          <a
            href="#at-a-glance-section"
            className="px-6 py-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-ivory font-semibold text-sm border border-ivory-light/10 transition-all flex items-center gap-2"
          >
            View Impact & Legacy
          </a>
        </motion.div>

        {/* Dynamic highlights beneath title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-10 border-t border-ivory-light/5"
        >
          {[
            { label: "Official Club", value: "DCDC SRMIST", icon: <ShieldCheck className="w-4 h-4 text-gold" /> },
            { label: "Technical Focus", value: "Comm. & Design", icon: <Cpu className="w-4 h-4 text-gold" /> },
            { label: "Student Leadership", value: "Creative Minds", icon: <Compass className="w-4 h-4 text-gold" /> },
            { label: "Legacy Period", value: "8+ Active Years", icon: <Award className="w-4 h-4 text-gold" /> }
          ].map((item, index) => (
            <div key={index} className="p-4 bg-navy-900/50 rounded-2xl border border-ivory-light/5 text-left flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gold/10 text-gold flex-shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-ivory-light/40 font-mono uppercase tracking-wider block">{item.label}</span>
                <span className="text-xs sm:text-sm font-semibold text-ivory">{item.value}</span>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </header>
  );
};
