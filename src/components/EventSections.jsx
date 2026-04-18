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
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (revealed && !hasAnimated.current) {
      const targetValue = parseInt(value) || 0;
      const controls = animate(0, targetValue, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.floor(latest))
      });
      hasAnimated.current = true;
      return () => controls.stop();
    } else if (revealed) {
      setDisplayValue(parseInt(value) || 0);
    } else {
      setDisplayValue(0);
      hasAnimated.current = false;
    }
  }, [revealed, value]);

  return (
    <motion.span 
      className="font-serif text-[28px] text-gold mb-1 w-12 text-center inline-block"
      animate={revealed ? { 
        color: ['#655743', '#d4af37'],
      } : {}}
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
    gradient.addColorStop(0, '#B8860B');
    gradient.addColorStop(0.3, '#FFD700');
    gradient.addColorStop(0.5, '#F1E1A6');
    gradient.addColorStop(0.7, '#DAA520');
    gradient.addColorStop(1, '#8B7500');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Ornate Texture Pattern
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < rect.width; i += 10) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 10, rect.height);
      ctx.stroke();
    }
    ctx.globalAlpha = 1.0;

    // Stylish Text on Foil
    ctx.fillStyle = '#655743';
    ctx.font = 'bold 11px Montserrat';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '3px';
    ctx.fillText('SCRATCH TO REVEAL', rect.width / 2, rect.height / 2);

    // Subtle Shine Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, rect.height);
    ctx.lineTo(rect.width, 0);
    ctx.stroke();

  }, [revealed]);

  useEffect(() => {
    if (revealed) {
      onReveal();
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const xPos = (rect.left + rect.width / 2) / window.innerWidth;
        const yPos = (rect.top + rect.height / 2) / window.innerHeight;
        
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

        const blasts = [
          { x: 0.2, y: yPos + 0.1, delay: 150, angle: 60 },
          { x: 0.8, y: yPos + 0.1, delay: 250, angle: 120 },
          { x: 0.5, y: yPos - 0.2, delay: 400, angle: 90 },
          { x: xPos, y: yPos, delay: 600, angle: 90, spread: 360 }
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
      if (next > 22 && !revealed) setRevealed(true);
      return next;
    });
  };

  const handleDown = e => { setIsScratching(true); scratch(e); };
  const handleUp = () => setIsScratching(false);
  const handleMove = e => { if (isScratching) { if (e.cancelable) e.preventDefault(); scratch(e); } };

  return (
    <div className="relative w-72 mx-auto my-8 group" ref={containerRef}>
      {/* Ornate Laser-Cut Border Frame */}
      <div className="absolute -inset-2 border-2 border-gold/40 rounded-lg p-1">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-gold/40 rotate-45 bg-paper"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 border-2 border-gold/40 rotate-45 bg-paper"></div>
      </div>
      
      <div className="relative min-h-[56px] bg-white rounded border-[1.5px] border-gold/30 flex items-center justify-center p-1.5 shadow-xl overflow-hidden">
         {/* Inner Bezel */}
         <div className="absolute inset-0 border-[0.5px] border-black/5 rounded"></div>
         
         <div className="w-full h-full border border-gold/10 rounded flex items-center justify-center bg-[#FDFBF7] shadow-inner py-3">
            <p className="font-serif text-[16px] tracking-[0.2em] text-textDark font-bold uppercase">{dateString}</p>
         </div>

         {!revealed && (
          <motion.div 
            className="absolute inset-0 z-30 overflow-hidden"
            animate={{ 
              x: [0, -2, 2, -2, 2, 0],
              transition: { duration: 0.4, repeat: Infinity, repeatDelay: 3 }
            }}
          >
             <motion.canvas
              ref={canvasRef}
              className="w-full h-full touch-none cursor-crosshair"
              onMouseDown={handleDown}
              onMouseUp={handleUp}
              onMouseLeave={handleUp}
              onMouseMove={handleMove}
              onTouchStart={handleDown}
              onTouchEnd={handleUp}
              onTouchMove={handleMove}
            />
            {/* Shimmer Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full pointer-events-none"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            />
          </motion.div>
        )}
      </div>
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

const CountdownDisplay = ({ targetDateIso, revealed }) => {
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
    if (!revealed) return;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDateIso, revealed]);

  return (
    <div className="flex justify-center gap-3 my-4">
      {['days', 'hours', 'minutes', 'seconds'].map((interval) => (
        <div key={interval} className="flex flex-col items-center">
          <DigitCounter value={timeLeft[interval]} revealed={revealed} />
          <span className="font-sans text-[7px] uppercase tracking-[0.2em] text-textDark/50">
            {interval}
          </span>
        </div>
      ))}
    </div>
  );
};

const EventSections = ({ onAllRevealed }) => {
  const [revealed, setRevealed] = useState(false);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  useEffect(() => {
    if (revealed) {
      if (onAllRevealed) onAllRevealed();
      // Scroll to center on reveal
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [revealed, onAllRevealed]);

  // Highly optimized Pull-back logic for Mobile
  useEffect(() => {
    if (revealed) return;

    let lastScrollY = window.scrollY;
    let isMovingValue = false;

    const handleScroll = () => {
      if (!cardRef.current || revealed || isMovingValue) return;

      const rect = cardRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const currentScrollY = window.scrollY;
      
      // If we are scrolling DOWN and the card is leaving the top of the viewport
      // OR if we are scrolling UP and the card is leaving the bottom
      const isScrolledPastBottom = rect.bottom < viewportHeight * 0.35;
      
      if (isScrolledPastBottom && !hasScrolledPast && currentScrollY > lastScrollY) {
        setHasScrolledPast(true);
        isMovingValue = true;

        // Smooth Physics-based scroll back to center
        const targetScroll = cardRef.current.offsetTop - (viewportHeight / 2) + (rect.height / 2);
        
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });

        // Reset state after transition
        setTimeout(() => {
          setHasScrolledPast(false);
          isMovingValue = false;
        }, 800);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [revealed, hasScrolledPast]);

  const handleReveal = () => setRevealed(true);

  const commonLocation = "https://maps.app.goo.gl/NvpiSgrVxRf71aom8?g_st=aw";
  const commonVenue = "Zareena Manzil, Koothuparamba";

  return (
    <div className="pb-16 flex flex-col items-center" ref={containerRef}>
      <motion.section 
        ref={cardRef}
        className="min-h-[85vh] flex flex-col items-center justify-center py-10 px-6 text-center relative z-10 w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <div className="border border-gold/30 rounded-t-[160px] rounded-b-xl p-8 bg-paper shadow-2xl embossed w-full max-w-sm relative">
          <h2 className="font-serif text-3xl text-textDark mb-1 italic">Wedding Ceremonies</h2>
          <div className="w-12 h-px bg-gold/40 mx-auto mb-4" />
          
          <ScratchCardDate 
            dateString="May 6 & 7, 2026" 
            onReveal={handleReveal} 
          />
          
          <div className="space-y-6 mt-8 text-center overflow-hidden">
            <div className={`transition-all duration-1000 ${revealed ? 'opacity-100 scale-100' : 'opacity-20 scale-95 blur-sm'}`}>
              <h3 className="font-sans text-[9px] uppercase tracking-widest text-[#899E8F] mb-1 font-bold">Nikkah Ceremony</h3>
              <p className="font-serif text-lg text-textDark font-bold">Wednesday, May 6</p>
              <CountdownDisplay targetDateIso="2026-05-06T16:00:00" revealed={revealed} />
              <p className="font-serif text-sm text-textDark/80">After Asar (4:00 PM onwards)</p>
              <p className="font-serif text-xs italic text-gold mt-1">Dhuʻl-Qiʻdah 19, 1447</p>
            </div>

            <div className="w-16 h-px bg-gold/20 mx-auto my-4"></div>

            <div className={`transition-all duration-1000 ${revealed ? 'opacity-100 scale-100' : 'opacity-20 scale-95 blur-sm'}`}>
              <h3 className="font-sans text-[9px] uppercase tracking-widest text-[#899E8F] mb-1 font-bold">Marriage Function</h3>
              <p className="font-serif text-lg text-textDark font-bold">Thursday, May 7</p>
              <CountdownDisplay targetDateIso="2026-05-07T12:00:00" revealed={revealed} />
              <p className="font-serif text-sm text-textDark/80">Starting at 12:00 PM</p>
              <p className="font-serif text-xs italic text-gold mt-1">Dhuʻl-Qiʻdah 20, 1447</p>
            </div>

            <div className="pt-6 border-t border-gold/10">
              <h3 className="font-sans text-[9px] uppercase tracking-widest text-[#899E8F] mb-1 font-bold">Venue</h3>
              <p className="font-serif text-base text-textDark font-bold leading-tight">{commonVenue}</p>
            </div>

            <motion.div className="pt-6">
              <a 
                href={commonLocation}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full border-2 border-gold/40 bg-white shadow-lg text-gold font-serif text-[13px] tracking-widest hover:bg-gold hover:text-white transition-all duration-500 uppercase italic font-bold"
              >
                <Map size={16} />
                View Location
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default EventSections;
