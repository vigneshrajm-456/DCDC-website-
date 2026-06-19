import { useState } from 'react';
import { teamData } from './data/teamData';
import TeamHeroCollage from './components/TeamHeroCollage';
import TeamGrid from './components/TeamGrid';
import TeamDetailModal from './components/TeamDetailModal';

export default function App() {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  // Derive selected member
  const selectedMember = selectedMemberId 
    ? teamData.find(member => member.id === selectedMemberId) || null 
    : null;

  const handleSelectMember = (id: string) => {
    setSelectedMemberId(id);
    // Smooth scroll to the directory row or detail if desired, but raising a modal is standard
  };

  return (
    <div className="min-h-screen bg-[#151515] font-sans relative text-neutral-300 antialiased selection:bg-blue-600/35 selection:text-white">
      
      {/* Main content layouts */}
      <main>
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
      </main>



      {/* Profile details popover modal */}
      <TeamDetailModal 
        member={selectedMember} 
        onClose={() => setSelectedMemberId(null)} 
      />
    </div>
  );
}
