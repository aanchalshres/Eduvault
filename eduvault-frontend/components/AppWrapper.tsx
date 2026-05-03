'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { AITutorWidget } from './AITutorWidget';
import { StateProvider } from './StateProvider';

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <StateProvider>
      <div className="flex flex-col min-h-screen bg-academic-white text-[#1A202C] w-full selection:bg-accent-blue/20 selection:text-accent-blue">
        {!isLoginPage && <Navbar />}
        <main className={`flex-1 relative ${isLoginPage ? 'p-0' : 'p-4 md:p-8 lg:p-12'}`}>
          {/* Subtle dot grid background */}
          {!isLoginPage && (
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
              style={{
                backgroundImage: `radial-gradient(#A855F7 0.5px, transparent 0.5px)`,
                backgroundSize: '24px 24px',
              }}
            />
          )}
          <div className="relative z-10">
            {children}
          </div>
        </main>
        <AITutorWidget />
      </div>
    </StateProvider>
  );
}
