/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Info, Layers, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EventImage } from '../types';

interface LightboxModalProps {
  image: EventImage | null;
  eventName: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function LightboxModal({ image, eventName, onClose, onPrev, onNext }: LightboxModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Keyboard navigation support
  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [image, onClose, onPrev, onNext]);

  useEffect(() => {
    setIsZoomed(false);
  }, [image]);

  if (!image) return null;

  return (
    <AnimatePresence>
      <div 
        id="lightbox-overlay" 
        className="fixed inset-0 z-50 flex flex-col justify-between bg-[#07090E]/98 backdrop-blur-3xl overflow-y-auto"
      >
        {/* Dynamic Glowing Cyber Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[#FF416C]/5 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-10 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] rounded-full bg-[#E2B842]/5 blur-[120px] pointer-events-none" />

        {/* Top Header Bar */}
        <div className="relative z-10 w-full px-6 py-4 border-b border-white/[0.04] bg-[#0F131A]/40 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-blue-450" />
              <span>EVENT_VIEWER:</span>
            </span>
            <span className="text-zinc-200 bg-[#0F131A] px-2.5 py-0.5 rounded border border-white/[0.05] font-bold">
              {eventName}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Zoom Action */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 rounded-lg bg-[#0F131A] border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-1 text-xs font-mono select-none cursor-pointer"
              title="Toggle Zoom"
            >
              {isZoomed ? (
                <>
                  <ZoomOut className="w-4 h-4 text-sky-400" />
                  <span className="hidden md:inline">Actual Scale</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-4 h-4 text-blue-400" />
                  <span className="hidden md:inline">Enlarge Visual</span>
                </>
              )}
            </button>

            {/* Close Overlay btn */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#0F131A] border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-red-500/20 transition-all cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Node Grid (Splits Image and Metadata) */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center lg:items-stretch justify-center relative z-10">
          
          {/* Left Arrow - Hidden on Mobile */}
          <div className="hidden lg:flex items-center justify-center lg:col-span-1">
            <button
              onClick={onPrev}
              className="p-3.5 rounded-full border border-white/10 bg-[#0F131A] hover:bg-zinc-800 hover:border-blue-500/30 text-zinc-400 hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-lg group cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Center Image Canvas */}
          <div className="col-span-12 lg:col-span-7 flex items-center justify-center relative overflow-hidden bg-zinc-950/20 border border-white/[0.04] rounded-[24px] p-2 w-full min-h-[300px] md:min-h-[500px]">
            <motion.div
              layoutId={`card-container-${image.id}`}
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src={image.url}
                alt={image.alt}
                referrerPolicy="no-referrer"
                className={`max-w-full max-h-[72vh] rounded-[16px] object-contain shadow-2xl transition-all duration-500 cursor-zoom-in ${
                  isZoomed ? 'scale-125 object-cover' : 'scale-100'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
            </motion.div>
          </div>

          {/* Right Area - Rich Document Metadata Sidepanel */}
          <div className="col-span-12 lg:col-span-3 flex flex-col justify-between py-2 space-y-6 w-full">
            <div className="space-y-6">
              {/* Category tag & Date */}
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{image.tag}</span>
                </span>
                <span className="text-zinc-500 font-mono text-[10px]">
                  ID: {image.id}
                </span>
              </div>

              {/* Document Title */}
              <div className="space-y-2">
                <h2 className="font-display font-bold text-2xl text-white tracking-tight leading-tight">
                  {image.alt}
                </h2>
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#E2B842] to-[#FF416C] rounded-full" />
              </div>

              {/* Dynamic Description Box */}
              <div className="bg-white/[0.01] border border-white/[0.04] rounded-[16px] p-4 space-y-2">
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-[10px] uppercase tracking-wider">
                  <Info className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Interactive Context</span>
                </div>
                <p className="text-xs text-zinc-300 font-light leading-relaxed font-sans">
                  {image.description}
                </p>
              </div>
            </div>

            {/* Quick Mobile Action Links */}
            <div className="pt-6 border-t border-white/[0.04] flex gap-3 text-xs font-mono">
              <button 
                onClick={onClose}
                className="flex-1 py-3 text-center rounded-xl bg-gradient-to-r from-[#E2B842] to-[#FF416C] hover:brightness-110 text-[#07090E] font-black transition-all shadow-[0_4px_15px_rgba(255,65,108,0.15)] select-none cursor-pointer uppercase tracking-wider"
              >
                Close Viewer
              </button>
            </div>
          </div>

          {/* Right Arrow - Hidden on Mobile */}
          <div className="hidden lg:flex items-center justify-center lg:col-span-1">
            <button
              onClick={onNext}
              className="p-3.5 rounded-full border border-white/10 bg-[#0F131A] hover:bg-zinc-800 hover:border-blue-500/30 text-zinc-400 hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-lg group cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Mobile bottom navigation arrows bar */}
        <div className="lg:hidden flex justify-between items-center px-6 py-4 bg-[#0F131A] border-t border-[#ffffff]/[0.04] relative z-10">
          <button
            onClick={onPrev}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#07090E] border border-white/10 text-xs font-mono text-[#E2B842] cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev Media</span>
          </button>
          <span className="text-xs font-mono text-zinc-500">Workshop Sweep</span>
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#07090E] border border-white/10 text-xs font-mono text-[#FF416C] cursor-pointer"
          >
            <span>Next Media</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
}
