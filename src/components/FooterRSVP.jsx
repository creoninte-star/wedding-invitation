import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const FooterRSVP = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    guestCount: '1',
    luckyDrawEntry: true
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [response, setResponse] = React.useState(null); // 'yes' or 'no'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      setIsSubmitting(false);
      
      // Super Cool Winning Animation - Gold Confetti Burst
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#D4AF37', '#FAF6F0', '#B68222']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#D4AF37', '#FAF6F0', '#B68222']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F1E1A6', '#B68222']
      });
    }, 1500);
  };

  const handleNoResponse = () => {
    setResponse('no');
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
        <div className="p-8 border-b-2 border-dashed border-gold/30 relative text-center">
          <h2 className="font-serif text-3xl text-textDark mb-2 capitalize">Will you attend?</h2>
          <div className="w-12 h-px bg-gold/30 mx-auto"></div>
        </div>

        {/* Ticket Bottom - RSVP Buttons & Form */}
        <div className="p-8 bg-[#fdfaf6]">
          {isSuccess ? (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center py-6"
             >
               {response === 'yes' ? (
                 <div className="relative p-6 border-2 border-gold/40 rounded-xl bg-white shadow-inner overflow-hidden">
                    {/* Shimmer Effect for Ticket */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -translate-x-full"
                      animate={{ translateX: ['100%', '-100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                    <h3 className="font-serif text-2xl text-gold mb-2 drop-shadow-sm">You’re In! 🎉</h3>
                    <div className="w-8 h-px bg-gold/30 mx-auto mb-4"></div>
                    <p className="font-sans text-[11px] text-sage leading-relaxed px-2 font-medium">
                      Thank you for confirming. You are now officially entered to win our <span className="text-gold font-bold">₹10,000 Cash Prize</span>. The winner will be announced live on <span className="text-textDark font-bold underline decoration-gold/30">May 7th at 9:00 PM</span> during the event. Good luck!
                    </p>
                    <div className="mt-6 font-serif text-[10px] text-gold/60 tracking-[0.3em] uppercase">Lucky Ticket #786</div>
                 </div>
               ) : (
                 <>
                   <h3 className="font-serif text-2xl text-red-400 mb-2">Thank You!</h3>
                   <p className="font-sans text-sm text-sage leading-relaxed">
                     We'll miss you, but thank you for letting us know!
                   </p>
                 </>
               )}
             </motion.div>
          ) : !response ? (
            <div className="space-y-4">
              <button 
                onClick={() => setResponse('yes')}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-green-200 bg-white shadow-sm hover:shadow-md hover:bg-green-50/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="font-serif text-lg text-textDark font-bold">Yes, InshaAllah! 😍</span>
                </div>
              </button>

              <button 
                onClick={handleNoResponse}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-red-200 bg-white shadow-sm hover:shadow-md hover:bg-red-50/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </div>
                  <span className="font-serif text-lg text-textDark/60 font-medium italic leading-none text-left">Unfortunately, <br/>I can't make it</span>
                </div>
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="text-center mb-6">
                <h3 className="font-serif text-xl text-gold italic leading-tight mb-1">Join our Wedding Day Lucky Draw!</h3>
                <p className="font-sans text-[9px] uppercase tracking-widest text-sage font-bold">Fill in your details below</p>
              </div>
              <div className="space-y-4">
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name" 
                  className="w-full bg-transparent border-b border-gold/30 py-2 font-sans text-sm focus:outline-none focus:border-gold placeholder:text-sage/40 text-textDark"
                />
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address" 
                  className="w-full bg-transparent border-b border-gold/30 py-2 font-sans text-sm focus:outline-none focus:border-gold placeholder:text-sage/40 text-textDark"
                />
                <input 
                  type="number" 
                  name="guestCount"
                  required
                  value={formData.guestCount}
                  onChange={handleChange}
                  placeholder="Number of Guests" 
                  min="1"
                  className="w-full bg-transparent border-b border-gold/30 py-2 font-sans text-sm focus:outline-none focus:border-gold placeholder:text-sage/40 text-textDark"
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-6 py-4 bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#DAA520] text-textDark font-sans text-[11px] uppercase tracking-[0.2em] rounded-lg shadow-xl outline outline-1 outline-gold/50 transition-all font-bold relative overflow-hidden group ${isSubmitting ? 'opacity-70' : 'hover:scale-[1.02]'}`}
              >
                <span className="relative z-10">{isSubmitting ? 'ENTRY PROCESSING...' : 'ENTER ₹10K LUCKY DRAW'}</span>
                <motion.div 
                  className="absolute inset-0 bg-white/20 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
              <button type="button" onClick={() => setResponse(null)} className="w-full mt-4 text-[10px] text-sage underline uppercase tracking-widest text-center">Back to Options</button>
            </form>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default FooterRSVP;
