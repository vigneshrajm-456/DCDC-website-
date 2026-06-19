import { useState, useEffect, FormEvent } from 'react';
import { TeamMember } from '../types';
import { X, Mail, MapPin, Briefcase, Copy, Check, Send, CheckCircle2, UserCheck } from 'lucide-react';

interface TeamDetailModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export default function TeamDetailModal({ member, onClose }: TeamDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Esc key closure
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!member) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(member.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !senderName.trim() || !senderEmail.trim()) return;

    setSubmitting(true);
    // Simulate API delivery
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
      setMessageText('');
      setSenderName('');
      setSenderEmail('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Dark blur backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Main card panel */}
      <div className="relative bg-[#1c1c1c] w-full max-w-2xl rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.6)] border border-neutral-800/80 overflow-hidden z-10 flex flex-col md:flex-row transform scale-100 transition-all duration-300">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 shadow-lg z-20 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Column Left: Photograph and stats */}
        <div className="w-full md:w-[42%] bg-neutral-950/40 border-r border-neutral-800/50 p-6 flex flex-col items-center text-center justify-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-neutral-800 shadow-lg mb-4 bg-neutral-900">
            <img 
              src={member.image} 
              alt={member.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
          </div>

          <p className="font-bold text-white text-xl tracking-tight leading-tight">{member.name}</p>
          <p className="text-sky-400 font-bold text-xs uppercase tracking-wider mt-1">{member.role}</p>
          
          <span className="mt-3 px-3 py-1 bg-blue-950/50 text-blue-300 font-semibold text-[10px] uppercase tracking-wide rounded-full border border-blue-900/50">
            {member.category}
          </span>

          {/* Quick Stats list */}
          <div className="w-full mt-6 space-y-3.5 text-left text-xs text-neutral-300 border-t border-neutral-800/60 pt-5">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-neutral-900 shadow-inner text-neutral-400 border border-neutral-800/40">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-semibold font-mono uppercase">Location</p>
                <p className="font-medium text-neutral-300">{member.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-neutral-900 shadow-inner text-neutral-400 border border-neutral-800/40">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-semibold font-mono uppercase">Experience</p>
                <p className="font-medium text-neutral-300">{member.experience} history</p>
              </div>
            </div>
            
            {/* Copy Email segment */}
            <div className="flex items-center justify-between gap-3 p-2 bg-neutral-900 rounded-xl border border-neutral-800/80 mt-4">
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                <span className="truncate text-xs text-neutral-300 font-medium select-all">{member.email}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-1.5 hover:bg-neutral-800 rounded-lg text-neutral-500 hover:text-white active:scale-95 transition-all flex-shrink-0 cursor-pointer"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Column Right: Description and Action Form */}
        <div className="flex-1 p-6 flex flex-col justify-between bg-[#1c1c1c]">
          <div className="space-y-5">
            {/* Skills Progress Indicator Layout */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                <span>Core Proficiencies</span>
                <span className="h-px bg-neutral-800/60 flex-1" />
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {member.skills.map((skill, index) => {
                  // Generate an illustrative beautiful skill rating percentage (e.g. 95%, 90%, 85%) for beautiful layouts
                  const score = 95 - (index * 4);
                  return (
                    <div key={skill} className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-neutral-300">
                        <span className="font-medium">{skill}</span>
                        <span className="font-semibold text-neutral-500 text-[11px]">{score}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800/40">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Email Delivery form */}
            <div className="border-t border-neutral-800/60 pt-5 mt-2">
              <h4 className="text-xs font-bold font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2 mb-3">
                <span>Direct Inquiry</span>
                <span className="h-px bg-neutral-800/60 flex-1" />
              </h4>

              {formSubmitted ? (
                <div className="p-4 bg-emerald-950/20 rounded-2xl border border-emerald-900/50 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-emerald-300 text-xs">Inquiry Dispatched Successfully</h5>
                    <p className="text-[11px] text-emerald-400 mt-1 leading-relaxed">
                      Your message to {member.name.split(' ')[0]} has been delivered. They typically respond within a few business hours!
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="mt-2 text-[10px] font-bold text-emerald-400 hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitMessage} className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text"
                      placeholder="Your name"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full text-xs bg-neutral-900/50 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-neutral-500"
                    />
                    <input 
                      type="email"
                      required
                      placeholder="Your email address"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full text-xs bg-neutral-900/50 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-neutral-500"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder={`Send a private message to ${member.name.split(' ')[0]}...`}
                      required
                      rows={2.5}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full text-xs bg-neutral-900/50 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-neutral-500 resize-none"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-[#0061FF] hover:bg-[#1a75ff] disabled:opacity-50 text-white font-semibold text-xs tracking-wide py-2 px-4 rounded-xl inline-flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg shadow-blue-500/10"
                    >
                      {submitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
