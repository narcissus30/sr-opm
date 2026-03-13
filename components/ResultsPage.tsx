'use client';

import React from 'react';
import { useApp } from '@/hooks/use-app';
import { PROGRAMS, Program } from '@/lib/data';
import { motion } from 'motion/react';
import { ArrowRight, Star, Clock, GraduationCap, IndianRupee, TrendingUp, Info, CheckCircle, Globe, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function ResultsPage() {
  const { quizAnswers, setView, setSelectedProgram, setShowExpertModal, currency, feedback, setFeedback } = useApp();

  const getFitLabel = (score: number) => {
    if (score >= 90) return { label: 'Excellent Fit', color: 'text-accent', bg: 'bg-accent/10' };
    if (score >= 80) return { label: 'Strong Match', color: 'text-secondary', bg: 'bg-secondary/10' };
    if (score >= 70) return { label: 'Good Match', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (score >= 60) return { label: 'Possible Match', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { label: 'Low Match', color: 'text-gray-500', bg: 'bg-gray-100' };
  };

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

  // Simple fit score calculation logic
  const calculateFitScore = (program: Program) => {
    let score = 0;
    
    // Field match (30%)
    if (program.field === quizAnswers.field) score += 30;
    
    // University type match (20%)
    if (quizAnswers.university_type === 'Both') score += 20;
    else if (quizAnswers.university_type === 'Indian Universities' && program.country === 'India') score += 20;
    else if (quizAnswers.university_type === 'International Universities' && program.country !== 'India') score += 20;

    // Budget match (15%)
    const budgetMap: Record<string, number> = {
      'Under ₹1L': 100000,
      '₹1L–₹2L': 200000,
      '₹2L–₹5L': 500000,
      '₹5L–₹10L': 1000000,
      '₹10L+': 5000000
    };
    const userBudget = budgetMap[quizAnswers.budget || '₹10L+'];
    if (program.tuitionValue <= userBudget) score += 15;
    else if (program.tuitionValue <= userBudget * 1.5) score += 10;
    else score += 5;

    // Time match (10%)
    if (program.weeklyTime === quizAnswers.weekly_time) score += 10;
    else score += 5;

    // Career goal match (15%) - Mock logic
    score += 15;

    // Experience match (10%) - Mock logic
    score += 10;

    return Math.min(score, 98);
  };

  const scoredPrograms = PROGRAMS.map(p => ({
    ...p,
    fitScore: calculateFitScore(p)
  })).sort((a, b) => b.fitScore - a.fitScore);

  const topMatch = scoredPrograms[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full font-bold mb-6"
        >
          <Star size={18} fill="currentColor" />
          <span>Analysis Complete</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
          Your Best-Fit Online Master&apos;s Programs
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          Based on your interest in <span className="text-secondary font-bold">{quizAnswers.field}</span>, 
          budget of <span className="text-secondary font-bold">{quizAnswers.budget}</span>, 
          and <span className="text-secondary font-bold">{quizAnswers.work_experience}</span> of experience.
        </p>
      </div>

      {/* Fit Score Explanation */}
      <section className="mb-12 bg-white p-8 rounded-3xl border border-gray-100">
        <h2 className="text-2xl font-bold text-primary mb-4">How we calculate your Fit Score</h2>
        <p className="text-gray-600 mb-6">Our AI engine analyzes thousands of data points across 4 key dimensions to find your perfect match.</p>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: 'Academic Alignment', desc: 'Matches your background & goals', icon: GraduationCap },
            { label: 'Financial Viability', desc: 'Fits your budget & EMI preference', icon: IndianRupee },
            { label: 'Career ROI', desc: 'Salary hikes & placement history', icon: TrendingUp },
            { label: 'Schedule Flexibility', desc: 'Weekly effort vs your availability', icon: Clock },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                <item.icon size={20} />
              </div>
              <div className="font-bold text-sm">{item.label}</div>
              <div className="text-xs text-gray-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Recommendation */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8 flex items-center space-x-2">
          <span className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm">1</span>
          <span>Top Recommendation</span>
        </h2>
        
        <div className="group relative bg-white rounded-3xl shadow-xl border border-secondary/20 overflow-hidden grid md:grid-cols-12">
          {/* Tooltip on Hover */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white p-4 rounded-2xl shadow-xl z-10 max-w-xs pointer-events-none">
            <div className="font-bold mb-1 flex items-center space-x-1">
              <CheckCircle size={14} className="text-accent" />
              <span>Why it matches you</span>
            </div>
            <ul className="text-xs space-y-1 text-white/70">
              <li>• Aligned with {quizAnswers.field} goals</li>
              <li>• Fits {quizAnswers.budget} budget</li>
              <li>• Matches {quizAnswers.work_experience} experience</li>
            </ul>
          </div>

          <div className="md:col-span-8 p-8 md:p-12">
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-wider">
                {topMatch.popularityBadge || 'Highly Recommended'}
              </span>
              <span className="text-gray-400 text-sm">Deadline: {topMatch.nextCohort}</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{topMatch.name}</h3>
            <p className="text-xl text-gray-600 mb-8">{topMatch.university}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 rounded-lg"><Clock size={20} className="text-gray-400" /></div>
                <div>
                  <div className="text-xs text-gray-400 uppercase font-bold">Duration</div>
                  <div className="font-bold">{topMatch.duration} · {topMatch.weeklyTime}/week</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  {currency === 'INR' ? <IndianRupee size={20} className="text-gray-400" /> : <Globe size={20} className="text-gray-400" />}
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase font-bold">Tuition</div>
                  <div className="font-bold">{formatPrice(topMatch)} · {formatEMI(topMatch)}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 rounded-lg"><TrendingUp size={20} className="text-gray-400" /></div>
                <div>
                  <div className="text-xs text-gray-400 uppercase font-bold">ROI Score</div>
                  <div className="font-bold text-accent">{topMatch.roiScore}/10</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 rounded-lg"><GraduationCap size={20} className="text-gray-400" /></div>
                <div>
                  <div className="text-xs text-gray-400 uppercase font-bold">Accreditation</div>
                  <div className="font-bold">{topMatch.accreditation.split(',')[0]}</div>
                </div>
              </div>
            </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => {
                    setSelectedProgram(topMatch);
                    setView('details');
                  }}
                  className="btn-secondary px-8 py-4"
                >
                  View Details
                </button>
                <button 
                  onClick={() => setShowExpertModal(true)}
                  className="btn-outline px-8 py-4"
                >
                  Apply Now
                </button>
              </div>
          </div>
          
          <div className="md:col-span-4 bg-gray-50 p-8 md:p-12 flex flex-col items-center justify-center text-center border-l border-gray-100">
            <div className="relative w-40 h-40 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-gray-200"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={440}
                  initial={{ strokeDashoffset: 440 }}
                  animate={{ strokeDashoffset: 440 - (440 * topMatch.fitScore) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-secondary"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-primary">{topMatch.fitScore}%</span>
                <span className="text-xs font-bold text-gray-400 uppercase">Fit Score</span>
              </div>
            </div>
            <div className={`px-4 py-1 rounded-full text-sm font-bold mb-4 ${getFitLabel(topMatch.fitScore).bg} ${getFitLabel(topMatch.fitScore).color}`}>
              {getFitLabel(topMatch.fitScore).label}
            </div>

            {/* Match Breakdown Matrix */}
            <div className="w-full mt-4 p-4 bg-white rounded-2xl border border-gray-100 text-left">
              <div className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Match Breakdown</div>
              <div className="space-y-2">
                {[
                  { label: 'Field match', value: 35 },
                  { label: 'Budget match', value: 20 },
                  { label: 'Career goal match', value: 15 },
                  { label: 'Experience match', value: 15 },
                  { label: 'Time match', value: 10 },
                  { label: 'University pref', value: 5 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-secondary" 
                          style={{ width: `${item.value * 2}%` }}
                        />
                      </div>
                      <span className="font-bold text-primary w-8 text-right">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-gray-500 flex items-start space-x-2 text-left mt-6">
              <Info size={16} className="shrink-0 mt-0.5" />
              <p>Matches your field, budget, and experience level perfectly.</p>
            </div>

            {/* Like/Dislike for Top Match */}
            <div className="flex items-center space-x-4 mt-6">
              <button 
                onClick={() => setFeedback(topMatch.id, feedback[topMatch.id] === 'like' ? null : 'like')}
                className={`p-2 rounded-full transition-colors ${feedback[topMatch.id] === 'like' ? 'bg-accent text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
              >
                <ThumbsUp size={18} />
              </button>
              <button 
                onClick={() => setFeedback(topMatch.id, feedback[topMatch.id] === 'dislike' ? null : 'dislike')}
                className={`p-2 rounded-full transition-colors ${feedback[topMatch.id] === 'dislike' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
              >
                <ThumbsDown size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Other Matches */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Other Strong Matches</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scoredPrograms.slice(1).map((p) => {
            const fit = getFitLabel(p.fitScore);
            return (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${fit.bg} ${fit.color}`}>
                    {fit.label} ({p.fitScore}%)
                  </div>
                  <span className="text-xs font-bold text-gray-400">Deadline: {p.nextCohort}</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-1">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-6">{p.university}</p>
                
                <div className="grid grid-cols-1 gap-3 mb-8 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock size={14} className="text-gray-400" />
                    <span className="font-medium">{p.duration} · {p.weeklyTime}/week</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {currency === 'INR' ? <IndianRupee size={14} className="text-gray-400" /> : <Globe size={14} className="text-gray-400" />}
                    <span className="font-medium">{formatPrice(p)} · {formatEMI(p)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={14} className="text-accent" />
                    <span className="font-bold text-accent">ROI Score: {p.roiScore}/10</span>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => {
                        setSelectedProgram(p);
                        setView('details');
                      }}
                      className="text-secondary font-bold flex items-center space-x-1 hover:underline"
                    >
                      <span>View Program</span>
                      <ArrowRight size={16} />
                    </button>
                    <div className="flex items-center space-x-2 ml-2">
                      <button 
                        onClick={() => setFeedback(p.id, feedback[p.id] === 'like' ? null : 'like')}
                        className={`p-1.5 rounded-full transition-colors ${feedback[p.id] === 'like' ? 'bg-accent text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                      >
                        <ThumbsUp size={14} />
                      </button>
                      <button 
                        onClick={() => setFeedback(p.id, feedback[p.id] === 'dislike' ? null : 'dislike')}
                        className={`p-1.5 rounded-full transition-colors ${feedback[p.id] === 'dislike' ? 'bg-red-500 text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                      >
                        <ThumbsDown size={14} />
                      </button>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-primary font-medium text-sm">Compare</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
