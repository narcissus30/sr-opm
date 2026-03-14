'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/hooks/use-app';
import Navbar from '@/components/Navbar';
import CompareBar from '@/components/CompareBar';
import { ExpertModal } from '@/components/Modals';
import { Phone, MessageCircle } from 'lucide-react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { setShowExpertModal } = useApp();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">{children}</div>

      {/* Persistent Help CTAs */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col space-y-4 items-end">
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group flex items-center space-x-2"
        >
          <MessageCircle size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold">
            Chat on WhatsApp
          </span>
        </a>
        <button
          type="button"
          onClick={() => setShowExpertModal(true)}
          className="bg-accent text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group flex items-center space-x-2"
        >
          <Phone size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold">
            Talk to an Expert
          </span>
        </button>
      </div>

      <ExpertModal />
      <CompareBar />

      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold mr-2">SR</div>
              <span className="text-xl font-display font-bold text-primary">OPM</span>
            </div>
            <p className="text-gray-500 max-w-sm">
              AI-powered decision platform helping global working professionals discover their best-fit online master&apos;s programs.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><Link href="/" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/#testimonials" className="hover:text-primary">Student Stories</Link></li>
              <li><Link href="/#faqs" className="hover:text-primary">FAQs</Link></li>
              <li><Link href="/#blogs" className="hover:text-primary">Blogs</Link></li>
              <li><Link href="/#contact" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><Link href="/" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/" className="hover:text-primary">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-12 mt-12 border-t border-gray-50 text-center text-gray-400 text-xs">
          © 2026 SR-OPM. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
