'use client';

import React from 'react';
import { useApp } from '@/hooks/use-app';
import { PROGRAMS, Program } from '@/lib/data';
import { ArrowLeft, Clock, IndianRupee, TrendingUp, GraduationCap, CheckCircle, Calendar, Download, ChevronDown, Phone, Star, Users, Award, BookOpen, ArrowRight, Globe, Youtube, Instagram, ExternalLink, MessageSquare, UserCheck, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function ProgramDetailPage() {
  const { selectedProgram, setView, isQuizCompleted, quizAnswers, setShowExpertModal, setSelectedProgram, currency } = useApp();

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

            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center space-x-2">
                <Award className="text-secondary" size={20} />
                <span className="text-sm font-bold text-primary">{p.accreditation.split(',')[0]}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-accent" size={20} />
                <span className="text-sm font-bold text-primary">ROI Score: {p.roiScore}/10</span>
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
            <h2 className="text-3xl font-bold text-primary mb-8">Curriculum</h2>
            <div className="space-y-4">
              {p.curriculum.semester.map((sem, i) => (
                <details key={i} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-lg list-none hover:bg-gray-50 transition-colors">
                    {sem.title}
                    <span className="transition-transform group-open:rotate-180">
                      <ChevronDown />
                    </span>
                  </summary>
                  <div className="px-6 pb-6">
                    <ul className="grid md:grid-cols-2 gap-3">
                      {sem.topics.map((topic, j) => (
                        <li key={j} className="flex items-center space-x-2 text-gray-600">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
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
                  <div className="grid md:grid-cols-2 gap-4">
                    {p.careerTransitions.map((t, i) => (
                      <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
                        <div className="text-sm font-medium text-gray-500">{t.before}</div>
                        <ArrowRight size={16} className="text-secondary mx-4" />
                        <div className="text-sm font-bold text-primary">{t.after}</div>
                      </div>
                    ))}
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
              <h2 className="text-3xl font-bold text-primary mb-8">Similar Programs</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {displayedSimilar.map((sp) => (
                  <div 
                    key={sp.id} 
                    className="bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-2xl transition-all cursor-pointer flex flex-col group"
                    onClick={() => {
                      setSelectedProgram(sp);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gray-50 bg-white p-2">
                        <Image src={sp.logo} alt={sp.university} fill className="object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-lg">
                        <TrendingUp size={12} />
                        <span className="text-[10px] font-bold">ROI: {sp.roiScore}</span>
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-primary mb-1 line-clamp-2 group-hover:text-secondary transition-colors">
                      {sp.name} in {sp.specialization}
                    </h4>
                    <p className="text-xs text-gray-400 mb-6">{sp.university} · {sp.country}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                          {currency === 'INR' ? <IndianRupee size={12} /> : <Globe size={12} />}
                        </div>
                        <div className="text-xs font-bold text-primary">{formatPrice(sp)}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                          <Clock size={12} />
                        </div>
                        <div className="text-xs font-bold text-primary">{sp.duration}</div>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-secondary font-bold text-sm">
                      <span>View Details</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold mb-6">Course Highlights</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Accreditation</span>
                  <span className="font-bold text-right text-sm">{p.accreditation}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Weekly Effort</span>
                  <span className="font-bold">{p.weeklyTime}/week</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">ROI Score</span>
                  <span className="font-bold text-accent">{p.roiScore}/10</span>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500">Total Program Fee</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(p)}</span>
                </div>
                <p className="text-xs text-gray-400 mb-6">*Inclusive of all taxes. No-cost EMI available.</p>
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
    </div>
  );
}
