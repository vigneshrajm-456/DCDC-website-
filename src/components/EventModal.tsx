import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Clock, User, Mail, ShieldAlert, CheckCircle, Send, MessageCircle, AlertCircle, ArrowRight, Info, Plus, Sparkles } from 'lucide-react';
import { EventItem, Registration, Comment } from '../types';

interface EventModalProps {
  event: EventItem | null;
  onClose: () => void;
  onRegisterSuccess: (eventId: string, newReg: Registration) => void;
  onAddComment: (eventId: string, newComment: Comment) => void;
  registrations: Registration[];
  comments: Comment[];
}

export default function EventModal({
  event,
  onClose,
  onRegisterSuccess,
  onAddComment,
  registrations,
  comments
}: EventModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Student' });
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen size for tablet-specific layout
  useEffect(() => {
    const checkSize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Identify whether current user is already registered for this event
  useEffect(() => {
    if (event) {
      const storedRegs = localStorage.getItem(`regs_${event.id}`);
      if (storedRegs) {
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
      setFormData({ name: '', email: '', role: 'Student' });
      setErrorMsg('');
      setSuccessMsg('');
    }
  }, [event]);

  if (!event) return null;

  const eventRegs = registrations.filter(r => r.eventId === event.id);
  const eventComments = comments.filter(c => c.eventId === event.id);
  const isFull = eventRegs.length >= event.maxCapacity;

  // Submit registration form
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please complete all mandatory credential fields.');
      return;
    }

    if (eventRegs.length >= event.maxCapacity) {
      setErrorMsg('This event has reached maximum seating capacity.');
      return;
    }

    const newRegistration: Registration = {
      id: Math.random().toString(36).substr(2, 9),
      eventId: event.id,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      registeredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    localStorage.setItem(`regs_${event.id}`, JSON.stringify(newRegistration));
    onRegisterSuccess(event.id, newRegistration);
    setIsRegistered(true);
    setSuccessMsg('Slot successfully reserved! Your confirmation card is active.');
    setErrorMsg('');
  };

  // Submit comment form
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentText.trim()) {
      return;
    }

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      eventId: event.id,
      author: commentAuthor,
      text: commentText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onAddComment(event.id, newComment);
    setCommentText('');
  };

  return (
    <AnimatePresence>
      <div className={`fixed inset-0 z-50 flex ${isTablet ? 'items-end justify-center' : 'items-center justify-end'}`}>
        {/* BACKGROUND DARK OVERLAY */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className={`absolute inset-0 bg-[#030712]/80 ${isTablet ? 'backdrop-blur-md' : 'backdrop-blur-sm'} cursor-pointer`}
        />

        {/* FLOATING ACTION PANEL (DRAWER FORM / BOTTOM SHEET) */}
        <motion.div
          initial={isTablet ? { y: '100%', x: 0 } : { x: '100%', y: 0 }}
          animate={{ x: 0, y: 0 }}
          exit={isTablet ? { y: '100%', x: 0 } : { x: '100%', y: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          className={`relative flex flex-col z-10 text-slate-100 transition-all duration-300
            ${isTablet 
              ? 'w-full h-[90vh] bg-[#050b1a]/90 backdrop-blur-2xl rounded-t-[28px] border-t border-x border-sky-500/30 shadow-[0_-20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(14,165,233,0.1)]' 
              : 'w-full max-w-lg md:max-w-xl h-full bg-[#090f1e] border-l border-slate-800 shadow-2xl'
            }`}
        >
          {/* TABLET DRAG HANDLE */}
          {isTablet && (
            <div className="w-full flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-slate-700/50 rounded-full" />
            </div>
          )}

          {/* MODAL HEADER */}
          <div className={`border-b border-slate-800 flex items-start justify-between ${isTablet ? 'p-8 pb-6' : 'p-6'}`}>
            <div>
              <span className="text-xs font-mono text-sky-400 font-semibold tracking-wider uppercase">
                {event.month} • {event.week}
              </span>
              <h2 className={`font-bold font-sans text-white mt-1 tracking-tight ${isTablet ? 'text-3xl' : 'text-xl md:text-2xl'}`}>
                {event.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer group"
              id="close-modal-btn"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* INNER SCROLLABLE WORKSPACE */}
          <div className={`flex-1 overflow-y-auto scrollbar-none ${isTablet ? 'px-10 py-10 space-y-12' : 'p-6 space-y-6'}`}>

            {/* FULL EVENT DESCRIPTION */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                <h3 className="text-[11px] font-mono text-slate-400 font-black tracking-[0.25em] uppercase">FULL EVENT DESCRIPTION</h3>
              </div>
              <div className={`text-slate-300 leading-relaxed font-sans bg-slate-950/40 p-6 md:p-10 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden group ${isTablet ? 'text-lg' : 'text-sm md:text-base'}`}>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Info className="w-20 h-20 text-sky-500" />
                </div>
                {event.details}
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}