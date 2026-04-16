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


const OrnateSingleCard = ({ couple, eventType, date, time, highlight, venue, parentsInfo, pathDraw, photos }) => (

  <div className="w-full h-full relative p-4 flex flex-col items-center z-10 paper-bg bg-paper shadow-xl rounded-t-[140px] rounded-b-xl border-[3px] border-white/40 overflow-hidden transform-gpu">
    <div className="absolute inset-0 rounded-t-[136px] rounded-b-lg border border-gold/20 pointer-events-none"></div>

    
    <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-t-[120px] rounded-b-md pointer-events-none" preserveAspectRatio="none">
      <motion.rect 
        width="100%" height="100%" rx="8" 
        stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" fill="none"
        style={{ pathLength: pathDraw }}
      />
    </svg>

    <div className="mt-8 z-10 w-full flex flex-col items-center">
      <Rings />
      <div className="mb-2">
        <span className="font-serif text-4xl text-gold italic drop-shadow-sm">﷽</span>
      </div>
    </div>

    <div className="mt-6 flex flex-col items-center text-center px-4 z-10 w-full h-full">
      <h2 className="font-serif text-3xl sm:text-4xl text-textDark italic drop-shadow-sm leading-tight mb-2">
        {couple.split('&').map((text, i) => (
          <React.Fragment key={i}>
            {text}
            {i === 0 && <><br/><span className="text-xl not-italic text-gold">&</span><br/></>}
          </React.Fragment>
        ))}
      </h2>
      
      <p className="font-sans text-[10px] uppercase tracking-widest text-sage mb-4">{eventType}</p>
      
      <div className="space-y-3 mt-2 w-full max-w-[240px]">
        <p className="font-serif text-base text-textDark/90">{date}</p>
        <p className="font-serif text-sm text-textDark/80 leading-tight">{time}</p>
        {highlight && (
          <div className="py-1 px-4 border border-gold/20 rounded bg-gold/5 max-w-[180px] mx-auto">
             <p className="font-serif text-[11px] text-gold italic leading-tight">{highlight}</p>
          </div>
        )}
        <div className="w-8 h-px bg-sage/30 mx-auto my-3"></div>
        <p className="font-serif text-xs text-textDark/70 leading-relaxed">{venue}</p>
      </div>
      
      <div className="w-full max-w-[160px] aspect-square mt-auto mb-4 rounded-t-full border border-gold/40 border-dashed flex items-center justify-center bg-envelope/50 shrink-0 relative overflow-hidden">
         {photos && photos.length > 0 ? (
           <PhotoSlideshow images={photos} />
         ) : (
           <span className="text-[9px] text-gold/70 uppercase tracking-widest">Image Placeholder</span>
         )}
      </div>


    </div>
  </div>
);

