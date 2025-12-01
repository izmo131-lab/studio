"use client";

import Image from 'next/image';

export default function IvoraLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/imatge-removebg-preview.png"
      alt="Ivore Logistics Logo"
      width={160}
      height={40}
      className={className}
      priority
    />
  );
}
