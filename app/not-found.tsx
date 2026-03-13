'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F9FC] p-4 text-center">
      <h2 className="text-4xl font-display font-bold text-primary mb-4">404 - Page Not Found</h2>
      <p className="text-gray-500 mb-8">Oops! The page you are looking for doesn&apos;t exist or has been moved.</p>
      <Link 
        href="/"
        className="btn-secondary px-8 py-3"
      >
        Return Home
      </Link>
    </div>
  );
}
