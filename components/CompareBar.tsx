'use client';

import React, { useState } from 'react';
import { useApp } from '@/hooks/use-app';
import { X, ArrowRight, IndianRupee, Clock, Shield, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CompareBar() {
  const { compareList, removeFromCompare, setView } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-primary text-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {compareList.length}
                </span>
                <span className="font-bold">Programs to Compare</span>
              </div>
              <span className="text-sm text-gray-400 hidden md:inline">(Max 3)</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-1 text-sm font-bold hover:text-accent transition-colors"
              >
                <span>{isExpanded ? 'Hide Details' : 'Show Comparison'}</span>
                {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </button>
              <button className="bg-accent text-white px-6 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all">
                Compare Now
              </button>
            </div>
          </div>

          {/* Comparison Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden bg-white text-primary"
              >
                <div className="p-6 grid grid-cols-3 gap-6">
                  {compareList.map((p) => (
                    <div key={p.id} className="space-y-6 relative">
                      <button 
                        onClick={() => removeFromCompare(p.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                      >
                        <X size={14} />
                      </button>
                      
                      <div className="h-20 flex flex-col justify-center border-b border-gray-100 pb-4">
                        <div className="font-bold line-clamp-2">{p.name}</div>
                        <div className="text-xs text-gray-400 truncate">{p.university}</div>
                      </div>

                      <div className="space-y-4 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Tuition</span>
                          <span className="font-bold">{p.tuition}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Duration</span>
                          <span className="font-bold">{p.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Weekly Time</span>
                          <span className="font-bold">{p.weeklyTime}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">ROI Score</span>
                          <span className="font-bold text-accent">{p.roiScore}/10</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Accreditation</span>
                          <span className="font-bold truncate max-w-[100px]">{p.accreditation.split(',')[0]}</span>
                        </div>

                        {/* Expert Insight */}
                        {p.insights && (
                          <div className="mt-4 p-3 bg-accent/5 rounded-xl border border-accent/10">
                            <div className="flex items-center space-x-2 mb-2">
                              <Shield size={14} className="text-accent" />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-accent">SR-OPM Insight</span>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase">Best for</div>
                                <div className="text-xs font-medium">{p.insights.bestFor.join(', ')}</div>
                              </div>
                              <div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase">Not ideal for</div>
                                <div className="text-xs font-medium">{p.insights.lessIdealFor.join(', ')}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty Slots */}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <div key={i} className="border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center p-8 text-center text-gray-300">
                      <PlusCircle size={32} className="mb-2" />
                      <span className="text-xs font-bold uppercase tracking-widest">Add Program</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed View (Mini Cards) */}
          {!isExpanded && (
            <div className="px-6 py-4 bg-primary/50 flex space-x-4">
              {compareList.map((p) => (
                <div key={p.id} className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-xs font-bold truncate max-w-[120px]">{p.name}</span>
                  <button onClick={() => removeFromCompare(p.id)} className="text-gray-400 hover:text-white">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function PlusCircle({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}
