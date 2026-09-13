import { useState } from 'react';
import { EnvelopeGate } from './components/EnvelopeGate';
import { HeroSection } from './components/HeroSection';
import { ScratchCard } from './components/ScratchCard';
import { CountdownTimer } from './components/CountdownTimer';
import { EventsTimeline } from './components/EventsTimeline';
import { IntroQuote } from './components/IntroQuote';
import { VenueSection } from './components/VenueSection';
import { Footer } from './components/Footer';
import { FloatingHearts } from './components/FloatingHearts';

export function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#6E0000] flex flex-col items-center justify-start selection:bg-[#FF4D88]/20 selection:text-[#FF1493] relative">
      {/* 3D Envelope Landing Screen */}
      <EnvelopeGate isOpen={isEnvelopeOpen} onOpen={handleEnvelopeOpen} />

      {/* Floating Hearts Particle Layer */}
      {isEnvelopeOpen && <FloatingHearts />}

      {/* Main Mobile-Framed Wedding Invitation Canvas */}
      <div
        className={`w-full max-w-[480px] bg-white min-h-screen shadow-2xl transition-opacity duration-700 relative overflow-hidden ${
          isEnvelopeOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
        }`}
      >
        <main className="w-full flex flex-col">
          {/* Section 1: Parents' Invitation, Magenta Rahul & Riya, Kolkata Skyline */}
          <HeroSection />

          {/* Section 2: Yellow Scratch-to-Reveal Card */}
          <ScratchCard />

          {/* Section 3: 4-Column Divider Countdown Timer */}
          <CountdownTimer />

          {/* Section 4: Crimson Background Events Schedule */}
          <EventsTimeline />

          {/* Section 5: White Background Awaiting Noble Presence Quote */}
          <IntroQuote />

          {/* Section 6: Crimson Background Where We Celebrate & Map */}
          <VenueSection />

          {/* Section 7: White Background With Love & Rahul & Riya */}
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
