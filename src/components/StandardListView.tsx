import React from 'react';
import { motion } from 'motion/react';
import { EventItem } from '../types';

interface StandardListViewProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
}

export default function StandardListView({ events, onSelectEvent }: StandardListViewProps) {
  // Ordered list of months
  const months = ['February 2026', 'March 2026', 'April 2026'] as const;

  // Exact badges for each month
  const monthSubBadges: Record<string, string> = {
    'February 2026': 'ELECTRONICS & OUTREACH',
    'March 2026': 'PROJECTS & INNOVATION',
    'April 2026': 'KICKSTART & WRAP UP'
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 space-y-16">
      {months.map((month) => {
        const monthEvents = events.filter((e) => e.month === month);
        if (monthEvents.length === 0) return null;

        return (
          <div key={month} className="space-y-6">
            {/* MONTH HEADER WITH TIGHT ALIGNMENT AND PILL BADGE */}
            <div className="flex items-center gap-3">
              <h3 className="text-white text-lg font-black tracking-widest font-sans uppercase">
                {month}
              </h3>
              <span className="border border-white/20 px-3.5 py-0.5 rounded-full text-[9px] font-sans font-black tracking-widest text-[#f8fafc]/90 bg-[#0d223e]">
                {monthSubBadges[month] || 'EVENTS ROADMAP'}
              </span>
            </div>

            {/* WHITE ROUNDED EVENT CARDS MATCHING SCREENSHOT EXACTLY */}
            <div className="space-y-6">
              {monthEvents.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ y: -4, scale: 1.005 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  onClick={() => onSelectEvent(event)}
                  className="bg-[#f5f4ef] text-slate-900 px-6 py-7 rounded-[20px] shadow-lg border border-white/10 flex flex-col justify-between cursor-pointer select-none"
                  id={`event-card-${event.id}`}
                >
                  {/* TOP SEC: EVENT CARD METADATA */}
                  <div className="space-y-1">
                    {/* WEEK TAG IN SPARSED UPPERCASE */}
                    <div className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#c27a3d]">
                      {event.week.toUpperCase()}
                    </div>
                    {/* EVENT TITLE IN VERY BOLD SANS-SERIF */}
                    <h4 className="text-slate-900 text-xl font-sans font-black tracking-wide leading-tight mt-1 mb-2">
                      {event.title}
                    </h4>
                  </div>

                  {/* MIDDLE SEC: DESCRIPTION TEXT */}
                  <p className="text-[#4b5563] font-sans text-xs md:text-xs font-semibold leading-relaxed max-w-4xl mb-6">
                    {event.description}
                  </p>

                  {/* BOTTOM ROW: INTERACTIVE FOOT-SEC OF CARD */}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200/50">
                    {/* CATEGORY REPLICA PILL (VERY DEEP BLUE) */}
                    <span className="bg-[#051c3f] text-[#f8fafc] px-4 py-1.5 rounded-md text-[10px] font-sans font-black tracking-widest uppercase">
                      {event.category}
                    </span>

                    {/* STATUS TAG (REGISTRATION WILL OPEN SOON) */}
                    <span className="text-[#6b7280] font-sans text-[11px] font-bold tracking-wide">
                      Registration will open soon
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