const DoubleWeddingArchitecture = () => {
  const containerRef = useRef(null);

  const couple1Photos = [
    "/Rafeel&Jumana photos/WhatsApp%20Image%202026-04-16%20at%209.31.24%20PM%20(1).jpeg",
    "/Rafeel&Jumana photos/WhatsApp%20Image%202026-04-16%20at%209.31.24%20PM.jpeg"
  ];

  const couple2Photos = [
    "/Rizwan&Nidha photos/WhatsApp%20Image%202026-04-16%20at%209.31.51%20PM.jpeg",
    "/Rizwan&Nidha photos/WhatsApp%20Image%202026-04-16%20at%209.31.52%20PM%20(1).jpeg",
    "/Rizwan&Nidha photos/WhatsApp%20Image%202026-04-16%20at%209.31.52%20PM%20(2).jpeg",
    "/Rizwan&Nidha photos/WhatsApp%20Image%202026-04-16%20at%209.31.52%20PM.jpeg",
    "/Rizwan&Nidha photos/WhatsApp%20Image%202026-04-16%20at%209.31.53%20PM%20(1).jpeg",
    "/Rizwan&Nidha photos/WhatsApp%20Image%202026-04-16%20at%209.31.53%20PM%20(2).jpeg",
    "/Rizwan&Nidha photos/WhatsApp%20Image%202026-04-16%20at%209.31.53%20PM.jpeg",
    "/Rizwan&Nidha photos/WhatsApp%20Image%202026-04-16%20at%209.31.54%20PM.jpeg"
  ];

  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // PAGE 1: Book View (0 to 0.2)
  const bookOpacity = useTransform(scrollYProgress, [0.05, 0.2], [1, 0]);
  const bookScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const bookY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-10%"]);

  // PAGE 2: Card 1 - Rafeel & Jumana (0.2 to 0.6)
  const card1Opacity = useTransform(scrollYProgress, [0.15, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const card1Scale = useTransform(scrollYProgress, [0.15, 0.3, 0.5, 0.6], [0.8, 1, 1, 0.9]);
  const card1Y = useTransform(scrollYProgress, [0.15, 0.3, 0.5, 0.6], ["20%", "0%", "0%", "-15%"]);

  // PAGE 3: Card 2 - Rizwan & Nidha (0.55 to 1.0)
  const card2Opacity = useTransform(scrollYProgress, [0.55, 0.7, 0.9, 1.0], [0, 1, 1, 1]);
  const card2Scale = useTransform(scrollYProgress, [0.55, 0.7], [0.8, 1]);
  const card2Y = useTransform(scrollYProgress, [0.55, 0.7], ["20%", "0%"]);

  const pathDraw = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full pt-8">
      
      <div className="sticky top-0 h-[100vh] sm:h-screen w-full flex flex-col items-center justify-center overflow-hidden z-20 pointer-events-none">
        
        <MandalaBackdrop scrollYProgress={scrollYProgress} />

        {/* --- PAGE 1: THE ENTRY SEQUENCE (CLEAN BOOK) --- */}
        <motion.div 
          className="absolute inset-x-8 inset-y-20 flex paper-bg shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded z-10 border border-[#e0d6c8]/50"
          style={{ opacity: bookOpacity, scale: bookScale, y: bookY }}
        >
          {/* Left Panel */}
          <div className="flex-1 h-full border-r border-[#d8ccba] border-dashed flex items-center justify-center p-2 relative bg-paper shadow-[inset_-10px_0_15px_-10px_rgba(0,0,0,0.1)]">
            <h3 className="font-serif text-[clamp(1.2rem,5vw,2rem)] text-textDark italic drop-shadow-sm leading-tight text-center">
              Rafeel<br/><span className="text-sm not-italic">&</span><br/>Jumana
            </h3>
          </div>
          
          {/* Right Panel */}
          <div className="flex-1 h-full flex items-center justify-center p-2 relative bg-paper shadow-[inset_10px_0_15px_-10px_rgba(0,0,0,0.05)]">
            <h3 className="font-serif text-[clamp(1.2rem,5vw,2rem)] text-textDark italic drop-shadow-sm leading-tight text-center">
              Rizwan<br/><span className="text-sm not-italic">&</span><br/>Nidha
            </h3>
          </div>

          <div className="absolute -bottom-12 left-0 right-0 flex justify-center opacity-70">
             <div className="flex flex-col items-center animate-bounce">
                <span className="font-sans text-[8px] uppercase tracking-widest text-textDark/80">Scroll to view details</span>
                <div className="w-px h-6 bg-gold mt-2"></div>
             </div>
          </div>
        </motion.div>


        {/* --- PAGE 2: CARD FOR COUPLE 1 --- */}
        <motion.div
          className="absolute inset-x-4 inset-y-10 sm:inset-x-8 sm:inset-y-12 z-20 pointer-events-auto"
          style={{ opacity: card1Opacity, scale: card1Scale, y: card1Y }}
        >
           <OrnateSingleCard 
              couple="Rafeel & Jumana"
              eventType="Nikkah Ceremony"
              date="May 6, 2026"
              time="After Asar (4:00 PM onwards)"
              highlight="Bride Entry 5:30 - 6:00 PM"
              venue={<span>Zareena Manzil,<br/>Koothparamb</span>}
              pathDraw={pathDraw}
              photos={couple1Photos}
           />
        </motion.div>

        {/* --- PAGE 3: CARD FOR COUPLE 2 --- */}
        <motion.div
          className="absolute inset-x-4 inset-y-10 sm:inset-x-8 sm:inset-y-12 z-30 pointer-events-auto"
          style={{ opacity: card2Opacity, scale: card2Scale, y: card2Y }}
        >
           <OrnateSingleCard 
              couple="Rizwan & Nidha"
              eventType="Marriage Function"
              date="May 7, 2026"
              time="Starting at 12:00 PM"
              venue={<span>Vajra Auditorium,<br/>Mooriyad Road</span>}
              pathDraw={pathDraw}
              photos={couple2Photos}
           />
        </motion.div>

      </div>
    </div>
  );
};

export default DoubleWeddingArchitecture;
