import { useState, FormEvent } from 'react';
import { ArrowUpRight, Sparkles, Send, Check } from 'lucide-react';

export default function MindsBehindSection() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 1500);
  };

  return (
    <section id="about" className="relative py-24 px-4 bg-[#151515] border-t border-neutral-800/60">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02] pointer-events-none" />
      
      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Description Typography */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-[10px] uppercase tracking-wider rounded-full">
              <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
              <span>Design Excellence</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Meet the Minds Behind Futureblox
            </h2>

            <div className="space-y-4 text-neutral-400 text-sm md:text-base leading-relaxed font-medium">
              <p>
                Ship Your Website Quickly with Frameblox. Utilize our extensive library of prebuilt templates and components to achieve a professional, stunning look effortlessly.
              </p>
              <p>
                Save time and focus on your unique content with our user-friendly, highly customizable design solutions. Whether you're creating a portfolio to showcase your work, a blog to share your thoughts and insights, or an e-commerce site to drive sales, Frameblox ensures a seamless, responsive experience.
              </p>
            </div>

            {/* Extra interactive element: Newsletter subscribe to make it a fully realized marketing site */}
            <div className="pt-6 border-t border-neutral-800/60 max-w-md">
              <span className="block text-xs font-bold font-mono text-neutral-550 uppercase tracking-widest mb-3">
                Corporate newsletter
              </span>
              
              {subscribed ? (
                <div className="p-3 bg-blue-950/40 border border-blue-900/60 text-blue-300 text-xs font-semibold rounded-2xl flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" />
                  <span>Subscription confirmed. Thank you!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative flex items-center">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full text-xs text-white bg-neutral-900/40 hover:bg-neutral-900/80 focus:bg-black placeholder-neutral-500 border border-neutral-800/80 rounded-2xl pl-4 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-lg"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 p-2 bg-[#0061FF] hover:bg-[#1a75ff] text-white rounded-xl active:scale-95 transition-all cursor-pointer"
                    aria-label="Submit email"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Block: Portrait Workspace image */}
          <div className="lg:col-span-6">
            <div className="relative group overflow-hidden bg-neutral-900 border border-neutral-800/80 rounded-[40px] shadow-2xl aspect-[4/5] max-h-[540px] mx-auto md:max-w-md lg:max-w-none">
              
              {/* Overlay styling elements */}
              <div className="absolute inset-0 bg-neutral-950/25 z-10 pointer-events-none group-hover:bg-neutral-950/0 transition-colors duration-500" />
              
              {/* Primary Office Visual */}
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800&h=1000" 
                alt="Modern Futureblox Co-working Interior" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
              />

              {/* Floating Architectural Badge */}
              <div className="absolute bottom-6 right-6 bg-[#1c1c1c]/95 backdrop-blur-md rounded-2xl p-4 border border-neutral-800/80 shadow-2xl max-w-[200px] z-20 pointer-events-none transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
                <p className="text-[10px] font-bold font-mono text-neutral-550 uppercase tracking-widest">HQ Location</p>
                <p className="font-bold text-white text-xs mt-1">Design Loft, NY</p>
                <p className="text-[11px] text-neutral-400 mt-1 leading-normal">Open office setting built around sustainable materials.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
