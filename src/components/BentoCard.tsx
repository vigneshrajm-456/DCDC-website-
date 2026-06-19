import React, { useState } from "react";
import { motion } from "motion/react";

interface BentoCardProps {
  id?: string;
  title: string;
  text: string;
  imageUrl: string;
  imageSources?: string[];
  fallbackUrl?: string;
  className?: string;
  imageAlt?: string;
  tag?: string;
  imageHeightClass?: string;
  imagePositionClass?: string;
  children?: React.ReactNode;
}

export default function BentoCard({
  id,
  title,
  text,
  imageUrl,
  imageSources,
  fallbackUrl,
  className = "",
  imageAlt = "",
  tag,
  imageHeightClass = "h-[48%]",
  imagePositionClass = "object-center",
  children,
}: BentoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const initialSources = imageSources && imageSources.length > 0 ? imageSources : [imageUrl];
  const [sourceIndex, setSourceIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(initialSources[0]);

  React.useEffect(() => {
    const freshSources = imageSources && imageSources.length > 0 ? imageSources : [imageUrl];
    setSourceIndex(0);
    setImgSrc(freshSources[0]);
  }, [imageUrl, imageSources]);

  const handleImageError = () => {
    const list = imageSources && imageSources.length > 0 ? imageSources : [imageUrl];
    if (sourceIndex < list.length - 1) {
      const nextIdx = sourceIndex + 1;
      setSourceIndex(nextIdx);
      setImgSrc(list[nextIdx]);
    } else if (fallbackUrl && imgSrc !== fallbackUrl) {
      setImgSrc(fallbackUrl);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      id={id}
      className={`relative rounded-[24px] overflow-hidden group cursor-pointer h-full w-full flex flex-col justify-stretch bg-[#0E0E12] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ y: 0, scale: 1 }}
      whileHover={{
        y: -6,
        scale: 1.015,
      }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
    >
      {/* 1. AMBIENT GLOW LAYER
          Secondary glow behind card.
          Color: rgba(36, 88, 255, 0.12).
          Blur: 120px. Spread: 50px.
          Atmosphere: Linear/Framer style. */}
      <div 
        className="absolute inset-0 rounded-[24px] pointer-events-none z-0 transition-shadow duration-300"
        style={{
          boxShadow: isHovered 
            ? "0 0 100px 40px rgba(36, 88, 255, 0.12)" 
            : "0 0 100px 40px rgba(36, 88, 255, 0.06)",
        }}
      />

      {/* 2. PREMIUM ILLUMINATED BORDERS WITH MOUSE-FOLLOW DYNAMIC HIGHLIGHTS
          Normal mode: Thin elegant solid white/0.08 border.
          Hover/Mouse-follow mode: Dynamic radial border tracing coordinates in theme colors. */}
      <div className="absolute inset-0 rounded-[24px] p-[1px] bg-white/[0.08] transition-opacity duration-300 z-10 pointer-events-none group-hover:opacity-0" />
      <div 
        className="absolute inset-0 rounded-[24px] p-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" 
        style={{
          background: `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, rgba(36,88,255,0.7) 0%, rgba(229,185,60,0.45) 45%, rgba(255,90,122,0.15) 75%, transparent 100%)`
        }}
      />
      
      {/* Core Card Container (Deep Premium Midnight #131A24 / #0D1118 as requested) */}
      <div 
        className="relative m-[1px] rounded-[23px] bg-[#0D1118] overflow-hidden flex flex-col z-20 shadow-2xl flex-grow h-[calc(100%-2px)]"
        style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)"
        }}
      >
        {/* Subtle dynamic background spotlight which follows the user's cursor inside the card */}
        <div 
          className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(36,88,255,0.06) 0%, rgba(229,185,60,0.03) 50%, transparent 100%)`
          }}
        />

        {/* Dynamic Edge spotlight shine */}
        <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#2458FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" />

        {/* Image block is exact 48% of the card height as per SaaS Bento Spec */}
        <div className={`relative w-full ${imageHeightClass} overflow-hidden bg-black shrink-0 z-20 rounded-t-[23px]`}>
          {/* Main Background Image - Pristine contrast, brightness, and high-visibility */}
          <motion.img
            src={imgSrc}
            onError={handleImageError}
            alt={imageAlt || title}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover ${imagePositionClass} transition-all duration-[400ms] ease-out`}
            style={{
              filter: isHovered 
                ? "brightness(1.05) contrast(1.1) saturate(1.05)" 
                : "brightness(0.9) contrast(1.1) saturate(1.05)"
            }}
            animate={{
              scale: isHovered ? 1.05 : 1.0,
            }}
            transition={{ ease: "easeOut", duration: 0.4 }}
          />

          {/* Premium Gradient Overlay - exact specs to keep image fully vibrant while ensuring text is readable */}
          <div 
            className="absolute inset-0 pointer-events-none z-10" 
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)"
            }}
          />

          {/* Floated Category Tag */}
          {tag && (
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[9px] font-mono font-bold text-slate-300 tracking-wider backdrop-blur-md uppercase">
                {tag}
              </span>
            </div>
          )}

          {/* Embedded Custom Children Layouts */}
          {children && (
            <div className="absolute inset-0 z-15 flex items-center justify-center pointer-events-none">
              {children}
            </div>
          )}
        </div>

        {/* Text & Metadata Content Area: Occupies remaining card height (approx 52%) as per specs, prioritizing readability */}
        <div className="h-auto flex-grow w-full px-5 py-4 pb-5 flex flex-col justify-start items-start bg-[#0D1118] z-20 relative text-left select-none border-t border-white/5 overflow-visible rounded-b-[23px]">
          {/* Soft blue highlight behind text */}
          <div className="absolute -top-1/2 left-1/4 w-32 h-16 rounded-full bg-[#2458FF]/5 blur-[24px] pointer-events-none group-hover:opacity-100 opacity-20 duration-500" />

          {/* Title - Compact, crisp display font, fully visible, max 2 lines */}
          <h3 className="text-base sm:text-lg font-bold font-display leading-snug text-white tracking-tight transition-colors duration-300 mb-2 shrink-0 line-clamp-2 overflow-visible">
            {title}
          </h3>

          {/* Description - Complete paragraph text, fully visible, wrapping naturally without truncation or clipping */}
          <p 
            className="text-xs sm:text-[13px] font-sans font-medium max-w-full block overflow-visible"
            style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.60" }}
          >
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
