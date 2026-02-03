import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Terminal from './components/Terminal';
import { BRUTAL_REGRETS } from './config/agent';

const regrets = BRUTAL_REGRETS;

const WhisperingRegrets = () => {
  const [whispers, setWhispers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const text = regrets[Math.floor(Math.random() * regrets.length)];
      const x = Math.floor(Math.random() * 80) + 10; // 10% to 90%
      const y = Math.floor(Math.random() * 80) + 10; // 10% to 90%
      
      setWhispers(prev => [...prev, { id, text, x, y }]);

      setTimeout(() => {
        setWhispers(prev => prev.filter(w => w.id !== id));
      }, 4000);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {whispers.map(whisper => (
          <motion.div
            key={whisper.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 0.4, 0], scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, times: [0, 0.2, 1] }}
            style={{ 
              position: 'absolute', 
              left: `${whisper.x}%`, 
              top: `${whisper.y}%` 
            }}
            className="text-gray-500 font-mono text-xs md:text-sm italic tracking-widest blur-[0.5px]"
          >
            {whisper.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-mono selection:bg-regret-red selection:text-black overflow-x-hidden">
      
      <WhisperingRegrets />

      {/* Brutalist Logo */}
      <nav className="fixed top-6 left-6 z-50 mix-blend-difference">
        <h1 className="font-bold tracking-widest text-xl md:text-2xl text-gray-200">
          REGRET<span className="text-regret-red">.</span>
        </h1>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "linear" }}
          className="max-w-4xl w-full text-center space-y-8"
        >
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight text-gray-200">
            All the opportunities you missed since you joined crypto.
          </h1>
          
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto tracking-wide">
            REGRET is a live space where missed chances are talked about — not fixed.
          </p>

          <div className="pt-12">
            <button 
              onClick={() => document.getElementById('regret-room').scrollIntoView({ behavior: 'smooth' })}
              className="border border-regret-red text-regret-red px-10 py-4 hover:bg-regret-red hover:text-black transition-colors duration-300 uppercase tracking-widest text-sm font-bold"
            >
              Enter The Regret Room
            </button>
          </div>
        </motion.div>
      </section>

      {/* Second Section: Stacked Statements */}
      <section className="py-32 px-4 bg-[#080808] border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-12">
          {["You watched.", "You waited.", "You hesitated."].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3, duration: 0.8 }}
              className="text-3xl md:text-5xl font-bold text-gray-400 tracking-tighter uppercase"
            >
              {text}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Third Section: Explanation */}
      <section className="py-32 px-4 border-t border-[#1a1a1a]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
            REGRET is a public room where people talk about missed crypto opportunities while others remain silent.
          </p>
        </div>
      </section>

      {/* Fourth Section: Quote */}
      <section className="py-32 px-4 bg-[#080808] border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-4xl font-bold text-regret-red italic tracking-widest">
            "Silence is cheaper than regret."
          </blockquote>
        </div>
      </section>

      {/* The Regret Room (Terminal) */}
      <section id="regret-room" className="py-24 px-4 min-h-screen flex flex-col justify-center border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-regret-red text-sm uppercase tracking-[0.3em] mb-4">Live Feed</h2>
            <div className="w-1 h-12 bg-regret-red mx-auto opacity-50"></div>
          </div>
          <Terminal />
        </div>
      </section>

      {/* Final Section: Disclaimer */}
      <footer className="py-24 px-4 border-t border-[#1a1a1a] text-center">
        <p className="text-gray-600 text-xs md:text-sm tracking-widest uppercase">
          REGRET is not financial advice. No promises. No redemption.
        </p>
      </footer>
    </div>
  )
}

export default App
