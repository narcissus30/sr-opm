'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/hooks/use-app';
import { PROGRAMS, Program } from '@/lib/data';
import { Search, Filter, IndianRupee, Clock, ArrowRight, Plus, Globe, X, ChevronDown } from 'lucide-react';
import { ROITooltip } from './ROITooltip';

const FEE_RANGES = [
  { id: 'all', label: 'All', min: 0, max: Infinity },
  { id: 'under2', label: 'Under ₹2L', min: 0, max: 200000 },
  { id: '2-5', label: '₹2L – ₹5L', min: 200000, max: 500000 },
  { id: '5-10', label: '₹5L – ₹10L', min: 500000, max: 1000000 },
  { id: '10+', label: '₹10L+', min: 1000000, max: Infinity },
];

export default function ProgramListing() {
  const { setView, setSelectedProgram, addToCompare, compareList, setShowExpertModal, currency } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('All');
  const [selectedFee, setSelectedFee] = useState('all');
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const [filterDuration, setFilterDuration] = useState('any');
  const [filterWeekly, setFilterWeekly] = useState('any');
  const moreFiltersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreFiltersRef.current && !moreFiltersRef.current.contains(e.target as Node)) {
        setMoreFiltersOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fields = ['All', ...Array.from(new Set(PROGRAMS.map(p => p.field)))];

  const filteredPrograms = PROGRAMS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.university.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesField = selectedField === 'All' || p.field === selectedField;
    const feeRange = FEE_RANGES.find(f => f.id === selectedFee) || FEE_RANGES[0];
    const matchesFee = p.tuitionValue >= feeRange.min && p.tuitionValue < feeRange.max;
    const matchesDuration = filterDuration === 'any' || p.duration.toLowerCase().startsWith(filterDuration);
    const matchesWeekly = filterWeekly === 'any' ||
      (filterWeekly === '5-10' && p.weeklyTime.startsWith('5')) ||
      (filterWeekly === '10-15' && p.weeklyTime.startsWith('10')) ||
      (filterWeekly === '15+' && p.weeklyTime.startsWith('15'));
    return matchesSearch && matchesField && matchesFee && matchesDuration && matchesWeekly;
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

      {/* Category + Fees filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider self-center mr-1">Category</span>
        {fields.map(field => (
          <button
            key={field}
            onClick={() => setSelectedField(field)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
              selectedField === field
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
            }`}
          >
            {field}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mb-10">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider self-center mr-1">Fees</span>
        {FEE_RANGES.map(f => (
          <button
            key={f.id}
            onClick={() => setSelectedFee(f.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
              selectedFee === f.id ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
            }`}
          >
            {f.label}
          </button>
        ))}
        <div className="relative ml-2" ref={moreFiltersRef}>
          <button
            onClick={() => setMoreFiltersOpen(!moreFiltersOpen)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border flex items-center gap-2 transition-all ${
              moreFiltersOpen ? 'bg-gray-100 border-primary text-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
            }`}
          >
            <Filter size={16} />
            <span>More Filters</span>
            <ChevronDown size={14} className={moreFiltersOpen ? 'rotate-180' : ''} />
          </button>
          {moreFiltersOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl border border-gray-200 shadow-lg py-3 z-20">
              <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                <span className="text-sm font-bold text-primary">Filters</span>
                <button onClick={() => setMoreFiltersOpen(false)} className="text-gray-400 hover:text-primary"><X size={16} /></button>
              </div>
              <div className="px-4 py-3 space-y-3">
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase mb-1">Duration</div>
                  <select
                    value={filterDuration}
                    onChange={(e) => setFilterDuration(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="any">Any</option>
                    <option value="12">12 months</option>
                    <option value="18">18 months</option>
                    <option value="24">24 months</option>
                  </select>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase mb-1">Weekly effort</div>
                  <select
                    value={filterWeekly}
                    onChange={(e) => setFilterWeekly(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="any">Any</option>
                    <option value="5-10">5–10 hrs</option>
                    <option value="10-15">10–15 hrs</option>
                    <option value="15+">15+ hrs</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid - readable cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-0 hover:shadow-lg hover:border-gray-300 transition-all flex flex-col overflow-hidden">
            <div className="px-5 pt-5 flex justify-between items-start gap-3">
              <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-md uppercase tracking-wide">
                {p.field}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <ROITooltip score={p.roiScore} iconSize={14} />
              </div>
            </div>
            <div className="px-5 pt-3 flex-1">
              <h3 className="text-lg font-bold text-primary mb-1 leading-tight">
                {p.name} in {p.specialization}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {p.university} · <span className="font-medium text-gray-600">{p.country}</span>
              </p>
              <dl className="space-y-3 mb-5">
                <div className="flex gap-3">
                  <dt className="text-xs text-gray-400 font-semibold uppercase w-16 shrink-0">Fee</dt>
                  <dd className="text-sm font-semibold text-primary">{formatPrice(p)}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-xs text-gray-400 font-semibold uppercase w-16 shrink-0">EMI</dt>
                  <dd className="text-sm text-gray-600">{formatEMI(p).replace('EMI starts from ', '')}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-xs text-gray-400 font-semibold uppercase w-16 shrink-0">Duration</dt>
                  <dd className="text-sm text-gray-700">{p.duration} · {p.weeklyTime}/wk</dd>
                </div>
              </dl>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => { setSelectedProgram(p); setView('details'); }}
                  className="text-secondary font-semibold text-sm flex items-center gap-1 hover:underline"
                >
                  View Details <ArrowRight size={14} />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addToCompare(p)}
                    disabled={compareList.some(item => item.id === p.id)}
                    className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                      compareList.some(item => item.id === p.id)
                        ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-default'
                        : 'text-primary border-gray-200 hover:bg-primary hover:text-white'
                    }`}
                    title="Add to compare"
                  >
                    <Plus size={18} />
                  </button>
                  <button
                    onClick={() => setShowExpertModal(true)}
                    className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90"
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
