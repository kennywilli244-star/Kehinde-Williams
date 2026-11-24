import React from 'react';

interface LogoProps {
  compact?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ compact = false, className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-3 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 drop-shadow-[0_0_10px_rgba(0,191,255,0.3)]"
      >
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="14"
          fill="#172338"
          stroke="rgba(0, 191, 255, 0.45)"
          strokeWidth="2"
        />
        <path
          d="M16 18H22V30L33 18H41L29 31L42 46H34L22 33V46H16V18Z"
          fill="#F5F2EA"
        />
        <path
          d="M43 18H50.5C55 18 58 20.4 58 24.2C58 26.7 56.7 28.5 54.6 29.4C57.3 30.3 59 32.4 59 35.4C59 39.7 55.7 43 50.6 43H43V18ZM48.5 27.6H50.7C52.3 27.6 53.3 26.8 53.3 25.4C53.3 24 52.3 23.2 50.7 23.2H48.5V27.6ZM48.5 37.8H51.1C53.7 37.8 54.1 36.9 54.1 35.3C54.1 33.7 53 32.8 51.1 32.8H48.5V37.8Z"
          fill="#00BFFF"
        />
      </svg>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-tight text-[#F5F2EA]">
          KBAmidele <span className="text-[#00BFFF]">Dev</span>
        </span>
      )}
    </span>
  );
};
