"use client";

import Image from 'next/image';

export default function IvoraLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/Captura de pantalla 2025-11-26 195640.png"
      alt="Ivore Logistics Logo"
      width={160}
      height={40}
      className={className}
      priority
    />
  );
}
