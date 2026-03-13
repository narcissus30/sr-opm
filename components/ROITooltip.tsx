'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, TrendingUp } from 'lucide-react';

const ROI_CALCULATION = 'ROI Score is based on (Average Salary Hike % ÷ Program Fee Impact). Higher score = better value for investment. Scale: 1–10.';

export function ROITooltip({ score, className = '', iconSize = 14 }: { score?: number; className?: string; iconSize?: number }) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!show || typeof document === 'undefined') return;
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCoords({
      left: rect.left + rect.width / 2,
      top: rect.top,
    });
  }, [show]);

  return (
    <>
      <span className={`relative inline-flex items-center gap-1 ${className}`}>
        {score != null && (
          <>
            <TrendingUp className="text-accent" size={iconSize} />
            <span className="font-bold text-primary">ROI: {score}/10</span>
          </>
        )}
        <button
          ref={triggerRef}
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
      </span>
      {show && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed w-56 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl z-[9999] pointer-events-none"
          style={{
            left: coords.left,
            top: coords.top - 8,
            transform: 'translate(-50%, -100%)',
          }}
          role="tooltip"
        >
          {ROI_CALCULATION}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-gray-900" />
        </div>,
        document.body
      )}
    </>
  );
}

export function ROITooltipInline({ className = '' }: { className?: string }) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!show || typeof document === 'undefined') return;
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCoords({ left: rect.left, top: rect.top });
  }, [show]);

  return (
    <>
      <span className={`relative inline-flex items-center gap-1.5 ${className}`}>
        <button
          ref={triggerRef}
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
      </span>
      {show && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed w-56 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl z-[9999] pointer-events-none"
          style={{
            left: coords.left,
            top: coords.top - 8,
            transform: 'translateY(-100%)',
          }}
          role="tooltip"
        >
          {ROI_CALCULATION}
          <div className="absolute top-full left-4 border-[6px] border-transparent border-t-gray-900" />
        </div>,
        document.body
      )}
    </>
  );
}
