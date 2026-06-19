/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, HardDrive, Phone, Mail, X, Check, Maximize2, Minimize2 } from 'lucide-react';

import farewellPresenter from './assets/images/farewell_presenter_1781680656542.jpg';
import farewellCertificate from './assets/images/farewell_certificate_1781680675431.jpg';
import farewellDiscussion from './assets/images/farewell_discussion_1781680694571.jpg';

interface GalleryEvent {
  id: string;
  title: string;
  subTitle?: string;
  number: string;
  url: string;
  urls: string[];
  category: string;
  shortTitle: string;
}

const GALLERY_EVENTS: GalleryEvent[] = [
  {
    id: 'dcdc-farewell-2026',
    title: 'DCDC Farewell 2026',
    subTitle: 'Celebrating memories, milestones, and new beginnings',
    number: '01',
    url: 'https://i.ibb.co/JRZS4Ldr/F1.jpg',
    urls: [
      'https://i.ibb.co/JRZS4Ldr/F1.jpg',
      'https://i.ibb.co/7NgcWLd2/F2.jpg',
      'https://i.ibb.co/XxgMPT5c/F3.jpg'
    ],
    category: 'ESTABLISHED 2016',
    shortTitle: 'Farewell'
  },
  {
    id: 'antenna-communication-workshop',
    title: 'Antenna Communication Workshop',
    subTitle: 'Hands-on learning in antenna systems and wireless communication',
    number: '02',
    url: 'https://i.ibb.co/nq5xqJjZ/Antenne1.jpg',
    urls: [
      'https://i.ibb.co/nq5xqJjZ/Antenne1.jpg',
      'https://i.ibb.co/SDXHV292/Antenne-2.jpg',
      'https://i.ibb.co/cWm1F2w/Antenne-3.jpg'
    ],
    category: 'VISION CANVAS',
    shortTitle: 'Antenna'
  },
  {
    id: 'club-moments',
    title: 'Club Moments & Group Photos',
    subTitle: 'Snapshots of the DCDC family',
    number: '03',
    url: 'https://i.ibb.co/Mx3PKfZ5/c-1.jpg',
    urls: [
      'https://i.ibb.co/Mx3PKfZ5/c-1.jpg',
      'https://i.ibb.co/90Rc8Nf/c-2.jpg',
      'https://i.ibb.co/PzMsC0sB/c-3.jpg'
    ],
    category: 'CLUB LIFETIME',
    shortTitle: 'Legacy'
  },
  {
    id: 'investor-awareness-program',
    title: 'Investor Awareness Program',
    subTitle: 'Financial literacy & informed decision-making',
    number: '04',
    url: 'https://i.ibb.co/jZ1CQyQ4/i-1.jpg',
    urls: [
      'https://i.ibb.co/jZ1CQyQ4/i-1.jpg',
      'https://i.ibb.co/prbZDSBG/i-2.jpg',
      'https://i.ibb.co/JWZY0qd5/i-3.jpg'
    ],
    category: 'FINANCIAL GRID',
    shortTitle: 'Awareness'
  },
  {
    id: 'tinkathon-2025',
    title: 'Tinkathon 2025',
    subTitle: 'Hands-on tinkering & rapid prototyping',
    number: '05',
    url: 'https://i.ibb.co/7JVycM2R/t1.jpg',
    urls: [
      'https://i.ibb.co/7JVycM2R/t1.jpg',
      'https://i.ibb.co/0y8b28d6/t2.jpg',
      'https://i.ibb.co/vvjzgmP0/t3.jpg'
    ],
    category: 'RAPID MATRIX',
    shortTitle: 'Tinkering'
  },
  {
    id: 'power-bi-workshop',
    title: 'Power BI Workshop',
    subTitle: 'Data storytelling & dashboards',
    number: '06',
    url: 'https://i.ibb.co/TqPjKgS5/p1.jpg',
    urls: [
      'https://i.ibb.co/TqPjKgS5/p1.jpg',
      'https://i.ibb.co/0yGWTy5W/p2.jpg',
      'https://i.ibb.co/RkpkYV6T/p3.jpg'
    ],
    category: 'DATA STORY',
    shortTitle: 'Analytics'
  },
  {
    id: 'idea-forge-2025',
    title: 'Idea Forge 2025',
    subTitle: 'Showcasing innovative prototypes & pitches',
    number: '07',
    url: 'https://i.ibb.co/0yxg54yp/idea-1.jpg',
    urls: [
      'https://i.ibb.co/0yxg54yp/idea-1.jpg',
      'https://i.ibb.co/Gz1CjW0/idea-2.jpg',
      'https://i.ibb.co/FLtYtLHh/idea-3.jpg'
    ],
    category: 'PROTOTYPE LAB',
    shortTitle: 'Forge'
  },
  {
    id: 'evolution-power-innovation',
    title: 'E-Volution: The Power of Innovation',
    subTitle: 'Exploring ideas beyond the classroom',
    number: '08',
    url: 'https://i.ibb.co/mFMX0td3/e-1.jpg',
    urls: [
      'https://i.ibb.co/mFMX0td3/e-1.jpg',
      'https://i.ibb.co/VYFGWsVM/e-2.jpg',
      'https://i.ibb.co/bRdfmVpq/e-3.jpg'
    ],
    category: 'ACADEMIC GRID',
    shortTitle: 'E-Volution'
  },
  {
    id: 'stm32-workshop',
    title: 'STM32 Workshop',
    subTitle: 'Embedded systems & microcontrollers',
    number: '09',
    url: 'https://i.ibb.co/RTNFTtfZ/stm-3.jpg',
    urls: [
      'https://i.ibb.co/RTNFTtfZ/stm-3.jpg',
      'https://i.ibb.co/TqRMm4g7/stm-2.jpg',
      'https://i.ibb.co/jvv6XGRH/stm-1.jpg'
    ],
    category: 'SILICON CHIPS',
    shortTitle: 'STM32'
  },
  {
    id: 'cpp-workshop',
    title: 'C++ Workshop',
    subTitle: 'Foundations of programming in C++',
    number: '10',
    url: 'https://i.ibb.co/jkhWmhm6/cp1.jpg',
    urls: [
      'https://i.ibb.co/jkhWmhm6/cp1.jpg',
      'https://i.ibb.co/WpYJTZbK/cp2.jpg',
      'https://i.ibb.co/PsX4VMQR/cp3.jpg'
    ],
    category: 'ALGORITHM',
    shortTitle: 'C++ Code'
  },
  {
    id: 'beyond-the-circuits',
    title: 'Beyond the Circuits',
    subTitle: 'Talk series & panel discussions',
    number: '11',
    url: 'https://i.ibb.co/b8Fqy8Y/b1.jpg',
    urls: [
      'https://i.ibb.co/b8Fqy8Y/b1.jpg',
      'https://i.ibb.co/1k5SXbq/b2.jpg',
      'https://i.ibb.co/HT9ZvkDD/b3.jpg'
    ],
    category: 'TALK AXIS',
    shortTitle: 'Beyond'
  },
];

