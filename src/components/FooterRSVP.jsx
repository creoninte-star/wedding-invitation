import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const FooterRSVP = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: '',
    emailAddress: '',
    contactId: '',
    guestNumbers: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Either Email or Contact ID (Insta/Mobile) must be provided
    if (!formData.emailAddress && !formData.contactId) {
      alert("Please provide either your Email or Insta ID/Mobile Number so we can reach you!");
      return;
    }

    setIsSubmitting(true);
    
    // Using the specified URL from point 5
    const scriptUrl = "https://script.google.com/macros/s/AKfycbzC53VC7czBkpXTxRStL3LiiQuMoVwgFzHSoqmgRPBpU4sZ5XT-8bnOOW0Pn8A_rkRI/exec";

    try {
      // POST the data as JSON
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // WOW Factor: Immediate Full-screen Gold and White Confetti Burst
      // We do this before showing success message as per instruction
      const end = Date.now() + 3 * 1000;
      const colors = ['#D4AF37', '#FFFFFF', '#B68222', '#F1E1A6'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.5 },
          colors: colors,
          zIndex: 9999
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.5 },
          colors: colors,
          zIndex: 9999
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());

      // Secondary centered blast
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: colors,
        zIndex: 9999
      });

      setIsSuccess(true);
      setIsSubmitting(false);

    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <motion.section 
      className="py-16 px-4 relative z-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
    >
      <div className="relative bg-paper shadow-2xl rounded-2xl mx-auto max-w-sm overflow-hidden border border-sage/10">
        
        {/* Ticket Aesthetics */}
        <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#F6EAEB] rounded-full -translate-y-1/2 border border-sage/10 z-10" />
        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#F6EAEB] rounded-full -translate-y-1/2 border border-sage/10 z-10" />

        <div className="p-8 bg-paper">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/20">
                    <span className="text-3xl">🎉</span>
                  </div>
                  <h3 className="font-serif text-2xl text-gold italic mb-4">InshaAllah, see you on May 7th!</h3>
                  <p className="font-sans text-xs uppercase tracking-widest text-textDark/60 font-bold">Good luck in the draw!</p>
                </div>
                <div className="w-12 h-px bg-gold/20 mx-auto"></div>
              </motion.div>
            ) : !showForm ? (
              <motion.div 
                key="options"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-8"
              >
                <div className="space-y-3">
                  <h2 className="font-serif text-2xl text-textDark italic">Will you join our special day?</h2>
                  <div className="w-12 h-px bg-gold/20 mx-auto"></div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => setShowForm(true)}
                    className="w-full flex items-center gap-4 p-5 rounded-xl border border-gold/20 bg-white shadow-sm hover:shadow-md hover:bg-gold/5 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center text-gold">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="font-serif text-xl text-textDark italic font-bold">Yes, InshaAllah!</span>
                  </button>

                  <button 
                    onClick={() => setIsSuccess(true)} // Simple 'No' branch - just show thank you or missing you
                    className="w-full py-4 text-textDark/40 font-sans text-[10px] uppercase tracking-[0.3em] font-bold hover:text-textDark/60 transition-colors"
                  >
                    No, sorry
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="text-center mb-8">
                  <h3 className="font-serif text-2xl text-gold italic mb-2">Join our Wedding Day Lucky Draw!</h3>
                  <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-textDark/40 font-bold">FILL IN YOUR DETAILS BELOW</p>
                </div>

                <div className="space-y-5">
                  <div className="relative">
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name" 
                      className="w-full bg-transparent border-b border-gold/20 py-3 font-sans text-sm focus:outline-none focus:border-gold placeholder:text-textDark/20 text-textDark transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="email" 
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      placeholder="Email Address" 
                      className="w-full bg-transparent border-b border-gold/20 py-3 font-sans text-sm focus:outline-none focus:border-gold placeholder:text-textDark/20 text-textDark transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="contactId"
                      value={formData.contactId}
                      onChange={handleChange}
                      placeholder="Insta ID or Mobile Number" 
                      className="w-full bg-transparent border-b border-gold/20 py-3 font-sans text-sm focus:outline-none focus:border-gold placeholder:text-textDark/20 text-textDark transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="number" 
                      name="guestNumbers"
                      required
                      value={formData.guestNumbers}
                      onChange={handleChange}
                      placeholder="Guest Numbers" 
                      min="1"
                      className="w-full bg-transparent border-b border-gold/20 py-3 font-sans text-sm focus:outline-none focus:border-gold placeholder:text-textDark/20 text-textDark transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-5 bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#DAA520] text-textDark font-sans text-[11px] uppercase tracking-[0.2em] rounded-xl shadow-xl transition-all font-bold relative overflow-hidden group ${isSubmitting ? 'opacity-70' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                  >
                    <span className="relative z-10">{isSubmitting ? 'PROCESSING...' : 'ENTER ₹10K LUCKY DRAW'}</span>
                    <motion.div 
                      className="absolute inset-0 bg-white/20 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)} 
                    className="w-full text-[9px] text-textDark/30 uppercase tracking-[0.2em] text-center font-bold hover:text-gold transition-colors"
                  >
                     Back to Options
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default FooterRSVP;
