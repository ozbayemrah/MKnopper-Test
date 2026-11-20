import React, { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, ShieldCheck, Star } from 'lucide-react';
import { PracticeContent } from '../data/content';

interface TestimonialsSliderSectionProps {
  content: PracticeContent;
}

export function TestimonialsSliderSection({ content }: TestimonialsSliderSectionProps) {
  const items = content.testimonials.items;
  const [activeIndex, setActiveIndex] = useState(0);

  const total = items.length;
  const current = items[activeIndex] ?? items[0];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  if (!current) return null;

  const formattedIndex = String(activeIndex + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <section
      id="testimonials"
      className="py-14 sm:py-20 bg-[#F4F4FA]/70 dark:bg-[#0D1424] border-b border-[#14285C]/10 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row + Quantitative Rating Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#E86404] dark:text-[#F0781E] mb-3">
              {content.testimonials.kicker}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14285C] dark:text-white tracking-tight mb-3 text-balance">
              {content.testimonials.title}
            </h2>
            <p className="text-base sm:text-lg text-[#26304A] dark:text-slate-300 leading-relaxed">
              {content.testimonials.subtitle}
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-[#121C33] border border-[#14285C]/12 dark:border-slate-800 px-5 py-4 shrink-0">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono-tabular text-2xl font-extrabold text-[#14285C] dark:text-white">
                {content.testimonials.ratingSummary}
              </span>
              <div className="flex items-center gap-0.5 text-[#E86404] dark:text-[#F0781E]" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((starIdx) => (
                  <Star key={starIdx} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-xs font-medium text-[#26304A]/80 dark:text-slate-300 max-w-[260px]">
              {content.testimonials.ratingCountLabel}
            </p>
          </div>
        </div>

        {/* Interactive Carousel Region */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={content.testimonials.kicker}
          onKeyDown={handleKeyDown}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* Active Spotlight Testimonial Card */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#121C33] border border-[#14285C]/12 dark:border-slate-800 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Top Meta & Controls Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#14285C]/10 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E86404]/10 dark:bg-[#F0781E]/15 text-[#E86404] dark:text-[#F0781E] flex items-center justify-center shrink-0">
                    <Quote className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex items-center gap-1 text-[#E86404] dark:text-[#F0781E]" aria-label={`${current.rating} / 5`}>
                    {Array.from({ length: current.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono-tabular text-xs font-bold text-[#14285C]/70 dark:text-slate-300 mr-2">
                    {formattedIndex} / {formattedTotal}
                  </span>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label={content.testimonials.prevLabel}
                    className="w-11 h-11 inline-flex items-center justify-center rounded-xl border border-[#14285C]/15 dark:border-slate-700 bg-[#FAFBFD] dark:bg-[#0B1120] text-[#14285C] dark:text-slate-100 hover:border-[#E86404] hover:text-[#E86404] dark:hover:border-[#F0781E] dark:hover:text-[#F0781E] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E86404]"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label={content.testimonials.nextLabel}
                    className="w-11 h-11 inline-flex items-center justify-center rounded-xl border border-[#14285C]/15 dark:border-slate-700 bg-[#FAFBFD] dark:bg-[#0B1120] text-[#14285C] dark:text-slate-100 hover:border-[#E86404] hover:text-[#E86404] dark:hover:border-[#F0781E] dark:hover:text-[#F0781E] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E86404]"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Quote Body */}
              <div aria-live="polite" className="transition-opacity duration-200">
                <blockquote className="text-lg sm:text-xl lg:text-[22px] font-medium text-[#14285C] dark:text-white leading-relaxed mb-6">
                  „{current.quote}“
                </blockquote>

                <p className="text-sm font-semibold text-[#E86404] dark:text-[#F0781E] mb-6">
                  {current.outcome}
                </p>
              </div>
            </div>

            {/* Clean Unboxed Client Attribution Footer */}
            <div className="pt-5 border-t border-[#14285C]/10 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="text-base font-bold text-[#14285C] dark:text-white">
                  {current.authorLabel}
                </p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#26304A]/80 dark:text-slate-300 mt-0.5">
                  <span>{current.role}</span>
                  <span aria-hidden="true">·</span>
                  <span>{current.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#26304A]/75 dark:text-slate-400">
                <span>{current.scope}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">{current.since}</span>
              </div>
            </div>
          </div>

          {/* Interactive Mandate Selector Column (Desktop) / Compact Progress Controls (Mobile) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            <div
              role="tablist"
              aria-label={content.testimonials.slideNavLabel}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 flex-1"
            >
              {items.map((item, idx) => {
                const isActive = idx === activeIndex;
                const itemNumber = String(idx + 1).padStart(2, '0');
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full min-h-[44px] text-left rounded-xl p-4 sm:p-5 border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E86404] ${
                      isActive
                        ? 'bg-[#14285C] dark:bg-[#193270] text-white border-[#14285C] dark:border-[#F0781E]/60'
                        : 'bg-white dark:bg-[#121C33] text-[#14285C] dark:text-slate-100 border-[#14285C]/10 dark:border-slate-800 hover:border-[#E86404]/50 dark:hover:border-[#F0781E]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-xs font-mono-tabular mb-1">
                          <span
                            className={
                              isActive
                                ? 'font-bold text-[#F0781E]'
                                : 'font-bold text-[#E86404] dark:text-[#F0781E]'
                            }
                          >
                            {itemNumber}
                          </span>
                          <span aria-hidden="true" className="opacity-50">
                            ·
                          </span>
                          <span className={isActive ? 'text-slate-200 truncate' : 'text-[#26304A]/75 dark:text-slate-400 truncate'}>
                            {item.location}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base font-bold leading-snug truncate">
                          {item.authorLabel}
                        </p>
                        <p
                          className={`text-xs mt-1 truncate ${
                            isActive
                              ? 'text-slate-200/90'
                              : 'text-[#26304A]/75 dark:text-slate-400'
                          }`}
                        >
                          {item.scope}
                        </p>
                      </div>

                      <div
                        className={`flex items-center gap-0.5 shrink-0 pt-0.5 ${
                          isActive
                            ? 'text-[#F0781E]'
                            : 'text-[#E86404]/75 dark:text-[#F0781E]/75'
                        }`}
                        aria-hidden="true"
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-mono-tabular text-xs font-bold ml-1">
                          {item.rating}.0
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Confidentiality Notice Footer (§ 80 WTBG) */}
            <div className="rounded-xl bg-white/80 dark:bg-[#121C33]/80 border border-[#14285C]/10 dark:border-slate-800 px-4 py-3 flex items-start gap-2.5">
              <ShieldCheck
                className="w-4 h-4 text-[#E86404] dark:text-[#F0781E] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-xs text-[#26304A]/85 dark:text-slate-300 leading-relaxed">
                {content.testimonials.confidentialityNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
