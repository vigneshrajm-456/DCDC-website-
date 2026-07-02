import { TeamMember } from '../../types';
import { useState } from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';

interface TeamHeroCollageProps {
  members: TeamMember[];
  onSelectMember: (id: string) => void;
}

export default function TeamHeroCollage({ members, onSelectMember }: TeamHeroCollageProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Helper to find a member by id
  const findMember = (id: string) => members.find(m => m.id === id);

  interface CollageCellConfig {
    memberId: string;
    aspectClass: string;
    roundedClass: string;
    isCenterPiece?: boolean;
  }

  const columnsConfig: CollageCellConfig[][] = [
    // Column 1 (Far Left)
    [
      { memberId: 'Thamarai Selvan S', aspectClass: 'aspect-[3.2/4]', roundedClass: 'rounded-t-[140px] rounded-b-[140px]' },
      { memberId: 'Shagun Sahu', aspectClass: 'aspect-[1.1/1]', roundedClass: 'rounded-[110px_110px_30px_110px]' }
    ],
    // Column 2 (Mid Left)
    [
      { memberId: 'A. Anton Michael', aspectClass: 'aspect-[1/1]', roundedClass: 'rounded-full' },
      { memberId: 'R S Srihari', aspectClass: 'aspect-[2.8/4]', roundedClass: 'rounded-t-[120px] rounded-b-[120px]' }
    ],
    // Column 3 (Absolute Center)
    [
      { memberId: 'Mridula MVL', aspectClass: 'aspect-[1/1]', roundedClass: 'rounded-full' },
      { memberId: 'annapoorani', aspectClass: 'aspect-[2.5/4]', roundedClass: 'rounded-t-[150px] rounded-b-[150px]', isCenterPiece: true },
      { memberId: 'Kanishk Balaji K S', aspectClass: 'aspect-[1.1/1]', roundedClass: 'rounded-[30px_110px_110px_110px]' }
    ],
    // Column 4 (Mid Right)
    [
      { memberId: 'Karthick Krishna', aspectClass: 'aspect-[2.7/4]', roundedClass: 'rounded-t-[120px] rounded-b-[120px]' },
      { memberId: 'Govula Kapu Darshan', aspectClass: 'aspect-[1.1/1]', roundedClass: 'rounded-[110px_110px_110px_30px]' }
    ],
    // Column 5 (Far Right)
    [
      { memberId: 'Avanthika R', aspectClass: 'aspect-[1.2/1]', roundedClass: 'rounded-[110px_110px_30px_110px]' },
      { memberId: 'Mounishan', aspectClass: 'aspect-[2.7/4]', roundedClass: 'rounded-t-[120px] rounded-b-[120px]' }
    ]
  ];

  const columnOffsets = [
    'flex flex-col gap-4', // Col 1
    'flex flex-col gap-4 pt-10 lg:pt-14', // Col 2
    'flex flex-col gap-4 pt-4 lg:pt-0', // Col 3 (Center)
    'flex flex-col gap-4 pt-10 lg:pt-8', // Col 4
    'flex flex-col gap-4 pt-6 lg:pt-16' // Col 5
  ];

  return (
    <section id="hero" className="relative pt-32 pb-24 px-4 overflow-hidden bg-[#151515]">
      {/* Mesh Gradient Background Glows */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        {/* Coral Pink glow left */}
        <div className="absolute top-[35%] left-[5%] md:left-[15%] w-72 md:w-[450px] h-72 md:h-[450px] bg-rose-500/15 rounded-full blur-[100px] animate-pulse duration-[6000ms]" />
        {/* Soft Cyan/Teal glow center */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-80 md:w-[600px] h-80 md:h-[500px] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse duration-[8000ms]" />
        {/* Amber Gold glow right */}
        <div className="absolute top-[35%] right-[5%] md:right-[15%] w-72 md:w-[450px] h-72 md:h-[450px] bg-amber-500/10 rounded-full blur-[100px] animate-pulse duration-[7000ms]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-100 tracking-tight leading-[1.1] md:leading-[1.15]">
            Meet our Team
          </h1>
          <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed px-2 font-medium">
            A diverse team of passionate professionals with unique skills driving innovation and excellence in every project.
          </p>
        </div>

        {/* MOBILE/TABLET: Horizontal Scroll Carousel */}
        <div className="lg:hidden w-full overflow-x-auto pb-4 -mx-4 px-4 select-none scrollbar-hide snap-x snap-mandatory">
          <div className="flex gap-4 w-max">
            {columnsConfig.flat().map((cellConfig) => {
              const member = findMember(cellConfig.memberId);
              if (!member) return null;

              return (
                <div
                  key={member.id}
                  className={`group relative overflow-hidden bg-neutral-900 border transition-all duration-500 active:scale-95 flex-shrink-0 w-40 h-52 rounded-[40px] snap-center ${
                    cellConfig.isCenterPiece
                      ? 'border-blue-500/60 shadow-[0_0_30px_rgba(0,97,255,0.25)] ring-4 ring-blue-500/20'
                      : 'border-neutral-800/40 shadow-xl'
                  }`}
                >
                  <img
                    src={member.collageImage}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent flex flex-col justify-end p-3">
                    <p className="text-white font-semibold text-xs">{member.name}</p>
                    <p className="text-neutral-300 text-[10px]">{member.role}</p>
                  </div>
                  {cellConfig.isCenterPiece && (
                    <div className="absolute top-3 left-3 z-20 px-2 py-0.5 bg-[#0061FF] text-[7px] font-bold font-mono tracking-wider text-white uppercase rounded-full shadow-md">
                      Center
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* DESKTOP: Bubble Photographic Collage Grid */}
        <div className="hidden lg:grid w-full grid-cols-5 gap-4 px-2 select-none">
          {columnsConfig.map((colCells, colIndex) => (
            <div key={colIndex} className={columnOffsets[colIndex] || 'flex flex-col gap-4'}>
              {colCells.map((cellConfig) => {
                const member = findMember(cellConfig.memberId);
                if (!member) return null;
                const isHovered = hoveredId === member.id;

                return (
                  <div
                    key={member.id}
                    onMouseEnter={() => setHoveredId(member.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`group relative overflow-hidden bg-neutral-900 border transition-all duration-500 active:scale-95 ${
                      cellConfig.aspectClass
                    } ${cellConfig.roundedClass} ${
                      cellConfig.isCenterPiece
                        ? 'border-blue-500/60 shadow-[0_0_30px_rgba(0,97,255,0.25)] ring-4 ring-blue-500/20 hover:scale-[1.04] hover:shadow-[0_0_40px_rgba(0,120,255,0.5)] hover:border-blue-300'
                        : 'border-neutral-800/40 shadow-xl hover:scale-[1.03] hover:shadow-2xl hover:border-neutral-700/55'
                    }`}
                  >
                    <img
                      src={member.collageImage}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div 
                      className={`absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent flex flex-col justify-end p-4 md:p-5 transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                      }`}
                    >
                      <p className="text-white font-semibold text-xs md:text-sm">{member.name}</p>
                      <p className="text-neutral-300 text-[10px] md:text-xs">{member.role}</p>
                    </div>

                    {cellConfig.isCenterPiece && (
                      <div className="absolute top-4 left-4 z-20 px-2 py-0.5 bg-[#0061FF] text-[8px] font-bold font-mono tracking-wider text-white uppercase rounded-full shadow-md backdrop-blur-sm">
                        Center
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Scroll down indicator prompt */}
        <div className="mt-16 flex flex-col items-center gap-2 text-neutral-500 font-mono text-[10px] uppercase tracking-widest animate-bounce">
          <span>Explore Directory</span>
          <ArrowDown className="w-4 h-4 text-neutral-500" />
        </div>

      </div>
    </section>
  );
}

