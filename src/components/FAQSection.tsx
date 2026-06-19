import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles, BookOpen, Stars } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the primary objective of DCDC under the SRMIST Ramapuram ECE Department?",
    answer: "The Digital Communication & Design Club (DCDC) bridges the gap between academic theory and real-world implementation. We specialize in dynamic digital communication paradigms, advanced electronic system design, UI/UX aesthetics, and project automation. Our mission is to raise tech-savvy leaders through hands-on workshops, hardware development, and collaborative digital solutions."
  },
  {
    question: "Who can apply for DCDC membership and what is the process?",
    answer: "All students from SRMIST, with a strong focus or interest in Electronics, Communication, Design, and Hardware-Software systems, are welcome to apply. We conduct our membership screening drive annually and semi-annually. You can submit your interest using the contact page above. We look for passionate individuals eager to learn, build, and innovate."
  },
  {
    question: "Do I need prior experience in digital design or advanced coding to join?",
    answer: "Not at all. While specialized design or technical experience is a plus, our club is fundamentally built on collaborative peer learning. DCDC hosts beginner-friendly bootcamps, system design workshops, and introductory webinars on EDA tools, microcontrollers, and communication principles to help you scale your skills quickly."
  },
  {
    question: "What are some of the key technical projects developed by the club?",
    answer: "Our portfolio spans SDR communication receivers, embedded system setups, dynamic sensor automation networks, simulation architectures for VLSI-DSP configurations, and web-based utility apps. Our design arm focuses on creating UI interfaces, engineering portfolio systems, and graphic portfolios for academic presentations and research publications."
  },
  {
    question: "How does DCDC support students in national contests and placement drives?",
    answer: "DCDC is highly focused on active participation. We create custom teams for national hackathons, Smart India Hackathons (SIH), design sprints, and hardware design expos. Senior members mentor juniors with real interview scenarios, portfolio reviews, and project support, paving the way for strong resumes and top-tier core electronics and design placements."
  }
];

export const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-24 bg-ivory border-t border-ivory-dark relative">
      {/* Subtle branding and particle graphics */}
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-gold/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-12 right-12 w-64 h-64 bg-navy-800/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/10 border border-navy-800/20 text-navy-800 text-xs font-mono tracking-widest uppercase"
          >
            <Stars className="w-3.5 h-3.5 text-gold-dark" />
            Curious Minds • FAQ
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy-800 tracking-tight"
          >
            Frequently Asked <span className="text-gold-dark font-sans font-medium">Questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-navy-700/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            Have queries about DCDC, membership requirements, interactive workshops, or our project ecosystem? Find quick answers below.
          </motion.p>
        </div>

        {/* Custom Ivory Rounded Container for Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                id={`faq-accordion-item-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`border rounded-[20px] transition-all overflow-hidden bg-white ${
                  isOpen 
                    ? 'border-gold shadow-md ring-1 ring-gold/10' 
                    : 'border-ivory-dark/60 hover:border-navy-800/20 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 text-navy-800">
                    <div className={`p-2.5 rounded-xl transition-colors duration-300 flex-shrink-0 ${
                      isOpen ? 'bg-gold/15 text-gold-dark' : 'bg-navy-800/5 text-navy-800/70'
                    }`}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className="font-sans font-bold text-sm sm:text-base text-navy-800 tracking-tight leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                      isOpen ? 'bg-gold/10 border-gold/40 text-gold-dark' : 'bg-navy-800/5 border-transparent text-navy-800/60'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Animated Accordion body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-navy-800/5 text-navy-700/90 text-xs sm:text-sm leading-relaxed pl-[64px]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Compact membership hint card below accordion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-[22px] bg-navy-800 border-2 border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center flex-shrink-0 hidden sm:flex">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-ivory text-md sm:text-lg">Still have some questions?</h4>
              <p className="text-ivory-light/65 text-xs sm:text-sm mt-0.5">Let's talk! Send us a custom enquiry, or join DCDC directly today.</p>
            </div>
          </div>
          <a
            href="#contact-us-section"
            className="px-5 py-2.5 rounded-xl bg-gold text-navy-900 font-bold text-xs tracking-wider border border-transparent hover:bg-gold-light hover:scale-102 transition-all cursor-pointer whitespace-nowrap"
          >
            Get In Touch
          </a>
        </motion.div>

      </div>
    </section>
  );
};
