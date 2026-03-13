'use client';

import React, { useState, createContext, useContext } from 'react';
import { Program, PROGRAMS } from '@/lib/data';

interface QuizAnswers {
  field?: string;
  university_type?: string;
  budget?: string;
  weekly_time?: string;
  career_goal?: string;
  work_experience?: string;
}

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
}

interface AppContextType {
  view: 'home' | 'quiz' | 'results' | 'details' | 'listing';
  setView: (view: 'home' | 'quiz' | 'results' | 'details' | 'listing') => void;
  selectedProgram: Program | null;
  setSelectedProgram: (p: Program | null) => void;
  quizAnswers: QuizAnswers;
  setQuizAnswers: (a: QuizAnswers) => void;
  user: UserProfile;
  setUser: (u: UserProfile) => void;
  compareList: Program[];
  addToCompare: (p: Program) => void;
  removeFromCompare: (id: string) => void;
  isQuizCompleted: boolean;
  setIsQuizCompleted: (v: boolean) => void;
  showExpertModal: boolean;
  setShowExpertModal: (v: boolean) => void;
  showEmployerPitchModal: boolean;
  setShowEmployerPitchModal: (v: boolean) => void;
  showAskAlumniModal: boolean;
  setShowAskAlumniModal: (v: boolean) => void;
  currency: 'INR' | 'USD';
  setCurrency: (c: 'INR' | 'USD') => void;
  feedback: Record<string, 'like' | 'dislike' | null>;
  setFeedback: (id: string, type: 'like' | 'dislike' | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [view, setViewState] = useState<'home' | 'quiz' | 'results' | 'details' | 'listing'>('home');
  const setView = (v: 'home' | 'quiz' | 'results' | 'details' | 'listing') => {
    setViewState(v);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [user, setUser] = useState<UserProfile>({ fullName: '', email: '', phone: '', isLoggedIn: false });
  const [compareList, setCompareList] = useState<Program[]>([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [showEmployerPitchModal, setShowEmployerPitchModal] = useState(false);
  const [showAskAlumniModal, setShowAskAlumniModal] = useState(false);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [feedback, setFeedbackState] = useState<Record<string, 'like' | 'dislike' | null>>({});

  const setFeedback = (id: string, type: 'like' | 'dislike' | null) => {
    setFeedbackState(prev => ({ ...prev, [id]: type }));
  };

  const addToCompare = (p: Program) => {
    if (compareList.length < 3 && !compareList.find(item => item.id === p.id)) {
      setCompareList([...compareList, p]);
    }
  };

  const removeFromCompare = (id: string) => {
    setCompareList(compareList.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider value={{
      view, setView,
      selectedProgram, setSelectedProgram,
      quizAnswers, setQuizAnswers,
      user, setUser,
      compareList, addToCompare, removeFromCompare,
      isQuizCompleted, setIsQuizCompleted,
      showExpertModal, setShowExpertModal,
      showEmployerPitchModal, setShowEmployerPitchModal,
      showAskAlumniModal, setShowAskAlumniModal,
      currency, setCurrency,
      feedback, setFeedback
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
