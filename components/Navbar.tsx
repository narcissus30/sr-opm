'use client';

import React, { useState } from 'react';
import { useApp } from '@/hooks/use-app';
import { Menu, X, Phone, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthModal } from './Modals';

export default function Navbar() {
  const { setView, user, setShowExpertModal } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const navItems = [
    { name: 'Student Stories', action: () => { setView('home'); setTimeout(() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { name: 'Blogs', action: () => { setView('home'); setTimeout(() => document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { name: 'FAQs', action: () => { setView('home'); setTimeout(() => document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { name: 'Contact Us', action: () => { setView('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
  ];

  const handleGoHome = () => {
    setView('home');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button 
              type="button"
              onClick={handleGoHome}
              className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg p-1 -m-1"
              aria-label="Go to home"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shrink-0 group-hover:scale-105 transition-transform">
                SR
              </div>
              <span className="text-2xl font-display font-bold text-primary tracking-tight">OPM</span>
            </button>

            {/* Desktop Nav - equal spacing, no Home/USD/INR */}
            <div className="hidden md:flex items-center flex-1 justify-evenly max-w-2xl mx-auto">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => setShowAuthModal(true)}
                className="flex items-center space-x-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
              >
                <User size={18} />
                <span>{user.isLoggedIn ? 'Profile' : 'Login'}</span>
              </button>
              <button 
                onClick={() => setShowExpertModal(true)}
                className="bg-primary text-white px-5 py-2 rounded-full text-sm font-bold flex items-center space-x-2 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Phone size={16} />
                <span>Talk to Expert</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    className="block w-full text-left text-lg font-medium text-gray-600"
                    onClick={() => {
                      item.action();
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </button>
                ))}
                <div className="pt-4 border-t border-gray-100 flex flex-col space-y-4">
                  <button 
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="text-primary font-bold text-left"
                  >
                    {user.isLoggedIn ? 'Profile' : 'Login'}
                  </button>
                  <button 
                    onClick={() => {
                      setShowExpertModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center space-x-2"
                  >
                    <Phone size={18} />
                    <span>Talk to Expert</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
