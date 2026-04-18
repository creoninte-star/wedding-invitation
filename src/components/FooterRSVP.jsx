import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const FooterRSVP = () => {
  const [status, setStatus] = React.useState(null); // 'yes', 'no', or null
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleRSVP = async (response) => {
    setStatus(response);
    // You can add the same Google Script post logic here if needed, 
    // for now we'll just show the success message as if it worked.
    setIsSuccess(true);
  };

  return (
    <motion.section 
      className="py-16 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
    >
      <div className="relative bg-paper shadow-2xl rounded-xl mx-auto max-w-sm overflow-hidden border border-sage/20">
        
        {/* Ticket Notches */}
        <div className="absolute top-1/2 -ml-3 left-0 w-6 h-6 bg-[#F6EAEB] rounded-full -translate-y-1/2 border-r border-sage/20 z-10"></div>
        <div className="absolute top-1/2 -mr-3 right-0 w-6 h-6 bg-[#F6EAEB] rounded-full -translate-y-1/2 border-l border-sage/20 z-10"></div>

        {/* Ticket Top - RSVP */}
        <div className="p-8 border-b-2 border-dashed border-sage/30 relative text-center">
          <h2 className="font-serif text-3xl text-textDark mb-2 capitalize">Yes, In Sha Allah!</h2>
          <div className="w-12 h-px bg-gold/30 mx-auto"></div>
        </div>

        {/* Ticket Bottom - RSVP Buttons */}
        <div className="p-8 bg-[#fdfaf6]">
          {isSuccess ? (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center py-6"
             >
               <h3 className="font-serif text-2xl text-gold mb-2">Thank You!</h3>
               <p className="font-sans text-xs text-sage leading-relaxed">
                 {status === 'yes' 
                  ? "We're thrilled you can make it! See you there, In Sha Allah." 
                  : "We'll miss you, but thank you for letting us know!"}
               </p>
             </motion.div>
          ) : (
            <div className="space-y-4">
              <button 
                onClick={() => handleRSVP('yes')}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-green-100 bg-white shadow-sm hover:shadow-md hover:border-green-200 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="font-serif text-lg text-textDark font-bold">Yes, In Sha Allah! 😍</span>
                </div>
              </button>

              <button 
                onClick={() => handleRSVP('no')}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-red-50 bg-white shadow-sm hover:shadow-md hover:border-red-100 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </div>
                  <span className="font-serif text-lg text-textDark/60 font-medium italic">Unfortunately, I can't make it</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default FooterRSVP;
