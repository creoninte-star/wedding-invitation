import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const ClosingMessage = () => {
  return (
    <motion.section 
      className="pt-8 pb-24 px-6 text-center text-textDark relative z-10 w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
    >
      <div className="flex flex-col items-center">
        
        {/* Decorative Top */}
        <div className="flex justify-center items-center gap-2 mb-6">
           <div className="w-6 h-px bg-gold/40"></div>
           <div className="w-2 h-2 rotate-45 border border-gold/80"></div>
           <div className="w-6 h-px bg-gold/40"></div>
        </div>
        
        {/* Quranic Verse */}
        <p className="font-serif text-lg sm:text-xl italic text-textDark/90 leading-relaxed">
          "And We created you in pairs"
        </p>
        <p className="font-sans text-[8px] uppercase tracking-widest text-gold mt-2 mb-6">
          — Quran 78:8 —
        </p>

        <div className="w-12 h-px bg-sage/30 mx-auto mb-8"></div>

        {/* Invitation Message */}
        <p className="font-sans text-[10px] sm:text-[11px] leading-loose tracking-[0.15em] uppercase text-textDark/80 mb-6 max-w-[320px]">
          In Sha Allah, your esteemed presence and heartfelt prayers are the most beautiful gifts we could ask for on this blessed occasion. 
          <br/><br/>
          We, along with our families, warmly invite you to share our joy.
        </p>

        <div className="w-12 h-px bg-sage/30 mx-auto mb-8"></div>

        {/* Sign-off */}
        <h3 className="font-serif text-2xl sm:text-3xl text-gold italic drop-shadow-sm">
          With Love & Duas
        </h3>
        <p className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-textDark/60 mt-3 font-medium">
          Raizy, Rafsi, Rasna, Rishad, Mirsha, Faisal & Families
        </p>

        {/* Attribution */}
        <div className="mt-20 pb-4">
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-textDark/40">
            Made With ❤️ By <a href="https://wa.me/message/6ZQ3JI2ZRT33C1" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors duration-300 font-bold">Creon</a>
          </p>
        </div>

      </div>
    </motion.section>
  );
};

export default ClosingMessage;
