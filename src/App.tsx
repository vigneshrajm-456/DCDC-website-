import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  return (
    <div className="min-h-screen bg-ivory font-sans flex flex-col justify-between selection:bg-gold selection:text-navy-900 overflow-x-hidden">
      
      <main className="flex-grow pt-12 md:pt-16">
        {/* Contact section (Left info + Right form) */}
        <ContactSection onNewSubmission={() => {}} />

        {/* FAQ Accordion Section with ivory background */}
        <FAQSection />
      </main>

      {/* Footer and copyright */}
      <FooterSection />
    </div>
  );
}

