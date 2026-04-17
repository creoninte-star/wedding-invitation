import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const ScratchCardDate = ({ dateString, onReveal }) => {
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [scratchCount, setScratchCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    
    // Handle high DPI displays for crisp text
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    // Fill background gradient (looks like a gold foil card)
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#d8ccba');
    gradient.addColorStop(0.5, '#eaddce');
    gradient.addColorStop(1, '#c5b597');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Add text "SCRATCH TO REVEAL DATE"
    ctx.fillStyle = '#655743';
    ctx.font = '8px Montserrat';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '1px';
    ctx.fillText('SCRATCH TO REVEAL', rect.width / 2, rect.height / 2);
  }, [revealed]);

  const scratch = (e) => {
    if (revealed) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Normalize coordinates for device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();

    setScratchCount(prev => {
      const next = prev + 1;
      if (next > 25) { // Scratch threshold reached
        setRevealed(true);
        onReveal();
      }
      return next;
    });
  };

  const handleDown = (e) => {
    setIsScratching(true);
    scratch(e);
  };
  
  const handleUp = () => setIsScratching(false);
  
  const handleMove = (e) => {
    // Prevent default scrolling when touching the canvas to allow scratch interaction
    if (e.cancelable && e.touches) {
      e.preventDefault();
    }
    if (!isScratching) return;
    scratch(e);
  };

  return (
    <motion.div 
      className="relative w-48 h-8 mx-auto my-2 group cursor-crosshair z-20"
      animate={!revealed && !isScratching ? { x: [0, -3, 3, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2.5 }}
    >
      {/* The actual date underneath */}
      <div className="absolute inset-0 flex items-center justify-center bg-envelope/30 rounded border border-gold/20 pointer-events-none">
        <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-textDark drop-shadow-sm">{dateString}</p>
        
        {/* Celebration Particles */}
        <AnimatePresence>
          {revealed && (
            <>
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * (Math.PI / 180);
                return (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-gold"
                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 0, 
                      scale: [0, 1.5, 0],
                      x: Math.cos(angle) * 60, 
                      y: Math.sin(angle) * 25 
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* The Scratch Canvas */}
      <AnimatePresence>
        {!revealed && (
          <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full rounded shadow-sm touch-none"
            onMouseDown={handleDown}
            onMouseUp={handleUp}
            onMouseLeave={handleUp}
            onMouseMove={handleMove}
            onTouchStart={handleDown}
            onTouchEnd={handleUp}
            onTouchMove={handleMove}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.6 } }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const EventCard = ({ title, dateString, targetDateIso, time, highlight, venue }) => {
  const [revealed, setRevealed] = useState(false);
  
  const calculateTimeLeft = () => {
    if (!revealed) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    const difference = +new Date(targetDateIso) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!revealed) return; // Keep zeros if not scratched
    
    setTimeLeft(calculateTimeLeft()); // Initial set after reveal
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [revealed, targetDateIso]); // Re-run when revealed state changes

  return (
    <motion.section 
      className="py-8 px-6 text-center bg-envelope relative z-10 embossed mt-4 w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
    >
      <div className="border border-gold/30 rounded-t-full p-8 bg-paper shadow-md">
        <h2 className="font-serif text-3xl sm:text-4xl text-textDark mb-2 italic">{title}</h2>
        <div className="w-16 h-px bg-gold/50 mx-auto mb-4"></div>
        
        {/* The New Interactive Scratch Card Area */}
        <ScratchCardDate 
          dateString={dateString} 
          onReveal={() => setRevealed(true)} 
        />
        
        {/* Minimalist Countdown */}
        <div className="flex justify-center gap-4 my-8">
          {['days', 'hours', 'minutes', 'seconds'].map((interval) => (
            <div key={interval} className="flex flex-col items-center">
              <motion.span 
                className="font-serif text-2xl text-gold mb-1 w-10 text-center"
                animate={revealed ? { scale: [1.2, 1], color: ['#655743', '#d4af37'] } : {}}
                transition={{ duration: 0.5 }}
              >
                {timeLeft[interval] || '0'}
              </motion.span>
              <span className="font-sans text-[8px] uppercase tracking-widest text-textDark/60">
                {interval}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-2">
          <div>
            <h3 className="font-sans text-[9px] uppercase tracking-wider text-sage mb-1">Time</h3>
            <p className="font-serif text-base sm:text-lg">{time}</p>
            {highlight && (
              <p className="font-serif text-xs italic text-gold mt-1">{highlight}</p>
            )}
          </div>
          <div className="w-8 h-px bg-sage/30 mx-auto"></div>
          <div>
            <h3 className="font-sans text-[9px] uppercase tracking-wider text-sage mb-1">Venue</h3>
            <p className="font-serif text-base sm:text-lg">{venue}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const EventSections = () => {
  return (
    <div className="pb-16 flex flex-col items-center">
      <EventCard 
        title="Nikkah Ceremony"
        dateString="May 6, 2026"
        targetDateIso="2026-05-06T16:00:00"
        time="After Asar (4:00 PM onwards)"
        highlight="Bride Entry: 5:30 PM - 6:00 PM"
        venue="Zareena Manzil, Koothparamba"
      />
      <EventCard 
        title="Marriage Function"
        dateString="May 7, 2026"
        targetDateIso="2026-05-07T12:00:00"
        time="Starting at 12:00 PM"
        highlight={null}
        venue="Vajra Auditorium, Mooriyad Road"
      />
    </div>
  );
};

export default EventSections;
