'use client';

import React, { useState } from 'react';
import { useApp } from '@/hooks/use-app';
import { PROGRAMS, Program } from '@/lib/data';
import { Search, Filter, IndianRupee, Clock, ArrowRight, Plus, TrendingUp, Globe } from 'lucide-react';

export default function ProgramListing() {
  const { setView, setSelectedProgram, addToCompare, compareList, setShowExpertModal, currency } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('All');

  const fields = ['All', ...Array.from(new Set(PROGRAMS.map(p => p.field)))];

  const filteredPrograms = PROGRAMS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.university.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesField = selectedField === 'All' || p.field === selectedField;
    return matchesSearch && matchesField;
  }).sort((a, b) => b.roiScore - a.roiScore);

  const formatPrice = (p: Program) => {
    if (currency === 'USD') {
      return `$${(p.tuitionUSD).toLocaleString()}`;
    }
    return p.tuition.replace(' total', '');
  };

  const formatEMI = (p: Program) => {
    if (currency === 'USD') {
      return `EMI starts from $${Math.round(p.tuitionUSD / 24)}/mo`;
    }
    return `EMI starts from ${p.emiStarting.replace('from ', '')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-primary mb-2">Browse All Programs</h1>
          <p className="text-gray-500">Explore 50,000+ online master&apos;s programs from top global universities.</p>
        </div>
        <div className="w-full md:w-96 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search programs or universities..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        {fields.map(field => (
          <button
            key={field}
            onClick={() => setSelectedField(field)}
            className={`px-6 py-2 rounded-full text-sm font-bold border transition-all ${
              selectedField === field 
                ? 'bg-primary text-white border-primary' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
            }`}
          >
            {field}
          </button>
        ))}
        <button className="px-6 py-2 rounded-full text-sm font-bold border border-gray-200 flex items-center space-x-2 text-gray-600 hover:bg-gray-50">
          <Filter size={16} />
          <span>More Filters</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPrograms.map((p) => (
          <div key={p.id} className="bg-white rounded-3xl border border-gray-100 p-0 hover:shadow-2xl transition-all flex flex-col group overflow-hidden">
            <div className="p-6 pb-0 flex justify-between items-start">
              <div className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase tracking-wider">
                {p.field}
              </div>
              <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-lg">
                <TrendingUp size={14} />
                <span className="text-xs font-bold">ROI: {p.roiScore}</span>
              </div>
            </div>
            
            <div className="p-6 pt-4 flex-1">
              <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-secondary transition-colors">
                {p.name} in {p.specialization}
              </h3>
              <p className="text-sm text-gray-500 mb-6 font-medium">
                {p.university} · {p.country}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                    {currency === 'INR' ? <IndianRupee size={16} /> : <Globe size={16} />}
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Total Fee</div>
                    <div className="text-sm font-bold text-primary">{formatPrice(p)} · {formatEMI(p)}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Duration</div>
                    <div className="text-sm font-bold text-primary">{p.duration} · {p.weeklyTime}/week</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <button 
                  onClick={() => {
                    setSelectedProgram(p);
                    setView('details');
                  }}
                  className="text-secondary font-bold text-sm flex items-center space-x-1 hover:translate-x-1 transition-transform"
                >
                  <span>View Details</span>
                  <ArrowRight size={16} />
                </button>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => addToCompare(p)}
                    disabled={compareList.some(item => item.id === p.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      compareList.some(item => item.id === p.id)
                        ? 'bg-gray-100 text-gray-400 border-gray-100'
                        : 'text-primary border-gray-200 hover:bg-primary hover:text-white'
                    }`}
                    title="Add to compare"
                  >
                    <Plus size={20} />
                  </button>
                  <button 
                    onClick={() => setShowExpertModal(true)}
                    className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/90"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
