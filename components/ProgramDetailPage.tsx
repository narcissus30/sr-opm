'use client';

import React from 'react';
import { useApp } from '@/hooks/use-app';
import { PROGRAMS, Program } from '@/lib/data';
import { ArrowLeft, Clock, IndianRupee, TrendingUp, GraduationCap, CheckCircle, Calendar, Download, Phone, Star, Users, Award, BookOpen, ArrowRight, Globe, Youtube, Instagram, MessageSquare, UserCheck, Briefcase, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ExpertModal, EmployerPitchModal, AskAlumniModal } from './Modals';
import { ROITooltip } from './ROITooltip';

export default function ProgramDetailPage() {
  const { selectedProgram, setView, isQuizCompleted, quizAnswers, setShowExpertModal, setShowEmployerPitchModal, setShowAskAlumniModal, setSelectedProgram, currency, addToCompare, compareList } = useApp();

  if (!selectedProgram) return null;

  const p = selectedProgram;

  const similarPrograms = PROGRAMS
    .filter(item => item.id !== p.id && (item.field === p.field || item.field.split(' / ')[0] === p.field.split(' / ')[0]))
    .slice(0, 3);

  // If still empty, just show any 3 other programs
  const displayedSimilar = similarPrograms.length > 0 
    ? similarPrograms 
    : PROGRAMS.filter(item => item.id !== p.id).slice(0, 3);

  const formatPrice = (prog: Program) => {
    if (currency === 'USD') {
      return `$${(prog.tuitionUSD).toLocaleString()}`;
    }
    return prog.tuition.replace(' total', '');
  };

  const formatEMI = (prog: Program) => {
    if (currency === 'USD') {
      return `EMI starts from $${Math.round(prog.tuitionUSD / 24)}/mo`;
    }
    return `EMI starts from ${prog.emiStarting.replace('from ', '')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button 
        onClick={() => setView(isQuizCompleted ? 'results' : 'listing')}
        className="flex items-center space-x-2 text-gray-500 hover:text-primary font-medium mb-8 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to {isQuizCompleted ? 'Recommendations' : 'Programs'}</span>
      </button>

      {/* Hero Section */}
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-12 overflow-hidden relative">
        <div className="grid lg:grid-cols-3 gap-12 relative z-10">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-wider">
                {p.field}
              </span>
              <span className="text-gray-400 text-sm flex items-center space-x-1">
                <Calendar size={14} />
                <span>Application Deadline: {p.nextCohort}</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-100 bg-white p-2">
                <Image src={p.logo} alt={p.university} fill className="object-contain" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-primary leading-tight">
                  {p.name} in {p.specialization}
                </h1>
                <p className="text-xl text-gray-500 font-medium">{p.university} · {p.country}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Duration</div>
                <div className="font-bold text-primary text-sm">{p.duration}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Weekly Effort</div>
                <div className="font-bold text-primary text-sm">{p.weeklyTime}/week</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Total Fee</div>
                <div className="font-bold text-primary text-sm">{formatPrice(p)}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">EMI Starts</div>
                <div className="font-bold text-accent text-sm">{formatEMI(p).replace('EMI starts from ', '')}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Award className="text-secondary shrink-0" size={18} />
                <span className="text-sm font-semibold text-primary">{p.accreditation.split(',')[0]}</span>
              </div>
              <div className="flex items-center">
                <ROITooltip score={p.roiScore} iconSize={18} />
              </div>
            </div>
          </div>
          
          <div className="bg-primary rounded-3xl p-8 text-white flex flex-col justify-between shadow-2xl shadow-primary/20">
            <div>
              <div className="text-accent font-bold text-sm uppercase tracking-widest mb-4">Admissions Open</div>
              <div className="text-3xl font-bold mb-2">Deadline: {p.nextCohort}</div>
              <p className="text-white/70 text-sm mb-8">Limited seats available for the upcoming cohort. Start your application today.</p>
            </div>
            <div className="space-y-4">
              <button 
                onClick={() => setShowExpertModal(true)}
                className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-accent/20"
              >
                Apply Now
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center space-x-2">
                <Download size={18} />
                <span>Download Brochure</span>
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-primary overflow-hidden relative">
                       <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-primary bg-white/20 flex items-center justify-center text-[10px] font-bold">
                    +39
                  </div>
                </div>
                <div className="text-sm font-medium">
                  <span className="font-bold">42 professionals</span> from India are shortlisting this cohort
                </div>
              </div>
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 text-sm">
                <MessageSquare size={16} />
                <span>Join Explorer Group (WhatsApp)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-20">
          
          {/* Why Recommended (Conditional) */}
          {isQuizCompleted && (
            <section className="bg-accent/5 rounded-3xl p-8 border border-accent/10">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center space-x-2">
                <Star className="text-accent" fill="currentColor" />
                <span>Why this program matches you</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs shrink-0 mt-1">✓</div>
                    <p className="text-gray-700">Fits your <span className="font-bold">{quizAnswers.budget}</span> budget perfectly with EMI options starting at {p.emiStarting}.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs shrink-0 mt-1">✓</div>
                    <p className="text-gray-700">Aligned with your goal to work in <span className="font-bold">{quizAnswers.field}</span>.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs shrink-0 mt-1">✓</div>
                    <p className="text-gray-700">Curriculum designed for professionals with <span className="font-bold">{quizAnswers.work_experience}</span> experience.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs shrink-0 mt-1">✓</div>
                    <p className="text-gray-700">Flexible learning requires <span className="font-bold">{p.weeklyTime}</span> per week, matching your availability.</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-accent/10 shadow-sm">
                  <h4 className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">Match Breakdown</h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Field match', value: '35%' },
                      { label: 'Budget match', value: '20%' },
                      { label: 'Career goal match', value: '15%' },
                      { label: 'Experience match', value: '15%' },
                      { label: 'Time match', value: '10%' },
                      { label: 'University pref', value: '5%' },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{item.label}</span>
                        <div className="flex items-center space-x-3 flex-1 mx-4">
                          <div className="h-1.5 bg-gray-100 rounded-full flex-1 overflow-hidden">
                            <div className="h-full bg-accent" style={{ width: item.value }} />
                          </div>
                        </div>
                        <span className="text-sm font-bold text-primary w-8 text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Psychological Nudge */}
          {p.profileMatch && (
            <section className="bg-secondary/5 rounded-3xl p-8 border border-secondary/10">
              <div className="flex items-center space-x-3 mb-6">
                <UserCheck className="text-secondary" />
                <h2 className="text-2xl font-bold text-primary">People Like You Looked At This Program</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-secondary/10">
                  <div className="text-[10px] text-gray-400 uppercase font-bold mb-2">Age Range</div>
                  <div className="text-xl font-bold text-primary">{p.profileMatch.ageRange}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-secondary/10">
                  <div className="text-[10px] text-gray-400 uppercase font-bold mb-2">Work Experience</div>
                  <div className="text-xl font-bold text-primary">{p.profileMatch.workExp}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-secondary/10">
                  <div className="text-[10px] text-gray-400 uppercase font-bold mb-2">Common Roles</div>
                  <div className="space-y-1 mt-1">
                    {p.profileMatch.commonRoles.map(role => (
                      <div key={role} className="text-sm font-medium text-gray-600">• {role}</div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Program Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Learners', value: '10k+', icon: Users },
              { label: 'Hiring Partners', value: '500+', icon: Award },
              { label: 'Avg. Hike', value: p.avgSalaryIncrease, icon: TrendingUp },
              { label: 'Live Sessions', value: '200+', icon: BookOpen },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={20} />
                </div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-gray-400 font-bold uppercase">{stat.label}</div>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Program Overview</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{p.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {p.highlights.map((h, i) => (
                <div key={i} className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-gray-100">
                  <CheckCircle className="text-accent" size={20} />
                  <span className="font-medium text-gray-700">{h}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-primary mb-6">Curriculum</h2>
            <p className="text-gray-600 mb-6">Semester-wise breakdown of courses and topics.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {p.curriculum.semester.map((sem, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md uppercase tracking-wide">
                      {sem.title.split(':')[0].trim() || `Semester ${i + 1}`}
                    </span>
                    {sem.title.includes(':') && (
                      <span className="text-sm font-semibold text-gray-700">{sem.title.split(':').slice(1).join(':').trim()}</span>
                    )}
                  </div>
                  <ul className="p-4 space-y-2.5">
                    {sem.topics.map((topic, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-700 text-sm">
                        <span className="text-primary shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="leading-snug">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Day 1 Readiness Resume Scanner */}
          <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-bold text-primary flex items-center space-x-3">
                  <Star className="text-accent" fill="currentColor" />
                  <span>&quot;Day 1 Readiness&quot; Check</span>
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Upload your resume or connect LinkedIn to see how your current technical skills match against the program&apos;s prerequisites. We&apos;ll help you bridge any gaps before the cohort starts.
                </p>
                
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      const scanner = document.getElementById('scanner-state');
                      if (scanner) {
                        scanner.innerHTML = '<div class="text-secondary font-bold flex items-center space-x-2"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Scanning profile against curriculum...</div>';
                        setTimeout(() => {
                           scanner.innerHTML = `
                             <div class="space-y-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                               <div class="flex items-center justify-between">
                                 <span class="font-bold text-primary">Readiness Score</span>
                                 <span class="font-bold text-green-600 text-xl">85%</span>
                               </div>
                               <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                 <div class="h-full bg-green-500 rounded-full" style="width: 85%"></div>
                               </div>
                               <div class="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start space-x-3 mt-4">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                                 <div>
                                   <div class="font-bold text-blue-900 text-sm">Python basics needed</div>
                                   <div class="text-xs text-blue-800 mt-1">Your logic skills are great, but the curriculum uses Python. Here is a <a href="#" class="font-bold underline">free 5-hour bridge course</a> to take before August.</div>
                                 </div>
                               </div>
                             </div>
                           `;
                        }, 2500);
                      }
                    }}
                    className="flex-1 bg-white border-2 border-dashed border-gray-300 hover:border-secondary hover:bg-secondary/5 text-primary text-sm font-bold py-4 rounded-xl transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
                  >
                    <Download className="text-gray-400 group-hover:text-secondary" />
                    <span>Upload Resume (PDF)</span>
                  </button>
                  <button className="flex-1 bg-[#0077b5] text-white text-sm font-bold py-4 rounded-xl transition-all flex items-center justify-center space-x-2 hover:bg-[#006396] shadow-md">
                     <span>Connect LinkedIn</span>
                  </button>
                </div>
              </div>

              <div className="w-full md:w-64 bg-gray-50 rounded-2xl p-6 border border-gray-100 min-h-[200px] flex items-center justify-center" id="scanner-state">
                  <div className="text-center text-gray-400 text-sm">
                    Upload your profile to see your readiness score.
                  </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Eligibility Criteria</h2>
            <ul className="space-y-4">
              {p.eligibility.map((e, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/10 text-secondary rounded-full flex items-center justify-center text-xs shrink-0 mt-1">
                    {i + 1}
                  </div>
                  <span className="text-lg text-gray-700">{e}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Career Outcomes</h2>
            <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <TrendingUp className="text-secondary" size={32} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">{p.avgSalaryIncrease}</div>
                  <div className="text-gray-500">Average Salary Hike</div>
                </div>
              </div>
              <p className="text-gray-600 mb-8">Graduates from this program have been placed in top global firms including Google, Amazon, Deloitte, and more.</p>
              
              {p.careerTransitions && (
                <div className="mb-10">
                  <h4 className="text-lg font-bold text-primary mb-6 flex items-center space-x-2">
                    <Briefcase size={20} className="text-secondary" />
                    <span>Career Transitions After Program</span>
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {p.careerTransitions.map((t, i) => (
                      <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
                        <div className="text-sm font-medium text-gray-500">{t.before}</div>
                        <ArrowRight size={16} className="text-secondary mx-4" />
                        <div className="text-sm font-bold text-primary">{t.after}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Transition Match Alumni Card */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="flex items-start space-x-5 relative z-10 w-full">
                      <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm relative">
                        <Image src="https://picsum.photos/seed/rohan/100/100" alt="Alumnus" fill className="object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-bold text-primary text-lg">Meet Rohan</h4>
                          <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Alumni</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          He went from <span className="font-bold text-primary">QA Engineer</span> to <span className="font-bold text-secondary">ML Engineer</span> through this exact program in 2024.
                        </p>
                        <button 
                          onClick={() => setShowAskAlumniModal(true)}
                          className="flex items-center space-x-2 text-primary font-bold bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-xl text-sm transition-colors"
                        >
                          <MessageSquare size={16} className="text-secondary" />
                          <span>Request a 15-min AMA</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-lg font-bold text-primary mb-4">Future roles options can be:</h4>
                <div className="flex flex-wrap gap-4">
                  {p.careerRoles.map((role) => (
                    <span key={role} className="px-4 py-2 bg-white rounded-full text-sm font-bold text-primary shadow-sm border border-gray-100">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Social Integration & External Links */}
          {(p.socialLinks || true) && (
            <section>
              <h2 className="text-3xl font-bold text-primary mb-8">Explore More</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <a 
                  href={p.socialLinks?.youtube || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-red-50 p-6 rounded-2xl border border-red-100 flex items-center space-x-4 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center">
                    <Youtube size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-primary group-hover:text-red-600">YouTube</div>
                    <div className="text-xs text-gray-500">Program Overview</div>
                  </div>
                </a>
                <a 
                  href={p.socialLinks?.instagram || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-pink-50 p-6 rounded-2xl border border-pink-100 flex items-center space-x-4 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white rounded-xl flex items-center justify-center">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-primary group-hover:text-pink-600">Instagram</div>
                    <div className="text-xs text-gray-500">Student Life</div>
                  </div>
                </a>
                <a 
                  href={p.socialLinks?.academia || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center space-x-4 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                    <Globe size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-primary group-hover:text-blue-600">Academia.edu</div>
                    <div className="text-xs text-gray-500">Research Papers</div>
                  </div>
                </a>
              </div>
            </section>
          )}

          {/* Alumni / Mentor / Professor Access */}
          <section className="bg-primary text-white rounded-3xl p-10 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Connect with the Community</h2>
              <p className="text-white/70 mb-8 max-w-xl">Get first-hand insights from those who have been there. Speak with alumni, mentors, or professors to clear your doubts.</p>
              <div className="grid md:grid-cols-3 gap-4">
                <button onClick={() => setShowExpertModal(true)} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col items-center space-y-2 transition-all border border-white/10">
                  <Users size={24} className="text-accent" />
                  <span className="font-bold text-sm">Ask Alumni</span>
                </button>
                <button onClick={() => setShowExpertModal(true)} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col items-center space-y-2 transition-all border border-white/10">
                  <UserCheck size={24} className="text-secondary" />
                  <span className="font-bold text-sm">Ask Mentor</span>
                </button>
                <button onClick={() => setShowExpertModal(true)} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col items-center space-y-2 transition-all border border-white/10">
                  <GraduationCap size={24} className="text-white" />
                  <span className="font-bold text-sm">Ask Professor</span>
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-32 -mt-32" />
          </section>

          {/* Similar Programs */}
          {displayedSimilar.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-primary mb-6">Similar Programs</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {displayedSimilar.map((simP) => (
                  <div key={simP.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all flex flex-col">
                    <div className="p-4 flex items-start justify-between gap-3 border-b border-gray-100">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                        <Image src={simP.logo} alt={simP.university} fill className="object-contain p-1" referrerPolicy="no-referrer" />
                      </div>
                      {simP.roiScore >= 9.0 && (
                        <span className="px-2 py-0.5 bg-accent/15 text-accent text-xs font-semibold rounded-md">Bestseller</span>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-base font-bold text-primary leading-tight mb-1 line-clamp-2">{simP.name} in {simP.specialization}</h3>
                      <p className="text-sm text-gray-500 mb-3">{simP.university} · {simP.country}</p>
                      <dl className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <dt className="text-gray-500">Fee</dt>
                          <dd className="font-semibold text-primary">{currency === 'INR' ? simP.tuition : `$${(simP.tuitionUSD).toLocaleString()}`}</dd>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <dt className="text-gray-500">ROI</dt>
                          <dd><ROITooltip score={simP.roiScore} iconSize={12} /></dd>
                        </div>
                        <div className="flex justify-between text-sm">
                          <dt className="text-gray-500">Duration</dt>
                          <dd className="text-gray-700">{simP.duration}</dd>
                        </div>
                      </dl>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                        <button
                          onClick={() => { setSelectedProgram(simP); setView('details'); }}
                          className="text-secondary font-semibold text-sm hover:underline flex items-center gap-1"
                        >
                          View Program <ArrowRight size={14} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); addToCompare(simP); }}
                          disabled={compareList?.some(item => item.id === simP.id)}
                          className={`p-2 rounded-lg border text-sm ${compareList?.some(item => item.id === simP.id) ? 'bg-gray-100 text-gray-400 border-gray-100' : 'text-primary border-gray-200 hover:bg-primary hover:text-white'}`}
                          title="Add to compare"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-primary mb-4">Course Highlights</h3>
              <dl className="space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <dt className="text-sm text-gray-500">Accreditation</dt>
                  <dd className="font-semibold text-sm text-primary text-right">{p.accreditation.split(',')[0]}</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-sm text-gray-500">Weekly Effort</dt>
                  <dd className="font-semibold text-sm">{p.weeklyTime}/week</dd>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <dt className="text-sm text-gray-500">ROI Score</dt>
                  <dd className="flex items-center"><ROITooltip score={p.roiScore} iconSize={14} /></dd>
                </div>
              </dl>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500">Total Program Fee</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(p)}</span>
                </div>
                <p className="text-xs text-gray-400 mb-6">*Inclusive of all taxes. No-cost EMI available.</p>
                
                <button 
                  onClick={() => setShowEmployerPitchModal(true)}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 text-sm mb-4 border border-blue-200"
                >
                  <Briefcase size={16} />
                  <span>Ask employer to sponsor</span>
                </button>

                <button 
                  onClick={() => setShowExpertModal(true)}
                  className="w-full btn-secondary py-4 mb-4"
                >
                  Apply Now
                </button>
                <button 
                  onClick={() => setShowExpertModal(true)}
                  className="w-full btn-outline py-4"
                >
                  Talk to Expert
                </button>
              </div>
            </div>
            
            <div className="bg-accent/10 rounded-3xl p-8 border border-accent/20">
              <div className="flex items-center space-x-3 mb-4">
                <Phone className="text-accent" />
                <h4 className="font-bold text-primary">Need more info?</h4>
              </div>
              <p className="text-sm text-gray-600 mb-6">Our academic counselors are here to help you choose the right path.</p>
              <button 
                onClick={() => setShowExpertModal(true)}
                className="text-accent font-bold hover:underline"
              >
                Schedule a free call →
              </button>
            </div>
          </div>
        </div>
      </div>
      <ExpertModal />
      <EmployerPitchModal />
      <AskAlumniModal />
    </div>
  );
}
