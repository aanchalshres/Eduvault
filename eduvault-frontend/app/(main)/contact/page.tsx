'use client'

import React, { useState } from 'react';
import { ApiService } from '@/lib/api';
import { Mail, MessageSquare, User, Send, CheckCircle2, Loader2, Phone, MapPin, Shield } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await ApiService.submitContact(formData);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      setFormData({ name: '', email: '', role: 'student', message: '' });
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-16 py-6 animate-in fade-in duration-700 max-w-6xl mx-auto w-full">
      <header className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-[10px] font-black uppercase tracking-widest mb-6">
          <MessageSquare className="w-3 h-3" />
          <span>Support Center</span>
        </div>
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">We're here to help you <span className="text-accent-blue underline decoration-slate-200 underline-offset-8">succeed</span>.</h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed">
          Whether you have questions about enrollment, technical issues, or academic coaching, our team is standing by.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
        {/* Contact Info */}
        <div className="flex flex-col gap-6">
           <ContactInfoCard 
             icon={<Phone className="w-6 h-6" />}
             title="Academic Hotline"
             value="+1 (888) EDU-VAULT"
             color="purple"
           />
           <ContactInfoCard 
             icon={<Mail className="w-6 h-6" />}
             title="Support Email"
             value="support@eduvault.com"
             color="purple"
           />
           <ContactInfoCard 
             icon={<MapPin className="w-6 h-6" />}
             title="HQ Location"
             value="Kathmandu, Nepal 🇳🇵"
             color="emerald"
           />
           
           <div className="mt-auto bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full -mb-10 -mr-10 blur-2xl group-hover:bg-white/10 transition-colors" />
              <h4 className="text-xl font-black mb-4 relative z-10">Instant Answers?</h4>
              <p className="text-slate-400 font-bold text-sm leading-relaxed mb-6 relative z-10">Our AI Academic Assistant is available 24/7 in the bottom right corner for immediate support.</p>
              <button className="text-accent-blue font-black text-sm flex items-center gap-2 hover:translate-x-1 transition-transform relative z-10">
                Open AI Chat <Send className="w-4 h-4" />
              </button>
           </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-wider">
                  <User className="w-4 h-4 text-accent-blue" />
                  Full Name
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent-blue/10 focus:border-accent-blue transition-all font-bold text-slate-700"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-wider">
                  <Mail className="w-4 h-4 text-accent-blue" />
                  Email Address
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent-blue/10 focus:border-accent-blue transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-wider">
                <Shield className="w-4 h-4 text-accent-blue" />
                I am a...
              </label>
              <select 
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent-blue/10 focus:border-accent-blue transition-all font-bold text-slate-700 appearance-none cursor-pointer"
              >
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="tutor">Tutor</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-wider">
                <MessageSquare className="w-4 h-4 text-accent-blue" />
                Your Message
              </label>
              <textarea 
                required
                rows={5}
                placeholder="How can we help you today?"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent-blue/10 focus:border-accent-blue transition-all font-bold text-slate-700 resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading || isSuccess}
              className={`w-full py-5 rounded-[1.5rem] font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl ${
                isSuccess 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
                  : 'bg-accent-blue text-white hover:bg-purple-600 hover:scale-[1.02] active:scale-95 shadow-accent-blue/20'
              }`}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  Message Received
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactInfoCard({ icon, title, value, color }: any) {
  const colorMap: any = {
    purple: "bg-purple-50 text-purple-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">{title}</span>
        <span className="text-lg font-black text-slate-900 group-hover:text-accent-blue transition-colors">{value}</span>
      </div>
    </div>
  );
}
