'use client';

import React, { useState } from 'react';
import { useApp } from '@/hooks/use-app';
import { X, Phone, Mail, User, CheckCircle, Star, Award, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPERTS } from '@/lib/data';
import Image from 'next/image';

export function ExpertModal() {
  const { showExpertModal, setShowExpertModal } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(EXPERTS[0]);

  if (!showExpertModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        >
          <div className="p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2 text-secondary">
                <Phone size={24} />
                <h2 className="text-2xl font-bold text-primary">Talk to an Expert</h2>
              </div>
              <button 
                onClick={() => setShowExpertModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {!submitted ? (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <p className="text-gray-500">Choose an expert counselor to help you navigate your academic journey.</p>
                  
                  <div className="space-y-4">
                    {EXPERTS.map((expert) => (
                      <button
                        key={expert.id}
                        onClick={() => setSelectedExpert(expert)}
                        className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center space-x-4 ${
                          selectedExpert.id === expert.id 
                            ? 'border-secondary bg-secondary/5 shadow-md' 
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                          <Image 
                            src={expert.image} 
                            alt={expert.name} 
                            fill 
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-primary truncate">{expert.name}</div>
                          <div className="text-xs text-gray-400 truncate">{expert.specialization}</div>
                        </div>
                        {selectedExpert.id === expert.id && (
                          <CheckCircle size={16} className="text-secondary" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                        <Image 
                          src={selectedExpert.image} 
                          alt={selectedExpert.name} 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-primary">{selectedExpert.name}</div>
                        <div className="flex items-center text-accent text-xs font-bold">
                          <Star size={12} fill="currentColor" className="mr-1" />
                          <span>{selectedExpert.experience} Experience</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 italic mb-3">&quot;{selectedExpert.impact}&quot;</div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center space-x-1 text-[10px] bg-white px-2 py-1 rounded-full border border-gray-100">
                        <Award size={10} className="text-secondary" />
                        <span>Top Rated</span>
                      </div>
                      <div className="flex items-center space-x-1 text-[10px] bg-white px-2 py-1 rounded-full border border-gray-100">
                        <MessageSquare size={10} className="text-secondary" />
                        <span>500+ Consultations</span>
                      </div>
                    </div>
                  </div>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/10">
                    <div className="text-xs font-bold text-secondary uppercase mb-1 tracking-wider">Selected Expert</div>
                    <div className="text-sm font-medium text-primary">{selectedExpert.name} will call you.</div>
                  </div>

                  <button type="submit" className="w-full btn-secondary py-4 text-lg">
                    Request a Callback
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={48} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary">Request Received!</h3>
                  <p className="text-gray-500">{selectedExpert.name} or one of our senior experts will call you within the next 24 hours.</p>
                </div>
                <button 
                  onClick={() => setShowExpertModal(false)}
                  className="btn-outline px-8 py-3"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const { setUser } = useApp();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl"
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-primary">Login / Sign Up</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {step === 'phone' ? (
              <div className="space-y-6">
                <p className="text-gray-500">Enter your phone number to receive a one-time password (OTP).</p>
                <div className="flex space-x-2">
                  <div className="w-20 px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-center text-gray-400 font-bold">+91</div>
                  <input 
                    type="tel" 
                    placeholder="Mobile Number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  />
                </div>
                <button 
                  onClick={() => setStep('otp')}
                  disabled={phone.length < 10}
                  className="w-full btn-secondary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send OTP
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-gray-500">Enter the 6-digit OTP sent to <span className="font-bold text-primary">+91 {phone}</span></p>
                <div className="grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <input 
                      key={i}
                      type="text" 
                      maxLength={1}
                      className="w-full aspect-square text-center font-bold text-xl bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                    />
                  ))}
                </div>
                <div className="text-center text-sm">
                  <span className="text-gray-400">Didn&apos;t receive OTP? </span>
                  <button className="text-secondary font-bold hover:underline">Resend</button>
                </div>
                <button 
                  onClick={() => {
                    setUser({ fullName: 'John Doe', email: 'john@example.com', phone: phone, isLoggedIn: true });
                    onClose();
                  }}
                  className="w-full btn-secondary py-4"
                >
                  Verify & Login
                </button>
                <button 
                  onClick={() => setStep('phone')}
                  className="w-full text-gray-400 text-sm font-bold hover:text-primary transition-colors"
                >
                  Change Phone Number
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
