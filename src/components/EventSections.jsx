import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const ScratchCardDate = ({ dateString, onReveal }) => {
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [scratchCount, setScratchCount] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#d8ccba');
    gradient.addColorStop(0.5, '#eaddce');
    gradient.addColorStop(1, '#c5b597');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    ctx.fillStyle = '#655743';
    ctx.font = 'bold 9px Montserrat';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '1px';
    ctx.fillText('PULL & SCRATCH', rect.width / 2, rect.height / 2);
  }, [revealed]);

  useEffect(() => {
    if (revealed) {
      onReveal();
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const xPos = (rect.left + rect.width / 2) / window.innerWidth;
        const yPos = (rect.top + rect.height / 2) / window.innerHeight;
        
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { x: xPos, y: yPos },
          colors: ['#D4AF37', '#eaddce', '#655743', '#B68222'],
          disableForReducedMotion: true,
          ticks: 200,
          gravity: 0.8,
          startVelocity: 35,
          scalar: 1.2
        });
      }
    }
  }, [revealed]);

  const scratch = (e) => {
    if (revealed || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();

    setScratchCount(prev => {
      const next = prev + 1;
      
      if (next % 3 === 0) {
        confetti({
          particleCount: 5,
          angle: 90,
          spread: 45,
          origin: { x: clientX / window.innerWidth, y: clientY / window.innerHeight },
          colors: ['#D4AF37', '#B68222'],
          gravity: 1.5,
          startVelocity: 10,
          scalar: 0.6,
          ticks: 20
        });
      }

      if (next > 20 && !revealed) { 
        setRevealed(true);
      }
      return next;
    });
  };

  const handleDown = (e) => {
    setIsScratching(true);
    scratch(e);
  };
  
  const handleUp = () => {
    setIsScratching(false);
  };
  
  const handleMove = (e) => {
    if (!isScratching) return;
    if (e.cancelable) e.preventDefault();
    scratch(e);
  };

  return (
    <div className="relative w-56 h-12 mx-auto my-6 z-20 group">
      {/* Background Result (The Date) */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#fdfaf5] rounded border border-gold/30 shadow-inner overflow-hidden">
        <div className="absolute inset-0 bg-gold/5 opacity-40"></div>
        <p className="font-serif text-sm font-bold tracking-[0.15em] text-textDark drop-shadow-sm z-10">{dateString}</p>
      </div>

      {/* The Draggable / Scratchable Cover */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            className="absolute inset-0 z-20 touch-none cursor-grab active:cursor-grabbing"
            drag="y"
            dragConstraints={{ top: 0, bottom: 80 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
               if (info.offset.y > 60) {
                 setIsLocked(true);
               }
            }}
            style={{ y: dragY }}
            animate={isLocked ? { y: 60 } : { y: 0 }}
            transition={isLocked ? { type: "spring", damping: 15 } : { type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* The Scratchable Surface (Canvas) */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full rounded shadow-md border border-gold/40"
              onMouseDown={handleDown}
              onMouseUp={handleUp}
              onMouseLeave={handleUp}
              onMouseMove={handleMove}
              onTouchStart={handleDown}
              onTouchEnd={handleUp}
              onTouchMove={handleMove}
            />
            
            {/* Visual Pull Tab */}
            <motion.div 
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center backdrop-blur-sm"
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
               <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></div>
            </motion.div>

            <div className="absolute -bottom-10 left-0 right-0 text-center opacity-60">
               <p className="font-sans text-[7px] uppercase tracking-[0.3em] text-gold font-bold">
                 {isLocked ? "SCRATCH TO UNLOCK" : "PULL DOWN TO REVEAL"}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unlock Glow */}
      {revealed && (
        <motion.div 
          className="absolute inset-0 bg-gold/20 rounded blur-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.4, 0], scale: 1.2 }}
          transition={{ duration: 1.5 }}
        />
      )}
    </div>
  );
};

const EventCard = ({ title, dateString, targetDateIso, time, highlight, venue, onReveal }) => {
  const [revealed, setRevealed] = useState(false);
  const cardRef = useRef(null);
  
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
    if (!revealed) return; 
    
    setTimeLeft(calculateTimeLeft()); 
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [revealed, targetDateIso]);

  return (
    <motion.section 
      ref={cardRef}
      className="min-h-[90vh] flex flex-col items-center justify-center py-12 px-6 text-center relative z-10 w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
    >
      <motion.div 
        className="border border-gold/30 rounded-t-[140px] rounded-b-xl p-8 bg-paper shadow-2xl embossed w-full max-w-sm relative overflow-hidden"
        whileInView={{ scale: [0.95, 1], y: [20, 0] }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gold/5 opacity-30 pointer-events-none"></div>
        
        <h2 className="font-serif text-3xl sm:text-4xl text-textDark mb-2 italic tracking-tight">{title}</h2>
        <div className="w-16 h-px bg-gold/50 mx-auto mb-6"></div>
        
        {/* Pull-Down & Scratch Interactive Area */}
        <ScratchCardDate 
          dateString={dateString} 
          onReveal={() => {
            setRevealed(true);
            if (onReveal) onReveal();
          }} 
        />
        
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.8 }}
            >
              {/* Refined Countdown */}
              <div className="flex justify-center gap-4 my-8">
                {['days', 'hours', 'minutes', 'seconds'].map((interval) => (
                  <div key={interval} className="flex flex-col items-center">
                    <motion.span 
                      className="font-serif text-2xl text-gold mb-1 w-10 text-center"
                      animate={{ scale: [1.1, 1], color: ['#655743', '#d4af37'] }}
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
                  <h3 className="font-sans text-[9px] uppercase tracking-wider text-sage mb-1 font-bold">Time</h3>
                  <p className="font-serif text-base sm:text-lg text-textDark/90">{time}</p>
                  {highlight && (
                    <p className="font-serif text-xs italic text-gold mt-1">{highlight}</p>
                  )}
                </div>
                <div className="w-8 h-px bg-sage/30 mx-auto opacity-50"></div>
                <div>
                  <h3 className="font-sans text-[9px] uppercase tracking-wider text-sage mb-1 font-bold">Venue</h3>
                  <p className="font-serif text-base sm:text-lg text-textDark/90">{venue}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

const EventSections = ({ onAllRevealed }) => {
  const [revealedCount, setRevealedCount] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (revealedCount >= 2 && onAllRevealed) {
      onAllRevealed();
    }
  }, [revealedCount, onAllRevealed]);

  const handleReveal = () => setRevealedCount(prev => prev + 1);

  return (
    <div className="pb-16 flex flex-col items-center" ref={containerRef}>
      <EventCard 
        title="Nikkah Ceremony"
        dateString="May 6, 2026"
        targetDateIso="2026-05-06T16:00:00"
        time="After Asar (4:00 PM onwards)"
        highlight="Bride Entry: 5:30 PM - 6:00 PM"
        venue="Zareena Manzil, Koothparamba"
        onReveal={handleReveal}
      />
      <EventCard 
        title="Marriage Function"
        dateString="May 7, 2026"
        targetDateIso="2026-05-07T12:00:00"
        time="Starting at 12:00 PM"
        highlight={null}
        venue="Vajra Auditorium, Mooriyad Road"
        onReveal={handleReveal}
      />

      <AnimatePresence>
        {revealedCount < 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="text-center pt-8"
          >
            <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-gold animate-pulse">
              Scratch both dates to unlock details
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventSections;
