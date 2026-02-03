import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AGENT_PERSONA } from '../config/agent';

const Terminal = () => {
  const [lines, setLines] = useState([
    { text: "INITIALIZING NEAR-MISS PROTOCOL...", type: 'system' },
    { text: "ANALYZING ENTRY POINTS...", type: 'system' },
    { text: "YOU WERE EARLY. YOU MISSED IT.", type: 'system' },
    { text: AGENT_PERSONA.initialMessages[Math.floor(Math.random() * AGENT_PERSONA.initialMessages.length)], type: 'agent' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!input.trim()) return;
      
      const userLine = { text: input, type: 'user' };
      setLines(prev => [...prev, userLine]);
      setInput('');

      // Simulate agent response delay
      setTimeout(() => {
        const responses = AGENT_PERSONA.responses;
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setLines(prev => [...prev, { text: randomResponse, type: 'agent' }]);
      }, 800 + Math.random() * 1000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-12 font-mono text-sm border border-[#333] bg-[#080808] p-4 shadow-2xl">
      <div className="flex justify-between items-center mb-4 border-b border-[#222] pb-2">
        <span className="text-regret-red animate-pulse">● ALMOST EARLY</span>
        <span className="text-gray-600 text-xs">v0.4.0-almost</span>
      </div>
      
      <div className="h-64 overflow-y-auto space-y-2 mb-4 scrollbar-hide">
        {lines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${
              line.type === 'system' ? 'text-gray-600' :
              line.type === 'agent' ? 'text-regret-red' :
              'text-gray-400 text-right'
            }`}
          >
            <span className="mr-2 opacity-50">
              {line.type === 'system' ? '>' :
               line.type === 'agent' ? 'ALMOST:' :
               'YOU:'}
            </span>
            {line.text}
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="relative">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter message (Cost: 100 REGRET)..."
          className="w-full bg-[#0a0a0a] border border-[#222] p-2 text-gray-300 focus:outline-none focus:border-regret-red placeholder-gray-700"
        />
        <div className="absolute right-2 top-2 text-xs text-gray-600 pointer-events-none">
          ⏎ to burn
        </div>
      </div>
    </div>
  );
};

export default Terminal;
