import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import PhotoSlideshow from './PhotoSlideshow';


const Rings = () => (
  <motion.div 
    className="relative w-16 h-10 mx-auto mb-2 flex justify-center"
  >
    <div className="absolute w-8 h-8 rounded-full border-2 border-gold shadow-md -translate-x-[15%]"></div>
    <div className="absolute w-8 h-8 rounded-full border-[1.5px] border-gold/70 shadow-md translate-x-[15%]"></div>
  </motion.div>
);

const MandalaBackdrop = ({ scrollYProgress }) => {
  const rotation1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotation2 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 0.1]);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between items-center overflow-hidden z-0">
      <motion.div 
        className="w-[150vw] h-[150vw] sm:w-[800px] sm:h-[800px] -mt-[75vw] sm:-mt-[400px] rounded-full border border-gold/20 flex items-center justify-center"
        style={{ rotate: rotation1, opacity, willChange: 'transform' }}
      >
         <div className="w-[85%] h-[85%] rounded-full border border-gold/10" />
      </motion.div>
      <motion.div 
        className="w-[150vw] h-[150vw] sm:w-[800px] sm:h-[800px] -mb-[75vw] sm:-mb-[400px] rounded-full border border-gold/20 flex items-center justify-center"
        style={{ rotate: rotation2, opacity, willChange: 'transform' }}
      >
         <div className="w-[85%] h-[85%] rounded-full border border-gold/10" />
      </motion.div>
    </div>
  );
};


const OrnateSingleCard = ({ pathDraw }) => (
  <div className="w-full h-full relative p-6 flex flex-col items-center z-10 paper-bg bg-paper shadow-2xl rounded-t-[160px] rounded-b-xl border-[3px] border-white/40 overflow-hidden transform-gpu">
    {/* Ghosted Background Watermarks */}
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.08] grayscale">
       <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden">
          <img 
            src="/refeel and jumana.jpeg" 
            alt="" 
            className="w-full h-full object-cover scale-110 blur-[1px]" 
          />
       </div>
       <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden">
          <img 
            src="/rizwan and nidha.jpeg" 
            alt="" 
            className="w-full h-full object-cover scale-110 blur-[1px]" 
          />
       </div>
    </div>

    <div className="absolute inset-0 rounded-t-[156px] rounded-b-lg border border-gold/20 pointer-events-none z-10"></div>

    <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-t-[140px] rounded-b-md pointer-events-none z-10" preserveAspectRatio="none">
      <motion.rect 
        width="100%" height="100%" rx="8" 
        stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" fill="none"
        style={{ pathLength: pathDraw }}
      />
    </svg>

    <div className="mt-12 z-20 w-full flex flex-col items-center shrink-0">
      <Rings />
      <div className="mb-4">
        <span className="font-serif text-5xl text-gold italic drop-shadow-sm">﷽</span>
      </div>
    </div>

    <div className="mt-6 flex flex-col items-center text-center px-4 z-20 w-full h-full flex-grow">
      <div className="space-y-6 mb-8">
        <div className="space-y-1">
          <h2 className="font-serif text-3xl sm:text-4xl text-textDark italic drop-shadow-sm leading-tight">
            Rafeel <span className="text-lg not-italic text-gold">&</span> Jumana
          </h2>
          <div className="w-8 h-px bg-gold/30 mx-auto"></div>
          <h2 className="font-serif text-3xl sm:text-4xl text-textDark italic drop-shadow-sm leading-tight">
            Rizwan <span className="text-lg not-italic text-gold">&</span> Nidha
          </h2>
        </div>
      </div>
      
      <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-sage mb-6 font-bold">Nikkah & Marriage Functions</p>
      
      <div className="space-y-6 w-full max-w-[280px] pb-12">
        <div className="space-y-1">
          <p className="font-serif text-lg text-textDark/90 font-bold">May 6 & 7, 2026</p>
          <div className="py-2 px-4 border border-gold/15 rounded bg-gold/5 max-w-[220px] mx-auto mt-2">
             <p className="font-serif text-[12px] text-gold italic leading-relaxed">
               May 6 (Nikkah): After Asar<br/>
               May 7 (Marriage): 12:00 PM onwards
             </p>
          </div>
        </div>

        <div className="space-y-4">
           <div>
              <h3 className="font-sans text-[9px] uppercase tracking-widest text-sage mb-1 font-bold">Venue</h3>
              <p className="font-serif text-sm text-textDark/80 leading-relaxed">
                <span className="font-bold">Nikkah:</span> Zareena Manzil, Koothparamba<br/>
                <span className="font-bold">Marriage:</span> Vajra Auditorium, Mooriyad Road
              </p>
           </div>
        </div>

        <div className="w-12 h-px bg-sage/20 mx-auto"></div>
        
        <p className="font-serif text-[11px] text-textDark/60 italic leading-relaxed max-w-[220px] mx-auto">
          "And among His Signs is this, that He created for you mates from among yourselves..."
        </p>
      </div>
    </div>
  </div>
);

const DoubleWeddingArchitecture = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
    });

    return (
      <div className="w-full pt-16 pb-20 flex flex-col items-center gap-16 relative overflow-visible" ref={containerRef}>
        
        {/* Parallax Background Elements */}
        <MandalaBackdrop scrollYProgress={scrollYProgress} />
  
        <motion.div
          className="relative w-[92%] max-w-sm min-h-[640px] z-20 pointer-events-auto"
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
           <OrnateSingleCard 
              pathDraw={useTransform(scrollYProgress, [0.2, 0.6], [0, 1])}
            />
        </motion.div>
  
      </div>
    );
};

export default DoubleWeddingArchitecture;
