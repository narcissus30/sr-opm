'use client';

import React, { useState } from 'react';
import { useApp } from '@/hooks/use-app';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'field',
    question: "What field do you want your online master's in?",
    options: [
      { name: 'MBA / Business', subtitle: 'Leadership, management and strategy careers' },
      { name: 'Data Science / AI', subtitle: 'Machine learning, AI and analytics roles' },
      { name: 'Computer Science', subtitle: 'Advanced software engineering roles' },
      { name: 'Cybersecurity', subtitle: 'Security engineering and cyber defense' },
      { name: 'Finance / Accounting', subtitle: 'Corporate finance and investment careers' },
    ]
  },
  {
    id: 'university_type',
    question: "Where would you prefer to study?",
    options: ['Indian Universities', 'International Universities', 'Both']
  },
  {
    id: 'budget',
    question: "What is your budget?",
    options: ['Under ₹1L', '₹1L–₹2L', '₹2L–₹5L', '₹5L–₹10L', '₹10L+']
  },
  {
    id: 'weekly_time',
    question: "How much time can you dedicate weekly?",
    options: ['5–10 hours', '10–15 hours', '15+ hours']
  },
  {
    id: 'career_goal',
    question: "What is your main goal?",
    options: ['Career Growth', 'Career Switch', 'Salary Increase', 'Global Opportunities']
  },
  {
    id: 'work_experience',
    question: "Your work experience?",
    options: ['0–2 years', '2–5 years', '5–10 years', '10+ years']
  }
];

export default function QuizFlow() {
  const { quizAnswers, setQuizAnswers, setView, setIsQuizCompleted } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentQuestion = QUESTIONS[currentStep];

  const handleOptionSelect = (option: string) => {
    setQuizAnswers({ ...quizAnswers, [currentQuestion.id]: option });
    if (currentStep < QUESTIONS.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      setIsQuizCompleted(true);
      setView('results');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    } else {
      setView('home');
    }
  };

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-500 hover:text-primary font-medium"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <span className="text-sm font-bold text-gray-400">Step {currentStep + 1} of {QUESTIONS.length}</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary text-center">
              {currentQuestion.question}
            </h2>

            <div className="grid gap-4">
              {currentQuestion.options.map((opt: any) => {
                const name = typeof opt === 'string' ? opt : opt.name;
                const subtitle = typeof opt === 'string' ? null : opt.subtitle;
                const isSelected = quizAnswers[currentQuestion.id as keyof typeof quizAnswers] === name;

                return (
                  <button
                    key={name}
                    onClick={() => handleOptionSelect(name)}
                    className={`
                      w-full p-6 text-left rounded-2xl border-2 transition-all group
                      ${isSelected 
                        ? 'border-secondary bg-secondary/5 shadow-md' 
                        : 'border-gray-100 bg-white hover:border-secondary/30 hover:shadow-sm'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`text-xl font-bold ${isSelected ? 'text-secondary' : 'text-primary'}`}>
                          {name}
                        </div>
                        {subtitle && <div className="text-sm text-gray-500 mt-1">{subtitle}</div>}
                      </div>
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${isSelected ? 'bg-secondary border-secondary text-white' : 'border-gray-200 group-hover:border-secondary/30'}
                      `}>
                        {isSelected && <Check size={14} />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
