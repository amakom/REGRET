import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getRandomPersona } from '../config/agent';

const Terminal = () => {
  const [persona] = useState(getRandomPersona());
  const [lines, setLines] = useState([
    { text: persona.systemMessages[0], type: 'system' },
    { text: persona.systemMessages[1], type: 'system' },
    { text: persona.systemMessages[2], type: 'system' },
    { text: persona.initialMessages[Math.floor(Math.random() * persona.initialMessages.length)], type: 'agent' }
  ]);
  const [input, setInput] = useState('');
  const [accessState, setAccessState] = useState('checking'); // checking, granted, denied, limit_reached
  const [messageCount, setMessageCount] = useState(0);
  const [observerCount, setObserverCount] = useState(300);
  const [regretIndex, setRegretIndex] = useState(50);
  const bottomRef = useRef(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setObserverCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      const obNorm = Math.min(observerCount / 500, 1);
      const speakNorm = messageCount > 0 ? 0 : 1;
      let accessWeight = 0.5;
      if (accessState === 'denied' || accessState === 'checking') accessWeight = 1;
      else if (accessState === 'limit_reached') accessWeight = 0.3;
      const timeNorm = Math.min(elapsed / 60, 1);
      const value = Math.round((0.25 * timeNorm + 0.25 * speakNorm + 0.25 * obNorm + 0.25 * accessWeight) * 100);
      setRegretIndex(prev => Math.round(prev * 0.7 + value * 0.3));
    }, 3000);
    return () => clearInterval(interval);
  }, [observerCount, accessState, messageCount]);

  useEffect(() => {
    // Simulate access control check
    const checkAccess = () => {
      const random = Math.random();
      // 80% chance of access for demo purposes, but simulating "selection"
      setTimeout(() => {
        setAccessState(random > 0.2 ? 'granted' : 'denied');
      }, 2000);
    };
    checkAccess();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!input.trim() || accessState !== 'granted') return;
      
      const userLine = { text: input, type: 'user' };
      setLines(prev => [...prev, userLine]);
      setInput('');
      setMessageCount(prev => prev + 1);

      // Enforce scarcity: Limit to 1 message per session
      if (messageCount >= 0) { // 0 means 1st message triggers this
        setTimeout(() => setAccessState('limit_reached'), 500);
      }

      // Simulate agent response delay
      setTimeout(() => {
        const responses = persona.responses;
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setLines(prev => [...prev, { text: randomResponse, type: 'agent' }]);
      }, 800 + Math.random() * 1000);
    }
  };

  const getPlaceholder = () => {
    switch (accessState) {
      case 'checking': return 'VERIFYING ELIGIBILITY...';
      case 'denied': return 'ACCESS DENIED. TRY NEXT CYCLE.';
      case 'limit_reached': return 'DAILY ALLOWANCE USED. SILENCE IS CHEAPER.';
      default: return 'Confess your missed opportunity...';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-12 font-mono text-sm border border-[#333] bg-[#080808] p-4 shadow-2xl relative overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-[0.02] pointer-events-none" />
      
      <div className="flex justify-between items-center mb-2 border-b border-[#222] pb-2 relative z-10">
        <div className="flex gap-4">
          <span className="text-regret-red animate-pulse">● {persona.status}</span>
          <span className="text-gray-500">👁 {observerCount} WATCHING</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500">
            INDEX {regretIndex} {regretIndex >= 70 ? 'HEAVY' : regretIndex >= 40 ? 'UNEASY' : 'CALM'}
          </span>
          <span className="text-gray-600 text-xs">{persona.version}</span>
        </div>
      </div>

      {/* Pinned Message */}
      <div className="mb-4 p-2 bg-[#111] border-l-2 border-regret-red text-xs text-gray-400 relative z-10">
        <span className="text-regret-red font-bold mr-2">NOTICE:</span>
        Speaking is limited. Silence is cheaper than regret.
      </div>
      
      <div className="h-64 overflow-y-auto space-y-2 mb-4 scrollbar-hide relative z-10">
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
              line.type === 'agent' ? `${persona.label}:` :
              'YOU:'}
            </span>
            {line.text}
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="relative z-10">
        {accessState === 'limit_reached' ? (
          <button 
            onClick={() => {
              const text = `REGRET TERMINAL SESSION\nSTATUS: CONFESSED\n\n> ${lines.find(l => l.type === 'user')?.text || 'Silence'}\n\nSilence is cheaper than regret.\n${window.location.href}`;
              navigator.clipboard.writeText(text);
              alert('RECORD COPIED TO CLIPBOARD');
            }}
            className="w-full bg-[#111] border border-regret-red text-regret-red p-2 font-bold hover:bg-regret-red hover:text-black transition-colors"
          >
            COPY RECORD
          </button>
        ) : (
          <>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={accessState !== 'granted'}
              placeholder={getPlaceholder()}
              className={`w-full bg-[#0a0a0a] border border-[#222] p-2 focus:outline-none placeholder-gray-700 transition-colors ${
                accessState === 'granted' 
                  ? 'text-gray-300 focus:border-regret-red cursor-text' 
                  : 'text-gray-600 cursor-not-allowed border-dashed'
              }`}
            />
            <div className="absolute right-2 top-2 text-xs text-gray-600 pointer-events-none">
              {accessState === 'granted' ? '⏎ to speak' : '🔒 LOCKED'}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Terminal;
