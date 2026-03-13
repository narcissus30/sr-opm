'use client';

import React, { useState } from 'react';
import { useApp } from '@/hooks/use-app';
import { Menu, X, Phone, User, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthModal } from './Modals';

export default function Navbar() {
  const { setView, user, setShowExpertModal, currency, setCurrency } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const navItems = [
    { name: 'Home', action: () => setView('home') },
    { name: 'Student Stories', action: () => { setView('home'); setTimeout(() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { name: 'Blogs', action: () => { setView('home'); setTimeout(() => document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { name: 'FAQs', action: () => { setView('home'); setTimeout(() => document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { name: 'Contact Us', action: () => { setView('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2">
                SR
              </div>
              <span className="text-2xl font-display font-bold text-primary tracking-tight">OPM</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Currency Selector */}
              <div className="relative">
                <button 
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-primary"
                >
                  <Globe size={16} />
                  <span>{currency}</span>
                </button>
                <AnimatePresence>
                  {showCurrencyDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-24 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden"
                    >
                      {['INR', 'USD'].map((c) => (
                        <button
                          key={c}
                          onClick={() => {
                            setCurrency(c as 'INR' | 'USD');
                            setShowCurrencyDropdown(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${currency === c ? 'text-secondary font-bold' : 'text-gray-600'}`}
                        >
                          {c}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => setShowAuthModal(true)}
                className="flex items-center space-x-2 text-sm font-semibold text-primary hover:opacity-80"
              >
                <User size={18} />
                <span>{user.isLoggedIn ? 'Profile' : 'Login'}</span>
              </button>
              <button 
                onClick={() => setShowExpertModal(true)}
                className="bg-primary text-white px-5 py-2 rounded-full text-sm font-bold flex items-center space-x-2 hover:shadow-lg transition-all"
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Currency</span>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      {['INR', 'USD'].map((c) => (
                        <button
                          key={c}
                          onClick={() => setCurrency(c as 'INR' | 'USD')}
                          className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${currency === c ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
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
