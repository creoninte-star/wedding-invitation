import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sparkles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold rounded-full blur-[1px]"
          initial={{ 
            opacity: 0, 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [null, Math.random() * window.innerHeight - 100],
            x: [null, Math.random() * window.innerWidth + 50]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const AbstractFloral = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,50 C20,20 80,20 90,50 C80,80 20,80 10,50 Z" fill="currentColor" opacity="0.4"/>
    <path d="M50,10 C20,20 20,80 50,90 C80,80 80,20 50,10 Z" fill="currentColor" opacity="0.3"/>
    <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.6"/>
  </svg>
);

const HeroEnvelope = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-envelope max-w-md mx-auto paper-bg overflow-hidden"
      initial={{ y: 0 }}
      animate={{ y: isOpen ? '100vh' : 0, opacity: isOpen ? 0 : 1 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
    >
      
      {/* Background Floral/Motif Corners */}
      <div className="absolute top-0 right-0 w-64 h-64 text-sage/15 translate-x-12 -translate-y-12 rotate-45 pointer-events-none">
        <AbstractFloral className="w-full h-full" />
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 text-blush/20 -translate-x-12 translate-y-12 -rotate-45 pointer-events-none">
        <AbstractFloral className="w-full h-full" />
      </div>

      <Sparkles />

      {/* Top Welcome Text */}
      <motion.div 
        className="absolute top-[12%] sm:top-[15%] w-full text-center px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <p className="font-serif text-[18px] sm:text-[22px] font-bold tracking-widest text-[#9A6D1C] italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] leading-relaxed">
          In the Name of Allah,<br className="sm:hidden" /> the Most Gracious, the Most Merciful
        </p>
      </motion.div>

      {/* Floating Envelope & Characters Container */}
      <div className="relative w-full max-w-[340px] aspect-[4/3] flex items-center justify-center z-10">
        
        <AnimatePresence>
          {!isOpen && (
            <>
              {/* Jerry - Now at the final bottom-left dot position */}
              <motion.img 
                src="/jerry.png"
                alt="Jerry"
                className="absolute bottom-2 left-6 w-20 sm:w-28 z-50 pointer-events-none drop-shadow-xl"
                initial={{ opacity: 0, scaleX: -0.8, scaleY: 0.8, rotate: -10 }}
                animate={{ 
                  opacity: 1, 
                  scaleX: -1, 
                  scaleY: 1,
                  rotate: -15,
                  y: [0, -15, 0]
                }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{ 
                  y: { repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.4 },
                  opacity: { duration: 0.4 }
                }}
              />

              {/* Tom - Mid Right as per Dot */}
              <motion.img 
                src="/tom.png"
                alt="Tom"
                className="absolute top-[55%] -right-4 w-28 sm:w-40 z-50 pointer-events-none drop-shadow-xl"
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: -25,
                  y: [0, -15, 0]
                }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{ 
                  y: { repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 },
                  opacity: { duration: 0.4 }
                }}
              />

              {/* Mickey Mouse - Directly below the Seal */}
              <motion.img 
                src="/mickey%20mouse.png"
                alt="Mickey"
                className="absolute -bottom-14 left-1/2 -ml-6 w-28 sm:w-40 z-50 pointer-events-none drop-shadow-xl"
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                  y: [0, -20, 0]
                }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{ 
                   y: { repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0 },
                   opacity: { duration: 0.4 }
                }}
              />
            </>
          )}
        </AnimatePresence>

        <div className="relative w-full h-full bg-paper rounded-sm flex items-center justify-center cursor-pointer paper-bg shadow-[0_20px_50px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-[1.02]" onClick={handleOpen}>
          
          {/* Envelope back folds */}
          <div className="absolute inset-0">
             <svg className="w-full h-full text-[#EADDCE]" viewBox="0 0 100 100" preserveAspectRatio="none">
               <polygon fill="currentColor" points="0,0 50,50 100,0 100,100 0,100" />
             </svg>
          </div>
          
          {/* Flap */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-[60%] origin-top z-20"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpen ? 180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="w-full h-full text-envelope relative paper-bg drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)] filter" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}>
              <div className="absolute inset-0 bg-envelope paper-bg"></div>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <polyline stroke="var(--tw-colors-gold)" strokeWidth="1" fill="none" points="0.5,0.5 50,99 99.5,0.5" />
              </svg>
            </div>
            
            {/* Breathing Wax Seal */}
            <motion.div 
              className="absolute left-1/2 -bottom-6 w-16 h-16 -ml-8 rounded-full bg-wax-seal shadow-md flex justify-center items-center cursor-pointer border-2 border-gold z-30"
              animate={
                isOpen ? { scale: 1.2, opacity: 0 } : { scale: [1, 1.05, 1], opacity: 1 }
              }
              transition={
                isOpen ? { duration: 0.4 } : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
              }
            >
              <div className="w-14 h-14 rounded-full border border-gold/70 flex flex-col justify-center items-center text-gold bg-[#EADDCE] shadow-inner">
                <span className="font-serif text-[10px] font-bold tracking-wider leading-none">R&J</span>
                <div className="w-6 border-t border-gold/70 my-[2px]"></div>
                <span className="font-serif text-[10px] font-bold tracking-wider leading-none">R&N</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content peering through underneath */}
          <div className="absolute inset-x-4 top-4 bottom-2 bg-white flex flex-col items-center pt-8 opacity-60 pointer-events-none paper-bg border border-sage/20 z-0 text-center px-4">
             <h2 className="font-serif text-xl text-textDark mb-2">You are invited</h2>
          </div>
        </div>
      </div>

      {/* Bottom Instructional Bounce */}
      <motion.div 
        className="absolute bottom-[10%] flex flex-col items-center text-center opacity-90 z-10"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-textDark/80 mb-2">Tap the Seal to Open</p>
        <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent"></div>
      </motion.div>

    </motion.div>
  );
};

export default HeroEnvelope;
