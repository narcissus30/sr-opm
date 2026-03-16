'use client';

import React, { useMemo } from 'react';

function escapeXml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function createCertificateSvg(params: {
  programName: string;
  specialization?: string;
  university: string;
  learnerName: string;
  issueDateLabel: string;
}) {
  const programLine = params.specialization
    ? `${params.programName} — ${params.specialization}`
    : params.programName;

  const title = escapeXml('Certificate of Completion');
  const learnerName = escapeXml(params.learnerName.toUpperCase());
  const university = escapeXml(params.university);
  const program = escapeXml(programLine);
  const issueDate = escapeXml(params.issueDateLabel);

  // A clean, neutral, original certificate design (no Manipal assets).
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0f766e"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
    <radialGradient id="seal" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#b45309" stop-opacity="0.12"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#0b1220" flood-opacity="0.10"/>
    </filter>
    <pattern id="microgrid" width="18" height="18" patternUnits="userSpaceOnUse">
      <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#0b1220" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect x="0" y="0" width="1200" height="720" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="720" fill="url(#microgrid)"/>

  <!-- Outer frame -->
  <rect x="70" y="60" width="1060" height="600" rx="28" fill="#ffffff" stroke="#e5e7eb" stroke-width="2" filter="url(#shadow)"/>

  <!-- Top ribbon -->
  <path d="M 70 120 C 260 40, 420 40, 610 120 S 960 200, 1130 120 L 1130 60 L 70 60 Z" fill="url(#ribbon)" opacity="0.10"/>
  <rect x="70" y="60" width="1060" height="10" fill="url(#ribbon)" opacity="0.75"/>

  <!-- Header -->
  <text x="600" y="170" text-anchor="middle" font-family="ui-serif, Georgia, serif" font-size="54" font-weight="700" fill="#0b1220">${title}</text>
  <text x="600" y="208" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="16" letter-spacing="3" font-weight="800" fill="#64748b">ONLINE DEGREE • VERIFIED</text>

  <!-- Learner -->
  <text x="600" y="300" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="18" font-weight="700" fill="#475569">THIS CERTIFIES THAT</text>
  <text x="600" y="358" text-anchor="middle" font-family="ui-serif, Georgia, serif" font-size="44" font-weight="800" fill="#111827">${learnerName}</text>
  <path d="M 320 380 L 880 380" stroke="#e2e8f0" stroke-width="2"/>

  <!-- Program -->
  <text x="600" y="430" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="18" font-weight="700" fill="#475569">HAS SUCCESSFULLY COMPLETED</text>
  <text x="600" y="480" text-anchor="middle" font-family="ui-serif, Georgia, serif" font-size="34" font-weight="800" fill="#0f172a">${program}</text>
  <text x="600" y="520" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="18" font-weight="800" fill="#0f766e">${university}</text>

  <!-- Seal -->
  <g transform="translate(210 500)">
    <circle cx="0" cy="0" r="62" fill="url(#seal)" stroke="#b45309" stroke-opacity="0.35" stroke-width="2"/>
    <circle cx="0" cy="0" r="44" fill="none" stroke="#b45309" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="6 6"/>
    <text x="0" y="-6" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="12" font-weight="900" fill="#92400e">OFFICIAL</text>
    <text x="0" y="16" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="12" font-weight="900" fill="#92400e">SEAL</text>
  </g>

  <!-- Signature blocks -->
  <g>
    <path d="M 330 585 L 510 585" stroke="#cbd5e1" stroke-width="2"/>
    <text x="420" y="612" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="12" font-weight="800" fill="#64748b">Program Director</text>
  </g>
  <g>
    <path d="M 690 585 L 870 585" stroke="#cbd5e1" stroke-width="2"/>
    <text x="780" y="612" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="12" font-weight="800" fill="#64748b">Registrar</text>
  </g>

  <!-- Footer -->
  <text x="600" y="648" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="12" font-weight="700" fill="#94a3b8">Issued: ${issueDate} • Credential ID: SR-OPM-000000</text>
</svg>`;
}

export default function DegreePreview(props: {
  programName: string;
  specialization?: string;
  university: string;
  learnerName?: string;
  issueDateLabel?: string;
  className?: string;
}) {
  const svg = useMemo(() => {
    return createCertificateSvg({
      programName: props.programName,
      specialization: props.specialization,
      university: props.university,
      learnerName: props.learnerName ?? 'Sample Name',
      issueDateLabel: props.issueDateLabel ?? 'Aug 2026',
    });
  }, [props.programName, props.specialization, props.university, props.learnerName, props.issueDateLabel]);

  const dataUri = useMemo(() => {
    // encodeURIComponent keeps it lightweight and safe for an <img src>
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }, [svg]);

  return (
    <div className={props.className ?? 'w-full'}>
      <div className="relative w-full pb-[60%]">
        <img
          src={dataUri}
          alt="Sample degree certificate preview"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

