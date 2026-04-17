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
    guestCount: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const scriptUrl = "https://script.google.com/macros/s/AKfycbzU9Je4JTlghsc57q5qxtk_7iFyQ_DPWU3ILjBWCD6Y_hyxzo3FxzhMzC0mvXXYxKwk/exec";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send as POST form data
      const data = new URLSearchParams();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('guestCount', formData.guestCount);

      await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
      });
      
      setIsSuccess(true);
      setFormData({ name: '', email: '', guestCount: '' }); // clear
    } catch (error) {
      console.error('Error submitting form:', error);
      // Even if there is a CORS error because of no-cors in fetch or general network issue, 
      // we usually want to fail gracefully in UI or show error, but here we can just show success if no hard error
      // Note: Google Scripts standard form POST often returns CORS errors unless configured exactly on server side, 
      // using 'no-cors' mode would prevent reading the response but allows the post. 
      // Let's use 'no-cors' directly to avoid the red console error in browsers if they haven't set up CORS on Apps Script
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitNoCors = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        const payload = JSON.stringify(formData);
        
        // Use fetch with no-cors. Will throw opaque response but script will execute
        await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload
        });
        
        setIsSuccess(true);
        setFormData({ name: '', email: '', guestCount: '' });
      } catch (error) {
          console.error("Submission failed", error);
      } finally {
          setIsSubmitting(false);
      }
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
        <div className="p-8 border-b-2 border-dashed border-sage/30 relative">
          <h3 className="font-sans text-[10px] uppercase tracking-widest text-gold mb-1">RSVP</h3>
          <h2 className="font-serif text-3xl text-textDark mb-4">Count Me In!</h2>
          
        </div>

        {/* Ticket Bottom - RSVP & Barcode */}
        <div className="p-8 bg-[#fdfaf6]">
          {isSuccess ? (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center py-6"
             >
               <h3 className="font-serif text-2xl text-gold mb-2">Thank You!</h3>
               <p className="font-sans text-xs text-sage leading-relaxed">
                 Your RSVP has been confirmed.<br/>We look forward to celebrating with you!
               </p>
             </motion.div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h3 className="font-serif text-xl italic text-sage mb-1">We hope to count on you</h3>
              </div>

              <form className="space-y-4 mb-8" onSubmit={handleSubmitNoCors}>
                <div>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name" 
                    className="w-full bg-transparent border-b border-sage/40 py-2 font-sans text-sm focus:outline-none focus:border-gold placeholder:text-sage/60 text-textDark"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email" 
                    className="w-full bg-transparent border-b border-sage/40 py-2 font-sans text-sm focus:outline-none focus:border-gold placeholder:text-sage/60 text-textDark"
                  />
                </div>
                <div>
                  <input 
                    type="number" 
                    name="guestCount"
                    required
                    value={formData.guestCount}
                    onChange={handleChange}
                    placeholder="Number of Guests" 
                    min="1"
                    className="w-full bg-transparent border-b border-sage/40 py-2 font-sans text-sm focus:outline-none focus:border-gold placeholder:text-sage/60 text-textDark"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full mt-4 py-3 bg-textDark text-paper font-sans text-xs uppercase tracking-widest rounded shadow-md transition-colors duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gold'}`}
                >
                  {isSubmitting ? 'Saving...' : 'Save My Seat!'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default FooterRSVP;
