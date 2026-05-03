'use client'

import React, { useState, useEffect } from 'react';
import { ApiService } from '@/lib/api';
import { useAppState } from '@/components/StateProvider';
import { BookOpen, Star, Users, CheckCircle2, Loader2 } from 'lucide-react';

export default function CoursesPage() {
  const { state, enrollCourse } = useAppState();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await ApiService.getCourses();
        setCourses(data);
      } catch (err) {
        setError('Failed to load courses. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId: string, price: number) => {
    setProcessingId(courseId);
    try {
      await ApiService.processPayment(price, 'Credit Card');
      await ApiService.enroll(state.user.id, courseId);
      enrollCourse(courseId);
    } catch (err) {
      alert('Enrollment failed. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-12 py-6 animate-in fade-in duration-700 max-w-7xl mx-auto w-full">
      <header>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-3">Academic Excellence</h1>
        <p className="text-xl text-slate-500 font-medium max-w-3xl leading-relaxed">
          Select from our curated list of elite academic courses, designed to push the boundaries of your understanding.
        </p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-12 h-12 text-accent-blue animate-spin" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Accessing Course Vault...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-8 rounded-3xl border border-red-100 text-center">
          <p className="text-red-600 font-bold">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map(course => {
            const isEnrolled = state.enrolledCourses.includes(course.course_id);
            const isProcessing = processingId === course.course_id;
            
            return (
              <div key={course.course_id} className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col">
                <div className="h-48 bg-slate-900 relative overflow-hidden">
                   {/* Abstract background for course card */}
                   <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-accent-blue via-purple-600 to-pink-500" />
                   <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px'}} />
                   
                   <div className="absolute bottom-6 left-6 right-6">
                     <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest mb-3">
                       <Star className="w-3 h-3 fill-current" />
                       Verified Academic
                     </div>
                     <h3 className="text-2xl font-black text-white leading-tight">{course.title}</h3>
                   </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Users className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">{course.tutor_name}</span>
                    </div>
                    <div className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-black tracking-widest">{course.difficulty_level.toUpperCase()}</div>
                  </div>

                  <p className="text-slate-500 font-medium mb-8 flex-grow leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between gap-4 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium Access</span>
                      <span className="text-2xl font-black text-slate-900">${course.price}</span>
                    </div>
                    
                    <button 
                      disabled={isEnrolled || isProcessing}
                      onClick={() => handleEnroll(course.course_id, course.price)}
                      className={`px-6 py-3.5 rounded-2xl font-bold transition-all duration-300 flex items-center gap-2 ${
                        isEnrolled 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default' 
                          : 'bg-accent-blue text-white hover:bg-purple-600 hover:scale-105 active:scale-95 shadow-lg shadow-accent-blue/30'
                      }`}
                    >
                      {isProcessing ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : isEnrolled ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Enrolled
                        </>
                      ) : (
                        <>
                          Enroll Now
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
