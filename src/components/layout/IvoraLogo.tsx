"use client";

export default function IvoraLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ivore Logistics Logo"
    >
      <style>
        {`
          .logo-text {
            font-family: 'Inter', sans-serif;
            font-weight: 700;
            font-size: 16px;
            fill: hsl(var(--foreground));
          }
          .logo-wheel-spoke {
            stroke: hsl(var(--primary));
            stroke-width: 1.5;
          }
          .logo-wheel-hub {
            fill: hsl(var(--primary));
          }
        `}
      </style>
      
      {/* Ivore */}
      <text x="5" y="27" className="logo-text">Iv</text>
      
      {/* Stylized 'o' as a wheel */}
      <g transform="translate(30, 18)">
        <circle cx="0" cy="0" r="10" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="2" className="logo-wheel-hub" />
        <line x1="0" y1="-10" x2="0" y2="10" className="logo-wheel-spoke" />
        <line x1="-8.66" y1="5" x2="8.66" y2="-5" className="logo-wheel-spoke" />
        <line x1="-8.66" y1="-5" x2="8.66" y2="5" className="logo-wheel-spoke" />
      </g>
      
      <text x="43" y="27" className="logo-text">re</text>
      
      {/* Logistics */}
      <text x="63" y="27" className="logo-text" fontWeight="500">Logistics</text>
    </svg>
  );
}
