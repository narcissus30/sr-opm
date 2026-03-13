'use client';

import React, { useState } from 'react';
import { HelpCircle, TrendingUp } from 'lucide-react';

const ROI_CALCULATION = 'ROI Score is based on (Average Salary Hike % ÷ Program Fee Impact). Higher score = better value for investment. Scale: 1–10.';

export function ROITooltip({ score, className = '', iconSize = 14 }: { score?: number; className?: string; iconSize?: number }) {
  const [show, setShow] = useState(false);
  return (
    <span className={`relative inline-flex items-center gap-1 ${className}`}>
      {score != null && (
        <>
          <TrendingUp className="text-accent" size={iconSize} />
          <span className="font-bold text-primary">ROI: {score}/10</span>
        </>
      )}
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="inline-flex text-gray-400 hover:text-accent focus:outline-none focus:ring-0"
        aria-label="How is ROI calculated?"
      >
        <HelpCircle size={iconSize} />
      </button>
      {show && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl z-50 pointer-events-none"
          role="tooltip"
        >
          {ROI_CALCULATION}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </span>
  );
}

export function ROITooltipInline({ className = '' }: { className?: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className={`relative inline-flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="inline-flex text-gray-400 hover:text-accent focus:outline-none"
        aria-label="How is ROI calculated?"
      >
        <HelpCircle size={14} />
      </button>
      {show && (
        <div
          className="absolute bottom-full left-0 mb-2 w-56 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl z-50 pointer-events-none"
          role="tooltip"
        >
          {ROI_CALCULATION}
          <div className="absolute top-full left-4 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </span>
  );
}
