"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, LogIn } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { label: "Home",      href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Courses",   href: "/courses" },
  { label: "Schedule",  href: "/schedule" },
  { label: "Contact",   href: "/contact" },
]

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="flex justify-center w-full py-4 px-4 sticky top-0 z-40">
      <div className="flex items-center justify-between px-5 py-3 bg-[#09090B]/95 backdrop-blur-xl rounded-full shadow-2xl border border-white/10 w-full max-w-4xl relative">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline group shrink-0">
          <motion.div
            className="w-9 h-9"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ rotate: 8, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {/* EduVault logo mark */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="10" fill="url(#ev_grad)" />
              <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontFamily="Arial Black, sans-serif" fontStyle="italic" fontWeight="900" fontSize="14">EV</text>
              <defs>
                <linearGradient id="ev_grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A855F7" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          <span className="text-lg font-black tracking-tighter text-white hidden sm:block">
            EDU<span className="text-purple-400">VAULT</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((item, i) => {
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 no-underline ${
                    isActive
                      ? "bg-purple-600 text-white shadow-[0_0_14px_rgba(168,85,247,0.45)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/8"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <motion.div
          className="hidden md:block shrink-0"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm text-white bg-purple-600 rounded-full hover:bg-purple-500 transition-colors font-bold no-underline shadow-[0_0_14px_rgba(168,85,247,0.35)]"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Link>
        </motion.div>

        {/* Mobile hamburger */}
        <motion.button
          className="md:hidden flex items-center p-2 rounded-full hover:bg-white/10 transition-colors"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6 text-zinc-300" />
        </motion.button>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-[#09090B] z-50 pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-5 right-5 p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.button>

            {/* Logo repeated in overlay */}
            <motion.div
              className="absolute top-5 left-5 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center">
                <span className="text-xs font-black italic text-white">EV</span>
              </div>
              <span className="text-lg font-black tracking-tighter text-white">
                EDU<span className="text-purple-400">VAULT</span>
              </span>
            </motion.div>

            <div className="flex flex-col space-y-2 mt-4">
              {navLinks.map((item, i) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ delay: i * 0.07 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={toggleMenu}
                      className={`flex items-center px-5 py-4 rounded-2xl text-base font-semibold transition-all duration-200 no-underline ${
                        isActive
                          ? "bg-purple-600 text-white shadow-[0_4px_14px_rgba(168,85,247,0.35)]"
                          : "text-zinc-400 hover:text-white hover:bg-white/8"
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_6px_white]" />
                      )}
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.45 }}
                className="pt-4 border-t border-white/10 mt-2"
              >
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center gap-3 w-full px-5 py-4 text-base text-white bg-purple-600 rounded-2xl hover:bg-purple-500 transition-colors font-bold no-underline shadow-[0_4px_14px_rgba(168,85,247,0.35)]"
                >
                  <LogIn className="w-5 h-5" />
                  Login to Account
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Navbar1 }
