'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar1 } from './ui/navbar-1';
import { Footer } from './ui/footer';
import { AITutorWidget } from './AITutorWidget';
import { StateProvider } from './StateProvider';

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <StateProvider>
      <div className="flex flex-col min-h-screen bg-academic-white text-[#1A202C] w-full selection:bg-accent-blue/20 selection:text-accent-blue">
        {!isLoginPage && <Navbar1 />}
        <main className={`flex-1 relative ${isLoginPage ? 'p-0' : 'px-4 pb-8 md:px-8 lg:px-12'}`}>
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
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
        {!isLoginPage && (
          <Footer
            logo={
              <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="10" fill="url(#ev_grad_footer)" />
                <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontFamily="Arial Black, sans-serif" fontStyle="italic" fontWeight="900" fontSize="14">EV</text>
                <defs>
                  <linearGradient id="ev_grad_footer" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A855F7" />
                    <stop offset="1" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
              </svg>
            }
            brandName="EduVault"
            socialLinks={[
              { icon: <span className="font-bold">X</span>, href: "https://twitter.com", label: "Twitter" },
              { icon: <span className="font-bold">in</span>, href: "https://linkedin.com", label: "LinkedIn" },
            ]}
            mainLinks={[
              { href: "/", label: "Home" },
              { href: "/courses", label: "Courses" },
              { href: "/schedule", label: "Schedule" },
              { href: "/contact", label: "Contact" },
            ]}
            legalLinks={[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
            ]}
            copyright={{
              text: "© 2024 EduVault",
              license: "All rights reserved",
            }}
          />
        )}
        <AITutorWidget />
      </div>
    </StateProvider>
  );
}
