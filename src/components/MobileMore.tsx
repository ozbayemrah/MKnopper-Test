import React, { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface MobileMoreProps {
  moreLabel: string;
  lessLabel: string;
  children: React.ReactNode;
}

/**
 * Phones only: keeps secondary section content collapsed behind a "show more" button
 * so the one-page site stays short. From md (768px) up the content is always visible
 * and the button is hidden.
 */
export function MobileMore({ moreLabel, lessLabel, children }: MobileMoreProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <>
      <div id={id} className={open ? '' : 'max-md:hidden'}>
        {children}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden mt-4 w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl border border-[#102D69]/20 dark:border-neutral-700 bg-white dark:bg-[#121212] text-sm font-semibold text-[#102D69] dark:text-neutral-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EC6608]"
      >
        <span>{open ? lessLabel : moreLabel}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
    </>
  );
}
