import React from 'react';
import { motion } from 'framer-motion';

const Rings = () => (
  <motion.div 
    className="relative w-16 h-10 mx-auto mt-4 mb-2 flex justify-center"
    initial={{ opacity: 0, scale: 0.5, y: -20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.5 }}
    viewport={{ once: true, margin: "-50px" }}
  >
    <motion.div 
      className="absolute w-8 h-8 rounded-full border-2 border-gold shadow-md"
      initial={{ x: "-20%", rotate: -15 }}
      whileInView={{ x: "-15%", rotate: 0 }}
      transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
    ></motion.div>
    <motion.div 
      className="absolute w-8 h-8 rounded-full border-2 border-gold/70 shadow-md"
      initial={{ x: "20%", rotate: 15 }}
      whileInView={{ x: "15%", rotate: 0 }}
      transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
    ></motion.div>
  </motion.div>
);

const DecorativeBorders = () => {
  return (
    <>
      <motion.div 
        className="absolute inset-2 border-[1px] border-gold/40 rounded-t-[130px] rounded-b-xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      />
      <motion.div 
        className="absolute inset-4 border-[2px] border-gold/60 rounded-t-[120px] rounded-b-lg pointer-events-none"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true }}
      />
      
      {/* Laser Cut Mandala Accents inside corners */}
      <motion.div 
        className="absolute top-[140px] left-8 w-10 h-10 border border-gold/30 rotate-45 pointer-events-none"
        initial={{ rotate: 0, opacity: 0 }}
        whileInView={{ rotate: 45, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />
      <motion.div 
        className="absolute top-[140px] right-8 w-10 h-10 border border-gold/30 rotate-45 pointer-events-none"
        initial={{ rotate: 0, opacity: 0 }}
        whileInView={{ rotate: 45, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />
    </>
  );
};

const MasterInvitation = () => {
  return (
    <div className="w-full min-h-screen bg-envelope relative p-4 flex flex-col items-center justify-center overflow-x-hidden pt-12 pb-24 z-20">
      
      {/* Outer framing elements simulating laser cut background layer */}
      <div className="absolute inset-0 opacity-20 pointer-events-none flex flex-col justify-between items-center overflow-hidden">
        {/* Abstract mandala-style circles */}
        <motion.div 
          className="w-[150vw] h-[150vw] sm:w-[800px] sm:h-[800px] -mt-[75vw] sm:-mt-[400px] rounded-full border border-gold border-dashed flex items-center justify-center"
          initial={{ scale: 0.8, rotate: 0, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 90, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
           <div className="w-[80%] h-[80%] rounded-full border border-gold/50 border-dotted" />
        </motion.div>
        
        <motion.div 
          className="w-[150vw] h-[150vw] sm:w-[800px] sm:h-[800px] -mb-[75vw] sm:-mb-[400px] rounded-full border border-gold border-dashed flex items-center justify-center"
          initial={{ scale: 0.8, rotate: 0, opacity: 0 }}
          whileInView={{ scale: 1, rotate: -90, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
           <div className="w-[80%] h-[80%] rounded-full border border-gold/50 border-dotted" />
        </motion.div>
      </div>

      {/* Main Intricate Card */}
      <motion.div 
        className="relative w-full max-w-sm bg-paper shadow-2xl rounded-t-[140px] rounded-b-xl border-[4px] border-transparent p-6 sm:p-8 flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="absolute inset-0 rounded-t-[136px] rounded-b-lg border-[3px] border-[#e8dcc4] pointer-events-none"></div>
        <DecorativeBorders />

        {/* Wedding Rings */}
        <Rings />

        {/* Bismillah */}
        <motion.div 
          className="mb-6 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="font-serif text-3xl sm:text-4xl text-gold italic">﷽</span>
        </motion.div>

        {/* Intro Text */}
        <motion.p 
          className="font-sans text-[9px] sm:text-[10px] leading-relaxed uppercase tracking-[0.2em] text-sage text-center mb-8 z-10 px-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          With the blessings of Allah, we are humbly requesting the presence of you and your family to the Nikkah & Wedding Functions of:
        </motion.p>

        {/* Side-by-Side Couple Panels */}
        <motion.div 
          className="w-full flex justify-between items-stretch gap-2 mb-8 z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
        >
          {/* Couple 1 Panel */}
          <div className="flex-1 flex flex-col border-t border-b border-gold/40 py-4 text-center items-center justify-start relative">
            {/* Divider Line in Middle */}
            <div className="absolute top-4 bottom-4 -right-1 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent"></div>
            
            <h2 className="font-serif text-[1.4rem] sm:text-2xl text-textDark italic drop-shadow-sm leading-tight mb-4">Rafeel<br/><span className="text-sm">&</span><br/>Jumana</h2>
            
            <p className="font-sans text-[9px] uppercase tracking-widest text-sage mb-1">Nikkah & Marriage</p>
            <div className="w-6 h-px bg-gold/50 my-1"></div>
            
            <div className="space-y-1 mt-2">
              <p className="font-serif text-[10px] font-bold text-textDark/90">May 6: Nikkah</p>
              <p className="font-serif text-[9px] text-textDark/80 leading-tight">After Asar<br/>Zareena Manzil</p>
              <div className="w-4 h-px bg-sage/30 mx-auto my-1"></div>
              <p className="font-serif text-[10px] font-bold text-textDark/90">May 7: Marriage</p>
              <p className="font-serif text-[9px] text-textDark/80 leading-tight">12:00 PM onwards<br/>Vajra Auditorium</p>
            </div>
          </div>

          {/* Couple 2 Panel */}
          <div className="flex-1 flex flex-col border-t border-b border-gold/40 py-4 text-center items-center justify-start">
            <h2 className="font-serif text-[1.4rem] sm:text-2xl text-textDark italic drop-shadow-sm leading-tight mb-4">Rizwan<br/><span className="text-sm">&</span><br/>Nidha</h2>
            
            <p className="font-sans text-[9px] uppercase tracking-widest text-sage mb-1">Nikkah & Marriage</p>
            <div className="w-6 h-px bg-gold/50 my-1"></div>
            
            <div className="space-y-1 mt-2">
              <p className="font-serif text-[10px] font-bold text-textDark/90">May 6: Nikkah</p>
              <p className="font-serif text-[9px] text-textDark/80 leading-tight">After Asar<br/>Zareena Manzil</p>
              <div className="w-4 h-px bg-sage/30 mx-auto my-1"></div>
              <p className="font-serif text-[10px] font-bold text-textDark/90">May 7: Marriage</p>
              <p className="font-serif text-[9px] text-textDark/80 leading-tight">12:00 PM onwards<br/>Vajra Auditorium</p>
            </div>
          </div>
        </motion.div>

        {/* Physical Card Fold Crease */}
        <div className="absolute top-0 bottom-0 left-1/2 -ml-[1px] w-[2px] bg-gradient-to-b from-transparent via-gold/10 to-transparent shadow-[inset_1px_0_2px_rgba(0,0,0,0.05)] pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 left-[calc(50%-10px)] w-[20px] bg-gradient-to-r from-transparent via-black/[0.03] to-transparent pointer-events-none mix-blend-multiply"></div>

      </motion.div>
    </div>
  );
};

export default MasterInvitation;
