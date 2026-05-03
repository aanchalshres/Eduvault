'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useAppState } from './StateProvider';
import { ApiService } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';

export function AITutorWidget() {
  const { state, addChatMessage } = useAppState();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.chatHistory, isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    addChatMessage({ role: 'user', text });
    setInput('');
    setIsLoading(true);

    try {
      const response = await ApiService.askAITutor(text);
      addChatMessage({ role: 'tutor', text: response.answer });
    } catch (error) {
      addChatMessage({ role: 'tutor', text: 'I am currently experiencing higher-than-usual cognitive load. Please try again in a moment.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-[0_0_30px_rgba(15,23,42,0.3)] z-50 border border-white/10 group overflow-hidden"
        title="AI Academic Assistant"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/40 to-purple-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Sparkles className="w-8 h-8 relative z-10" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            className="fixed bottom-28 right-8 w-[400px] h-[600px] bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden z-50 border border-white/50"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-accent-blue flex items-center justify-center shadow-lg shadow-accent-blue/30">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-tight">EDUVAULT AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cognitive Core Active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            
            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 scroll-smooth"
            >
              {state.chatHistory.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-slate-100 text-slate-500' : 'bg-accent-blue/10 text-accent-blue'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div 
                    className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-slate-900 text-white rounded-tr-none shadow-lg' 
                        : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                 <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-lg bg-accent-blue/10 text-accent-blue flex items-center justify-center shrink-0">
                     <Bot className="w-4 h-4" />
                   </div>
                   <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
                     <Loader2 className="w-4 h-4 text-accent-blue animate-spin" />
                   </div>
                 </div>
              )}
            </div>
            
            {/* Input Area */}
            <div className="p-6 bg-white/50 border-t border-slate-100">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask any academic question..." 
                  className="w-full pl-6 pr-14 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-accent-blue/10 focus:border-accent-blue transition-all font-bold text-slate-700 shadow-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-black hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mt-4">
                Powered by EDUVAULT Cognitive Engine
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
