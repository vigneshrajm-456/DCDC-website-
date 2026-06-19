import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Calendar, User, MessageSquare, Terminal, Heart, Settings, UserCheck } from 'lucide-react';
import { MessageSubmission } from '../types';

interface SubmissionLogProps {
  submissions: MessageSubmission[];
  onClear: () => void;
  onRemove: (id: string) => void;
}

export const SubmissionLog: React.FC<SubmissionLogProps> = ({ submissions, onClear, onRemove }) => {
  return (
    <section id="submissions-log" className="py-16 bg-navy-950 border-t border-ivory-light/5 relative">
      <div className="absolute inset-0 bg-radial-gradient from-gold/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 text-ivory/80 text-[10px] font-mono tracking-wider uppercase mb-2 border border-ivory/15">
              <Terminal className="w-3.5 h-3.5 text-gold" />
              Local Feedback Consolidation
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory">
              Active Enquiries <span className="text-gold font-sans font-medium">& Applications</span>
            </h2>
            <p className="text-xs text-ivory-light/60 mt-1">
              Simulating server-side database capture. Enquiries persist during the session.
            </p>
          </div>

          {submissions.length > 0 && (
            <button
              onClick={onClear}
              className="px-4 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/40 text-red-300 text-xs font-semibold border border-red-900/30 transition-all cursor-pointer"
            >
              Clear Records ({submissions.length})
            </button>
          )}
        </div>

        {submissions.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl border border-dashed border-ivory-light/15 p-12 text-center max-w-lg mx-auto"
          >
            <div className="w-12 h-12 rounded-2xl bg-navy-900 border border-ivory-light/10 flex items-center justify-center text-ivory-light/40 mx-auto mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="font-sans font-bold text-sm text-ivory/80 block">
              No Submissions Detected Yet
            </span>
            <p className="text-xs text-ivory-light/50 mt-1 max-w-xs mx-auto leading-relaxed">
              Use the contact form above to send an enquiry or trigger the "Join DCDC" application option to view results here instantly.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {submissions.map((sub) => (
                <motion.div
                  key={sub.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-2xl border p-5 relative overflow-hidden backdrop-blur-md flex flex-col justify-between ${
                    sub.type === 'join' 
                      ? 'bg-gradient-to-r from-navy-900 to-navy-850 border-gold/40' 
                      : 'bg-navy-900 border-ivory-light/10'
                  }`}
                >
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                      sub.type === 'join'
                        ? 'bg-gold text-navy-900'
                        : 'bg-navy-800 text-gold-light border border-gold/20'
                    }`}>
                      {sub.type === 'join' ? 'Membership App.' : 'General Enquiry'}
                    </span>
                    <button
                      onClick={() => onRemove(sub.id)}
                      className="text-ivory-light/30 hover:text-red-400 font-sans font-bold text-sm transition-colors cursor-pointer"
                      title="Delete record"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-ivory">
                        {sub.type === 'join' ? (
                          <UserCheck className="w-4 h-4 text-gold" />
                        ) : (
                          <User className="w-4 h-4 text-gold/85" />
                        )}
                        <span className="font-sans font-bold text-sm tracking-tight">
                          {sub.fullName}
                        </span>
                      </div>
                      <div className="text-[11px] text-ivory-light/50 font-mono tracking-wide pl-5">
                        {sub.deptYear}
                      </div>
                    </div>

                    <div className="text-xs font-sans text-ivory border-t border-ivory-light/5 pt-3 leading-relaxed">
                      <div className="font-semibold text-gold-light mb-1">{sub.subject}</div>
                      <p className="text-ivory-light/80 italic line-clamp-3">
                        "{sub.message}"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-ivory-light/5 text-[10px] text-ivory-light/40 font-mono">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {sub.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {sub.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};
