import React, { useState, useEffect } from 'react';
import HeaderNav from './components/HeaderNav';
import EventModal from './components/EventModal';
import IsometricJourneyView from './components/IsometricJourneyView';
import { INITIAL_EVENTS } from './data';
import { EventItem, Registration, Comment } from './types';

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Persistence State for Events
  const [events, setEvents] = useState<EventItem[]>(() => {
    const stored = localStorage.getItem('dcdc_events_v2');
    let loadedEvents = INITIAL_EVENTS;
    if (stored) {
      try {
        loadedEvents = JSON.parse(stored);
      } catch (err) {
        console.error('Failed to parse stored events: ', err);
      }
    }
    
    // CLEANSE: Explicitly remove specific user-requested events if they exist in persistence
    return loadedEvents.filter(e => {
      const matchText = (e.title + ' ' + (e.speaker || '') + ' ' + e.id).toLowerCase();
      return !matchText.includes('sudharshan') && !matchText.includes('vignesh');
    });
  });

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  // Seed default comments and registrations on initial render
  useEffect(() => {
    // Registrations
    const storedRegs = localStorage.getItem('dcdc_registrations_v1');
    if (storedRegs) {
      setRegistrations(JSON.parse(storedRegs));
    } else {
      const defaultRegs: Registration[] = [
        { id: '1', eventId: 'mar-pcb-design', name: 'Zane Martinez', email: 'zane@mit.edu', role: 'Student', registeredAt: '10:45 AM' },
        { id: '2', eventId: 'mar-idea-forge', name: 'Carla Dubois', email: 'carla@mit.edu', role: 'Research Fellow', registeredAt: '12:20 PM' }
      ];
      localStorage.setItem('dcdc_registrations_v1', JSON.stringify(defaultRegs));
      setRegistrations(defaultRegs);
    }

    // Comments
    const storedComments = localStorage.getItem('dcdc_comments_v1');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    } else {
      const defaultComments: Comment[] = [
        { id: 'c1', eventId: 'mar-pcb-design', author: 'Siddharth S.', text: 'Will licensing codes for Autodesk or KiCad library downloads be provided?', timestamp: '01:15 PM' },
        { id: 'c2', eventId: 'mar-idea-forge', author: 'Dr. Evelyn Vance', text: 'All teams will get physical staging access to our local lab kits during incubation.', timestamp: '04:10 PM' }
      ];
      localStorage.setItem('dcdc_comments_v1', JSON.stringify(defaultComments));
      setComments(defaultComments);
    }
  }, []);

  // Sync events back to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dcdc_events_v2', JSON.stringify(events));
  }, [events]);

  // Update persistent database counts when local registers change
  useEffect(() => {
    if (registrations.length > 0) {
      setEvents(prevEvents => {
        const updated = prevEvents.map(ev => {
          const count = registrations.filter(r => r.eventId === ev.id).length;
          const baseline = INITIAL_EVENTS.find(base => base.id === ev.id)?.registeredCount || 0;
          const expectedCount = baseline + count;
          if (ev.registeredCount !== expectedCount) {
            return {
              ...ev,
              registeredCount: expectedCount
            };
          }
          return ev;
        });
        return updated;
      });
    }
  }, [registrations]);

  // Handle registration success
  const handleRegisterSuccess = (eventId: string, newReg: Registration) => {
    const updatedRegs = [...registrations, newReg];
    setRegistrations(updatedRegs);
    localStorage.setItem('dcdc_registrations_v1', JSON.stringify(updatedRegs));
  };

  // Handle adding comments
  const handleAddComment = (eventId: string, newComment: Comment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem('dcdc_comments_v1', JSON.stringify(updatedComments));
  };

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-[#020e20] text-slate-100 flex flex-col font-sans transition-all selection:bg-sky-500 selection:text-white pb-0">
      
      {/* GLOBAL BACKGROUND NOISE GRID */}
      <div className="fixed inset-0 pointer-events-none -z-20 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* DECORATIVE TOP AURORA LUMINESCENCE */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-sky-500/[0.02] rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-32 right-1/4 w-[400px] h-[250px] bg-indigo-500/[0.02] rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* HEADER SECTION */}
      <HeaderNav
        currentView="isometric"
        onViewChange={() => {}}
        selectedCategory="All"
        onCategoryChange={() => {}}
      />

      {/* MAIN CONTAINER STREAM */}
      <main className="flex-1 flex flex-col relative bg-[#020816] max-w-full overflow-x-hidden">
        {/* FIRST SECTION: GORGEOUS INTERACTIVE ISOMETRIC PIPELINE MAP */}
        <IsometricJourneyView
          events={events}
          onSelectEvent={setSelectedEvent}
          selectedCategory="All"
        />
      </main>

      {/* EVENT POPUP REGISTRY PANEL */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRegisterSuccess={handleRegisterSuccess}
        onAddComment={handleAddComment}
        registrations={registrations}
        comments={comments}
      />

      {/* FOOTER METRICS SYSTEM BRANDING - EXACT REPLICA OF THE SCREENSHOT */}
      <footer className="py-8 px-4 md:px-8 border-t border-slate-900/40 bg-[#010a18]/95 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-slate-400 w-full overflow-hidden">
        <div>
          <span>© 2026 DCDC - Digital Communication and Design Club, MIT Manipal.</span>
        </div>
        <div>
          <span>Crafted with Node.js, Tailwind CSS & passion for design.</span>
        </div>
      </footer>
    </div>
  );
}
