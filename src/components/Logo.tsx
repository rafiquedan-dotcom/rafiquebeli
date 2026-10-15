import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSlogan = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { box: 'w-9 h-9', title: 'text-lg', slogan: 'text-[9px]' },
    md: { box: 'w-12 h-12', title: 'text-2xl', slogan: 'text-[11px]' },
    lg: { box: 'w-20 h-20', title: 'text-3xl', slogan: 'text-xs' },
    xl: { box: 'w-28 h-28', title: 'text-4xl', slogan: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Friendly Shopping Bag Mascot Logo Emblem */}
      <div
        className={`${currentSize.box} relative shrink-0 rounded-full bg-gradient-to-br from-amber-50 via-amber-100/80 to-sky-50 p-1 ring-2 ring-amber-400/80 shadow-sm flex items-center justify-center overflow-hidden transition-transform hover:scale-105`}
        title="rafiquebeli - shop smarter, happier"
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular Accent Outer Ring */}
          <circle cx="60" cy="60" r="56" stroke="#F59E0B" strokeWidth="4" strokeDasharray="3 3" opacity="0.4" />
          
          {/* Cute Heart Thought Bubble */}
          <g transform="translate(18, 16) scale(0.85)">
            <rect x="0" y="0" width="26" height="22" rx="8" fill="#F43F5E" />
            <path
              d="M13 16s-5.5-3.3-5.5-6.5C7.5 7.5 9 6 10.8 6c1 0 1.9.5 2.2 1.3.3-.8 1.2-1.3 2.2-1.3 1.8 0 3.3 1.5 3.3 3.5 0 3.2-5.5 6.5-5.5 6.5z"
              fill="white"
            />
            <path d="M10 22 L14 26 L16 22 Z" fill="#F43F5E" />
          </g>

          {/* Friendly Shopping Bag Character */}
          <path
            d="M48 42 C48 30, 72 30, 72 42"
            stroke="#1E293B"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M40 40 L80 40 L84 82 C84 87, 80 90, 75 90 L45 90 C40 90, 36 87, 36 82 Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* Bag Rosy Cheeks */}
          <circle cx="48" cy="67" r="4.5" fill="#FDA4AF" />
          <circle cx="72" cy="67" r="4.5" fill="#FDA4AF" />

          {/* Winking Face & Warm Smile */}
          <circle cx="51" cy="58" r="3.5" fill="#0F172A" />
          <circle cx="52.2" cy="57" r="1.2" fill="#FFFFFF" />
          
          <path
            d="M66 59 L73 55 L73 63"
            stroke="#0F172A"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          <path
            d="M55 69 Q60 76 65 69"
            stroke="#0F172A"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Speedy Shopping Cart */}
          <g transform="translate(74, 78) scale(0.65)">
            <path d="M0 6 H6 L12 24 H30 L34 10 H10" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="#FBBF24" />
            <circle cx="15" cy="28" r="3.5" fill="#0F172A" />
            <circle cx="27" cy="28" r="3.5" fill="#0F172A" />
            <line x1="-8" y1="12" x2="-2" y2="12" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            <line x1="-6" y1="18" x2="0" y2="18" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className={`font-black tracking-tight leading-none ${currentSize.title} flex items-center`}>
          <span className="text-amber-500 hover:text-amber-600 transition-colors drop-shadow-xs">rafique</span>
          <span className="text-sky-500 hover:text-sky-600 transition-colors drop-shadow-xs ml-0.5">beli</span>
        </div>
        {showSlogan && (
          <span className={`text-slate-500 font-semibold tracking-wider lowercase mt-0.5 font-display ${currentSize.slogan}`}>
            shop smarter, happier
          </span>
        )}
      </div>
    </div>
  );
};
