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
    guestCount: '1'
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
    // Simulating post logic
    setTimeout(() => {
      setIsSuccess(true);
      setIsSubmitting(false);
    }, 1000);
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

        {/* Ticket Bottom - RSVP Buttons & Form */}
        <div className="p-8 bg-[#fdfaf6]">
          {isSuccess ? (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center py-6"
             >
               <h3 className="font-serif text-2xl text-gold mb-2">Thank You!</h3>
               <p className="font-sans text-xs text-sage leading-relaxed">
                 {response === 'yes' 
                  ? "We're thrilled you can make it! See you there, In Sha Allah." 
                  : "We'll miss you, but thank you for letting us know!"}
               </p>
             </motion.div>
          ) : !response ? (
            <div className="space-y-4">
              <button 
                onClick={() => setResponse('yes')}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-green-100 bg-white shadow-sm hover:shadow-md hover:border-green-200 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="font-serif text-lg text-textDark font-bold">I'm Attending 😍</span>
                </div>
              </button>

              <button 
                onClick={() => setResponse('no')}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-red-50 bg-white shadow-sm hover:shadow-md hover:border-red-100 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </div>
                  <span className="font-serif text-lg text-textDark/60 font-medium italic">Cannot Attend 😢</span>
                </div>
              </button>
            </div>
          ) : response === 'no' ? (
             <div className="text-center py-6">
                <p className="font-serif text-lg text-textDark mb-6 italic">We're sorry you can't join us!</p>
                <button 
                  onClick={() => setIsSuccess(true)}
                  className="w-full py-3 bg-textDark text-paper font-sans text-xs uppercase tracking-widest rounded shadow-md hover:bg-gold transition-all"
                >
                  Send RSVP
                </button>
                <button onClick={() => setResponse(null)} className="mt-4 text-[10px] text-sage underline uppercase tracking-widest">Go Back</button>
             </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="text-center mb-4">
                <p className="font-serif text-sm italic text-sage">Please provide your details</p>
              </div>
              <div>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name" 
                  className="w-full bg-transparent border-b border-sage/40 py-2 font-sans text-sm focus:outline-none focus:border-gold placeholder:text-sage/40 text-textDark"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address" 
                  className="w-full bg-transparent border-b border-sage/40 py-2 font-sans text-sm focus:outline-none focus:border-gold placeholder:text-sage/40 text-textDark"
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
                  className="w-full bg-transparent border-b border-sage/40 py-2 font-sans text-sm focus:outline-none focus:border-gold placeholder:text-sage/40 text-textDark"
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-6 py-3 bg-textDark text-paper font-sans text-xs uppercase tracking-widest rounded shadow-md transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gold'}`}
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Attendance'}
              </button>
              <button type="button" onClick={() => setResponse(null)} className="w-full mt-4 text-[10px] text-sage underline uppercase tracking-widest text-center">Change Response</button>
            </form>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default FooterRSVP;
