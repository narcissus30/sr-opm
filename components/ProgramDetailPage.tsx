'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/hooks/use-app';
import { PROGRAMS, Program } from '@/lib/data';
import { ArrowLeft, Clock, IndianRupee, TrendingUp, GraduationCap, CheckCircle, Calendar, Download, Phone, Star, Users, Award, BookOpen, ArrowRight, Globe, Youtube, Instagram, MessageSquare, UserCheck, Briefcase, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ExpertModal, EmployerPitchModal, AskAlumniModal } from './Modals';
import { ROITooltip } from './ROITooltip';
import DegreePreview from '@/components/DegreePreview';

type ProgramDetailPageProps = { initialProgram?: Program };

export default function ProgramDetailPage({ initialProgram }: ProgramDetailPageProps) {
  const router = useRouter();
  const { selectedProgram, isQuizCompleted, quizAnswers, setShowExpertModal, setShowEmployerPitchModal, setShowAskAlumniModal, setSelectedProgram, currency, addToCompare, compareList } = useApp();

  const p = selectedProgram ?? initialProgram ?? null;
  if (!p) return null;

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
        onClick={() => router.push(isQuizCompleted ? '/results' : '/browse')}
        className="flex items-center space-x-2 text-gray-500 hover:text-primary font-medium mb-8 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to {isQuizCompleted ? 'Recommendations' : 'Programs'}</span>
      </button>

      {/* Hero Section - compact layout to avoid empty space */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-6 overflow-hidden relative">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 relative z-10 items-start">
          <div className="lg:col-span-2 min-w-0">
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-wider">
                {p.field}
              </span>
              <span className="text-gray-400 text-sm flex items-center space-x-1">
                <Calendar size={14} />
                <span>Application Deadline: {p.nextCohort}</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-100 bg-white p-2 shrink-0">
                <Image src={p.logo} alt={p.university} fill className="object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl md:text-4xl font-display font-bold text-primary leading-tight">
                  {p.name} in {p.specialization}
                </h1>
                <p className="text-lg text-gray-500 font-medium">{p.university} · {p.country}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              <div className="bg-gray-50 p-3 rounded-xl">
                <div className="text-[10px] text-gray-400 uppercase font-bold mb-0.5">Duration</div>
                <div className="font-bold text-primary text-sm">{p.duration}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <div className="text-[10px] text-gray-400 uppercase font-bold mb-0.5">Weekly Effort</div>
                <div className="font-bold text-primary text-sm">{p.weeklyTime}/week</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <div className="text-[10px] text-gray-400 uppercase font-bold mb-0.5">Total Fee</div>
                <div className="font-bold text-primary text-sm">{formatPrice(p)}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <div className="text-[10px] text-gray-400 uppercase font-bold mb-0.5">EMI Starts</div>
                <div className="font-bold text-accent text-sm">{formatEMI(p).replace('EMI starts from ', '')}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-2">
                <Award className="text-secondary shrink-0" size={18} />
                <span className="text-sm font-semibold text-primary">{p.accreditation.split(',')[0]}</span>
              </div>
              <div className="flex items-center">
                <ROITooltip score={p.roiScore} iconSize={18} />
              </div>
            </div>
          </div>

          <div className="bg-primary rounded-2xl p-6 text-white flex flex-col shadow-2xl shadow-primary/20">
            <div>
              <div className="text-accent font-bold text-xs uppercase tracking-widest mb-2">Admissions Open</div>
              <div className="text-2xl font-bold mb-1">Deadline: {p.nextCohort}</div>
              <p className="text-white/70 text-sm mb-5">Limited seats available for the upcoming cohort. Start your application today.</p>
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => setShowExpertModal(true)}
                className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-accent/20"
              >
                Apply Now
              </button>
              <button
                type="button"
                onClick={() => setShowExpertModal(true)}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2"
              >
                <Download size={18} />
                <span>Download Brochure</span>
              </button>
            </div>
            
            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center space-x-3 mb-3">
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
                <div className="text-xs font-medium">
                  <span className="font-bold">42 professionals</span> from India are shortlisting this cohort
                </div>
              </div>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <MessageSquare size={16} />
                <span>Join Explorer Group (WhatsApp)</span>
              </a>
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

          {/* Degree Preview / Value Proposition */}
          <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 xl:gap-10 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                    <GraduationCap size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary">Value Proposition</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                  Get a Prestigious Degree
                </h2>
                <p className="text-gray-600 leading-relaxed mb-5 max-w-xl text-sm md:text-base">
                  A globally recognized credential that you can share with employers, add on LinkedIn, and use for higher studies—without pausing your career.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: 'Globally recognized',
                      desc: 'Graduate with internationally accepted online degrees and credentials.',
                    },
                    {
                      title: 'At par with on‑campus degrees',
                      desc: 'Same academic rigor, recognition, and career outcomes—built for working professionals.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3 p-3.5 rounded-2xl border border-gray-100 bg-gray-50/60">
                      <div className="w-9 h-9 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-primary shrink-0">
                        <CheckCircle size={16} className="text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-primary text-sm md:text-base">{item.title}</div>
                        <div className="text-xs md:text-sm text-gray-600">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="absolute -top-3 -right-3 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-full px-3 py-1 text-[11px] font-bold text-gray-500">
                  Sample
                </div>
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 shadow-xl bg-white max-w-xl mx-auto">
                  <DegreePreview
                    programName={p.name}
                    specialization={p.specialization}
                    university={p.university}
                    learnerName="Sample Name"
                    issueDateLabel={p.nextCohort}
                    className="w-full h-auto"
                  />
                </div>
                <div className="mt-2 text-[11px] md:text-xs text-gray-400 text-center">
                  Preview your certificate format (illustrative).
                </div>
              </div>
            </div>
          </section>

          {/* Unique & Career-Ready Highlights */}
          <section className="mt-6">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              What Makes This Product Management Programme Unique and Career-Ready?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: '140+ Pre-recorded videos',
                  desc: 'for self-paced learning from globally renowned ISB Faculty.',
                  icon: Youtube,
                },
                {
                  title: 'Live masterclasses',
                  desc: 'on applications of AI and Generative AI in product management.',
                  icon: BookOpen,
                },
                {
                  title: 'Cutting-edge modules',
                  desc: 'on AI and Generative AI in product management.',
                  icon: Star,
                },
                {
                  title: '11 Top tools',
                  desc: 'product management tools to sharpen execution.',
                  icon: Award,
                },
                {
                  title: '10 Masterclasses',
                  desc: 'with leading product managers.',
                  icon: Users,
                },
                {
                  title: '4 Case studies',
                  desc: 'to build real-world decision making skills.',
                  icon: BookOpen,
                },
                {
                  title: '20+ Assignments & quizzes',
                  desc: 'to validate learning and strengthen fundamentals.',
                  icon: CheckCircle,
                },
                {
                  title: '15 Live sessions',
                  desc: 'with Programme Leaders to guide your progress.',
                  icon: Clock,
                },
                {
                  title: 'ISB Online Network',
                  desc: 'Be part of a peer community and stay connected.',
                  icon: Globe,
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-4">
                    <item.icon size={22} />
                  </div>
                  <div className="font-bold text-primary mb-2 text-sm">{item.title}</div>
                  <div className="text-xs text-gray-600 leading-relaxed">{item.desc}</div>
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
                  <button
                    type="button"
                    onClick={() => window.open('https://www.linkedin.com/', '_blank', 'noopener,noreferrer')}
                    className="flex-1 bg-[#0077b5] text-white text-sm font-bold py-4 rounded-xl transition-all flex items-center justify-center space-x-2 hover:bg-[#006396] shadow-md"
                  >
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

                  {/* Learner success stories */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <h4 className="text-lg font-bold text-primary">Success Stories</h4>
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Illustrative examples</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          name: 'Ashish Agarwal',
                          experience: '10 Years of Experience',
                          before: 'Assistant Manager',
                          after: 'Standards & Regulation Manager',
                          year: '2024',
                          avatarSeed: 'ashish',
                          fromBadge: 'S',
                          toBadge: 'R',
                        },
                        {
                          name: 'Vivek Chandra',
                          experience: '14.5 Years of Experience',
                          before: 'Senior Lead Software Engineer (L5)',
                          after: 'Founder & Director',
                          year: '2025',
                          avatarSeed: 'vivek',
                          fromBadge: 'L5',
                          toBadge: 'F',
                        },
                        {
                          name: 'Vishal Nihalani',
                          experience: '2.5 Years of Experience',
                          before: 'Deputy Branch Manager',
                          after: 'Manager, Product & Partnerships',
                          year: '2024',
                          avatarSeed: 'vishal',
                          fromBadge: 'D',
                          toBadge: 'P',
                        },
                        {
                          name: 'Rohan Mehta',
                          experience: '6 Years of Experience',
                          before: 'QA Engineer',
                          after: 'ML Engineer',
                          year: '2024',
                          avatarSeed: 'rohan',
                          fromBadge: 'QA',
                          toBadge: 'ML',
                        },
                        {
                          name: 'Ananya Sharma',
                          experience: '4 Years of Experience',
                          before: 'Data Analyst',
                          after: 'Product Analyst',
                          year: '2025',
                          avatarSeed: 'ananya',
                          fromBadge: 'DA',
                          toBadge: 'PA',
                        },
                        {
                          name: 'Meera Iyer',
                          experience: '8 Years of Experience',
                          before: 'Operations Manager',
                          after: 'Business Analyst',
                          year: '2023',
                          avatarSeed: 'meera',
                          fromBadge: 'OM',
                          toBadge: 'BA',
                        },
                      ].slice(0, 4).map((learner) => (
                        <div
                          key={learner.name}
                          className="bg-white rounded-3xl border border-gray-200 p-7 shadow-sm relative overflow-hidden"
                        >
                          <div className="absolute -top-10 -right-10 w-28 h-28 bg-secondary/5 rounded-full blur-2xl" />

                          <div className="relative z-10 flex items-start gap-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm relative">
                              <Image
                                src={`https://picsum.photos/seed/${learner.avatarSeed}/100/100`}
                                alt={`${learner.name} avatar`}
                                fill
                                className="object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-3">
                                <h4 className="font-bold text-primary text-lg leading-tight">{learner.name}</h4>
                                <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shrink-0">
                                  Alumni
                                </span>
                              </div>

                              <div className="mt-2 flex items-center justify-between gap-3">
                                <div className="text-xs text-gray-500 font-bold">{learner.experience}</div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                  {learner.year}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 relative z-10 flex flex-col gap-4">
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="text-sm font-bold text-primary leading-snug">{learner.before}</div>
                                  <div className="text-[11px] text-gray-500 mt-1">From role</div>
                                </div>
                                <div className="w-10 h-10 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary flex items-center justify-center font-black text-xs shrink-0">
                                  {learner.fromBadge}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-center gap-4">
                              <div className="h-px flex-1 bg-gray-200" />
                              <ArrowRight size={18} className="text-secondary shrink-0" />
                              <div className="h-px flex-1 bg-gray-200" />
                            </div>

                            <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="text-sm font-bold text-secondary leading-snug">{learner.after}</div>
                                  <div className="text-[11px] text-gray-500 mt-1">To role</div>
                                </div>
                                <div className="w-10 h-10 rounded-2xl bg-secondary/10 border border-secondary/20 text-accent flex items-center justify-center font-black text-xs shrink-0">
                                  {learner.toBadge}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => setShowAskAlumniModal(true)}
                              className="w-full flex items-center justify-center space-x-2 text-primary font-bold bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-3 rounded-2xl text-sm transition-colors"
                            >
                              <MessageSquare size={16} className="text-secondary" />
                              <span>Request a 15-min AMA</span>
                            </button>
                          </div>
                        </div>
                      ))}
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

          {/* Meet the Faculty */}
          <section className="mt-6">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Meet the Faculty Behind the {p.name} Programme
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl">
              A blend of experienced educators and industry leaders guiding you through applied learning and career-ready outcomes.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Dr. Rajendra Srivastava',
                  title: 'Professor, Marketing Strategy & Innovation',
                  bio: 'Senior faculty with deep experience in building data-driven go-to-market strategies and leadership frameworks.',
                  avatarSeed: 'rajendra',
                },
                {
                  name: 'Manish Gangwar',
                  title: 'Associate Professor, Product Management & Analytics',
                  bio: 'Guides learners through practical product thinking, experimentation, and measurable decision making.',
                  avatarSeed: 'manish',
                },
                {
                  name: 'Dr. Priya Kapoor',
                  title: 'Professor of Practice, AI & Product Strategy',
                  bio: 'Focuses on applying Generative AI responsibly and turning insights into product execution.',
                  avatarSeed: 'priya',
                },
                {
                  name: 'Arjun Mehta',
                  title: 'Adjunct Faculty, Growth, Pricing & Lifecycle',
                  bio: 'Helps learners master customer-centric metrics, pricing strategy, and growth operations.',
                  avatarSeed: 'arjun',
                },
              ].map((faculty) => (
                <div key={faculty.name} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 flex gap-5 items-start">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100 shrink-0 relative bg-gray-50">
                      <Image
                        src={`https://picsum.photos/seed/${faculty.avatarSeed}/160/160`}
                        alt={`${faculty.name} photo`}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-primary font-bold text-lg">{faculty.name}</div>
                      <div className="text-sm font-semibold text-gray-600 mt-1">{faculty.title}</div>
                      <p className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-3">{faculty.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
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
                  <div key={simP.id} className="bg-white rounded-xl border border-gray-200 overflow-visible hover:shadow-lg hover:border-primary/20 transition-all flex flex-col">
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
                      <div className="flex items-center justify-between pt-3 pb-4 border-t border-gray-100 mt-auto">
                        <button
                          onClick={() => { setSelectedProgram(simP); router.push(`/programs/${simP.id}`); }}
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
