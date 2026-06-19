import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Bus, ArrowRight, Gauge, Activity, Sparkles } from 'lucide-react';
import { EventItem } from '../types';
import IsometricStation from './IsometricStation';

interface IsometricJourneyViewProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  selectedCategory: string;
}

export default function IsometricJourneyView({
  events,
  onSelectEvent,
  selectedCategory
}: IsometricJourneyViewProps) {
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);

  // Filter events based on Category Selector
  const visibleEvents = events.filter(
    e => selectedCategory === 'All' || e.category === selectedCategory
  );

  // Group events dynamically by their actual defined months
  // We identify all available months in the active list
  const defaultMonthsOrder = ['February 2026', 'March 2026', 'April 2026'];
  const uniqueMonths = Array.from(new Set(events.map(e => e.month))).filter(Boolean);

  // Sort months so default ones appear chronologically first, and newly added custom months follow
  const sortedMonths = [...uniqueMonths].sort((a, b) => {
    const idxA = defaultMonthsOrder.indexOf(a);
    const idxB = defaultMonthsOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  // Calculate dynamic heights to grow the system roadmap cleanly when new months are entered!
  const rowHeight = 375;
  const dynamicHeight = Math.max(900, sortedMonths.length * rowHeight + 120);

  // Flat chronologically sorted events list
  const flatEvents = sortedMonths.flatMap(monthName => {
    const monthEvents = events.filter(e => e.month === monthName);
    // Sort events horizontally according to their track direction
    const mIdx = sortedMonths.indexOf(monthName);
    const isRightToLeft = mIdx % 2 === 1;
    // We sort the events in order of their coordinates to track progression
    // For even month rows: start is 260, end is 1080 (left-to-right)
    // For odd month rows: start is 960, end is 140 (right-to-left)
    return [...monthEvents].sort((a, b) => {
      const idxA = monthEvents.findIndex(x => x.id === a.id);
      const idxB = monthEvents.findIndex(x => x.id === b.id);
      return idxA - idxB;
    });
  });

  // Helper to fetch coordinates of any event
  const getEventCoordinates = (item: EventItem) => {
    const m = sortedMonths.indexOf(item.month);
    if (m === -1) return { x: 320, y: 200, m: 0 };
    
    const monthEvents = events.filter(e => e.month === item.month);
    const isRightToLeft = m % 2 === 1;
    const xStart = isRightToLeft ? 960 : 260;
    const xEnd = isRightToLeft ? 140 : 1080;
    
    const idx = monthEvents.findIndex(e => e.id === item.id);
    let x = 320;
    if (monthEvents.length > 1) {
      x = xStart + (idx * ((xEnd - xStart) / (monthEvents.length - 1)));
    } else {
      x = (xStart + xEnd) / 2;
    }
    
    const y = 200 + m * rowHeight;
    return { x, y, m };
  };

  // Helper to build continuous route paths
  const getVehiclePath = (item: EventItem, nextItem: EventItem | null) => {
    const start = getEventCoordinates(item);
    if (!nextItem) {
      // Last event - travel to the pipeline terminus
      const endX = start.m % 2 === 0 ? 1230 : 20;
      return `M ${start.x},${start.y} L ${endX},${start.y}`;
    }
    
    const end = getEventCoordinates(nextItem);
    
    if (start.m === end.m) {
      // Same month - straight line!
      return `M ${start.x},${start.y} L ${end.x},${start.y}`;
    } else {
      // Across different months (row change)
      const isEven = start.m % 2 === 0;
      const xExit = isEven ? 1150 : 90;
      const xEntry = isEven ? 1060 : 180;
      
      const yStart = start.y;
      const yEnd = end.y;
      
      const bridgeCurve = isEven
        ? `C 1240,${yStart} 1150,${yEnd} 1060,${yEnd}`
        : `C 0,${yStart} 90,${yEnd} 180,${yEnd}`;
      
      return `M ${start.x},${yStart} L ${xExit},${yStart} ${bridgeCurve} L ${end.x},${yEnd}`;
    }
  };

  return (
    <div className="w-full max-w-full flex flex-col items-center select-none bg-[#030816] py-10 px-4 md:px-8 overflow-hidden relative" id="roadmap-root">
      
      {/* MAP CONTROLS & CAPTIONS */}
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-6 z-10" id="roadmap-header">
        <div className="flex flex-col text-center md:text-left">
          <div className="flex items-center gap-2.5 justify-center md:justify-start">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-white text-2xl font-black md:text-3xl font-sans tracking-tight uppercase">
              DCDC UPCOMING EVENTS
            </h2>
          </div>
        </div>


      </div>

      {/* MOBILE VERTICAL ROUTE (Visible on smaller screens) */}
      <div className="lg:hidden w-full max-w-full overflow-x-hidden space-y-10 relative mt-4">
        {/* Continuous Route Line Background */}
        <div className="absolute left-[20px] top-4 bottom-4 w-1 bg-gradient-to-b from-cyan-500/20 via-indigo-500/20 to-cyan-500/20 rounded-full" />
        
        {sortedMonths.map((month) => (
          <div key={`mobile-month-${month}`} className="space-y-6 relative">
            {/* Month Header Banner */}
            <div className="flex items-center gap-3 mb-4 sticky top-0 z-10 py-2 bg-[#030816]/95 backdrop-blur-md">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-lg">
                <Bus className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tighter font-sans">
                {month}
              </h3>
            </div>

            {/* Event List for this month */}
            {events.filter(e => e.month === month).map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                onClick={() => onSelectEvent(event)}
                className="relative pl-12 group cursor-pointer"
              >
                {/* Station Pole Anchor Visual */}
                <div className="absolute left-[18px] top-6 w-[5px] h-full bg-gradient-to-b from-slate-400/40 to-slate-700/10 z-0" />
                <div className="absolute left-[13px] top-5 w-4 h-4 rounded-full bg-[#030816] border-4 border-cyan-500/80 shadow-[0_0_12px_rgba(6,182,212,0.4)] z-10" />

                {/* MOBILE BUS STOP BOARD CARD */}
                <div className="bg-[#040813] border-2 border-slate-800/90 rounded-2xl p-4 shadow-2xl relative overflow-hidden active:scale-95 transition-all group-hover:border-cyan-500">
                  {/* Status Indicator Header */}
                  <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />
                  
                  {/* Cosmetic Rivets */}
                  <div className="w-1.2 h-1.2 rounded-full bg-slate-600 absolute top-2 left-2" />
                  <div className="w-1.2 h-1.2 rounded-full bg-slate-600 absolute top-2 right-2" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-black text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-900/40 uppercase tracking-wider">
                        STOP: {event.category.slice(0, 15)}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 font-bold tracking-tighter uppercase">
                        STN-{event.id.slice(-3).toUpperCase()}
                      </span>
                    </div>

                    <h4 className="text-[15px] font-black text-white leading-tight uppercase group-hover:text-cyan-300 transition-colors font-sans">
                      {event.title}
                    </h4>

                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-2 border-t border-slate-800/60 mt-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase font-bold">
                        <Gauge className="w-3 h-3 text-cyan-400 opacity-70" />
                        {event.week}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase font-bold">
                        <Activity className="w-3 h-3 text-emerald-400 opacity-70" />
                        {event.time}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${event.registrationStatus === 'open' ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`} />
                        <span className="text-[9px] font-mono text-slate-300 font-black uppercase tracking-widest">
                          {event.registrationStatus === 'open' ? 'BUS ARRIVING' : 'CLOSED'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 font-black uppercase tracking-tighter group-hover:translate-x-1 transition-all ml-1">
                        VIEW <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Pipeline Transit Vehicles Indicator */}
                {event.registrationStatus !== 'open' && (
                  <div className="mt-4 flex flex-col gap-2 opacity-50 group-hover:opacity-100 transition-all ml-1">
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="flex items-center gap-2 text-[8px] font-mono text-cyan-400 font-black tracking-widest pl-2">
                      <div className="w-2 h-1 bg-cyan-500 rounded-sm" /> 4P TRANSPORT EN ROUTE 
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ))}
        
        {/* Route Terminus */}
        <div className="w-full h-8 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent rounded-full" />
        </div>
      </div>

      {/* OVERFLOW VIEWPORT CAPABLE OF PANNING SWIPES (Desktop Only) */}
      <div className="hidden lg:block w-full max-w-7xl overflow-x-auto scrollbar-none pb-6 rounded-2xl border border-white/[0.03] bg-[#020712]/90 shadow-2xl relative" id="roadmap-viewport">
        {/* DRAG SCROLLER INNER FIELD FORCING EXACT COORD RESOLUTION STABILITY */}
        <div 
          className="relative w-[1240px] mx-auto select-none flex-shrink-0 transition-all duration-500"
          style={{ height: `${dynamicHeight}px` }}
        >
          
          {/* STATIC HIGH-FIDELITY VECTOR CANVAS GRAPHICS (CIRCUIT DEPTH) */}
          <svg
            viewBox={`0 0 1240 ${dynamicHeight}`}
            className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* DEF SYSTEMS: GRADIENTS, FLOW PATTERNS AND EFFECTS */}
            <defs>
              <linearGradient id="cyber-grid-fade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2" />
              </linearGradient>

              {/* Glowing pipeline gradient (matches March) */}
              <linearGradient id="pipe-cyan-face" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="30%" stopColor="#f8fafc" />
                <stop offset="70%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>

              {/* Glowing bridge gradients linking separate months */}
              <linearGradient id="feb-mar-bridge-glow" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>

              <linearGradient id="mar-apr-bridge-glow" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* BACKGROUND MATRIX SLATE GRID LINES */}
            <g opacity="0.32">
              {/* Vertical grids */}
              {Array.from({ length: 26 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * 50}
                  y1="0"
                  x2={i * 50}
                  y2={dynamicHeight}
                  stroke="#1e293b"
                  strokeWidth="0.5"
                />
              ))}
              {/* Horizontal grids */}
              {Array.from({ length: Math.ceil(dynamicHeight / 50) + 1 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={i * 50}
                  x2="1240"
                  y2={i * 50}
                  stroke="#1e293b"
                  strokeWidth="0.5"
                />
              ))}
            </g>

            {/* INTEGRATED COPPER SCHEMATIC CIRCUIT NODES ON GROUND DECK */}
            <g stroke="#1e293b" strokeWidth="0.8" fill="none" opacity="0.6" id="copper-circuits">
              {sortedMonths.map((_, m) => {
                const trackY = 200 + m * rowHeight;
                return (
                  <g key={`circuits-${m}`}>
                    {/* Micro circuits floating background */}
                    <circle cx="160" cy={trackY - 60} r="2.5" fill="#0ea5e9" opacity="0.3" />
                    <path d={`M 160,${trackY - 60} L 110,${trackY - 20} L 40,${trackY - 40}`} />
                    <circle cx="40" cy={trackY - 40} r="1.5" />
                    
                    <path d={`M 1080,${trackY - 40} L 1130,${trackY - 10}`} />
                    <circle cx="1130" cy={trackY - 10} r="2" />
                  </g>
                );
              })}
            </g>

            {/* CIRCUIT INTERNET DASHED LINES */}
            <g strokeWidth="0.7">
              {sortedMonths.map((_, m) => {
                const trackY = 200 + m * rowHeight;
                return (
                  <g key={`dashes-${m}`}>
                    <line x1="320" y1={trackY - 70} x2="320" y2={trackY - 10} stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="650" y1={trackY + 15} x2="650" y2={trackY + 80} stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="980" y1={trackY - 70} x2="980" y2={trackY - 10} stroke="#1e293b" strokeDasharray="3 3" />
                  </g>
                );
              })}
            </g>

            {/* ================== SPIRAL PIPELINE BRIDGE SECTIONS (NO WASTED INTERMEDIATE LANES) =================== */}
            {sortedMonths.slice(0, -1).map((_, m) => {
              const yStart = 200 + m * rowHeight;
              const yEnd = 200 + (m + 1) * rowHeight;
              
              const isEven = m % 2 === 0;
              const pathD = isEven
                ? `M 1150,${yStart} C 1240,${yStart} 1150,${yEnd} 1060,${yEnd}`
                : `M 90,${yStart} C 0,${yStart} 90,${yEnd} 180,${yEnd}`;
              const gradientType = m % 2 === 0 ? 'url(#feb-mar-bridge-glow)' : 'url(#mar-apr-bridge-glow)';
              return (
                <g key={`bridge-loop-${m}`}>
                  {/* Layer 1: Bottom depth shadow */}
                  <path d={pathD} fill="none" stroke="#040916" strokeWidth="24" strokeLinecap="round" />
                  <path d={pathD} fill="none" stroke="#010617" strokeWidth="18" strokeLinecap="round" />
                  {/* Layer 2: Main metallic body */}
                  <path d={pathD} fill="none" stroke="url(#pipe-cyan-face)" strokeWidth="12" strokeLinecap="round" />
                  {/* Layer 3: Pulsing trace glow */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={gradientType}
                    strokeWidth="2.2"
                    strokeDasharray="8 20"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                </g>
              );
            })}

            {/* ================== STRAIGHT HORIZONTAL PIPE SECTIONS =================== */}
            {sortedMonths.map((monthName, m) => {
              const trackY = 200 + m * rowHeight;
              // Even months have Sky Blue glow, odd months have Violet/Green glow
              const tracerColor = m % 2 === 0 ? '#0ea5e9' : m % 2 === 1 ? '#a855f7' : '#10b981';
              
              const isRightSide = m % 2 === 1;
              const x1 = isRightSide ? 90 : 180;
              const x2 = isRightSide ? 1060 : 1150;
              
              return (
                <g key={`row-pipe-${m}`} id={`lane-pipe-${m}`}>
                  {/* Layer 1: Dark Slate Bottom Thickness Depth Shadow (3D extrusion feel) */}
                  <line x1={x1} y1={trackY} x2={x2} y2={trackY} stroke="#040916" strokeWidth="24" strokeLinecap="round" />
                  <line x1={x1} y1={trackY} x2={x2} y2={trackY} stroke="#0b1328" strokeWidth="18" strokeLinecap="round" />
                  
                  {/* Layer 2: Middle Metallic Pipe Body */}
                  <line x1={x1} y1={trackY} x2={x2} y2={trackY} stroke="url(#pipe-cyan-face)" strokeWidth="12" strokeLinecap="round" />
                  
                  {/* Layer 3: Neon Core Glow */}
                  <line
                    x1={x1}
                    y1={trackY}
                    x2={x2}
                    y2={trackY}
                    stroke={tracerColor}
                    strokeWidth="2.2"
                    strokeDasharray="8 20"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                </g>
              );
            })}

            {/* GOLD / CYAN ELECTRONIC SOLDER PADS (CONNECTION NODES) */}
            <g stroke="#ffffff" strokeWidth="0.8" id="solder-pads">
              {sortedMonths.flatMap((monthName, m) => {
                const monthEvents = events.filter(e => e.month === monthName);
                const trackY = 200 + m * rowHeight;

                const isRightToLeft = m % 2 === 1;
                const xStart = isRightToLeft ? 960 : 260;
                const xEnd = isRightToLeft ? 140 : 1080;

                return monthEvents.map((event, idx) => {
                  let x = 320;
                  if (monthEvents.length > 1) {
                    x = xStart + (idx * ((xEnd - xStart) / (monthEvents.length - 1)));
                  } else {
                    x = (xStart + xEnd) / 2;
                  }
                  
                  const padColor = m % 2 === 0 ? '#0ea5e9' : '#a855f7';
                  return (
                    <g key={`solder-pad-${event.id}`} id={`pad-group-${event.id}`}>
                      {/* Ring */}
                      <circle cx={x} cy={trackY} r="7" fill="#020617" stroke={padColor} strokeWidth="1.5" />
                      {/* Center pin header */}
                      <circle cx={x} cy={trackY} r="3" fill="#eab308" />
                    </g>
                  );
                });
              })}
            </g>

            {/* ================= 2.5D ISOMETRIC MONTH ROADMAP DECKS ================== */}
            {sortedMonths.map((monthName, m) => {
              const slabY = 40 + m * rowHeight;
              const fillColors = [
                '#15243f', // blueish slate
                '#1a1c2d', // purpleish slate
                '#122c24'  // greenish slate
              ];
              const strokeColors = [
                '#253c65',
                '#2c2e48',
                '#1d4d3e'
              ];
              const highlightColors = [
                '#38bdf8',
                '#a855f7',
                '#10b981'
              ];
              const pillLabel = m === 0 ? 'VIEW BY' : m === 1 ? 'MONTHLY & ANNUAL' : 'KICKSTART & WRAP UP';

              const currentColorIdx = m % 3;
              const isRightSide = m % 2 === 1;
              const translateX = isRightSide ? 1030 : 55;

              return (
                <g 
                  key={`month-slab-${m}`} 
                  transform={`translate(${translateX}, ${slabY})`} 
                  filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.73))"
                  id={`slab-deck-${m}`}
                >
                  {/* Solid 3D Base Slab (Enlarged) */}
                  <polygon points="0,45 85,82 180,45 95,8" fill={fillColors[currentColorIdx]} stroke={strokeColors[currentColorIdx]} strokeWidth="0.8" />
                  <polygon points="0,45 85,82 85,97 0,60" fill="#0b1323" fillOpacity="0.95" />
                  <polygon points="85,82 180,45 180,60 85,97" fill="#040711" />
                  
                  {/* Highlight overlay */}
                  <polygon points="4,43 85,78 176,43 95,12" fill="none" stroke={highlightColors[currentColorIdx]} strokeWidth="1" strokeOpacity="0.45" />

                  {/* Raised text plaque - MUCH LARGER & CLEARER WORDS */}
                  <text
                    x="90"
                    y="38"
                    fill="#ffffff"
                    fontSize="13.5"
                    fontWeight="1000"
                    fontFamily="sans-serif"
                    letterSpacing="0.12em"
                    textAnchor="middle"
                    transform="rotate(22, 90, 38) skewX(-15)"
                    className="select-none font-black text-white drop-shadow-md"
                  >
                    {monthName.toUpperCase()}
                  </text>

                  {/* Dynamic Pill badge banner (Enlarged and bolded) */}
                  <g transform="translate(42, 54) rotate(22) skewX(-15)">
                    <rect x="0" y="0" width="96" height="15" rx="7.5" fill="#020617" stroke={highlightColors[currentColorIdx]} strokeWidth="1" />
                    <text x="48" y="10" fill="#f8fafc" fontSize="6.8" fontWeight="1000" textAnchor="middle" letterSpacing="0.1em" className="font-mono font-black">
                      {pillLabel.toUpperCase()}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* HIGH-TECH DUAL LANE VEHICLES TRANSITING BETWEEN STATIONS */}
            {flatEvents.map((event, j) => {
              if (event.registrationStatus === 'open') return null; // Vehicles are parked if open!

              const nextEvent = flatEvents[j + 1] || null;
              const pathD = getVehiclePath(event, nextEvent);
              const startCoord = getEventCoordinates(event);
              const isOddRow = startCoord.m % 2 === 1;

              return (
                <g key={`pipeline-transit-${event.id}`} className="pointer-events-none select-none">
                  {/* Cyber Car (4P Upper Lane: translateY of -6px) */}
                  <motion.g
                    style={{
                      offsetPath: `path('${pathD}')`,
                      offsetRotate: '0deg',
                      transformBox: 'fill-box',
                      transformOrigin: 'center',
                    }}
                    animate={{ offsetDistance: ['0%', '100%'] }}
                    transition={{
                      duration: 8.5,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: 0.8
                    }}
                  >
                    <g transform="translate(-13, -11)">
                      <g transform={isOddRow ? "scale(-1, 1) translate(-26, 0)" : ""}>
                        <ellipse cx="6" cy="11" rx="8" ry="3.5" fill="#000" fillOpacity="0.4" />
                        {/* Body */}
                        <polygon points="0,9 6,3 18,3 26,9 22,12 0,12" fill="#0ea5e9" stroke="#38bdf8" strokeWidth="0.8" />
                        <polygon points="7,4 12,4 15,9 7,9" fill="#e0f2fe" fillOpacity="0.85" />
                        {/* Passengers */}
                        <circle cx="9" cy="6" r="0.8" fill="#4ade80" />
                        <circle cx="11" cy="6" r="0.8" fill="#4ade80" />
                        <circle cx="13" cy="6" r="0.8" fill="#4ade80" />
                        <circle cx="15" cy="6" r="0.8" fill="#4ade80" />
                        <circle cx="3" cy="11" r="2" fill="#1e293b" />
                        <circle cx="21" cy="11" r="2" fill="#1e293b" />
                        <text x="13" y="10" textAnchor="middle" fontSize="5.5" fill="#ffffff" fontWeight="1000" fontFamily="monospace">4P</text>
                      </g>
                    </g>
                  </motion.g>

                  {/* Sporty Bike (2P Lower Lane: translateY of +6px) */}
                  <motion.g
                    style={{
                      offsetPath: `path('${pathD}')`,
                      offsetRotate: '0deg',
                      transformBox: 'fill-box',
                      transformOrigin: 'center',
                    }}
                    animate={{ offsetDistance: ['0%', '100%'] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <g transform="translate(-10, 3)">
                      <g transform={isOddRow ? "scale(-1, 1) translate(-20, 0)" : ""}>
                        <ellipse cx="6" cy="10" rx="6" ry="2.5" fill="#000" fillOpacity="0.4" />
                        <circle cx="3" cy="10" r="2" fill="#000" stroke="#f43f5e" strokeWidth="0.8" />
                        <circle cx="15" cy="10" r="2" fill="#000" stroke="#f43f5e" strokeWidth="0.8" />
                        <path d="M 3,10 L 8,10 L 12,4 L 15,10" fill="none" stroke="#f43f5e" strokeWidth="1.2" />
                        <circle cx="8" cy="4" r="1.5" fill="#ec4899" />
                        {/* Passengers */}
                        <circle cx="7" cy="3" r="0.8" fill="#facc15" />
                        <circle cx="10" cy="3" r="0.8" fill="#facc15" />
                        <text x="10" y="9" textAnchor="middle" fontSize="5" fill="#ffffff" fontWeight="1000" fontFamily="monospace">2P</text>
                      </g>
                    </g>
                  </motion.g>
                </g>
              );
            })}

          </svg>

          {/* ACTIVE INTERACTIVE RENDERED STATIONS OVERLAYS */}
          {sortedMonths.flatMap((monthName, m) => {
            const monthEvents = events.filter(e => e.month === monthName);
            const isRightToLeft = m % 2 === 1;
            const xStart = isRightToLeft ? 960 : 260;
            const xEnd = isRightToLeft ? 140 : 1080;
            
            return monthEvents.map((event, idx) => {
              // Same horizontal X distribution math
              let x = 320;
              if (monthEvents.length > 1) {
                x = xStart + (idx * ((xEnd - xStart) / (monthEvents.length - 1)));
              } else {
                x = (xStart + xEnd) / 2;
              }

              // Filter category support
              const isCategoryMatching =
                selectedCategory === 'All' || event.category === selectedCategory;

              const isSelected = hoveredEventId === event.id;
              
              // Top-left coordinate relative to container
              const leftPos = x - 125;
              const topPos = 52 + m * rowHeight;

              return (
                <div
                  key={event.id}
                  className="absolute z-10 transition-all duration-300"
                  style={{
                    left: `${leftPos}px`,
                    top: `${topPos}px`,
                    opacity: isCategoryMatching ? 1 : 0.25,
                    pointerEvents: isCategoryMatching ? 'auto' : 'none'
                  }}
                  id={`overlay-station-${event.id}`}
                >
                  <IsometricStation
                    event={event}
                    isSelected={hoveredEventId === event.id}
                    isHovered={hoveredEventId === event.id}
                    onHoverStart={() => setHoveredEventId(event.id)}
                    onHoverEnd={() => setHoveredEventId(null)}
                    onClick={() => onSelectEvent(event)}
                  />
                </div>
              );
            });
          })}
          
        </div>
      </div>
    </div>
  );
}