const AMBIENT_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 25 + 20,
  delay: Math.random() * -20,
  opacity: Math.random() * 0.35 + 0.15,
}));

export default function App() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [assetLoadProgress, setAssetLoadProgress] = useState<number>(0);
  const [isAssetLoading, setIsAssetLoading] = useState<boolean>(false);
  const [isCustomContactOpen, setIsCustomContactOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [exhibitionEvent, setExhibitionEvent] = useState<GalleryEvent | null>(null);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  // Reset zoom whenever image changes
  useEffect(() => {
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
  }, [fullscreenImageIndex]);

  const handleZoomMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  // Handle keypress navigation in full-screen Lightbox mode
  useEffect(() => {
    if (fullscreenImageIndex === null || !exhibitionEvent) return;

    const handleLightboxKeys = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFullscreenImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setFullscreenImageIndex((prev) => 
          prev !== null && prev > 0 ? prev - 1 : exhibitionEvent.urls.length - 1
        );
      } else if (e.key === 'ArrowRight') {
        setFullscreenImageIndex((prev) => 
          prev !== null && prev < exhibitionEvent.urls.length - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener('keydown', handleLightboxKeys);
    return () => window.removeEventListener('keydown', handleLightboxKeys);
  }, [fullscreenImageIndex, exhibitionEvent]);

  const coreTeamMembers = [
    { id: '1', name: 'Dr. T. Sangeetha', role: 'Faculty Coordinator, DCDC SRMIST', email: 'sangeetha.t@srmist.edu.in', phone: '+91 94444 56789' },
    { id: '2', name: 'Aditya Sen', role: 'Club President / Lead Designer', email: 'aditya.sen@dcdc-srm.org', phone: '+91 98765 43210' },
    { id: '3', name: 'Riya Sharma', role: 'Vice President / Media Head', email: 'riya.sharma@dcdc-srm.org', phone: '+91 87654 32109' },
    { id: '4', name: 'Karan Malhotra', role: 'Core Technical Coordinator', email: 'karan.m@dcdc-srm.org', phone: '+91 76543 21098' },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Preload selected high-resolution active image and update simulated pipeline telemetry progress
  useEffect(() => {
    setIsAssetLoading(true);
    setAssetLoadProgress(15); // Initial visual response bump

    const img = new Image();
    img.src = GALLERY_EVENTS[activeIndex].url;

    // Simulate standard telemetry download packets increments
    const intervalTime = 35 + Math.random() * 15;
    const progressTimer = setInterval(() => {
      setAssetLoadProgress((prev) => {
        if (prev < 88) {
          const increment = Math.floor(Math.random() * 8) + 4;
          return Math.min(88, prev + increment);
        }
        return prev;
      });
    }, intervalTime);

    img.onload = () => {
      clearInterval(progressTimer);
      setAssetLoadProgress(100);
      // Wait for fadeout animation before closing pipeline
      setTimeout(() => {
        setIsAssetLoading(false);
      }, 400);
    };

    img.onerror = () => {
      clearInterval(progressTimer);
      setAssetLoadProgress(100);
      setTimeout(() => {
        setIsAssetLoading(false);
      }, 400);
    };

    return () => {
      clearInterval(progressTimer);
    };
  }, [activeIndex]);

  // Allow cyclic navigation via Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev === 0 ? GALLERY_EVENTS.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev === GALLERY_EVENTS.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCoverflowParams = () => {
    if (windowWidth < 640) {
      const cardW = Math.min(310, windowWidth - 48);
      const cardH = Math.round(cardW * 0.9);
      return { 
        wCard: cardW, 
        hCard: cardH, 
        overlapAmount: cardW * 0.45, 
        activeSpread: cardW * 0.15,
        gap: 0 
      };
    } else if (windowWidth < 768) {
      return { 
        wCard: 380, 
        hCard: 260, 
        overlapAmount: 200, 
        activeSpread: 70,
        gap: 0 
      };
    } else {
      return { 
        wCard: 520, 
        hCard: 340, 
        overlapAmount: 270, 
        activeSpread: 100,
        gap: 0 
      };
    }
  };

  const { wCard, hCard, overlapAmount, activeSpread, gap } = getCoverflowParams();
  const centerOffset = activeIndex * wCard + (wCard / 2);

  // Touch and Mouse Swipe/Drag Gesture States & Refs
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartX = useRef<number | null>(null);
  const dragStartTime = useRef<number>(0);
  const lastX = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const velocity = useRef<number>(0);
  const isTouchOrMouseActive = useRef<boolean>(false);
  const hasDraggedSignificant = useRef<boolean>(false);

  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    dragStartTime.current = Date.now();
    lastX.current = clientX;
    lastTime.current = Date.now();
    velocity.current = 0;
    isTouchOrMouseActive.current = true;
    hasDraggedSignificant.current = false;
  };

  const handleDragMove = (clientX: number) => {
    if (!isTouchOrMouseActive.current || dragStartX.current === null) return;
    const diffX = clientX - dragStartX.current;
    
    // Calculate instantaneous velocity values (pixels per millisecond) for premium glide gestures
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      const dx = clientX - lastX.current;
      velocity.current = dx / dt;
    }
    lastX.current = clientX;
    lastTime.current = now;

    if (Math.abs(diffX) > 8) {
      if (!isDragging) {
        setIsDragging(true);
      }
      hasDraggedSignificant.current = true;
    }
    
    // Zero-lag 1:1 hardware tracked positioning
    setDragOffset(diffX);
  };

  const handleDragEnd = () => {
    if (!isTouchOrMouseActive.current) return;
    
    const finalDiffX = dragOffset;
    setIsDragging(false);
    isTouchOrMouseActive.current = false;
    dragStartX.current = null;
    setDragOffset(0);

    const swipeThreshold = 60; // minimum drag distance in pixels to select next/prev
    const velocityThreshold = 0.45; // peak speed threshold in px/ms to trigger snappy swipe action

    if (finalDiffX > swipeThreshold || (velocity.current > velocityThreshold && finalDiffX > 15)) {
      handlePrev();
    } else if (finalDiffX < -swipeThreshold || (velocity.current < -velocityThreshold && finalDiffX < -15)) {
      handleNext();
    }
    
    // Brief lock to prevent opening detail modal on simple drags
    setTimeout(() => {
      hasDraggedSignificant.current = false;
    }, 50);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? GALLERY_EVENTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === GALLERY_EVENTS.length - 1 ? 0 : prev + 1));
  };

  const activeEvent = GALLERY_EVENTS[activeIndex];

  const getGlowColor = (index: number) => {
    const colors = ['#DDF32E', '#A347FF', '#2EE9F3'];
    return colors[index % colors.length];
  };
  const activeGlowColor = getGlowColor(activeIndex);

  return (
    <div className="min-h-screen bg-shader-sunset text-[#B5B5B6] flex flex-col justify-between selection:bg-[#DDF32E]/30 selection:text-[#030303] relative overflow-hidden">
      

      {/* 
        DCDC PREMIUM TECHNOLOGY-INSPIRED AMBIENT ATMOSPHERE
        Subtle high-end background glows blending Acid Lime, Neon Purple, and Cyber Cyan.
      */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Dynamic large, ultra-blurred radial gradient matching active center card */}
        <motion.div
          animate={{
            background: `radial-gradient(circle, ${activeGlowColor}1f 0%, transparent 65%)`
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[850px] h-[650px] rounded-full blur-[110px]"
        />

        {/* Luminous Neon Purple Background Glow */}
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#A347FF]/5 blur-[150px]" />
        
        {/* Dynamic Acid Lime secondary accent glow */}
        <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#DDF32E]/3 blur-[130px]" />

        {/* Floating stardust memory particles matching brand palette */}
        {AMBIENT_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              backgroundColor: p.id % 3 === 0 ? '#DDF32E' : p.id % 3 === 1 ? '#A347FF' : '#2EE9F3',
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, Math.sin(p.id) * 15, 0],
              opacity: [p.opacity, p.opacity * 0.3, p.opacity * 1.5, p.opacity],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 
        MAIN HERO-LESS GALLERY CANVAS
        Fulfills: "no need of hero section", "large amounts of negative space",
        "images aligned in a clean cinematic strip".
      */}
      <main className="flex-1 flex flex-col justify-center items-center w-full relative z-10 pt-24 md:pt-28 pb-20 select-none overflow-hidden">
        
        {/* DESKTOP LAYOUT (Visible on screen width >= 768px) */}
        <div className="hidden md:flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 justify-center">
          
          {/* Active Detail Overlay Labels with Premium Staggered Text Animations */}
          <div className="flex flex-col items-center justify-end text-center mb-3 border-b border-white/[0.02] pb-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent.id}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  initial: { opacity: 0 },
                  animate: { opacity: 1, transition: { staggerChildren: 0.08 } },
                  exit: { opacity: 0 }
                }}
                className="space-y-1.5 w-full"
              >
                <div className="flex items-center justify-center gap-2.5 overflow-hidden">
                  <motion.span 
                    variants={{
                      initial: { opacity: 0, y: 12 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -8 }
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] sm:tracking-[0.4em] font-extrabold uppercase transition-colors duration-500 text-center"
                    style={{ color: activeGlowColor }}
                  >
                    {activeEvent.number} / {GALLERY_EVENTS.length.toString().padStart(2, '0')}
                  </motion.span>
                </div>
 
                <div className="overflow-hidden w-full">
                  <motion.h2 
                    variants={{
                      initial: { opacity: 0, y: 24 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -16 }
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    className="font-display font-black text-xl sm:text-3xl md:text-5xl text-white tracking-wider sm:tracking-widest uppercase mt-1 leading-snug text-center px-4 select-none break-word"
                  >
                    {activeEvent.title}
                  </motion.h2>
                </div>
 
                {activeEvent.subTitle && (
                  <div className="overflow-hidden w-full">
                    <motion.p 
                      variants={{
                        initial: { opacity: 0, y: 16 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -10 }
                      }}
                      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                      className="text-[9px] sm:text-[11px] font-mono tracking-[0.08em] sm:tracking-[0.18em] text-[#B5B5B6] uppercase max-w-xl mx-auto leading-relaxed mt-1 text-center px-4"
                    >
                      {activeEvent.subTitle}
                    </motion.p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 
            CENTRAL CINEMATIC STRIP
            Symmetrical slider layout where the Center/Active image is enlarged, 
            and side previews sit horizontally in a clean continuous strip.
          */}
          <div className="relative w-full flex items-center justify-center pt-2 pb-32 overflow-hidden">
            
            {/* Nav Arrows - subtle floating desktop triggers */}
            <button
              onClick={handlePrev}
              className="hidden sm:flex absolute left-4 md:left-12 z-30 p-3.5 rounded border border-[#444446] bg-[#0B0B0C]/80 hover:bg-[#DDF32E] hover:border-[#DDF32E] text-[#B5B5B6] hover:text-[#030303] transition-all cursor-pointer group active:scale-95 items-center justify-center"
              aria-label="Previous Workspace"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
 
            <button
              onClick={handleNext}
              className="hidden sm:flex absolute right-4 md:right-12 z-30 p-3.5 rounded border border-[#444446] bg-[#0B0B0C]/80 hover:bg-[#DDF32E] hover:border-[#DDF32E] text-[#B5B5B6] hover:text-[#030303] transition-all cursor-pointer group active:scale-95 items-center justify-center"
              aria-label="Next Workspace"
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </button>
 
            {/* Continuous strip container with horizontal center alignment */}
            <div 
              className="w-full flex justify-start items-center overflow-visible select-none cursor-grab active:cursor-grabbing touch-pan-y"
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
              onTouchEnd={handleDragEnd}
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onMouseMove={(e) => handleDragMove(e.clientX)}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              <div 
                className="flex items-center will-change-transform"
                style={{
                  transform: `translate3d(calc(50vw - ${centerOffset}px + ${dragOffset}px), 0px, 0px)`,
                  transition: isDragging 
                    ? 'none' 
                    : 'transform 800ms cubic-bezier(0.25, 1, 0.5, 1)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {GALLERY_EVENTS.map((event, index) => {
                  const distance = index - activeIndex;
                  const isActive = index === activeIndex;
                  
                  // Sophisticated, hardware-accelerated 3D coverflow transforms
                  let rotateY = 0;
                  let translateZ = 0;
                  let translateX = 0;
                  let scale = 1;
                  let opacity = 1;
                  let zIndex = 10;
                  
                  if (isActive) {
                    rotateY = 0;
                    translateZ = 120; // Bring active center card 3D forward
                    translateX = 0;
                    scale = 1.12;
                    opacity = 1;
                    zIndex = 50;
                  } else if (distance < 0) {
                    // Left side cards rotate inwards (positive)
                    rotateY = 56;
                    translateZ = -120; // Push inactive side cards 3D backward
                    translateX = -distance * overlapAmount - activeSpread;
                    scale = 0.85;
                    opacity = Math.max(0.15, 1.15 - Math.abs(distance) * 0.28);
                    zIndex = 40 - Math.abs(distance);
                  } else {
                    // Right side cards rotate inwards (negative)
                    rotateY = -56;
                    translateZ = -120; // Push inactive side cards 3D backward
                    translateX = -distance * overlapAmount + activeSpread;
                    scale = 0.85;
                    opacity = Math.max(0.15, 1.15 - Math.abs(distance) * 0.28);
                    zIndex = 40 - Math.abs(distance);
                  }
 
                  return (
                    <div
                      key={event.id}
                      onClick={() => {
                        if (hasDraggedSignificant.current) return;
                        if (isActive) {
                          setExhibitionEvent(event);
                        } else {
                          setActiveIndex(index);
                        }
                      }}
                      className="relative shrink-0 cursor-pointer"
                      style={{
                        width: wCard,
                        height: hCard,
                        transform: `perspective(1000px) translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                        opacity: opacity,
                        zIndex: zIndex,
                        transformStyle: 'preserve-3d',
                        transition: isDragging
                          ? 'opacity 300ms ease, z-index 350ms ease, transform 300ms ease'
                          : 'transform 800ms cubic-bezier(0.25, 1, 0.5, 1), opacity 800ms cubic-bezier(0.25, 1, 0.5, 1), z-index 800ms cubic-bezier(0.25, 1, 0.5, 1)',
                      }}
                    >
                      {/* Interactive Visual Canvas with Mirror Reflection */}
                      <div
                        className="relative rounded-[16px] border transition-all duration-[800ms] ease-[0.25,1,0.5,1] shadow-[0_15px_45px_rgba(0,0,0,0.6)] overflow-visible"
                        style={{
                          width: wCard,
                          height: hCard,
                          borderColor: isActive ? '#DDF32E' : '#444446',
                          boxShadow: isActive ? '0 20px 50px rgba(163, 71, 255, 0.3)' : 'none',
                        }}
                      >
                        <div className="w-full h-full rounded-[16px] overflow-hidden relative">
                          {/* High resolution portfolio photo */}
                          <img
                            src={event.url}
                            alt={event.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onDragStart={(e) => e.preventDefault()}
                            className="w-full h-full object-cover select-none pointer-events-none"
                          />
 
                          {/* Delicate hover lighting or soft brand overlay */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/90 via-[#030303]/20 to-transparent transition-opacity duration-500 ${
                              isActive ? 'opacity-35' : 'opacity-80'
                            }`}
                          />
 
                          {/* Display subtle "DCDC • SRMIST" transparent label within image container */}
                          <div className="absolute bottom-4 left-4 font-mono text-[9px] sm:text-[10px] tracking-[0.35em] text-white/40 select-none uppercase z-10 font-bold">
                            DCDC • SRMIST
                          </div>
 
                          {/* High quality glowing gradient border overlay for the main active frame */}
                          {isActive && (
                            <div className="absolute inset-0 border border-[#DDF32E]/30 rounded-[16px] pointer-events-none" />
                          )}
                        </div>
 
                        {/* Mobile view native card navigation arrows overlaid directly on top of the image */}
                        {isActive && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePrev();
                              }}
                              className="sm:hidden absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-lg border border-white/10 bg-black/60 backdrop-blur-md text-white/90 hover:bg-[#DDF32E] hover:text-[#030303] hover:border-[#DDF32E] transition-all cursor-pointer active:scale-95 shadow-lg"
                              aria-label="Previous event"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
 
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                              }}
                              className="sm:hidden absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-lg border border-white/10 bg-black/60 backdrop-blur-md text-white/90 hover:bg-[#DDF32E] hover:text-[#030303] hover:border-[#DDF32E] transition-all cursor-pointer active:scale-95 shadow-lg"
                              aria-label="Next event"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </>
                        )}
 
                        {/* Glass Floor Mirror Reflection (Apple Coverflow Style) */}
                        <div 
                          className="absolute top-[102%] inset-x-0 h-[45%] pointer-events-none select-none opacity-[0.38] scale-y-[-1] blur-[0.2px] overflow-hidden rounded-[16px]"
                          style={{
                            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 85%)',
                            WebkitMaskImage: '-webkit-linear-gradient(top, rgba(0,0,0,0.45) 0%, transparent 85%)',
                          }}
                        >
                          <img 
                            src={event.url} 
                            alt="" 
                            className="w-full h-full object-cover rounded-[16px] opacity-70" 
                            referrerPolicy="no-referrer" 
                          />
                        </div>
                      </div>
 
                      {/* Small numbered marker for side previews */}
                      {!isActive && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-500 font-bold tracking-widest pointer-events-none">
                          {event.number}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
 
          </div>
 
          {/* Premium Timeline Progress Track */}
          <div className="mt-12 flex flex-col items-center gap-3 w-full max-w-xs mx-auto animate-fade-in">
            <div 
              className="relative w-full h-[3px] bg-[#444446]/30 rounded-full overflow-hidden cursor-pointer group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const width = rect.width;
                const rawPercent = clickX / width;
                const targetIndex = Math.min(
                  GALLERY_EVENTS.length - 1,
                  Math.max(0, Math.round(rawPercent * (GALLERY_EVENTS.length - 1)))
                );
                setActiveIndex(targetIndex);
              }}
            >
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#A347FF] to-[#DDF32E] rounded-full"
                animate={{
                  width: `${(activeIndex / (GALLERY_EVENTS.length - 1)) * 100}%`
                }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              />
            </div>
            
            <div className="flex justify-between w-full text-[9px] font-mono tracking-widest text-[#B5B5B6]">
              <span>EP_01</span>
              <span className="text-[#DDF32E] font-bold animate-pulse">
                {(activeIndex + 1).toString().padStart(2, '0')} / {GALLERY_EVENTS.length.toString().padStart(2, '0')}
              </span>
              <span>EP_{GALLERY_EVENTS.length.toString().padStart(2, '0')}</span>
            </div>
          </div>

        </div>

        {/* MOBILE ASYMMETRICAL SPLIT LIST VIEW (Visible on screen width < 768px: block md:hidden) */}
        <div className="block md:hidden w-full max-w-2xl mx-auto px-5 pt-4">
          
          {/* Brand/Node Header */}
          <div className="mb-6 pt-2 text-left">
            <h2 className="text-xl font-display font-black tracking-wider text-white uppercase">DCDC DIGITAL ARCHIVES</h2>
          </div>

          {/* Slices Grid divided cleanly by horizontal decorators (#444446) */}
          <div className="flex flex-col divide-y divide-[#444446]">
            {GALLERY_EVENTS.map((event, index) => {
              const isItemActive = activeIndex === index;
              return (
                <div 
                  key={event.id}
                  onClick={() => {
                    setActiveIndex(index);
                    setExhibitionEvent(event);
                  }}
                  className={`flex items-center justify-between w-full gap-4 py-5 px-3 -mx-3 rounded-xl cursor-pointer group outline-none transition-all duration-300 ${
                    isItemActive 
                      ? "bg-white/[0.03] border-l-2 border-[#DDF32E] pl-2.5" 
                      : "hover:bg-white/[0.01]"
                  }`}
                >
                  {/* Left content zone - strictly left-aligned */}
                  <div className="flex-1 flex flex-col justify-center text-left py-0.5">
                    {/* Category Tag */}
                    <span className="text-[9.5px] font-mono tracking-[0.16em] text-[#DDF32E] font-extrabold uppercase mb-1.5 select-none">
                      {event.category}
                    </span>

                    {/* Bold Title */}
                    <h3 className="font-display font-black text-base xs:text-lg text-white tracking-wide uppercase leading-tight transition-colors duration-300 group-hover:text-[#DDF32E] select-none">
                      {event.title}
                    </h3>

                    {/* Subheading details */}
                    <p className="mt-1 text-[11px] text-[#B5B5B6]/70 leading-normal line-clamp-2 select-none">
                      {event.subTitle}
                    </p>
                  </div>

                  {/* Right column: perfectly cropped, compact card surface with rounded-xl and back-shadow */}
                  <div className="shrink-0 relative">
                    <div className="relative w-22 h-22 xs:w-26 xs:h-22 rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.65)] border border-white/10 transition-all duration-500 group-hover:scale-[1.03] group-hover:border-[#DDF32E]/30 group-hover:shadow-[0_10px_25px_rgba(221,243,46,0.15)]">
                      <img 
                        src={event.url} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      {/* Ambient darkness overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-85" />
                      
                      {/* Card index visual indicator */}
                      <div className="absolute bottom-2 right-2.5 font-mono text-[9px] text-[#B5B5B6]/60 tracking-normal font-black">
                        #{event.number}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </main>

      {/* Contact Core Team Dialog Mode */}
      <AnimatePresence>
        {isCustomContactOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCustomContactOpen(false)}
              className="absolute inset-0 bg-[#030303]/85 backdrop-blur-md"
            />

            {/* Modal Body (Charcoal Elevated Modal) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#0B0B0C] border border-[#444446] rounded p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden"
            >
              {/* Mesh decoration bg */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#A347FF]/5 blur-[70px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#2EE9F3]/3 blur-[70px] pointer-events-none" />

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#444446]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-sm bg-[#DDF32E] animate-pulse" />
                    <span className="text-[9px] font-mono tracking-[0.3em] text-[#DDF32E] uppercase font-bold">DIRECTORY_NODE</span>
                  </div>
                  <h3 className="text-base font-display uppercase tracking-[0.15em] text-white font-black">
                    CORE TEAM CONTACTS
                  </h3>
                </div>
                <button 
                  onClick={() => setIsCustomContactOpen(false)}
                  className="p-2 -mr-2 rounded hover:bg-[#DDF32E] text-[#B5B5B6] hover:text-[#030303] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {coreTeamMembers.map((member) => (
                  <div 
                    key={member.id} 
                    className="p-4 rounded border border-[#444446] bg-[#030303] space-y-3 hover:border-[#DDF32E]/30 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div>
                        <h4 className="font-display text-sm tracking-wide text-white uppercase font-bold">
                          {member.name}
                        </h4>
                        <p className="text-[10px] font-mono text-[#B5B5B6] uppercase tracking-wider">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 pt-1 border-t border-[#444446]/40">
                      <button
                        onClick={() => handleCopy(member.email, `${member.id}-email`)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#444446] bg-[#0B0B0C] text-[9.5px] font-mono hover:bg-[#DDF32E] hover:text-[#030303] hover:border-[#DDF32E] transition-all cursor-pointer text-[#B5B5B6]"
                      >
                        <Mail className="w-3 h-3 text-[#DDF32E] group-hover:text-inherit" />
                        {copiedId === `${member.id}-email` ? 'COPIED' : 'COPY EMAIL'}
                      </button>
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#444446] bg-[#0B0B0C] text-[9.5px] font-mono hover:bg-[#A347FF] hover:text-[#030303] hover:border-[#A347FF] transition-all text-[#B5B5B6]"
                      >
                        <Phone className="w-3 h-3 text-[#A347FF] group-hover:text-inherit" />
                        DIAL PHONE
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-[9px] font-mono tracking-widest text-[#444446] uppercase font-bold">
                  DIGITAL COMMUNICATION & DESIGN CLUB • SRMIST
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3-Image Detailed Event Exhibition Deck Modal */}
      <AnimatePresence>
        {exhibitionEvent && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-[#030303] text-[#B5B5B6] selection:bg-[#DDF32E]/30 selection:text-[#030303]"
          >
            {/* Ambient Brand Technology Background Glows */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#DDF32E]/3 blur-[160px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#A347FF]/4 blur-[160px] pointer-events-none" />

            <div className="min-h-screen flex flex-col items-center py-12 sm:py-16 px-4 sm:px-10 container mx-auto max-w-4xl relative">
              {/* Header Layout: Anchored cleanly top-right utility close trigger */}
              <div className="w-full flex justify-end items-center mb-10">
                <button
                  onClick={() => setExhibitionEvent(null)}
                  className="group flex items-center gap-2 px-5 py-2.5 rounded border border-[#444446] bg-[#0B0B0C] hover:bg-[#DDF32E] hover:border-[#DDF32E] text-[#B5B5B6] hover:text-[#030303] transition-all duration-300 cursor-pointer text-[10px] font-mono font-bold tracking-[0.25em]"
                >
                  <X className="w-3.5 h-3.5 transition-transform group-hover:rotate-90 duration-300 text-[#DDF32E]" />
                  CLOSE GALLERY
                </button>
              </div>

              {/* Massive minimalist typography Header and details */}
              <div className="w-full text-center space-y-4 mb-14 px-2">
                <h1 className="font-display font-black text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.12em] sm:tracking-[0.2em] md:tracking-[0.3em] text-white uppercase select-none leading-none pr-[-0.12em] sm:pr-[-0.3em]">
                  GALLERY
                </h1>
                <div className="w-16 h-[2.5px] bg-[#DDF32E] mx-auto my-5" />
                <p className="text-[10px] sm:text-sm font-medium text-[#B5B5B6] max-w-xl mx-auto tracking-[0.15em] sm:tracking-[0.2em] uppercase leading-relaxed font-sans text-center">
                  DIGITAL MEDIATED MEMORIES AND EXPERIENCES OF THE DIGITAL COMMUNICATION & DESIGN CLUB
                </p>
              </div>

              {/* Event title dominates */}
              <div className="w-full sm:border-l-2 border-[#DDF32E] pl-0 sm:pl-6 py-2 mb-12 space-y-2 text-center sm:text-left">
                <h2 className="font-display font-black text-xl sm:text-3xl md:text-5xl tracking-wide text-white uppercase leading-snug break-words">
                  {exhibitionEvent.title}
                </h2>
                {exhibitionEvent.subTitle && (
                  <p className="text-[10px] sm:text-xs text-[#B5B5B6] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase font-bold text-center sm:text-left px-2 sm:px-0">
                    {exhibitionEvent.subTitle.replace(/&/g, ' & ')}
                  </p>
                )}
              </div>

              {/* Vertical Stack Presentation with generous padding */}
              <div className="w-full flex flex-col gap-8 sm:gap-16">
                {exhibitionEvent.urls.map((imageUrl, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setFullscreenImageIndex(idx)}
                    className="group relative w-full h-[180px] sm:h-[280px] md:h-[400px] lg:h-[480px] max-w-4xl mx-auto rounded border border-[#444446] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:shadow-[0_30px_50px_rgba(163,71,255,0.15)] transition-all duration-500 bg-[#0B0B0C] cursor-pointer"
                  >
                    {/* Ambient backdrop blur of the image itself */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center blur-2xl opacity-15 scale-110 pointer-events-none transition-all duration-500 group-hover:opacity-25" 
                      style={{ backgroundImage: `url(${imageUrl})` }} 
                    />

                    {/* Uncropped contained foreground photo */}
                    <img
                      src={imageUrl}
                      alt={`${exhibitionEvent.title} Image ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain relative z-10 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.01]"
                    />
                    
                    {/* Dark gradient shroud overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/90 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40 z-10 pointer-events-none" />

                    {/* Micro-watermark embedded in bottom-left inside image cover wrapper */}
                    <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.35em] text-white/40 select-none uppercase z-20 font-bold">
                      DCDC • SRMIST
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer actions with pristine letter spacing */}
              <div className="mt-16 sm:mt-28 flex flex-col sm:flex-row items-center justify-between w-full gap-8 border-t border-[#444446]/40 pt-12">
                <div className="text-[#444446] font-mono text-[9px] tracking-[0.25em] text-center sm:text-left uppercase font-bold px-2">
                  © 2026 DCDC – DIGITAL COMMUNICATION & DESIGN CLUB, SRMIST
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setExhibitionEvent(null)}
                    className="px-8 py-3.5 rounded border border-[#444446] bg-[#0B0B0C] hover:bg-[#DDF32E] hover:border-[#DDF32E] text-[#B5B5B6] hover:text-[#030303] font-mono text-[10px] uppercase tracking-[0.25em] transition-all duration-300 cursor-pointer active:scale-95"
                  >
                    BACK TO GALLERY
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {fullscreenImageIndex !== null && exhibitionEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#030303]/98 flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none"
          >
            {/* Top Bar Navigation & Info Utilities */}
            <div className="w-full flex items-center justify-between z-10">
              <div className="space-y-1">
                <p className="text-[9px] font-mono tracking-[0.3em] text-[#DDF32E] uppercase font-bold">
                  {exhibitionEvent.title}
                </p>
                <p className="text-xs text-white uppercase tracking-wider font-bold">
                  IMAGE {(fullscreenImageIndex + 1).toString().padStart(2, '0')} / {exhibitionEvent.urls.length.toString().padStart(2, '0')}
                </p>
              </div>

              {/* Exit button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFullscreenImageIndex(null)}
                  className="p-3 rounded border border-[#444446] bg-[#0B0B0C]/80 hover:bg-[#DDF32E] text-[#B5B5B6] hover:text-[#030303] hover:border-[#DDF32E] transition-transform hover:rotate-90 duration-300 cursor-pointer active:scale-95"
                  aria-label="Exit Fullscreen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Immersive Image Display Stage */}
            <div className="flex-1 w-full flex items-center justify-center relative my-4 overflow-hidden animate-fade-in font-sans">
              
              {/* Previous Slider Control */}
              <button
                onClick={() => setFullscreenImageIndex((prev) => 
                  prev !== null && prev > 0 ? prev - 1 : exhibitionEvent.urls.length - 1
                )}
                className="absolute left-2 md:left-6 z-20 p-4 rounded border border-[#444446] bg-[#0B0B0C]/80 hover:bg-[#DDF32E] text-[#B5B5B6] hover:text-[#030303] hover:border-[#DDF32E] transition-all active:scale-90 cursor-pointer group"
              >
                <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
              </button>

              {/* Next Slider Control */}
              <button
                onClick={() => setFullscreenImageIndex((prev) => 
                  prev !== null && prev < exhibitionEvent.urls.length - 1 ? prev + 1 : 0
                )}
                className="absolute right-2 md:right-6 z-20 p-4 rounded border border-[#444446] bg-[#0B0B0C]/80 hover:bg-[#DDF32E] text-[#B5B5B6] hover:text-[#030303] hover:border-[#DDF32E] transition-all active:scale-90 cursor-pointer group"
              >
                <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Dynamic Blurred Backdrop Replication for extra visual premium immersion */}
              <div 
                className="absolute inset-0 bg-cover bg-center blur-3xl opacity-15 scale-105 pointer-events-none transition-all duration-700"
                style={{ backgroundImage: `url(${exhibitionEvent.urls[fullscreenImageIndex]})` }}
              />

              {/* Foreground pristine zoom-friendly uncropped image */}
              <motion.div
                key={fullscreenImageIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={handleZoomMouseMove}
                onClick={() => setIsZoomed(!isZoomed)}
                className="w-full h-full max-h-[82vh] max-w-[94vw] flex items-center justify-center z-10 overflow-hidden rounded cursor-zoom-in"
              >
                <img
                  src={exhibitionEvent.urls[fullscreenImageIndex]}
                  alt={`${exhibitionEvent.title} Fullscreen View`}
                  referrerPolicy="no-referrer"
                  className={`max-w-full max-h-full rounded transition-transform duration-200 ease-out shadow-[0_25px_80px_rgba(0,0,0,0.95)] select-none ${
                    isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in object-contain'
                  }`}
                  style={isZoomed ? {
                    transform: 'scale(2.5)',
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                  } : undefined}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
