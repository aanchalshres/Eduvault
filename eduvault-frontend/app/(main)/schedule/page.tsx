'use client'

import React, { useState } from 'react';
import { ApiService } from '@/lib/api';
import { useAppState } from '@/components/StateProvider';
import { Calendar, User, BookOpen, Clock, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function SchedulePage() {
  const { state, addSession } = useAppState();
  const [formData, setFormData] = useState({
    tutorId: '',
    dateTime: '',
    topic: ''
  });
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await ApiService.scheduleSession(
        state.user.id,
        formData.tutorId,
        formData.dateTime,
        formData.topic
      );
      
      addSession({
        tutor_id: formData.tutorId,
        date_time: formData.dateTime,
        topic: formData.topic,
        session_id: response.session_id
      });
      
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      setFormData({ tutorId: '', dateTime: '', topic: '' });
    } catch (error) {
      alert('Failed to schedule session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-12 py-6 animate-in fade-in duration-700 max-w-4xl">
      <header>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-3 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">
          Book Private Session
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
          Accelerate your progress with 1-on-1 elite guidance from our verified academic experts.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Form Container */}
        <div className="lg:col-span-3 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full -mr-16 -mt-16 blur-2xl" />
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
            <div className="space-y-6">
              <div className="group">
                <label className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-wider mb-3">
                  <User className="w-4 h-4 text-accent-blue" />
                  Select Academic Expert
                </label>
                <select 
                  required
                  value={formData.tutorId}
                  onChange={e => setFormData({...formData, tutorId: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent-blue/10 focus:border-accent-blue transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                >
                  <option value="">-- Choose a Tutor --</option>
                  <option value="t-001">Dr. Alan Turing (Math & CS)</option>
                  <option value="t-002">Prof. Marie Curie (Physics & Chemistry)</option>
                  <option value="t-003">Dr. Howard Zinn (History)</option>
                </select>
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-wider mb-3">
                  <Calendar className="w-4 h-4 text-accent-blue" />
                  Date & Strategic Time
                </label>
                <input 
                  type="datetime-local" 
                  required
                  value={formData.dateTime}
                  onChange={e => setFormData({...formData, dateTime: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent-blue/10 focus:border-accent-blue transition-all font-bold text-slate-700"
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-wider mb-3">
                  <BookOpen className="w-4 h-4 text-accent-blue" />
                  Learning Objective
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Mastery of Quantum Mechanics Fundamentals"
                  value={formData.topic}
                  onChange={e => setFormData({...formData, topic: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent-blue/10 focus:border-accent-blue transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || isSuccess}
              className={`w-full py-5 rounded-[1.5rem] font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl ${
                isSuccess 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
                  : 'bg-slate-900 text-white hover:bg-black hover:scale-[1.02] active:scale-95 shadow-slate-900/20'
              }`}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  Booking Confirmed
                </>
              ) : (
                <>
                  Request Strategic Session
                  <Sparkles className="w-6 h-6" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Benefits Sidebar */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              <h3 className="text-2xl font-black mb-6 tracking-tight">The 1-on-1 Advantage</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="text-slate-400 font-bold text-sm leading-relaxed">Direct access to verified academic elite with PhD-level expertise.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="text-slate-400 font-bold text-sm leading-relaxed">Personalized curriculum tailored to your specific cognitive style.</p>
                </li>
                <li className="flex items-start gap-4">
                   <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="text-slate-400 font-bold text-sm leading-relaxed">Focused strategic sessions designed for rapid topic mastery.</p>
                </li>
              </ul>
           </div>
           
           <div className="bg-accent-blue/10 border border-accent-blue/20 p-8 rounded-[2.5rem] text-center group">
              <Clock className="w-10 h-10 text-accent-blue mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-slate-900 font-black text-lg mb-2 tracking-tight">Limited Capacity</h4>
              <p className="text-slate-500 text-sm font-bold leading-relaxed px-4">Tutors book out fast. Secure your strategic session today to guarantee progress.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
