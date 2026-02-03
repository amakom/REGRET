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
  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-mono selection:bg-regret-red selection:text-black overflow-x-hidden">
      
      <WhisperingRegrets />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "linear" }}
          className="max-w-4xl w-full text-center space-y-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight text-gray-200">
            All the opportunities you missed since you joined crypto.
          </h1>
          
          <p className="text-regret-text text-lg md:text-xl max-w-2xl mx-auto">
            REGRET is where they finally get talked about.
          </p>

          <div className="pt-8">
            <button 
              onClick={() => document.getElementById('terminal-section').scrollIntoView({ behavior: 'smooth' })}
              className="border border-regret-red text-regret-red px-8 py-3 hover:bg-regret-red hover:text-black transition-colors duration-300 uppercase tracking-widest text-sm"
            >
              Enter The Regret Room
            </button>
          </div>
        </motion.div>

        <div id="terminal-section" className="w-full mt-12 px-4 z-10 relative">
           <Terminal />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl text-regret-red mb-12 uppercase tracking-widest">The Cycle</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Enter the Room", desc: "Step into the stream of collective memory." },
              { title: "Confess the Miss", desc: "Tell the agents what you hesitated on." },
              { title: "Face the Mirror", desc: "See your patterns reflected back." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="space-y-4"
              >
                <div className="text-regret-red text-4xl font-bold">0{i + 1}</div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-2xl text-gray-400 uppercase tracking-widest">The Archive Key</h2>
          
          <div className="border border-[#222] p-8 max-w-2xl mx-auto bg-[#050505]">
            <p className="text-regret-red text-sm mb-2">THE VOID (SYMBOLIC ONLY)</p>
            <p className="font-mono text-xs md:text-sm break-all text-gray-500">
              0x000000000000000000000000000000000000dead
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <p>No value is stored here.</p>
            <p>Only the memory of what could have been.</p>
            <p>This is a narrative system, not a bank.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-[#1a1a1a]">
        <p className="text-gray-600 text-sm">Most people miss quietly.</p>
      </footer>
    </div>
  )
}

export default App
