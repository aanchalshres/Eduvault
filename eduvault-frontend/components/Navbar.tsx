'use client'

import React from 'react';
import Link from 'next/link';
import { Menu, Bell, User } from 'lucide-react';
import { useAppState } from './StateProvider';

export function Navbar() {
  const { setSidebarOpen } = useAppState();

  return (
    <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label="Open Menu"
        >
          <Menu className="w-6 h-6 text-neutral-600" />
        </button>
        
        <Link href="/" className="flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
            <span className="text-xs font-black italic text-white">EV</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-black uppercase">
            EduVault
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5 text-neutral-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-neutral-200 mx-1 md:mx-2 hidden sm:block"></div>
        
        <button className="flex items-center gap-3 p-1.5 hover:bg-neutral-100 rounded-full md:rounded-xl transition-all duration-300">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-blue to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            S
          </div>
          <span className="font-semibold text-sm hidden md:block">Student Account</span>
        </button>
      </div>
    </header>
  );
}
