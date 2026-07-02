import React, { useState } from 'react';
import { teamData } from '../../data/teamData';
import TeamHeroCollage from '../../components/team/TeamHeroCollage';
import TeamGrid from '../../components/team/TeamGrid';


export default function TeamSection() {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  // Derive selected member
  const selectedMember = selectedMemberId 
    ? teamData.find(member => member.id === selectedMemberId) || null 
    : null;

  const handleSelectMember = (id: string) => {
    setSelectedMemberId(id);
  };

  return (
    <section id="team" className="w-full bg-[#151515] font-sans relative text-neutral-300 antialiased py-24">
      
      
      {/* Section 1: Hero with Custom Rounded Photo Grid */}
      <TeamHeroCollage 
        members={teamData} 
        onSelectMember={handleSelectMember} 
      />

      {/* Section 2: Directory grid listing, search bar & category filters */}
      <TeamGrid 
        members={teamData} 
        onSelectMember={handleSelectMember} 
      />

    </section>
  );
}
