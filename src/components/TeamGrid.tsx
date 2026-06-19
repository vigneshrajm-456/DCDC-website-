import { TeamMember } from '../types';
import { User } from 'lucide-react';

interface TeamGridProps {
  members: TeamMember[];
  onSelectMember: (id: string) => void;
}

export default function TeamGrid({ members, onSelectMember }: TeamGridProps) {
  return (
    <section id="directory" className="relative py-20 px-4 bg-[#1c1c1c] border-t border-neutral-800/60">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Title and description */}
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-normal font-gondems">
            Current Members
          </h2>
          <p className="text-neutral-300 text-lg md:text-xl lg:text-2xl leading-relaxed italic font-medium opacity-90">
            "the legacy that stands beyond time"
          </p>
        </div>

        {/* Members Grid matching standard list */}
        {members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {members.map((member) => (
              <div 
                key={member.id}
                className="group flex flex-col items-center text-center space-y-5 hover:translate-y-[-2px] transition-all duration-300"
              >
                {/* Round Profile Image Container */}
                <div 
                  onClick={() => onSelectMember(member.id)}
                  className="relative cursor-pointer w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-neutral-900 border border-neutral-800/80 shadow-xl transition-transform duration-500 md:group-hover:scale-105 group-hover:shadow-2xl"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle hover overlay icon */}
                  <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Identity & Text Area */}
                <div className="flex flex-col items-center space-y-1">
                  <h3 
                    onClick={() => onSelectMember(member.id)}
                    className="font-extrabold text-white text-lg md:text-xl hover:text-blue-400 cursor-pointer transition-colors"
                  >
                    {member.name}
                  </h3>
                  <span className="text-sky-400 font-bold text-xs md:text-sm tracking-wider uppercase">
                    {member.role}
                  </span>
                </div>

                {/* Micro Bio Text */}
                <p className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-[245px] pb-1 font-medium select-text">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
