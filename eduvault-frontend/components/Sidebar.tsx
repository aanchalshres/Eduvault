'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  LogIn 
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/courses', label: 'Courses', icon: BookOpen },
    { href: '/schedule', label: 'Schedule', icon: Calendar },
    { href: '/contact', label: 'Contact', icon: MessageSquare },
  ];

  return (
    <aside className="w-[280px] bg-[#09090B]/95 backdrop-blur-md text-white p-6 flex flex-col border-r border-white/10 transition-all duration-500 shadow-2xl z-40">
      <Link href="/" className="flex items-center gap-3 mb-12 px-2 no-underline group">
        <div className="w-10 h-10 bg-accent-blue rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform duration-300">
          <span className="text-xl font-black italic">EV</span>
        </div>
        <span className="text-2xl font-black tracking-tighter text-white">
          EDU<span className="text-accent-blue">VAULT</span>
        </span>
      </Link>
      
      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-accent-blue text-white shadow-[0_4px_12px_rgba(168,85,247,0.3)] scale-[1.02]' 
                  : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="font-semibold tracking-wide">{link.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/5">
        <Link 
          href="/login"
          className="flex items-center justify-center gap-3 w-full px-4 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-500 group shadow-lg"
        >
          <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          Login to Account
        </Link>
      </div>
    </aside>
  );
}
