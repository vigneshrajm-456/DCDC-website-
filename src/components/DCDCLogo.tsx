import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const DCDCLogo: React.FC<LogoProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      <defs>
        {/* Core golden-pink metallic gradient */}
        <linearGradient id="dcdcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" /> {/* Amber 500 */}
          <stop offset="50%" stopColor="#ec4899" /> {/* Pink 500 */}
          <stop offset="100%" stopColor="#eab308" /> {/* Yellow 500 */}
        </linearGradient>
        
        {/* Soft back shadow */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer rounded stylized D path representing Digital & Design */}
      <path
        d="M20 15 H50 C68 15 82 29 82 47 C82 65 68 79 50 79 H20 C17.8 79 16 77.2 16 75 V19 C16 16.8 17.8 15 20 15 Z"
        stroke="url(#dcdcGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
      />

      {/* Styled Communication wave curves inside the 'D' */}
      <path
        d="M32 35 C38 48, 42 32, 48 45 C54 58, 58 42, 64 55"
        stroke="url(#dcdcGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Second inverse wave curve to represent phase modulations */}
      <path
        d="M32 55 C38 42, 42 58, 48 45 C54 32, 58 48, 64 35"
        stroke="#ffffff"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dynamic Digital node connectors / pulse particles */}
      <circle cx="32" cy="35" r="4" fill="#f59e0b" />
      <circle cx="48" cy="45" r="4.5" fill="#ec4899" />
      <circle cx="64" cy="55" r="4" fill="#eab308" />
    </svg>
  );
};
