import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Map } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const DigitCounter = ({ value, revealed }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (revealed) {
      const targetValue = parseInt(value) || 0;
      const controls = animate(0, targetValue, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.floor(latest))
      });
      return () => controls.stop();
    } else {
      setDisplayValue(0);
    }
  }, [revealed, value]);

  return (
    <motion.span 
      className="font-serif text-[28px] text-gold mb-1 w-12 text-center"
      animate={revealed ? { 
        scale: [1, 1.2, 1], 
        color: ['#655743', '#d4af37'],
      } : {}}
      transition={{ duration: 0.6 }}
    >
      {String(displayValue).padStart(2, '0')}
    </motion.span>
  );
};

const ScratchCardDate = ({ dateString, onReveal }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [scratchCount, setScratchCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    // Premium Metallic Gold Gradient for Scratch Cover
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#c5a059');
    gradient.addColorStop(0.2, '#f1e1a6');
    gradient.addColorStop(0.5, '#d4af37');
    gradient.addColorStop(0.8, '#f1e1a6');
    gradient.addColorStop(1, '#a67c00');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Add subtle texture or pattern to the scratch card
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < rect.width; i += 4) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, rect.height);
      ctx.stroke();
    }

    ctx.fillStyle = '#655743';
    ctx.font = 'bold 10px Montserrat';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '2px';
    ctx.fillText('SCRATCH TO REVEAL', rect.width / 2, rect.height / 2);
  }, [revealed]);

  useEffect(() => {
    if (revealed) {
      onReveal();
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const xPos = (rect.left + rect.width / 2) / window.innerWidth;
        const yPos = (rect.top + rect.height / 2) / window.innerHeight;
        
        // --- MASSIVE MULTI-STAGE POPPER CELEBRATION ---
        
        // Stage 1: Central Explosion
        confetti({
          particleCount: 600,
          spread: 160,
          origin: { x: xPos, y: yPos },
          colors: ['#D4AF37', '#FAF6F0', '#655743', '#B68222', '#C5A039', '#899E8F'],
          disableForReducedMotion: true,
          gravity: 0.7,
          startVelocity: 55,
          scalar: 1.4,
          ticks: 400
        });

        // Stage 2: Staggered Side Blasts
        const blasts = [
          { x: 0.2, y: yPos + 0.1, delay: 150, angle: 60 },
          { x: 0.8, y: yPos + 0.1, delay: 250, angle: 120 },
          { x: 0.5, y: yPos - 0.2, delay: 400, angle: 90 },
          { x: xPos, y: yPos, delay: 600, angle: 90, spread: 360 } // Final center starburst
        ];

        blasts.forEach(blast => {
          setTimeout(() => {
            confetti({
              particleCount: 120,
              angle: blast.angle || 90,
              spread: blast.spread || 70,
              origin: { x: blast.x, y: blast.y },
              colors: ['#D4AF37', '#FAF6F0', '#B68222'],
              startVelocity: 30,
              gravity: 1.1,
              scalar: 1,
            });
          }, blast.delay);
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
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    setScratchCount(prev => {
      const next = prev + 1;
      
      // Energetic mini-pops during scratching
      if (next % 3 === 0) {
        confetti({
          particleCount: 15,
          spread: 80,
          origin: { x: clientX / window.innerWidth, y: clientY / window.innerHeight },
          colors: ['#D4AF37', '#B68222', '#FAF6F0'],
          gravity: 2,
          startVelocity: 25,
          scalar: 0.8,
          ticks: 50
        });
      }

      if (next > 22 && !revealed) { 
        setRevealed(true);
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
    if (!isScratching) return;
    if (e.cancelable) e.preventDefault();
    scratch(e);
  };

  // Intense shake animation for the unscratched card
  const shakeAnimation = {
    x: [0, -4, 4, -4, 4, 0],
    y: [0, -1, 1, -1, 1, 0],
    rotate: [0, -1, 1, -1, 1, 0],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatDelay: 2
    }
  };

  return (
    <div className="relative w-64 h-14 mx-auto my-6 z-20" ref={containerRef}>
      {/* Background Frame (Matching Screenshot) */}
      <div className="absolute inset-0 bg-white/40 rounded border-[1.5px] border-gold/40 flex items-center justify-center p-1">
         <div className="w-full h-full border border-gold/20 rounded flex items-center justify-center bg-[#FDFBF7] shadow-inner">
            <p className="font-serif text-[15px] tracking-[0.2em] text-textDark font-bold uppercase">{dateString}</p>
         </div>
      </div>

      {!revealed && (
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full rounded shadow-md touch-none cursor-crosshair z-30"
          animate={shakeAnimation}
          onMouseDown={handleDown}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
          onMouseMove={handleMove}
          onTouchStart={handleDown}
          onTouchEnd={handleUp}
          onTouchMove={handleMove}
        />
      )}
    </div>
  );
};

const EventCard = ({ title, dateString, targetDateIso, time, highlight, venue, locationLink, onReveal }) => {
  const [revealed, setRevealed] = useState(false);
  const cardRef = useRef(null);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);
  
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDateIso) - +new Date();
    if (difference <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDateIso]);

  // AUTO-SCROLL PULL-BACK LOGIC
  useEffect(() => {
    if (revealed) return;

    const handleScroll = () => {
      if (!cardRef.current || revealed) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      if (rect.bottom < viewportHeight * 0.4 && !hasScrolledPast) {
        setHasScrolledPast(true);
        setTimeout(() => {
          cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHasScrolledPast(false); 
        }, 800);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [revealed, hasScrolledPast]);

  return (
    <motion.section 
      ref={cardRef}
      className="min-h-[85vh] flex flex-col items-center justify-center py-10 px-6 text-center relative z-10 w-full"
      initial={{ opacity: 0, y: 50, rotateX: 10, perspective: 1000 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 70, damping: 15 }}
    >
      <motion.div 
        className="border border-gold/30 rounded-t-[160px] rounded-b-xl p-8 bg-paper shadow-2xl embossed w-full max-w-sm relative"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.h2 
          className="font-serif text-3xl sm:text-4xl text-textDark mb-1 italic tracking-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {title}
        </motion.h2>
        <motion.div 
          className="w-12 h-px bg-gold/40 mx-auto mb-4"
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
        
        <ScratchCardDate 
          dateString={dateString} 
          onReveal={() => {
            setRevealed(true);
            if (onReveal) onReveal();
          }} 
        />
        
        <div className="flex justify-center gap-4 my-8">
          {['days', 'hours', 'minutes', 'seconds'].map((interval, i) => (
            <motion.div 
              key={interval} 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <DigitCounter value={timeLeft[interval]} revealed={revealed} />
              <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-textDark/50">
                {interval}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6 mt-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <h3 className="font-sans text-[9px] uppercase tracking-widest text-[#899E8F] mb-1 font-bold">Time</h3>
            <p className="font-serif text-base text-textDark/80">{time}</p>
            {highlight && (
              <motion.p 
                className="font-serif text-xs italic text-gold mt-1"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {highlight}
              </motion.p>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }}>
            <h3 className="font-sans text-[9px] uppercase tracking-widest text-[#899E8F] mb-1 font-bold">Venue</h3>
            <p className="font-serif text-base text-textDark/80 leading-relaxed">{venue}</p>
          </motion.div>

          {/* Location Tab (Button) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="pt-6"
          >
            <a 
              href={locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full border-2 border-gold/40 bg-white shadow-lg text-gold font-serif text-[13px] tracking-widest hover:bg-gold hover:text-white transition-all duration-500 uppercase italic font-bold"
              style={{ boxShadow: '0 8px 15px rgba(182, 130, 34, 0.1)' }}
            >
              <Map size={16} className="text-gold group-hover:text-white" />
              View Location
            </a>
          </motion.div>
        </div>
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
        locationLink="https://maps.app.goo.gl/NvpiSgrVxRf71aom8?g_st=aw"
        onReveal={handleReveal}
      />
      <EventCard 
        title="Marriage Function"
        dateString="May 7, 2026"
        targetDateIso="2026-05-07T12:00:00"
        time="Starting at 12:00 PM"
        highlight={null}
        venue="Vajra Auditorium, Mooriyad Road"
        locationLink="https://www.google.com/maps/search/Vajra+Auditorium+Mooriyad+Road+Koothuparamba"
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
