import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  Send, 
  MapPin,
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Clock
} from 'lucide-react';
import { MessageSubmission } from '../types';

interface ContactSectionProps {
  onNewSubmission: (submission: MessageSubmission) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNewSubmission }) => {
  // Form values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [deptYear, setDeptYear] = useState('ECE / Student');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [successData, setSuccessData] = useState<{
    name: string;
    email: string;
    deptYear: string;
    ticketId: string;
    mode: 'enquiry' | 'join';
  } | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [formMode, setFormMode] = useState<'enquiry' | 'join'>('enquiry');

  // Real-time single field validator
  const validateField = (fieldName: string, value: string) => {
    let error = '';
    const trimmedVal = value.trim();

    if (fieldName === 'firstName') {
      if (!trimmedVal) {
        error = 'First name is required';
      } else if (trimmedVal.length < 2) {
        error = 'Minimum 2 characters required';
      }
    } else if (fieldName === 'lastName') {
      if (!trimmedVal) {
        error = 'Last name is required';
      } else if (trimmedVal.length < 2) {
        error = 'Minimum 2 characters required';
      }
    } else if (fieldName === 'email') {
      if (!trimmedVal) {
        error = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedVal)) {
        error = 'Please enter a valid email address';
      }
    } else if (fieldName === 'message') {
      if (!trimmedVal) {
        error = 'Message is required';
      } else if (trimmedVal.length < 10) {
        error = 'Please write a message of at least 10 characters';
      }
    }

    setErrors(prev => {
      const copy = { ...prev };
      if (error) {
        copy[fieldName] = error;
      } else {
        delete copy[fieldName];
      }
      return copy;
    });
  };

  // Dynamic input change and blur action managers
  const handleInputChange = (field: 'firstName' | 'lastName' | 'email' | 'message', value: string) => {
    if (field === 'firstName') setFirstName(value);
    else if (field === 'lastName') setLastName(value);
    else if (field === 'email') setEmail(value);
    else if (field === 'message') setMessage(value);

    // If already touched, validate dynamically on typing
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleInputBlur = (field: 'firstName' | 'lastName' | 'email' | 'message', value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  // Trigger membership pre-fill
  const handleTriggerJoin = () => {
    setFormMode('join');
    setFirstName('');
    setLastName('');
    setMessage("Hi DCDC Team, I am extremely interested in joining the club's design and communication operations. Looking forward to your orientation details!");
    
    // Clear old validations, message is pre-filled so mark message touched and validated
    setErrors({});
    setTouched({ message: true });
    
    const formElement = document.getElementById('contact-form-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Entire Form validation on action
  const validateForm = () => {
    const fields: { name: 'firstName' | 'lastName' | 'email' | 'message'; value: string }[] = [
      { name: 'firstName', value: firstName },
      { name: 'lastName', value: lastName },
      { name: 'email', value: email },
      { name: 'message', value: message }
    ];

    const newErrors: { [key: string]: string } = {};
    const newTouched: { [key: string]: boolean } = {};

    fields.forEach(field => {
      newTouched[field.name] = true;
      const trimmedVal = field.value.trim();
      if (field.name === 'firstName') {
        if (!trimmedVal) newErrors.firstName = 'First name is required';
        else if (trimmedVal.length < 2) newErrors.firstName = 'Minimum 2 characters required';
      } else if (field.name === 'lastName') {
        if (!trimmedVal) newErrors.lastName = 'Last name is required';
        else if (trimmedVal.length < 2) newErrors.lastName = 'Minimum 2 characters required';
      } else if (field.name === 'email') {
        if (!trimmedVal) {
          newErrors.email = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedVal)) {
          newErrors.email = 'Please enter a valid email address';
        }
      } else if (field.name === 'message') {
        if (!trimmedVal) {
          newErrors.message = 'Message is required';
        } else if (trimmedVal.length < 10) {
          newErrors.message = 'Please write a message of at least 10 characters';
        }
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulated API submission with professional delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const newSubmission: MessageSubmission = {
      id: Date.now().toString(),
      fullName: `${firstName} ${lastName}`.trim(),
      deptYear: deptYear,
      email,
      subject: formMode === 'join' ? '[Membership Request] Join DCDC' : 'DCDC Support Enquiry',
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: formMode
    };

    onNewSubmission(newSubmission);

    setIsSubmitting(false);
    
    setSuccessData({
      name: `${firstName} ${lastName}`.trim(),
      email,
      deptYear,
      ticketId: `DCDC-${Math.floor(100000 + Math.random() * 900000)}`,
      mode: formMode,
    });

    setSubmitMessage({
      type: 'success',
      text: formMode === 'join' 
        ? 'Amazing! Your DCDC membership application has been logged.' 
        : 'Thank you! Your message has been received. Our team will assist you shortly.'
    });

    // Reset inputs
    setFirstName('');
    setLastName('');
    setEmail('');
    setMessage('');
    setTouched({});
  };

  return (
    <section id="contact-us-section" className="py-24 bg-ivory text-neutral-900 relative">
      {/* Design elements */}
      <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-navy-950 to-transparent opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Exactly matching the mockup's premium styling */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-gold-dark text-xs font-mono tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-gold-dark animate-pulse" />
                Contact US • DCDC SRMIST
              </div>
              
              <h2 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-navy-800 leading-[1.1]">
                Get in — <br />
                <span className="text-navy-900">touch with us</span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-neutral-600/95 leading-relaxed max-w-md">
                We're here to help! Whether you have a question about our services, need assistance with your account, or want to provide feedback, our team is ready to assist you.
              </p>
            </div>

            {/* Structured Contact Details */}
            <div className="space-y-6 pt-4 border-t border-neutral-200">
              {/* Email */}
              <div className="space-y-1.5 step-contact">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">
                  Email:
                </span>
                <a 
                  href="mailto:dcdc.ece.rmp@srmist.edu.in" 
                  className="font-display font-bold text-lg sm:text-2xl text-navy-800 hover:text-gold-dark transition-colors block"
                >
                  dcdc.ece.rmp@srmist.edu.in
                </a>
              </div>

              {/* Phone */}
              <div className="space-y-1.5 step-contact">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">
                  Phone:
                </span>
                <span className="font-display font-bold text-lg sm:text-2xl text-navy-800 block">
                  +91 94443 21890
                </span>
                <span className="text-xs text-neutral-400 block font-mono">
                  Available Monday to Friday, 9 AM - 6 PM IST
                </span>
              </div>
            </div>

            {/* Custom Mockup Black Pill Button */}
            <div className="pt-4">
              <motion.button
                type="button"
                onClick={handleTriggerJoin}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-4 bg-navy-950 text-white hover:bg-neutral-800 rounded-full py-4 px-8 font-sans font-bold text-sm tracking-wide shadow-md transition-all group"
              >
                <span>Apply to Join DCDC</span>
                <div className="w-6 h-6 rounded-full bg-white text-navy-950 flex items-center justify-center transition-transform group-hover:translate-x-1 duration-250">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </motion.button>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form Card matching the image */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {successData ? (
                <motion.div
                  key="success-receipt"
                  id="contact-success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-[32px] p-6 sm:p-10 shadow-2xl border border-emerald-100 relative overflow-hidden"
                >
                  {/* Subtle success graphics */}
                  <div className="absolute -top-10 -right-10 w-42 h-42 bg-emerald-500/5 rounded-full blur-[45px] pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-42 h-42 bg-gold/5 rounded-full blur-[45px] pointer-events-none" />
                  
                  <div className="text-center space-y-6 relative z-10 py-2">
                    {/* Pulsing circular check icon */}
                    <div className="flex justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, 8, -8, 0] }}
                        transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                        className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm"
                      >
                        <CheckCircle className="w-8 h-8 stroke-[2.5]" />
                      </motion.div>
                    </div>

                    <div className="space-y-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider font-mono">
                        <Sparkles className="w-3 h-3 text-emerald-600 animate-pulse" />
                        Submission Confirmed
                      </span>
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-navy-900 tracking-tight">
                        Thanks, {successData.name}!
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
                        {successData.mode === 'join'
                          ? 'Your application to join the Digital Communication & Design Club has been successfully logged. Our committee is reviewing candidate forms.'
                          : 'Your enquiry has been received. One of our technical coordinators will address your message shortly.'}
                      </p>
                    </div>

                    {/* Receipt ticket details */}
                    <div className="border border-neutral-100 rounded-2xl bg-neutral-50/50 p-5 text-left space-y-3 font-sans">
                      <div className="flex justify-between items-center pb-2.5 border-b border-dashed border-neutral-200">
                        <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Receipt Ticket</span>
                        <span className="text-xs font-mono font-bold text-navy-800 bg-neutral-200/60 px-2.5 py-0.5 rounded">
                          {successData.ticketId}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 text-xs">
                        <div>
                          <span className="text-neutral-400 block text-[9px] uppercase font-bold">Category</span>
                          <span className="font-bold text-navy-800 uppercase text-[10px]">
                            {successData.mode === 'join' ? 'Club Audition' : 'General Support'}
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[9px] uppercase font-bold">Sent To</span>
                          <span className="font-bold text-navy-800 truncate block text-[10px] max-w-[140px]" title={successData.email}>
                            {successData.email}
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[9px] uppercase font-bold">Standing</span>
                          <span className="font-semibold text-neutral-600 truncate block text-[10px]">
                            {successData.deptYear}
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[9px] uppercase font-bold">Est. Response</span>
                          <div className="flex items-center gap-1 font-bold text-emerald-600 text-[10px]">
                            <Clock className="w-3.5 h-3.5" />
                            <span>24-48 Hours</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Another Message button */}
                    <div className="pt-2">
                      <motion.button
                        type="button"
                        onClick={() => {
                          setSuccessData(null);
                          setSubmitMessage(null);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-navy-950 transition-colors bg-neutral-100 hover:bg-neutral-200 rounded-full py-2.5 px-6 border border-neutral-200/50 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Send another message</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form-container"
                  id="contact-form-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-[32px] p-6 sm:p-10 shadow-2xl border border-neutral-100 relative overflow-hidden"
                >
                  {/* Form Category Toggles */}
                  <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-100">
                    <span className="font-display font-bold text-[18px] text-navy-900 tracking-tight">
                      {formMode === 'join' ? 'DCDC Membership Form' : 'General Enquiry'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setFormMode('enquiry')}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all ${
                          formMode === 'enquiry' 
                            ? 'bg-navy-800 text-white' 
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        Enquiry
                      </button>
                      <button
                        onClick={handleTriggerJoin}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all ${
                          formMode === 'join' 
                            ? 'bg-gold text-navy-900' 
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        Join Club
                      </button>
                    </div>
                  </div>

                  {/* Status Message */}
                  <AnimatePresence>
                    {submitMessage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`mb-6 p-4 rounded-2xl flex items-center gap-3 border ${
                          submitMessage.type === 'success' 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                            : 'bg-amber-50 border-amber-200 text-amber-800'
                        }`}
                      >
                        {submitMessage.type === 'success' ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        )}
                        <p className="text-xs sm:text-sm font-medium">{submitMessage.text}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form Fields aligned exactly like the picture */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* 2 Column Row for First Name and Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="firstName" className="block text-xs font-bold text-neutral-600/90 font-sans uppercase tracking-wider flex items-center justify-between">
                          <span>First Name <span className="text-red-500">*</span></span>
                          {touched.firstName && !errors.firstName && firstName.trim() && (
                            <span className="text-[10px] text-emerald-600 font-bold lowercase font-mono">✓ looks good</span>
                          )}
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          onBlur={(e) => handleInputBlur('firstName', e.target.value)}
                          placeholder="Enter your first name..."
                          className={`w-full bg-neutral-50 border ${
                            errors.firstName 
                              ? 'border-red-400 bg-red-50/10 focus:border-red-500' 
                              : (touched.firstName && firstName.trim())
                                ? 'border-emerald-400 bg-emerald-50/5 focus:border-emerald-500'
                                : 'border-neutral-200 focus:border-navy-800 focus:bg-white'
                          } px-4 py-3.5 rounded-xl text-sm text-neutral-800 placeholder-neutral-400/80 focus:outline-none transition-all`}
                        />
                        {errors.firstName && (
                          <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 font-sans">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label htmlFor="lastName" className="block text-xs font-bold text-neutral-600/90 font-sans uppercase tracking-wider flex items-center justify-between">
                          <span>Last Name <span className="text-red-500">*</span></span>
                          {touched.lastName && !errors.lastName && lastName.trim() && (
                            <span className="text-[10px] text-emerald-600 font-bold lowercase font-mono">✓ looks good</span>
                          )}
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          onBlur={(e) => handleInputBlur('lastName', e.target.value)}
                          placeholder="Enter your last name..."
                          className={`w-full bg-neutral-50 border ${
                            errors.lastName 
                              ? 'border-red-400 bg-red-50/10 focus:border-red-500' 
                              : (touched.lastName && lastName.trim())
                                ? 'border-emerald-400 bg-emerald-50/5 focus:border-emerald-500'
                                : 'border-neutral-200 focus:border-navy-800 focus:bg-white'
                          } px-4 py-3.5 rounded-xl text-sm text-neutral-800 placeholder-neutral-400/80 focus:outline-none transition-all`}
                        />
                        {errors.lastName && (
                          <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 font-sans">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email Address Input */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="email" className="block text-xs font-bold text-neutral-600/90 font-sans uppercase tracking-wider flex items-center justify-between">
                        <span>Email <span className="text-red-500">*</span></span>
                        {touched.email && !errors.email && email.trim() && (
                          <span className="text-[10px] text-emerald-600 font-bold lowercase font-mono flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-emerald-500" /> valid email verified
                          </span>
                        )}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        onBlur={(e) => handleInputBlur('email', e.target.value)}
                        placeholder="Enter your email address..."
                        className={`w-full bg-neutral-50 border ${
                          errors.email 
                            ? 'border-red-400 bg-red-50/10 focus:border-red-500' 
                            : (touched.email && email.trim())
                              ? 'border-emerald-400 bg-emerald-50/5 focus:border-emerald-500'
                              : 'border-neutral-200 focus:border-navy-800 focus:bg-white'
                        } px-4 py-3.5 rounded-xl text-sm text-neutral-800 placeholder-neutral-400/80 focus:outline-none transition-all`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 font-sans">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Year of Study selection helper directly beneath Email */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="block text-[10px] font-bold text-neutral-500 uppercase font-sans tracking-wide">
                          Dept / Standing
                        </span>
                        <select
                          value={deptYear}
                          onChange={(e) => setDeptYear(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-200 px-3 py-2 rounded-lg text-xs text-neutral-700 focus:outline-none"
                        >
                          <option value="ECE / 1st Year">ECE / 1st Year</option>
                          <option value="ECE / 2nd Year">ECE / 2nd Year</option>
                          <option value="ECE / 3rd Year">ECE / 3rd Year</option>
                          <option value="ECE / 4th Year">ECE / 4th Year</option>
                          <option value="Non-ECE / SRMIST">Non-ECE / SRMIST</option>
                        </select>
                      </div>
                      <div className="flex items-end justify-end">
                        <span className="text-[10px] text-neutral-400 text-right leading-tight">
                          * All applications are processed directly by DCDC Committee.
                        </span>
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="message" className="block text-xs font-bold text-neutral-600/90 font-sans uppercase tracking-wider flex items-center justify-between">
                        <span>How can we help you? <span className="text-red-500">*</span></span>
                        {touched.message && !errors.message && message.trim() && (
                          <span className="text-[10px] text-emerald-600 font-bold lowercase font-mono">✓ looks complete</span>
                        )}
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        onBlur={(e) => handleInputBlur('message', e.target.value)}
                        placeholder="Enter your message..."
                        className={`w-full bg-neutral-50 border ${
                          errors.message 
                            ? 'border-red-400 bg-red-50/10 focus:border-red-500' 
                            : (touched.message && message.trim())
                              ? 'border-emerald-400 bg-emerald-50/5 focus:border-emerald-500'
                              : 'border-neutral-200 focus:border-navy-800 focus:bg-white'
                        } px-4 py-3.5 rounded-xl text-sm text-neutral-800 placeholder-neutral-400/80 focus:outline-none transition-all resize-none`}
                      />
                      {errors.message && (
                        <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 font-sans">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit button on bottom right exactly matching mockup pill style */}
                    <div className="flex justify-end pt-4">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-3 bg-neutral-950 text-white hover:bg-neutral-800 rounded-full py-3.5 px-6 font-sans font-bold text-sm tracking-wide shadow-md transition-all group cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <div className="w-5 h-5 rounded-full bg-white text-navy-950 flex items-center justify-center transition-transform group-hover:translate-x-0.5 duration-250">
                              <ArrowRight className="w-3 h-3 stroke-[3]" />
                            </div>
                          </>
                        )}
                      </motion.button>
                    </div>

                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

