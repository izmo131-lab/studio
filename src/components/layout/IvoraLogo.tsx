export default function IvoraLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ivora Logistics Logo"
    >
      <g fill="currentColor">
        {/* I */}
        <path d="M0 13H24V15.5H0z M0 18.5H24V21H0z M0 24H24V26.5H0z" />
        {/* v */}
        <path d="M29 13L37 32L45 13H51L40 38L26 13H29z" />
        {/* o - tire */}
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M62 25.5C69.4558 25.5 75.5 19.4558 75.5 12C75.5 4.54416 69.4558 -1.5 62 -1.5C54.5442 -1.5 48.5 4.54416 48.5 12C48.5 19.4558 54.5442 25.5 62 25.5ZM62 22.5C67.799 22.5 72.5 17.799 72.5 12C72.5 6.20101 67.799 1.5 62 1.5C56.201 1.5 51.5 6.20101 51.5 12C51.5 17.799 56.201 22.5 62 22.5Z"
            transform="translate(0, 14)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M62 17.5C65.0376 17.5 67.5 15.0376 67.5 12C67.5 8.96243 65.0376 6.5 62 6.5C58.9624 6.5 56.5 8.96243 56.5 12C56.5 15.0376 58.9624 17.5 62 17.5ZM62 15.5C63.933 15.5 65.5 13.933 65.5 12C65.5 10.067 63.933 8.5 62 8.5C60.067 8.5 58.5 10.067 58.5 12C58.5 13.933 60.067 15.5 62 15.5Z"
            transform="translate(0, 14)"
          />
          {/* Spokes */}
          <path d="M62 11.25V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="translate(0, 14)" />
          <path d="M62 24.5V18.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="translate(0, 14)" />
          <path d="M67.75 12H73.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="translate(0, 14)" />
          <path d="M50.5 12H56.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="translate(0, 14)" />
          <path d="M66.39 16.39L70.43 20.43" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="translate(0, 14)" />
          <path d="M53.57 3.56995L57.61 7.60995" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="translate(0, 14)" />
          <path d="M66.39 7.60999L70.43 3.56999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="translate(0, 14)" />
          <path d="M53.57 20.43L57.61 16.39" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="translate(0, 14)" />
        </g>
        {/* r */}
        <path d="M82 32.5C80.24 32.5 78.5 32.5 76.84 32.5C76.84 30.5 76.84 21.25 76.84 19.25C78.5 19.25 80.24 19.25 82 19.25C84.02 19.25 85.73 20.12 86.81 21.64C87.88 23.16 88.19 25.11 87.65 27.02C87.11 28.93 85.77 30.6 84.02 31.56C83.35 31.94 82.68 32.5 82 32.5ZM82.25 22C80.5 22 79.5 22 79.5 22V30H81.38C83.69 30 85.25 28.56 85.25 26.5C85.25 24.44 83.69 22.88 82.25 22Z" />
        {/* e */}
        <path d="M100.27 31.33C98.24 32.74 95.73 33.25 93.21 32.72C89.52 31.92 86.89 28.87 86.58 25.13C86.1 19.64 90.02 14.61 95.42 14.2C100.82 13.79 105.74 17.58 106.49 23.01H103.51C102.83 19.25 99.53 16.59 95.83 16.92C92.13 17.25 89.28 20.31 89.51 24.08C89.74 27.85 92.83 30.65 96.6 30.43C98.48 30.33 100.12 29.54 101.21 28.25L98.5 26.15H94.25V23.5H104.5V25.25L100.27 31.33Z" />
        {/* LOGISTICS */}
        <text
          x="100"
          y="42"
          fontFamily="Inter, sans-serif"
          fontSize="5.5"
          textAnchor="middle"
          letterSpacing="0.1em"
        >
          LOGISTICS
        </text>
      </g>
    </svg>
  );
}