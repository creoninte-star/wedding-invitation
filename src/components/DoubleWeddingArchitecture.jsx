import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import PhotoSlideshow from './PhotoSlideshow';


const Rings = () => (
  <motion.div 
    className="relative w-12 h-8 mx-auto mb-2 flex justify-center"
  >
    <div className="absolute w-6 h-6 rounded-full border-2 border-gold shadow-sm -translate-x-[20%]"></div>
    <div className="absolute w-6 h-6 rounded-full border-[1.5px] border-gold/70 shadow-sm translate-x-[20%]"></div>
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

const RSVPButtonsShorthand = () => (
  <div className="w-full space-y-3 mt-4">
    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage font-bold">Will you attend?</p>
    <div className="flex gap-2 justify-center">
      <button className="flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-lg border border-sage/20 bg-white/50 backdrop-blur-sm shadow-sm hover:bg-gold/10 transition-all group">
         <div className="w-6 h-6 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600">
           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
         </div>
         <span className="font-serif text-[11px] text-textDark font-bold">Yes, In Sha Allah! 😍</span>
      </button>
      <button className="flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-lg border border-sage/20 bg-white/50 backdrop-blur-sm shadow-sm hover:bg-red-50 transition-all group">
         <div className="w-6 h-6 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-400">
           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
         </div>
         <span className="font-serif text-[11px] text-textDark/70 font-bold leading-tight">Unfortunately, I can't make it</span>
      </button>
    </div>
  </div>
);

const OrnateSingleCard = ({ pathDraw }) => (
  <div className="w-full h-full relative p-6 flex flex-col items-center z-10 paper-bg bg-paper shadow-2xl rounded-t-[160px] rounded-b-xl border-[3px] border-white/40 overflow-hidden transform-gpu">
    {/* Border Frame */}
    <div className="absolute inset-0 rounded-t-[156px] rounded-b-lg border border-gold/20 pointer-events-none z-10"></div>

    <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-t-[140px] rounded-b-md pointer-events-none z-10" preserveAspectRatio="none">
      <motion.rect 
        width="100%" height="100%" rx="8" 
        stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" fill="none"
        style={{ pathLength: pathDraw }}
      />
    </svg>

    <div className="mt-8 z-20 w-full flex flex-col items-center">
      <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-sage mb-4 font-bold">Together with their families</p>
      
      <div className="flex items-center justify-center gap-4 w-full px-2 mb-6">
        <div className="flex-1 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl text-textDark italic leading-tight">
            Suhail Saleem
          </h2>
          <span className="text-gold font-serif italic text-lg">&</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-textDark italic leading-tight">
            Atiya
          </h2>
        </div>
        
        <div className="shrink-0 flex items-center justify-center">
          <div className="text-gold text-xl drop-shadow-sm">♥</div>
        </div>

        <div className="flex-1 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl text-textDark italic leading-tight">
            Sahal Saleem
          </h2>
          <span className="text-gold font-serif italic text-lg">&</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-textDark italic leading-tight">
            Rinsha Fathima
          </h2>
        </div>
      </div>

      <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage mb-6 font-bold">Request the honor of your presence</p>

      {/* Date Box Layout Style */}
      <div className="w-full max-w-[300px] flex items-center justify-center gap-px border border-gold/30 rounded-lg overflow-hidden bg-white/40 backdrop-blur-sm mb-4">
        <div className="flex-1 py-3 px-2 flex flex-col items-center justify-center border-r border-gold/20">
          <p className="font-sans text-[9px] uppercase tracking-widest text-sage font-bold">MAY</p>
          <p className="font-serif text-[11px] text-textDark font-bold">2026, Wed</p>
        </div>
        <div className="flex-1 py-2 px-2 flex flex-col items-center justify-center bg-gold/5">
          <p className="font-serif text-4xl text-gold font-bold leading-none">06</p>
        </div>
        <div className="flex-1 py-3 px-2 flex flex-col items-center justify-center border-l border-gold/20">
          <p className="font-sans text-[14px] text-textDark font-bold">04 PM</p>
        </div>
      </div>

      <p className="font-serif text-[13px] text-sage italic mb-6 tracking-wide underline underline-offset-4 decoration-gold/30">Dhuʻl-Qiʻdah 19, 1447</p>

      <div className="space-y-1 mb-8">
        <h3 className="font-serif text-xl tracking-[0.1em] text-textDark uppercase font-bold">Malabar Marina</h3>
        <p className="font-serif text-sm text-sage italic">Cheruvannur, Calicut</p>
      </div>

      <div className="w-12 h-px bg-gold/30 mx-auto mb-6"></div>

      <RSVPButtonsShorthand />
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
      <div className="w-full pt-12 pb-16 flex flex-col items-center gap-16 relative overflow-visible" ref={containerRef}>
        
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
