import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle } from 'lucide-react';
import { EventItem } from '../types';

interface IsometricStationProps {
  event: EventItem;
  isSelected: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

export default function IsometricStation({
  event,
  isSelected,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick
}: IsometricStationProps) {
  // Theme color settings for subtle indicators
  const themeAccent = {
    Technical: '#38bdf8', // Light blue
    'Technical Workshop': '#0ea5e9', // Ocean blue
    Projects: '#c084fc', // Purple
    Outreach: '#4ade80', // Green
    Innovation: '#fb923c', // Orange
    'Club Bonding': '#f472b6' // Pink
  }[event.category] || '#cbd5e1';

  // Render highly-detailed 2.5D isometric SVG scene models matching the screenshot
  const renderIsometricScene = () => {
    switch (event.id) {
      case 'feb-electronics-game':
        return (
          <>
            {/* Arcade Console Screen / Holographic Board on Left */}
            <g transform="translate(62, 50)">
              {/* Backing structural shell */}
              <path d="M 0 35 L 36 49 L 36 5 L 0 -9 Z" fill="#0c1938" stroke="#38bdf8" strokeWidth="1.2" />
              {/* Green CRT Screen face */}
              <path d="M 4 32 L 32 44 L 32 8 L 4 -4 Z" fill="#082f49" />
              {/* Oscillating wave trace */}
              <path d="M 6 18 Q 14 2 20 25 T 30 16" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
              {/* Blinking LEDs */}
              <circle cx="8" cy="27" r="1.5" fill="#f43f5e" className="animate-ping" />
              <circle cx="14" cy="29" r="1" fill="#eab308" />
              <circle cx="20" cy="31" r="1" fill="#38bdf8" />
            </g>

            {/* Standing Whiteboard Banner for "ELECTRONICS GAME / DCDC" */}
            <g transform="translate(142, 38)">
              {/* Frame posts */}
              <line x1="0" y1="20" x2="0" y2="45" stroke="#64748b" strokeWidth="2.2" />
              <line x1="38" y1="35" x2="38" y2="60" stroke="#64748b" strokeWidth="2.2" />
              {/* Angled Whiteboard Panel */}
              <polygon points="0,5 42,21 42,42 0,26" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
              {/* Dark schematics text lines on board */}
              <path d="M 6,11 L 34,22 M 6,16 L 34,27 M 6,21 L 24,28" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
              {/* Title label "ELECTRONICS GAME" */}
              <text x="20" y="8" fill="#1e293b" fontSize="4.5" fontWeight="900" fontFamily="monospace" transform="rotate(20) skewX(-10)" textAnchor="middle">
                ELECTRONICS GAME
              </text>
            </g>

            {/* Main Breadboard / Workbench Assembly in Center-Right */}
            <g transform="translate(105, 96)">
              {/* Multi-layered breadboard deck */}
              <polygon points="0,17 45,34 75,20 30,3" fill="#fafafa" stroke="#cbd5e1" strokeWidth="0.8" />
              {/* 3D Thickness side depth */}
              <polygon points="0,17 45,34 45,38 0,21" fill="#e2e8f0" />
              <polygon points="45,34 75,20 75,24 45,38" fill="#cbd5e1" />
              {/* Pin holes pattern array */}
              <path d="M 15,14 L 35,5 M 22,17 L 42,8 M 29,20 L 49,11" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="1 3" />
              {/* Integrated Microchip (IC) */}
              <polygon points="26,11 36,15 42,12 32,8" fill="#0f172a" />
              {/* Jumping colorful hookup wire loops */}
              <path d="M 12,13 Q 22,-2 32,10" fill="none" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
              {/* Blue wire loop */}
              <path d="M 28,19 Q 42,9 48,16" fill="none" stroke="#2563eb" strokeWidth="1" strokeLinecap="round" />
              {/* Yellow wire loop */}
              <path d="M 18,15 Q 35,30 45,11" fill="none" stroke="#eab308" strokeWidth="1" strokeLinecap="round" />
            </g>

            {/* Lab Gamepads resting on stage */}
            <g transform="translate(148, 126)">
              <ellipse cx="10" cy="5" rx="6" ry="3" fill="#475569" transform="rotate(22 10 5)" />
              <ellipse cx="25" cy="11" rx="6" ry="3" fill="#475569" transform="rotate(22 25 11)" />
              <circle cx="8" cy="4" r="0.8" fill="#ef4444" />
              <circle cx="23" cy="10" r="0.8" fill="#10b981" />
            </g>

            {/* Glowing vertical test probe lasers */}
            <line x1="85" y1="95" x2="85" y2="45" stroke="#38bdf8" strokeWidth="1" strokeDasharray="1 4" className="animate-pulse" />
            <circle cx="85" cy="95" r="2.5" fill="#38bdf8" />
          </>
        );

      case 'feb-proj-discussion-2':
        return (
          <>
            {/* Large Standing Lecture Presentation Board */}
            <g transform="translate(144, 25)">
              <line x1="0" y1="20" x2="0" y2="48" stroke="#475569" strokeWidth="2.2" />
              <line x1="38" y1="36" x2="38" y2="64" stroke="#475569" strokeWidth="2.2" />
              {/* Big whiteboard with technical notes */}
              <polygon points="0,5 45,22 45,46 0,29" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
              <text x="22" y="8" fill="#0f172a" fontSize="4.5" fontWeight="900" fontFamily="monospace" transform="rotate(20) skewX(-10)" textAnchor="middle">
                PROJECT DISCUSSION
              </text>
              <path d="M 6,12 L 38,24 M 6,17 L 38,29 M 6,22 L 28,31" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
            </g>

            {/* Left Small standing chart placard */}
            <g transform="translate(68, 52)">
              <polygon points="0,4 24,13 24,28 0,19" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="12" y1="18" x2="12" y2="35" stroke="#475569" strokeWidth="1.5" />
              <path d="M 4,8 L 18,13 M 4,12 L 18,17 M 4,16 L 12,19" stroke="#64748b" strokeWidth="0.8" />
            </g>

            {/* Central Round Conference Table */}
            <g transform="translate(120, 108)">
              {/* Shadow underneath */}
              <ellipse cx="0" cy="8" rx="42" ry="21" fill="#090f1e" fillOpacity="0.6" />
              
              {/* Double bevel metallic table deck */}
              <ellipse cx="0" cy="0" rx="38" ry="19" fill="#475569" stroke="#cbd5e1" strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="32" ry="16" fill="#1e293b" />
              
              {/* Holographic glowing center light */}
              <ellipse cx="0" cy="0" rx="8" ry="4" fill="#c084fc" fillOpacity="0.3" stroke="#d8b4fe" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1.5" fill="#f472b6" className="animate-pulse" />

              {/* 6 Corporate Ergonomic Chairs positioned in 3D around the desk */}
              {[
                { dx: 0, dy: -14, hasBack: true },  // Top
                { dx: -26, dy: -6, hasBack: true },  // Mid-left
                { dx: 26, dy: -6, hasBack: true },   // Mid-right
                { dx: -24, dy: 8, hasBack: false },   // Bottom-left
                { dx: 24, dy: 8, hasBack: false },    // Bottom-right
                { dx: 0, dy: 14, hasBack: false }     // Bottom
              ].map((chair, i) => (
                <g key={i} transform={`translate(${chair.dx - 4}, ${chair.dy - 6})`}>
                  {/* Seat cushions */}
                  <ellipse cx="4" cy="5" rx="3.5" ry="1.8" fill="#334155" stroke="#475569" strokeWidth="0.5" />
                  {/* Back Supports (scaled for isometric layout) */}
                  {chair.hasBack && (
                    <path d="M 1,4 L 1,0 L 7,0 L 7,4" fill="none" stroke="#475569" strokeWidth="1.2" />
                  )}
                </g>
              ))}
            </g>
          </>
        );

      case 'feb-school-outreach':
        return (
          <>
            {/* Floating Satellite Communication Dish above */}
            <g transform="translate(196, 22)">
              {/* Stand beam */}
              <line x1="0" y1="12" x2="-8" y2="28" stroke="#94a3b8" strokeWidth="1.8" />
              {/* Sat dome cup */}
              <ellipse cx="0" cy="6" rx="12" ry="7" fill="#334155" stroke="#cbd5e1" strokeWidth="1" />
              {/* Center emitter */}
              <line x1="0" y1="6" x2="6" y2="-4" stroke="#eab308" strokeWidth="1.5" />
              {/* Signal wave pulses */}
              <ellipse cx="12" cy="-9" rx="4" ry="2.5" fill="none" stroke="#22c55e" strokeWidth="1.2" className="animate-ping" style={{ animationDuration: '3s' }} />
            </g>

            {/* School Classroom chalkboard zone on left */}
            <g transform="translate(64, 76)">
              {/* Stands */}
              <line x1="6" y1="18" x2="6" y2="38" stroke="#475569" strokeWidth="1.5" />
              <line x1="28" y1="28" x2="28" y2="48" stroke="#475569" strokeWidth="1.5" />
              {/* Classroom blackboard */}
              <polygon points="0,5 34,20 34,4 0,-11" fill="#065f46" stroke="#10b981" strokeWidth="1" />
              {/* Formulas & Graph traces */}
              <path d="M 6,0 L 26,9 M 6,4 L 26,13 M 6,-4 L 18,1" stroke="#f0fdf4" strokeWidth="1" strokeLinecap="round" />
              <circle cx="15" cy="4" r="1.5" fill="#fb923c" />
            </g>

            {/* Outreach STEM School Bus (Beautiful isometric vehicle cabin) */}
            <g id="classroom-bus" transform="translate(108, 74)">
              {/* Yellow bus shadow */}
              <ellipse cx="30" cy="45" rx="35" ry="12" fill="#090f1e" fillOpacity="0.5" />

              {/* Main metal driver cabin block */}
              <polygon points="34,36 65,22 65,7 34,21" fill="#cca100" stroke="#fbbf24" strokeWidth="0.8" />
              {/* Main side passenger cabin block */}
              <polygon points="0,21 34,36 34,21 0,6" fill="#eab308" stroke="#fbbf24" strokeWidth="0.8" />
              {/* Roof top panel */}
              <polygon points="0,6 34,21 65,7 31,-8" fill="#fef08a" />
              
              {/* Dark passenger window side slits */}
              <polygon points="6,15 13,18 13,11 6,8" fill="#1e293b" />
              <polygon points="16,19 23,22 23,15 16,12" fill="#1e293b" />
              <polygon points="26,23 32,25 32,19 26,16" fill="#1e293b" />

              {/* Windshield front glass */}
              <polygon points="37,17 50,11 50,5 37,11" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1" />
              <polygon points="52,11 61,7 61,2 52,6" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1" />

              {/* Cabin Door */}
              <polygon points="36,19 36,34 32,32 32,17" fill="#111827" />

              {/* Wheel guards & deep black rubber tires */}
              <ellipse cx="12" cy="38" rx="6" ry="3.5" fill="#1e293b" />
              <circle cx="12" cy="38" r="2.2" fill="#64748b" />

              <ellipse cx="26" cy="44" rx="6" ry="3.5" fill="#1e293b" />
              <circle cx="26" cy="44" r="2.2" fill="#64748b" />

              <ellipse cx="50" cy="29" rx="6" ry="3.5" fill="#1e293b" />
              <circle cx="50" cy="29" r="2.2" fill="#64748b" />

              {/* Headlights */}
              <polygon points="63,22 65,21 65,19 63,20" fill="#fef08a" />
            </g>

            {/* Heavy robotic manufacturing arm assisting on outreach materials */}
            <g transform="translate(186, 76)">
              {/* Pedestal block */}
              <polygon points="0,20 12,25 24,20 12,15" fill="#475569" stroke="#64748b" strokeWidth="1" />
              {/* Rotating socket */}
              <circle cx="12" cy="16" r="3" fill="#eab308" />
              {/* Hydraulic crane vectors */}
              <path d="M 12,16 L 3,0 L -12,5" fill="none" stroke="#64748b" strokeWidth="2.8" strokeLinecap="round" />
              {/* Joint 2 */}
              <circle cx="3" cy="0" r="1.8" fill="#eab308" />
              {/* Target glowing element indicator */}
              <circle cx="-12" cy="5" r="2" fill="#4ade80" className="animate-pulse" />
            </g>
          </>
        );

      case 'mar-pcb-design':
        return (
          <>
            {/* Laboratory Instrument Rack on Left (Oscilloscope / Generator) */}
            <g transform="translate(60, 68)">
              {/* Cabinet outline */}
              <polygon points="0,22 25,33 25,6 0,-5" fill="#1e293b" stroke="#0284c7" strokeWidth="1.2" />
              {/* Inner screen face */}
              <polygon points="3,19 22,27 22,10 3,2" fill="#020617" />
              {/* Beautiful glowing Sine wave curve */}
              <path d="M 5,12 Q 10,-1 14,19 T 20,10" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
              {/* Status lights */}
              <circle cx="5" cy="16" r="1" fill="#ef4444" className="animate-pulse" />
              <circle cx="10" cy="18" r="0.8" fill="#eab308" />
              <circle cx="15" cy="20" r="0.8" fill="#10b981" />
            </g>

            {/* High Tech Analyzer screen 2 */}
            <g transform="translate(90, 54)">
              <polygon points="0,14 18,22 18,4 0,-4" fill="#111827" stroke="#0284c7" strokeWidth="0.8" />
              <polygon points="2,11 16,17 16,5 2,0" fill="#020617" />
              <path d="M 4,7 L 14,2" stroke="#22c55e" strokeWidth="1" />
            </g>

            {/* Main PCB Workbench Table in Center */}
            <g transform="translate(122, 104)">
              {/* Core board platform */}
              <polygon points="0,12 40,28 80,12 40,-4" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1" />
              <polygon points="0,12 40,28 40,32 0,16" fill="#1e293b" />
              <polygon points="40,28 80,12 80,16 40,32" fill="#0284c7" />

              {/* The printed motherboard lying on tabletop */}
              <g transform="translate(20, 6)">
                <polygon points="0,4 20,12 36,4 16,-4" fill="#065f46" stroke="#34d399" strokeWidth="0.8" />
                {/* Board routing pathways */}
                <path d="M 5,3 L 15,7 L 24,3" fill="none" stroke="#f59e0b" strokeWidth="0.7" />
                <path d="M 8,1 L 12,3 L 18,1" fill="none" stroke="#ffd700" strokeWidth="0.7" />
                {/* RAM slots / capacitors */}
                <rect x="18" y="3" width="3" height="1.5" fill="#f8fafc" />
                <rect x="23" y="1" width="3" height="1.5" fill="#f8fafc" />
              </g>

              {/* Soldering pen holster with vapor smoke floating */}
              <g transform="translate(56, -4)">
                <line x1="0" y1="10" x2="-8" y2="2" stroke="#64748b" strokeWidth="1.8" />
                {/* Spiral stand */}
                <circle cx="0" cy="10" r="1.5" fill="#10b981" />
                {/* Warm solder tip smoke bubble */}
                <ellipse cx="-12" cy="-4" rx="4" ry="2" fill="#ffffff" fillOpacity="0.45" className="animate-pulse" />
              </g>
            </g>
          </>
        );

      case 'mar-idea-forge':
        return (
          <>
            {/* Elegant Standing Gold Certificate Scroll (IDEA FORGE 2056 plaque) */}
            <g transform="translate(148, 48)">
              {/* Stand rod */}
              <line x1="14" y1="18" x2="14" y2="52" stroke="#b45309" strokeWidth="2.2" />
              {/* The curved scroll body */}
              <polygon points="0,12 28,24 28,48 0,36" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
              {/* Text lines simulating schematic or ancient rules */}
              <path d="M 4,18 L 24,26 M 4,23 L 24,31 M 4,28 L 18,34" stroke="#78350f" strokeWidth="0.8" strokeLinecap="round" />
              <text x="14" y="14" fill="#78350f" fontSize="4.5" fontWeight="900" fontFamily="serif" transform="rotate(18) skewX(-12)" textAnchor="middle">
                IDEA FORGE 2056
              </text>
            </g>

            {/* Bronze copper technical spinning gears on bottom left */}
            <g transform="translate(76, 114)">
              <circle cx="10" cy="10" r="9" fill="#d97706" stroke="#78350f" strokeWidth="1.5" className="animate-spin" style={{ animationDuration: '6s', transformOrigin: '10px 10px' }} />
              <rect x="8" y="1" width="4" height="18" fill="#b45309" transform="rotate(45 10 10)" />
              <rect x="8" y="1" width="4" height="18" fill="#b45309" transform="rotate(135 10 10)" />
              <circle cx="10" cy="10" r="2.5" fill="#fef3c7" />
            </g>

            {/* Incubation Furnace Chamber (glowing with raw heat) */}
            <g transform="translate(108, 92)">
              {/* Chamber base blocks */}
              <polygon points="0,20 28,32 56,20 28,8" fill="#291305" stroke="#f97316" strokeWidth="1.5" />
              <polygon points="0,20 28,32 28,40 0,28" fill="#431407" />
              <polygon points="28,32 56,20 56,28 28,40" fill="#1a0500" />
              
              {/* Thermal hatch window emitting extreme high-heat light */}
              <polygon points="12,20 28,26 44,20 28,14" fill="#ea580c" />
              {/* Deep yellow fire glow core */}
              <polygon points="18,20 28,24 38,20 28,16" fill="#facc15" className="animate-pulse" />

              {/* Reactor chimney/piston */}
              <path d="M 28,8 L 28,-14" stroke="#ea580c" strokeWidth="3" />
              <circle cx="28" cy="-14" r="5" fill="#f97316" />
            </g>

            {/* Futuristic glowing synaptic brain core floating above */}
            <g transform="translate(122, 54)">
              {/* Electro-discharge nodes */}
              <line x1="14" y1="24" x2="14" y2="44" stroke="#fb923c" strokeWidth="1.2" strokeDasharray="3 4" className="animate-bounce" />
              
              {/* Neon pink brain matter lobes */}
              <ellipse cx="6" cy="12" rx="9" ry="6" fill="#f472b6" fillOpacity="0.5" />
              <ellipse cx="20" cy="12" rx="9" ry="6" fill="#f472b6" fillOpacity="0.5" />
              <ellipse cx="13" cy="7" rx="11" ry="8" fill="#f472b6" fillOpacity="0.7" className="animate-pulse" />
              
              {/* Neuro sparks */}
              <circle cx="1" cy="7" r="0.8" fill="#ffffff" />
              <circle cx="25" cy="7" r="1.2" fill="#ffffff" className="animate-ping" />
            </g>
          </>
        );

      case 'mar-proj-discussion-3':
        return (
          <>
            {/* Elegant Glass panels system framing the boardroom (Architectural highlight!) */}
            {/* Back glassy grid wall */}
            <polygon points="56,108 56,70 120,38 120,76" fill="#c084fc" fillOpacity="0.08" stroke="#a855f7" strokeWidth="0.8" strokeDasharray="4 4" />
            {/* Front glossy pane */}
            <polygon points="120,138 120,100 184,68 184,106" fill="#c084fc" fillOpacity="0.04" stroke="#c084fc" strokeWidth="0.5" />

            {/* High executive glass projection HUD */}
            <g transform="translate(68, 54)">
              <polygon points="0,22 28,33 28,7 0,-4" fill="#0f0724" fillOpacity="0.8" stroke="#f472b6" strokeWidth="1" />
              <polygon points="2,19 26,28 26,9 2,-1" fill="#04020a" />
              {/* Target diagnostics graph */}
              <path d="M 4,14 L 12,18 L 20,11 L 24,19" fill="none" stroke="#4ade80" strokeWidth="1.5" />
              <text x="14" y="6" fill="#f472b6" fontSize="4.5" fontFamily="monospace">98% STABLE</text>
            </g>

            {/* Continuous Modern Executive Meeting Desk */}
            <g transform="translate(120, 102)">
              <polygon points="0,15 36,30 72,15 36,0" fill="#3b0764" stroke="#f5d0fe" strokeWidth="1.5" />
              {/* Glowing ledger core inside desk table */}
              <polygon points="10,15 36,25 62,15 36,5" fill="#f472b6" fillOpacity="0.3" />

              {/* High executive chairs positioned nicely */}
              {[
                { dx: 12, dy: 6 },
                { dx: 36, dy: 16 },
                { dx: 60, dy: 6 },
                { dx: 14, dy: -4 },
                { dx: 36, dy: -10 },
                { dx: 58, dy: -4 }
              ].map((pos, idx) => (
                <circle key={idx} cx={pos.dx} cy={pos.dy} r="2.2" fill="#d946ef" className="animate-pulse" />
              ))}
            </g>
          </>
        );

      case 'apr-fun-event':
        return (
          <>
            {/* Spinning Neon Prize Wheel */}
            <g transform="translate(136, 114)">
              <ellipse cx="0" cy="12" rx="32" ry="16" fill="#090f1e" fillOpacity="0.5" />
              <g className="animate-spin" style={{ animationDuration: '8s', transformOrigin: '0px 0px' }}>
                <circle cx="0" cy="0" r="24" fill="#1e1b4b" stroke="#f472b6" strokeWidth="1.5" />
                {/* Wheel wedges */}
                <line x1="-24" y1="0" x2="24" y2="0" stroke="#f472b6" strokeWidth="0.8" />
                <line x1="0" y1="-24" x2="0" y2="24" stroke="#f472b6" strokeWidth="0.8" />
              </g>
              <circle cx="0" cy="0" r="6" fill="#facc15" />
            </g>

            {/* Multiplayer console / Couch with arcade feel */}
            <g transform="translate(76, 84)">
              <polygon points="0,15 28,24 56,15 28,6" fill="#1e293b" stroke="#cbd5e1" strokeWidth="0.8" />
              <circle cx="18" cy="15" r="2.5" fill="#f472b6" />
              <circle cx="38" cy="15" r="2.5" fill="#38bdf8" />
            </g>

            {/* Celebratory floating party neon star particles above */}
            <g transform="translate(110, 40)">
              <ellipse cx="0" cy="6" rx="8" ry="4" fill="#f472b6" fillOpacity="0.3" className="animate-ping" />
              <circle cx="-15" cy="-8" r="2" fill="#facc15" />
              <circle cx="15" cy="-15" r="1.5" fill="#38bdf8" />
              <circle cx="0" cy="-25" r="2.5" fill="#f472b6" className="animate-pulse" />
            </g>
          </>
        );

      case 'apr-showcase-day':
        return (
          <>
            {/* Glossy back projection display walls */}
            <polygon points="56,108 56,70 120,38 120,76" fill="#c084fc" fillOpacity="0.08" stroke="#a855f7" strokeWidth="0.8" strokeDasharray="4 4" />
            
            {/* Laptop showing success charts on a showcase pedestal */}
            <g transform="translate(122, 94)">
              {/* Exhibit Stand */}
              <polygon points="0,12 24,20 48,12 24,4" fill="#334155" stroke="#475569" strokeWidth="1" />
              <polygon points="0,12 24,20 24,35 0,27" fill="#1e293b" />
              <polygon points="24,20 48,12 48,27 24,35" fill="#0f172a" />

              {/* Holographic glowing award star floating above stand */}
              <g transform="translate(24, -18)" className="animate-bounce" style={{ animationDuration: '2.5s' }}>
                <polygon points="0,-12 3,-3 12,-3 5,2 8,11 0,6 -8,11 -5,2 -12,-3 -3,-3" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                <ellipse cx="0" cy="18" rx="8" ry="3.5" fill="#38bdf8" fillOpacity="0.3" />
              </g>
            </g>

            {/* Stage banners on the sides */}
            <g transform="translate(68, 52)">
              <polygon points="0,4 20,12 20,40 0,32" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8" />
              <text x="10" y="16" fill="#1e293b" fontSize="4.5" fontWeight="950" transform="rotate(20)" textAnchor="middle">DCDC SHOWCASE</text>
            </g>
          </>
        );

      case 'apr-raspberry-pi':
        return (
          <>
            {/* The Raspberry Pi Single-Board Computer slab */}
            <g transform="translate(100, 94)">
              {/* Green multi-layer PCB body */}
              <polygon points="0,18 48,34 80,18 32,2" fill="#15803d" stroke="#16a34a" strokeWidth="1" />
              {/* 3D Depth thickness */}
              <polygon points="0,18 48,34 48,38 0,22" fill="#166534" />
              <polygon points="48,34 80,18 80,22 48,38" fill="#14532d" />

              {/* Metallic dual-stack USB headers on right edge */}
              <polygon points="56,23 68,27 68,17 56,13" fill="#94a3b8" stroke="#4a5568" strokeWidth="0.6" />
              <polygon points="68,27 76,23 76,13 68,17" fill="#cbd5e1" />
              {/* Port jack block */}
              <polygon points="40,29 52,33 52,24 40,20" fill="#475569" stroke="#334155" strokeWidth="0.6" />

              {/* Processor SoC IC Core chip in Center */}
              <polygon points="26,13 36,17 44,13 34,9" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
              {/* Silver Broadcom branding rectangle */}
              <polygon points="29,13 34,15 38,13 33,11" fill="#cbd5e1" />

              {/* GPIO Pin Header strip along top-left edge */}
              <path d="M 6,14 L 28,3 M 10,16 L 32,5" stroke="#eab308" strokeWidth="1.5" strokeDasharray="1 2.2" />

              {/* Glowing red indicator LED and green status LED */}
              <circle cx="12" cy="18" r="1.5" fill="#ef4444" className="animate-ping" />
              <circle cx="12" cy="18" r="1.2" fill="#ef4444" />
              <circle cx="18" cy="20" r="1.2" fill="#22c55e" />
            </g>
          </>
        );

      default:
        return (
          <g transform="translate(120, 90)">
            <HelpCircle className="w-10 h-10 text-slate-500" />
          </g>
        );
    }
  };

  // Assign label texts exactly as in image
  const labelTexts = {
    'feb-electronics-game': { left: 'Electronics & Teamwork', right: 'REGISTER' },
    'feb-proj-discussion-2': { left: 'Preps', right: 'Projects' },
    'feb-school-outreach': { left: 'SCHOOL OUTREACH PROGRAM', right: 'Outreach' },
    'mar-pcb-design': { left: 'PCB DESIGN WORKSHOP', right: 'PCB & Electronics' },
    'mar-idea-forge': { left: 'IDEA FORSE 2056', right: 'Innovation' },
    'mar-proj-discussion-3': { left: 'Innovation', right: 'Projects' },
    'apr-fun-event': { left: 'Fun Event', right: 'Bonding' },
    'apr-showcase-day': { left: 'PROJECT SHOWCASE DAY', right: 'Showcase' },
    'apr-raspberry-pi': { left: 'WORKSHOP ON RASPBERRY PI', right: 'Workshop' }
  }[event.id] || { left: event.title, right: event.category };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
      className="relative cursor-pointer select-none group"
      style={{ width: '250px', height: '275px' }}
    >
      {/* GLOW OVERLAY BEHIND STATION AREA */}
      <div className={`absolute inset-x-0 top-0 bottom-12 rounded-[40px] transition-all duration-300 -z-10 blur-xl ${
        isSelected ? 'bg-sky-500/10 opacity-100 scale-110' :
        isHovered ? 'bg-sky-500/5 opacity-80 scale-105' : 'opacity-0 scale-95'
      }`} />

      {/* CORE 3D PLATFORM & ARTWORK VECTOR STAGE */}
      <svg
        viewBox="0 0 240 200"
        className="w-full h-[200px] overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Bevel effects and shadow systems */}
          <filter id="plaq-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#020617" floodOpacity="0.8" />
          </filter>
          
          <linearGradient id="glow-plate-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.95" />
          </linearGradient>

          {/* Interactive pulse gradient on selected state */}
          <radialGradient id="highlight-pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={themeAccent} stopOpacity="0.4" />
            <stop offset="100%" stopColor={themeAccent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Selected Highlight Aura on Map Plate */}
        {(isSelected || isHovered) && (
          <ellipse cx="120" cy="148" rx="85" ry="40" fill="url(#highlight-pulse)" stroke={themeAccent} strokeWidth="1" strokeDasharray="3 3" className="animate-pulse" />
        )}

        {/* 2.5D BASE STATION PLATFORM DECK (Dark Blue Slate block) */}
        {/* Left Side Facet */}
        <polygon points="35,128 120,168 120,183 35,143" fill="#13203c" stroke="#1d2d4f" strokeWidth="0.8" />
        {/* Right Side Facet */}
        <polygon points="120,168 205,128 205,143 120,183" fill="#09101f" stroke="#101c34" strokeWidth="0.8" />
        {/* Top Surface Rhombus */}
        <polygon points="35,128 120,168 205,128 120,88" fill="#182746" stroke="#2a3e68" strokeWidth="1" />
        
        {/* Glowing circuit line tracers crossing the platform surface */}
        <polyline points="55,120 120,150 185,120" fill="none" stroke={themeAccent} strokeWidth="1.2" strokeOpacity="0.6" />
        <polyline points="120,105 120,150" fill="none" stroke={themeAccent} strokeWidth="1" strokeOpacity="0.4" />

        {/* ACTIVE MODULE ARTWORK RENDERER */}
        {renderIsometricScene()}

        {/* DUAL WHITE ISOMETRIC LABEL PLAQUES (MATCHING THE SCREENSHOT EXACTLY) */}
        {/* Left Plaque/Pill: "Electronics & Teamwork", "Preps", "SCHOOL OUTREACH PROGRAM", etc. */}
        <g transform="translate(18, 134)" filter="url(#plaq-shadow)">
          <polygon points="0,0 102,33 102,46 0,13" fill="url(#glow-plate-grad)" stroke="#475569" strokeWidth="0.75" />
          <text
            x="51"
            y="23"
            fill="#020617"
            fontSize="8.5"
            fontWeight="950"
            fontFamily="monospace"
            letterSpacing="0.1em"
            textAnchor="middle"
            transform="rotate(18) skewX(-4)"
            className="font-black"
          >
            {labelTexts.left.toUpperCase()}
          </text>
        </g>

        {/* Right Plaque/Pill: "REGISTER", "Outreach", "Projects", "Innovation", etc. */}
        <g transform="translate(132, 166)" filter="url(#plaq-shadow)">
          <polygon points="0,0 86,-28 86,-15 0,13" fill="url(#glow-plate-grad)" stroke="#475569" strokeWidth="0.75" />
          <text
            x="43"
            y="-6"
            fill="#020617"
            fontSize="8.8"
            fontWeight="950"
            fontFamily="monospace"
            letterSpacing="0.2em"
            textAnchor="middle"
            transform="rotate(-18) skewX(4)"
            className="font-black"
          >
            {labelTexts.right.toUpperCase()}
          </text>
        </g>

        {/* STATUS QUICK INDICATION BEAD */}
        <circle cx="120" cy="88" r="4.5" fill={event.registrationStatus === 'open' ? '#10b981' : '#f59e0b'} className="animate-pulse" />

        {/* Dynamic Parked Vehicles (Registration is open) */}
        {event.registrationStatus === 'open' && (
          <g id={`parked-vehicles-${event.id}`} className="pointer-events-none select-none">
            {/* Dynamic Hovering Parked Car (Left side of platform representing 4-person registration) */}
            <g transform="translate(68, 142)">
              <ellipse cx="6" cy="11" rx="8" ry="3" fill="#000" fillOpacity="0.55" />
              {/* Mini isometric vehicle facing Southeast */}
              <polygon points="-4,8 2,4 10,4 16,8 14,10 0,10" fill="#0ea5e9" stroke="#38bdf8" strokeWidth="0.6" />
              <polygon points="1,5 5,5 7,10 -1,10" fill="#e0f2fe" fillOpacity="0.85" />
              <circle cx="1" cy="10" r="1.5" fill="#020617" />
              <circle cx="11" cy="10" r="1.5" fill="#020617" />
              <text x="5" y="8" textAnchor="middle" fontSize="4.5" fill="#ffffff" fontWeight="1000" fontFamily="monospace">4P</text>
            </g>

            {/* Dynamic Hovering Parked Bike (Right side of platform representing 2-person registration) */}
            <g transform="translate(155, 142)">
              <ellipse cx="6" cy="11" rx="6" ry="2.5" fill="#000" fillOpacity="0.55" />
              {/* Mini isometric bike facing Southeast */}
              <circle cx="1" cy="11" r="1.5" fill="#020617" />
              <circle cx="11" cy="11" r="1.5" fill="#020617" />
              <path d="M 1,11 L 5,6 L 11,11" fill="none" stroke="#f43f5e" strokeWidth="1" />
              <circle cx="6" cy="5" r="1.2" fill="#fda4af" />
              <text x="6" y="8" textAnchor="middle" fontSize="4.5" fill="#ffffff" fontWeight="1000" fontFamily="monospace">2P</text>
            </g>
          </g>
        )}
      </svg>

      {/* HIGH-RES BUS STOP SIGN BOARD SYSTEM */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 bottom-[-22px] w-[95%] h-[162px] pointer-events-none transition-all duration-300 group-hover:scale-[1.04] flex flex-col items-center justify-end z-20"
        id={`bus-stop-board-${event.id}`}
      >
        {/* Heavy Galvanized Solid Steel Pole plant */}
        <div className="w-[6px] h-[65px] bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 border border-slate-700/50 shadow-md flex-shrink-0" />
        
        {/* Metal base bolt lock */}
        <div className="w-5 h-[5px] bg-[#090e1f] border border-slate-700 rounded-sm -mt-[2px] shadow-sm flex-shrink-0" />

        {/* Realistic Bus Stop sign plate */}
        <div className="absolute top-0 w-full min-h-[96px] bg-[#020613] border-2 border-slate-600/90 rounded-xl p-3 text-center shadow-3xl flex flex-col items-center justify-between group-hover:border-sky-400 transition-all duration-300 overflow-hidden">
          
          {/* Inner active retro warning plate header stripe */}
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />
          
          {/* Corner Chrome Rivet Screws */}
          <div className="w-1.2 h-1.2 rounded-full bg-slate-300 border border-slate-600 absolute top-1.5 left-1.5" />
          <div className="w-1.2 h-1.2 rounded-full bg-slate-400 border border-slate-600 absolute top-1.5 right-1.5" />
          <div className="w-1.2 h-1.2 rounded-full bg-slate-400 border border-slate-600 absolute bottom-2 left-1.5" />
          <div className="w-1.2 h-1.2 rounded-full bg-slate-400 border border-slate-600 absolute bottom-2 right-1.5" />

          {/* Bus Station Badge & Stop Indicator */}
          <div className="w-full flex items-center justify-between px-1 mb-1.5">
            <span className="text-[9.5px] font-mono font-black tracking-widest text-[#f59e0b] bg-amber-950/60 border border-amber-900 px-2 py-0.5 rounded uppercase">
              STOP LINE: {event.category.toUpperCase().slice(0, 14)}
            </span>
            <span className="text-[10px] font-mono font-black text-slate-300 tracking-widest bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
              STN-{event.id.slice(-3).toUpperCase()}
            </span>
          </div>

          {/* Primary Station / Stop Name Display - MUCH LARGER & EXTREMELY VISIBLE */}
          <h4 className="text-[14px] md:text-[14.5px] font-black text-white tracking-wide leading-snug line-clamp-2 w-full text-center flex-1 flex items-center justify-center font-sans group-hover:text-sky-300 transition-colors uppercase pt-1 px-1">
            {event.title}
          </h4>

          {/* Small Timetable print or bus icon */}
          <div className="w-full flex items-center justify-center gap-2 mt-2 border-t border-slate-800/90 pt-2 pb-0.5">
            <span className={`w-2.5 h-2.5 rounded-full ${event.registrationStatus === 'open' ? 'bg-emerald-400 animate-pulse ring-4 ring-emerald-500/20' : 'bg-rose-500 ring-4 ring-rose-500/20'}`} />
            <span className="text-[9px] font-mono text-slate-200 tracking-wider font-extrabold uppercase">
              {event.registrationStatus === 'open' ? 'NEXT BUS: REGISTER NOW' : 'LINE CLOSED'}
            </span>
          </div>

          {/* Bottom Bus Stop sign hanger loop detail */}
          <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-4 h-1.5 border-b border-x border-slate-600 rounded-b-sm bg-slate-900/40" />
        </div>
      </div>
    </motion.div>
  );
}
