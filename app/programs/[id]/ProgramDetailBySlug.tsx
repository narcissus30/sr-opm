'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/hooks/use-app';
import { PROGRAMS } from '@/lib/data';
import ProgramDetailPage from '@/components/ProgramDetailPage';

export default function ProgramDetailBySlug({ id }: { id: string }) {
  const { setSelectedProgram } = useApp();
  const program = PROGRAMS.find((p) => p.id === id);

  useEffect(() => {
    const p = PROGRAMS.find((x) => x.id === id);
    if (p) setSelectedProgram(p);
  }, [id, setSelectedProgram]);

  if (!program) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Program not found</h1>
        <p className="text-gray-500 mb-6">We couldn&apos;t find a program with that ID.</p>
        <Link href="/browse" className="text-primary font-bold hover:underline">
          Browse all programs
        </Link>
      </div>
    );
  }

  return <ProgramDetailPage initialProgram={program} />;
}
