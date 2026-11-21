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
 * The client's original logo (Logo Martin Knopper Steuerberatung.svg), unchanged
 * except for a cropped viewBox. Wordmark stays in the original brand orange #EC6608.
 * The dark variant only swaps the navy "steuerberatung" line to white.
 */
export function MartinKnopperLogo({
  variant = 'compact',
  subLabel = 'steuerberatung',
  invertOnDarkBg = false,
  className = '',
}: MartinKnopperLogoProps) {
  const alt = `martin knopper ${subLabel}`;
  // Header: the horizontal logo from the Figma "Logo" component (single colour #EC6608,
  // readable on light and dark backgrounds)
  if (variant === 'compact') {
    return (
      <span className={`inline-flex select-none ${className}`}>
        <img src="brand/logo-mk-horizontal.svg" alt={alt} className="h-6 sm:h-8 w-auto" />
      </span>
    );
  }
  const size = 'h-16 sm:h-20';
  if (invertOnDarkBg) {
    return (
      <img src="brand/logo-mk-dark.svg" alt={alt} className={`${size} w-auto select-none ${className}`} />
    );
  }
  return (
    <span className={`inline-flex select-none ${className}`}>
      <img src="brand/logo-mk.svg" alt={alt} className={`${size} w-auto dark:hidden`} />
      <img src="brand/logo-mk-dark.svg" alt={alt} className={`${size} w-auto hidden dark:block`} />
    </span>
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
      className={`relative overflow-hidden rounded-2xl border border-[#102D69]/12 dark:border-neutral-800 bg-[#F3F5FA] dark:bg-[#1C1C1E] ${className}`}
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
        <div className="w-full h-full min-h-[260px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#F3F5FA] via-white to-[#EC6608]/10 dark:from-[#1C1C1E] dark:via-[#121212] dark:to-[#F28C45]/15">
          <Scale className="w-10 h-10 text-[#B84F05] dark:text-[#F28C45] mb-3" />
          <p className="text-sm font-semibold text-[#102D69] dark:text-neutral-100">
            {alt}
          </p>
        </div>
      )}
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#060F26]/90 via-[#060F26]/55 to-transparent px-5 pt-10 pb-4 text-white">
          <p className="text-sm font-semibold tracking-tight">{caption}</p>
          {subCaption && (
            <p className="text-xs text-slate-200 mt-0.5">{subCaption}</p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
