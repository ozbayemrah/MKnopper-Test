import React, { useState } from 'react';
import { Scale } from 'lucide-react';

export function ParagraphSeal({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="100"
        cy="100"
        r="82"
        stroke="currentColor"
        strokeWidth="18"
      />
      <path
        d="M114 48c-15-6-34 2-36 18-2 15 12 24 27 32 14 7 25 14 23 28-2 13-16 21-30 18-12-3-20-11-22-21"
        stroke="currentColor"
        strokeWidth="15"
        strokeLinecap="round"
      />
      <path
        d="M86 152c15 6 34-2 36-18 2-15-12-24-27-32-14-7-25-14-23-28 2-13 16-21 30-18 12 3 20 11 22 21"
        stroke="currentColor"
        strokeWidth="15"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface MartinKnopperLogoProps {
  variant?: 'compact' | 'stacked';
  subLabel?: string;
  invertOnDarkBg?: boolean;
  className?: string;
}

/**
 * Custom lockup matching Logo_Martin_Knopper_Steuerberatung_print.pdf:
 * Lowercase Playfair Display wordmark in brand orange with the circular § emblem
 * replacing the dot on the letter "i" in "martin".
 */
export function MartinKnopperLogo({
  variant = 'compact',
  subLabel = 'steuerberatung',
  invertOnDarkBg = false,
  className = '',
}: MartinKnopperLogoProps) {
  const renderDotlessIWithSeal = (sealSizeClass: string, topOffsetClass: string) => (
    <span className="relative inline-block">
      <span>ı</span>
      <ParagraphSeal
        className={`absolute left-1/2 -translate-x-1/2 ${topOffsetClass} ${sealSizeClass} text-[#E86404] dark:text-[#F0781E]`}
      />
    </span>
  );

  if (variant === 'compact') {
    return (
      <span
        className={`font-wordmark inline-flex items-baseline gap-1.5 font-bold tracking-tight text-[#E86404] dark:text-[#F0781E] leading-none select-none ${className}`}
      >
        <span>
          mart{renderDotlessIWithSeal('w-2.5 h-2.5', '-top-[0.18em]')}n
        </span>
        <span>knopper</span>
      </span>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center leading-none select-none ${className}`}>
      <div className="font-wordmark text-2xl sm:text-3xl font-bold tracking-tight text-[#E86404] dark:text-[#F0781E] flex flex-col items-center">
        <span className="leading-[0.88]">
          mart{renderDotlessIWithSeal('w-3 h-3', '-top-[0.22em]')}n
        </span>
        <span className="leading-[0.94]">knopper</span>
      </div>
      <span
        className={`mt-1.5 text-[11px] font-semibold tracking-[0.08em] ${
          invertOnDarkBg
            ? 'text-slate-200'
            : 'text-[#14285C] dark:text-slate-200'
        }`}
      >
        {subLabel}
      </span>
    </div>
  );
}

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  subCaption?: string;
  className?: string;
  imgClassName?: string;
}

export function EditorialImage({
  src,
  alt,
  caption,
  subCaption,
  className = '',
  imgClassName = '',
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={`relative overflow-hidden rounded-2xl border border-[#14285C]/12 dark:border-slate-800 bg-[#F4F4FA] dark:bg-[#121C33] ${className}`}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      ) : (
        <div className="w-full h-full min-h-[260px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#F4F4FA] via-white to-[#E86404]/10 dark:from-[#121C33] dark:via-[#0B1120] dark:to-[#F0781E]/15">
          <Scale className="w-10 h-10 text-[#E86404] dark:text-[#F0781E] mb-3" />
          <p className="text-sm font-semibold text-[#14285C] dark:text-slate-100">
            {alt}
          </p>
        </div>
      )}
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1120]/90 via-[#0B1120]/55 to-transparent px-5 pt-10 pb-4 text-white">
          <p className="text-sm font-semibold tracking-tight">{caption}</p>
          {subCaption && (
            <p className="text-xs text-slate-200 mt-0.5">{subCaption}</p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
