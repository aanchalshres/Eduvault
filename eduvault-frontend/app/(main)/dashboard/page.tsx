'use client'

import React from 'react';
import { useAppState } from '@/components/StateProvider';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, Trophy, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { state } = useAppState();

  return (
    <div className="flex flex-col gap-12 py-6 animate-in fade-in duration-700 max-w-7xl mx-auto w-full">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">Student Dashboard</h1>
          <p className="text-lg text-slate-500 font-medium italic">Welcome back, <span className="text-accent-blue font-bold not-italic">{state.user.name}</span>. Ready to excel today?</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex -space-x-3">
             <div className="w-10 h-10 rounded-full border-4 border-white bg-purple-100 flex items-center justify-center text-purple-600 font-bold">A</div>
             <div className="w-10 h-10 rounded-full border-4 border-white bg-purple-100 flex items-center justify-center text-purple-600 font-bold">B</div>
             <div className="w-10 h-10 rounded-full border-4 border-white bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">C</div>
          </div>
          <div className="pr-4">
            <span className="text-sm font-bold text-slate-900 block">Academic Rank</span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Global Top 5%</span>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<BookOpen className="w-6 h-6" />}
          label="Active Courses"
          value={state.enrolledCourses.length}
          color="purple"
        />
        <StatCard 
          icon={<Calendar className="w-6 h-6" />}
          label="Next Session"
          value={state.scheduledSessions.length > 0 ? "Today" : "None"}
          color="purple"
        />
        <StatCard 
          icon={<Trophy className="w-6 h-6" />}
          label="Credits Earned"
          value="1,240"
          color="emerald"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Enrolled Courses */}
        <section>
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Learning</h2>
            <Link href="/courses" className="text-accent-blue font-bold text-sm hover:underline flex items-center gap-1">
              Find more <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {state.enrolledCourses.length === 0 ? (
            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <BookOpen className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No active courses</h3>
              <p className="text-slate-500 font-medium mb-8">Start your journey by enrolling in our premium academic programs.</p>
              <Link href="/courses" className="inline-flex px-8 py-3 bg-accent-blue text-white rounded-xl font-bold shadow-lg shadow-accent-blue/30 hover:scale-105 active:scale-95 transition-all">
                Browse Catalog
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {state.enrolledCourses.map(courseId => {
                const progress = Math.floor(Math.random() * 80) + 10;
                return (
                  <div key={courseId} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-xs font-bold text-accent-blue uppercase tracking-widest mb-1 block">Course Module</span>
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-accent-blue transition-colors">Course ID: {courseId}</h3>
                      </div>
                      <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-black">ACTIVE</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-slate-500">Curriculum Progress</span>
                        <span className="text-slate-900">{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-accent-blue h-3 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Upcoming Sessions */}
        <section>
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Upcoming Sessions</h2>
            <Link href="/schedule" className="text-accent-blue font-bold text-sm hover:underline flex items-center gap-1">
              Book private <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {state.scheduledSessions.length === 0 ? (
            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Calendar className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Schedule is clear</h3>
              <p className="text-slate-500 font-medium mb-8">Need extra help? Book a 1-on-1 session with a verified tutor.</p>
              <Link href="/schedule" className="inline-flex px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">
                Book Session
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {state.scheduledSessions.map((session, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group flex gap-6 items-center">
                  <div className="w-16 h-16 bg-purple-50 rounded-2xl flex flex-col items-center justify-center text-purple-600 shrink-0 border border-purple-100">
                    <Clock className="w-6 h-6 mb-0.5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-slate-900 mb-1">{session.topic}</h3>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-sm font-bold text-slate-400 flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5" /> Tutor ID: {session.tutor_id}
                      </span>
                      <span className="text-sm font-bold text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {new Date(session.date_time).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:text-accent-blue hover:border-accent-blue transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  const colorMap: any = {
    purple: "bg-purple-600 shadow-purple-200",
    emerald: "bg-emerald-600 shadow-emerald-200",
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all flex items-center gap-6">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block mb-0.5">{label}</span>
        <span className="text-3xl font-black text-slate-900 tracking-tighter">{value}</span>
      </div>
    </div>
  );
}
