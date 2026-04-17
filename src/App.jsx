import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroEnvelope from './components/HeroEnvelope';
import DoubleWeddingArchitecture from './components/DoubleWeddingArchitecture';
import EventSections from './components/EventSections';
import VenueMaps from './components/VenueMaps';
import ClosingMessage from './components/ClosingMessage';
import MusicPlayer from './components/MusicPlayer';
import FooterRSVP from './components/FooterRSVP';
import confetti from 'canvas-confetti';




class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: '#A83B40', textAlign: 'center', background: '#FAF6F0', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontFamily: 'serif' }}>Something went wrong.</h1>
          <p style={{ fontFamily: 'sans-serif', fontSize: '12px' }}>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', background: '#B68222', color: 'white', border: 'none', borderRadius: '5px', marginTop: '20px' }}>Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  console.log("Wedding App Initializing...");
  const [isOpened, setIsOpened] = useState(false);
  const [allRevealed, setAllRevealed] = useState(false);

  useEffect(() => {
    if (isOpened) {
      // WOW Party Popper Effect - Multi-stage
      const end = Date.now() + (1.5 * 1000);
      const colors = ['#B68222', '#FAF6F0', '#A83B40', '#899E8F'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: colors,
          zIndex: 1001
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: colors,
          zIndex: 1001
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [isOpened]);

  return (

    <div className="relative min-h-screen bg-envelope font-sans flex flex-col justify-center">
      {/* Noise Overlay */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-50"></div>

      {/* App Container - Mobile App Feel max width */}
      <div className="max-w-md w-full mx-auto min-h-screen relative shadow-2xl bg-paper">
        
        {/* Music Control - stays on top after opening */}
        <MusicPlayer isOpened={isOpened} />
        
        {/* Envelope Covers everything initially */}

        {!isOpened && <HeroEnvelope onOpen={() => setIsOpened(true)} />}

        {/* The actual Invitation Content */}
        <div className={`relative z-10 min-h-screen transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
          <DoubleWeddingArchitecture />
          
          <EventSections onAllRevealed={() => setAllRevealed(true)} />
          
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <VenueMaps />
              <FooterRSVP />
              <ClosingMessage />
            </motion.div>
          )}
          
        </div>

      </div>
    </div>
  );
}

export default function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
