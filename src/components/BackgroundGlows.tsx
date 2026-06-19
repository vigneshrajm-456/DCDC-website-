import React, { useEffect, useState } from "react";

export default function BackgroundGlows() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isVisible]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#06080D]">
      {/* 1. Volumetric Atmosphere Lighting (70% Dark background, 20% Blue, 2% Gold, 1% Coral) */}
      
      {/* Heavy Blue Deep Horizon Glow */}
      <div className="absolute top-[10%] left-[20%] w-[65vw] h-[65vw] rounded-full bg-[#2458FF]/7 blur-[140px] mix-blend-screen pointer-events-none" />
      
      {/* Soft Circuit Gold Exhibition Glow */}
      <div className="absolute top-[-5%] right-[15%] w-[45vw] h-[45vw] rounded-full bg-[#E5B93C]/4 blur-[130px] mix-blend-screen pointer-events-none" />

      {/* Subtle Accent Coral Pulse Depth */}
      <div className="absolute bottom-[10%] left-[-5%] w-[35vw] h-[35vw] rounded-full bg-[#FF5A7A]/2 blur-[120px] mix-blend-screen pointer-events-none" />

      {/* Volumetric Center Spotlight beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[45vh] rounded-[50%] bg-[#2458FF]/3 blur-[160px] pointer-events-none rotate-12" />

      {/* 2. Interactive Cursor Digital Probe Spotlight */}
      {isVisible && (
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-500 opacity-30 bg-[radial-gradient(circle_at_center,rgba(36,88,255,0.12)_0%,rgba(229,185,60,0.03)_40%,transparent_70%)]"
          style={{
            left: `${mousePos.x - 300}px`,
            top: `${mousePos.y - 300}px`,
          }}
        />
      )}

      {/* 3. Tech Blueprint Blueprint Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(36, 88, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(36, 88, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,rgba(229,185,60,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,185,60,0.3)_1px,transparent_1px)]"
        style={{ backgroundSize: "240px 240px", backgroundPosition: "12px 12px" }}
      />

      {/* 4. Abstract Elegant Circuit Board Trace Graphics */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="blue-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2458FF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#E5B93C" stopOpacity="0.2" />
          </linearGradient>
          <filter id="pcb-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Grid Crosshairs / Technical Coordinates for Museum Aesthetic */}
        <g stroke="rgba(36, 88, 255, 0.12)" strokeWidth="1" fill="none" opacity="0.6">
          <path d="M 120,40 L 120,80 M 100,60 L 140,60" />
          <path d="M 1320,40 L 1320,80 M 1300,60 L 1340,60" />
          <path d="M 120,820 L 120,860 M 100,840 L 140,840" />
          <path d="M 1320,820 L 1320,860 M 1300,840 L 1340,840" />
        </g>

        {/* Circuit Pattern Group Left Side */}
        <g opacity="0.75">
          {/* Main bus path */}
          <path
            d="M -50,150 L 180,150 L 250,220 L 250,380 L 180,450 L -50,450"
            stroke="url(#blue-gold-grad)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M -50,165 L 170,165 L 235,230 L 235,370 L 170,435 L -50,435"
            stroke="rgba(36, 88, 255, 0.12)"
            strokeWidth="1"
            fill="none"
          />
          
          {/* Component Micro-pad intersections */}
          <circle cx="180" cy="150" r="3.5" fill="#06080D" stroke="#E5B93C" strokeWidth="1.5" filter="url(#pcb-glow)" className="animate-pulse duration-3000" />
          <circle cx="250" cy="220" r="3" fill="#2458FF" />
          <circle cx="250" cy="380" r="3" fill="#2458FF" />
          <circle cx="180" cy="450" r="3.5" fill="#06080D" stroke="#2458FF" strokeWidth="1.5" />

          {/* Golden branching traces with Signal Node Rings */}
          <path d="M 235,300 L 320,300 M 320,300 L 350,330" stroke="rgba(229, 185, 60, 0.25)" strokeWidth="1" fill="none" />
          <circle cx="350" cy="330" r="2.5" fill="#E5B93C" />
          
          <path d="M 250,220 L 320,150 L 400,150" stroke="rgba(36, 88, 255, 0.2)" strokeWidth="1.2" fill="none" />
          <circle cx="400" cy="150" r="2" fill="#2458FF" />
        </g>

        {/* Circuit Pattern Group Right Side (Faint backplate details) */}
        <g opacity="0.65">
          <path
            d="M 1490,200 L 1260,200 L 1180,280 L 1180,480 L 1220,520 L 1490,520"
            stroke="url(#blue-gold-grad)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M 1490,215 L 1270,215 L 1195,290 L 1195,470 L 1230,505 L 1490,505"
            stroke="rgba(229, 185, 60, 0.15)"
            strokeWidth="1"
            fill="none"
          />
          
          {/* Signal rings and micro-pads */}
          <circle cx="1260" cy="200" r="3.5" fill="#06080D" stroke="#2458FF" strokeWidth="1.5" />
          <circle cx="1180" cy="280" r="3" fill="#E5B93C" />
          <circle cx="1180" cy="480" r="3" fill="#2458FF" />
          <circle cx="1220" cy="520" r="3.5" fill="#06080D" stroke="#E5B93C" strokeWidth="1.5" filter="url(#pcb-glow)" />

          {/* Secondary branching */}
          <path d="M 1195,380 L 1110,380 L 1080,350" stroke="rgba(36, 88, 255, 0.2)" strokeWidth="1.2" fill="none" />
          <circle cx="1080" cy="350" r="2.5" fill="#2458FF" />
        </g>

        {/* Elegant structural coordinates label marks */}
        <g fill="rgba(36, 88, 255, 0.3)" fontSize="9" fontFamily="JetBrains Mono, monospace" opacity="0.5">
          <text x="110" y="100">SYS_V_REF: +5.0G</text>
          <text x="1310" y="800" textAnchor="end">INTEG_PORTAL_09</text>
          <text x="110" y="800">NODE_STATUS_LINK</text>
          <text x="1310" y="100" textAnchor="end">FRAME_PERIMETER_A</text>
        </g>
      </svg>

      {/* Atmospheric Vignette for perfect premium museum display */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(6,8,13,0.8)_100%)] pointer-events-none" />
    </div>
  );
}
