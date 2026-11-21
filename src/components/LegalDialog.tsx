import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { PracticeContent } from '../data/content';

interface LegalDialogProps {
  content: PracticeContent;
  open: boolean;
  /** Section to scroll to when the dialog opens */
  focus: 'imprint' | 'terms';
  onClose: () => void;
}

/** Impressum (§ 5 ECG) and the AGB note, taken from the client's current website. */
export function LegalDialog({ content, open, focus, onClose }: LegalDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const termsRef = useRef<HTMLElement>(null);
  const legal = content.legal;

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    if (focus === 'terms') termsRef.current?.scrollIntoView({ block: 'start' });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, focus, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-dialog-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#060F26]/65 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#060F26] border border-[#102D69]/15 dark:border-slate-800 p-5 sm:p-8 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <h2 id="legal-dialog-title" className="text-xl sm:text-2xl font-bold text-[#102D69] dark:text-white">
            {legal.dialogTitle}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={legal.closeLabel}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-[#102D69]/15 dark:border-slate-700 text-[#102D69] dark:text-slate-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EC6608]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <section aria-labelledby="legal-imprint" className="mb-8">
          <h3 id="legal-imprint" className="text-xs font-bold tracking-[0.18em] uppercase text-[#B84F05] dark:text-[#F28C45] mb-1">
            {legal.imprintHeading}
          </h3>
          <p className="text-sm text-[#5E6476] dark:text-slate-400 mb-4">{legal.disclosure}</p>
          <dl className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-6 gap-y-2 text-sm">
            {legal.rows.map((row) => (
              <React.Fragment key={`${row.label}-${row.value}`}>
                <dt className={`font-semibold text-[#102D69] dark:text-slate-200 ${row.label ? '' : 'sr-only sm:not-sr-only'}`}>
                  {row.label}
                </dt>
                <dd className={`text-[#1B1F2B] dark:text-slate-300 ${row.label ? 'mb-1 sm:mb-0' : 'font-semibold'}`}>
                  {row.href ? (
                    <a
                      href={row.href}
                      {...(row.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="underline decoration-[#EC6608]/60 underline-offset-2 hover:text-[#B84F05] dark:hover:text-[#F28C45]"
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </React.Fragment>
            ))}
          </dl>
        </section>

        <section ref={termsRef} aria-labelledby="legal-terms" className="scroll-mt-4">
          <h3 id="legal-terms" className="text-xs font-bold tracking-[0.18em] uppercase text-[#B84F05] dark:text-[#F28C45] mb-2">
            {legal.termsHeading}
          </h3>
          <p className="text-sm text-[#1B1F2B] dark:text-slate-300 leading-relaxed">{legal.termsText}</p>
        </section>
      </div>
    </div>
  );
}
