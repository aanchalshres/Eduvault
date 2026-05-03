import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Rocket } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24 py-10">
      {/* Hero Section */}
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white rounded-3xl p-12 md:p-20 shadow-xl overflow-hidden border border-slate-100">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
          
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-bold uppercase tracking-wider mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
              <Sparkles className="w-3 h-3" />
              <span>Next Generation Learning</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter animate-in fade-in slide-in-from-top-4 duration-700">
              Master your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-purple-600">
                Academic Destiny.
              </span>
            </h1>
            
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
              EDUVAULT combines premium verified tutors with state-of-the-art AI assistance to provide a learning experience that's both human and superhuman.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <Link href="/courses" className="px-8 py-4 bg-accent-blue text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-accent-blue/30 hover:bg-purple-600 hover:scale-105 active:scale-95 transition-all duration-300">
                Browse Courses
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/login" className="px-8 py-4 bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all duration-300">
                Join Platform
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="animate-in fade-in duration-1000 delay-500">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Engineered for Excellence</h2>
          <p className="text-lg text-slate-500 font-medium">Tools designed to accelerate your understanding and boost your grades.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Sparkles className="w-8 h-8 text-accent-blue" />}
            title="AI Academic Tutor"
            description="Our advanced AI model is trained on premium academic content to provide instant, clear, and accurate explanations 24/7."
            color="purple"
          />
          <FeatureCard 
            icon={<Shield className="w-8 h-8 text-emerald-500" />}
            title="Verified Tutors"
            description="Every human tutor on our platform undergoes a rigorous verification process to ensure the highest teaching standards."
            color="emerald"
          />
          <FeatureCard 
            icon={<Rocket className="w-8 h-8 text-purple-500" />}
            title="Rapid Progress"
            description="Our personalized learning paths help you focus on what matters most, cutting study time by up to 40% while improving results."
            color="purple"
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: any) {
  const colorMap: any = {
    purple: "bg-purple-50 group-hover:bg-purple-100 text-purple-600 shadow-purple-200",
    emerald: "bg-emerald-50 group-hover:bg-emerald-100 text-emerald-600 shadow-emerald-200",
  };

  return (
    <div className="group bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500 ${colorMap[color]}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed">{description}</p>
    </div>
  );
}
