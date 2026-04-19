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
         <span className="font-serif text-[11px] text-textDark font-bold">Yes, InshaAllah! 😍</span>
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

    <div className="mt-8 z-20 w-full flex flex-col items-center px-4 text-center">
      {/* Premium Horizontal Bismillah Calligraphy */}
      <motion.div 
        className="mb-6 w-full flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="w-[280px] sm:w-[320px] h-auto mb-2 drop-shadow-md">
          <svg viewBox="0 0 500 120" className="w-full h-full fill-gold">
            <path d="M495.7,35.4c-1.3,0.9-2.8,1.8-4.5,2.6c-1.7,0.8-3.4,1.4-5.2,1.9c-1.8,0.5-3.5,0.8-5.1,1c-1.6,0.2-3.1,0.2-4.4,0.1 c-1.3-0.1-2.4-0.3-3.4-0.7c-0.9-0.4-1.7-0.9-2.3-1.6c-0.6-0.7-1.1-1.6-1.5-2.7c-0.4-1.1-0.7-2.4-0.8-4c-0.2-1.6-0.2-3.4-0.1-5.5 c0.1-2.1,0.4-4.5,0.7-7.2c0.4-2.7,0.9-5.7,1.4-9c0.6-3.3,1.2-6.9,2-10.8c0.7-3.9,1.6-8.1,2.5-12.6l10.3,1.3 c-1.3,4.5-2.4,8.1-3.2,10.6c-0.8,2.6-1.5,4.7-2,6.5s-0.9,3.3-1,4.7c-0.2,1.3-0.2,2.6-0.1,3.8c0,1.2,0.1,2.3,0.3,3.4 c0.2,1.1,0.5,2,0.9,2.9c0.4,0.9,0.9,1.6,1.4,2.3c0.6,0.7,1.3,1.3,2.2,1.8c0.8,0.5,1.9,0.9,3.1,1.3c1.2,0.3,2.6,0.6,4.2,0.7 c1.6,0.1,3.4,0.1,5.3-0.1c1.9-0.2,3.9-0.5,6-1c2.1-0.4,4.2-1,6.3-1.8c2.1-0.8,4.1-1.7,5.9-2.8L495.7,35.4z M428.1,30.3 c-0.6,0.3-1.3,0.3-2.1,0.1s-1.5-0.7-2.1-1.5c-0.6-0.8-1-1.8-1.1-2.9c-0.2-1.2-0.2-2.3-0.1-3.4c0.1-1.1,0.4-2.1,0.8-3 c0.4-0.9,0.9-1.6,1.6-2.2l8.6,4c-0.5,0.6-0.9,1.1-1.2,1.7c-0.3,0.6-0.5,1.2-0.7,1.8c-0.2,0.6-0.4,1.3-0.5,2l5.7,1.3 C440.1,26.9,434.1,28.6,428.1,30.3z M381.1,70l7.3,7.6c-3.1,0-6-0.3-8.6-1c-2.6-0.6-4.9-1.6-6.7-3s-3.3-3.1-4.2-5.1 c-1-2.1-1.4-4.5-1.5-7.3c-0.1-2.7,0.1-5.8,0.6-9.1s1.3-7,2.2-11c1-4.1,2.1-8.5,3.5-13.3c1.4-4.8,2.9-10,4.6-15.6l10.3,1.3 c-1.5,5.1-2.9,9.4-4,12.9c-1.1,3.4-1.9,6.1-2.6,8.2c-0.7,2.1-1.2,3.8-1.5,5.2c-0.3,1.4-0.4,2.5-0.4,3.5c0,0.9,0.1,1.9,0.2,2.8 c0.1,0.9,0.3,1.8,0.7,2.7c0.3,0.8,0.8,1.7,1.4,2.4s1.3,1.5,2.1,2.1c0.8,0.6,1.7,1.2,2.7,1.7c1,0.5,2.2,0.9,3.5,1.3 C374.3,69.5,377.3,69.8,381.1,70z M314,63.1c-0.2,0.3-0.3,0.6-0.3,1c0,1.1,0.5,1.9,1.6,2.5c1.1,0.6,2.4,0.9,4.1,0.9 c1.6,0,3.3,0,4.8-0.1c1.6-0.1,3-0.3,4.3-0.7c1.3-0.4,2.4-1,3.2-1.8c0.8-0.8,1.2-1.8,1.2-3.2c0-0.7-0.1-1.3-0.3-1.9 c-0.2-0.6-0.5-1.1-1-1.6c-0.5-0.5-1.1-1-1.8-1.4c-0.7-0.4-1.6-0.7-2.6-0.9s-2.1-0.3-3.3-0.4c-1.2,0-2.5,0.1-3.9,0.4 c-1.4,0.3-2.9,0.7-4.2,1.3c-1.4,0.6-2.6,1.4-3.5,2.3c-0.9,0.9-1.5,1.9-1.7,3.1h10.4c0.2-0.2,0.4-0.4,0.7-0.5s0.6-0.2,1.1-0.2 c0.6,0,1.2,0.1,1.7,0.4s1,0.7,1.3,1.3c0.4,0.5,0.6,1.2,0.6,2.1c0,0.5-0.1,1-0.2,1.3s-0.3,0.7-0.6,0.9c-0.3,0.3-0.6,0.5-0.9,0.6 c-0.3,0.1-0.7,0.1-1.1,0.1c-0.3,0-0.7,0.1-1,0.1c-0.3,0-0.6,0-0.9,0c-0.3,0-0.5,0-0.6-0.1L314,63.1L314,63.1z M228.4,75.4 c-1.4,1.4-3.1,2.8-5,4.1c-1.9,1.3-4.1,2.5-6.6,3.6c-2.5,1.1-5.3,2.1-8.2,2.9c-3,0.8-6.2,1.5-9.6,2l1.6,10 c3-0.6,5.7-1.4,8.3-2.3s5.1-2.1,7.2-3.4c2.2-1.3,4.2-2.8,5.9-4.5c1.7-1.7,3.1-3.6,4.2-5.7C227,76.5,227.7,76,228.4,75.4z M204.9,94.2c-1.4,0.8-3.1,1.5-5,2.1c-1.9,0.6-4.1,1.1-6.6,1.4c-2.5,0.3-5.3,0.6-8.2,0.8c-3,0.2-6.2,0.2-9.5,0l0.5,10.1 c15.6-0.5,31.2-1.3,46.8-2.6C123.1,106.1,164,100.8,204.9,94.2L204.9,94.2z M176,17s-2.9,3.8-1,5c1.5,0.9,2.5-1.5,2.5-1.5L176,17z M181,13.5l3,4.5c0.6-0.4,1.1-0.7,1.5-1c0.4-0.3,0.7-0.6,1-1c0.3-0.4,0.5-0.8,0.7-1.2c0.2-0.4,0.3-0.9,0.3-1.4c0-0.5,0-1,0-1.5 s-0.1-1-0.3-1.5c-0.2-0.5-0.4-1-0.8-1.5s-0.8-1-1.3-1.4c-0.5-0.4-1.1-0.8-1.8-1.1c-0.7-0.3-1.5-0.5-2.5-0.6s-2,0-3.1,0.1 c-1.1,0.1-2.3,0.4-3.6,0.8c-1.3,0.4-2.6,0.9-4,1.7c-1.4,0.8-2.8,1.7-4.2,2.9c-1.4,1.2-2.7,2.7-3.9,4.4s-2.1,3.7-2.8,5.8 s-0.8,4.5-0.6,7.2l10.3-1.3c-0.1-1.3-0.1-2.6,0.1-3.8c0.2-1.2,0.7-2.3,1.2-3.4c0.6-1.1,1.4-2,2.3-2.9c0.9-0.8,1.9-1.5,3-2.1 L181,13.5L181,13.5z M450.4,115.1c0.1,0,0.3,0,0.4-0.1c0.1,0,0.2-0.1,0.4-0.2c0.1-0.1,0.2-0.2,0.2-0.3c0.1-0.1,0.1-0.3,0.1-0.4 c0-0.2,0-0.3-0.1-0.5c-0.1-0.1-0.2-0.2-0.3-0.3c-0.1-0.1-0.3-0.2-0.5-0.2c-0.2,0-0.3,0-0.5,0.1c-0.2,0.1-0.3,0.2-0.4,0.3 L441.4,122c3.4,3.7,7.8,6.1,13,7.3c5.2,1.2,10.9,1.1,17.2-0.5s13-4.2,20.2-7.8s14.4-8,21.6-13.3c7.2-5.3,14.4-11.4,21.6-18.4 c7.2-6.9,14.2-14.5,20.9-22.6c6.7-8.1,12.9-16.6,18.5-25.5s10.3-18.1,14.2-27.6c3.9-9.5,6.7-19.3,8.4-29.4 c1.7-10.1,2.5-20.5,2.4-31.3V1.1c-2,1.3-4.2,2.8-6.6,4.5c-2.4,1.7-5,3.6-7.8,5.7s-5.8,4.4-8.8,6.8c-3.1,2.5-6.2,5.1-9.3,7.9 s-6.2,5.7-9.3,8.7s-6.1,6.1-9,9.4s-5.7,6.6-8.3,10c-2.6,3.4-5,6.9-7.2,10.5c-2.2,3.6-4.1,7.2-5.7,11c-1.6,3.7-2.9,7.5-3.8,11.4 c-0.9,3.9-1.5,7.7-1.8,11.5c-0.3,3.8-0.3,7.5-0.1,11c0.2,3.6,0.5,7,0.9,10.3c0.4,3.3,1,6.5,1.7,9.6c0.7,3.1,1.5,6.1,2.5,9 s2.1,5.7,3.3,8.5s2.5,5.5,4,8.2c1.4,2.7,3.1,5.4,4.9,8.1s3.8,5.4,6.2,8.2l-7.7,6.6c-1.9-2.3-3.6-4.6-5.1-7 c-1.5-2.4-2.8-4.8-3.9-7.4c-1.1-2.5-2-5.1-2.6-7.9c-0.7-2.7-1.1-5.6-1.4-8.5c-0.3-2.9-0.3-6-0.2-9.1c0.1-3.1,0.5-6.5,1.2-9.9 c0.7-3.4,1.8-7,3.2-10.7l-9.3,4.3C451.7,114.3,451,114.7,450.4,115.1L450.4,115.1z"/>
          </svg>
        </div>
        <p className="font-serif text-[18px] sm:text-[20px] font-bold tracking-[0.05em] text-[#9A6D1C] italic leading-tight px-4 text-center">
          In the Name of Allah,<br /> the Most Gracious, the Most Merciful
        </p>
        <div className="w-16 h-px bg-gold/30 mx-auto mt-4"></div>
      </motion.div>

      {/* Main Couple Names */}
      <div className="flex items-center justify-center gap-4 w-full px-2 mb-8 mt-4">
        <div className="flex-1 text-center">
          <h2 className="font-serif text-2xl sm:text-4xl text-textDark italic leading-tight drop-shadow-sm">
            Rafeel
          </h2>
          <span className="text-gold font-serif italic text-lg leading-none">&</span>
          <h2 className="font-serif text-2xl sm:text-4xl text-textDark italic leading-tight drop-shadow-sm">
            Jumana
          </h2>
        </div>
        
        <div className="shrink-0 flex items-center justify-center">
          <div className="text-gold text-2xl drop-shadow-sm opacity-60">♥</div>
        </div>

        <div className="flex-1 text-center">
          <h2 className="font-serif text-2xl sm:text-4xl text-textDark italic leading-tight drop-shadow-sm">
            Rizwan
          </h2>
          <span className="text-gold font-serif italic text-lg leading-none">&</span>
          <h2 className="font-serif text-2xl sm:text-4xl text-textDark italic leading-tight drop-shadow-sm">
            Nidha
          </h2>
        </div>
      </div>

      <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-sage mb-6 font-bold">Together with their families</p>
      
      {/* Parents Section - Prominent Hierarchy */}
      <div className="space-y-6 mb-10 w-full">
         <div className="flex flex-col items-center">
            <h3 className="font-serif text-lg text-textDark leading-tight">Mr. & Mrs. Rafeek & Sareena</h3>
            <p className="font-sans text-[8px] uppercase tracking-widest text-gold font-bold">(Grooms' Parents)</p>
         </div>

         <div className="flex flex-col items-center">
            <h3 className="font-serif text-lg text-textDark leading-tight">Mr. & Mrs. Sulaiman & Minsiya</h3>
            <p className="font-sans text-[8px] uppercase tracking-widest text-gold font-bold">(Nidha's Parents)</p>
         </div>

         <div className="flex flex-col items-center">
            <h3 className="font-serif text-lg text-textDark leading-tight">
               Mr. & Mrs. <span className="italic">Late</span> Rasak & Najma
            </h3>
            <p className="font-sans text-[8px] uppercase tracking-widest text-gold font-bold">(Jumana's Parents)</p>
         </div>
      </div>

      <div className="w-full h-px bg-gold/10 mb-8 max-w-[200px]"></div>


      <motion.p 
        className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage font-bold px-6 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Request the honor of your presence <br/> to share in our joy
      </motion.p>
      
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
