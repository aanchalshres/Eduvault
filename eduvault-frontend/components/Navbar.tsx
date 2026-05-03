'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  MessageSquare,
  LogIn,
  Menu,
  X,
  Bell
} from 'lucide-react';

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/schedule', label: 'Schedule', icon: Calendar },
  { href: '/contact', label: 'Contact', icon: MessageSquare },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Main navbar bar */}
      <div className="bg-[#09090B]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl px-4 md:px-8 h-16 md:h-18 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group no-underline">
          <div className="w-9 h-9 bg-accent-blue rounded-xl flex items-center justify-center shadow-[0_0_18px_rgba(168,85,247,0.45)] group-hover:scale-110 transition-transform duration-300">
            <span className="text-base font-black italic text-white">EV</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            EDU<span className="text-accent-blue">VAULT</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 no-underline ${
                  isActive
                    ? 'bg-accent-blue text-white shadow-[0_4px_14px_rgba(168,85,247,0.35)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/8'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-zinc-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#09090B]" />
          </button>

          <Link
            href="/login"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/8 text-white border border-white/10 rounded-xl text-sm font-bold hover:bg-white hover:text-black transition-all duration-300 no-underline group"
          >
            <LogIn className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            Login
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-zinc-300" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#09090B]/98 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex flex-col gap-1 animate-in slide-in-from-top duration-200">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 no-underline ${
                  isActive
                    ? 'bg-accent-blue text-white shadow-[0_4px_12px_rgba(168,85,247,0.3)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/8'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
                {isActive && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_6px_white]" />}
              </Link>
            );
          })}

          <div className="pt-3 mt-1 border-t border-white/8">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-3 w-full px-4 py-3.5 bg-white/5 text-white border border-white/10 rounded-xl font-bold text-sm hover:bg-white hover:text-black transition-all duration-300 no-underline group"
            >
              <LogIn className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              Login to Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
