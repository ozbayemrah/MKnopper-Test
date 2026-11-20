import React from 'react';
import { ArrowRight, CalendarCheck, Moon, Sun } from 'lucide-react';
import { PracticeContent } from '../data/content';
import { Locale, Theme } from '../types/app';
import { EditorialImage, ParagraphSeal } from './BrandMark';

interface HeroSectionProps {
  content: PracticeContent;
  locale: Locale;
  theme: Theme;
  onChangeLocale: (locale: Locale) => void;
  onToggleTheme: () => void;
  onOpenConsultation: () => void;
}

export function HeroSection({
  content,
  locale,
  theme,
  onChangeLocale,
  onToggleTheme,
  onOpenConsultation,
}: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[#14285C]/10 dark:border-slate-800/80"
    >
      {/* Subtle geometric paragraph seal motif */}
      <ParagraphSeal className="pointer-events-none absolute -right-24 -top-12 w-80 h-80 text-[#F4F4FA] dark:text-[#121C33] opacity-90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 sm:pb-16 lg:pb-20">
        {/* Workspace Utility Toolbar: Single-line on Mobile & Desktop with truncated office badge + DE/EN + Square Theme Icon */}
        <div className="flex items-center justify-between gap-2.5 sm:gap-4 flex-nowrap pb-4 mb-6 sm:pb-8 sm:mb-8 border-b border-[#14285C]/10 dark:border-slate-800">
          <div className="min-w-0 flex-1 flex items-center gap-2 text-xs sm:text-sm font-medium text-[#26304A]/80 dark:text-slate-300">
            <span className="hidden sm:inline font-semibold text-[#14285C] dark:text-white shrink-0">
              {content.meta.brandSub}
            </span>
            <span className="hidden sm:inline shrink-0" aria-hidden="true">·</span>
            <span className="truncate" title={content.utility.officeBadge}>
              {content.utility.officeBadge}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* DE / EN Segmented Control (fixed h-9 mobile / h-10 desktop height) */}
            <div
              role="group"
              aria-label={content.utility.languageLabel}
              className="inline-flex h-9 sm:h-10 items-center p-1 rounded-lg bg-[#F4F4FA] dark:bg-[#121C33] border border-[#14285C]/10 dark:border-slate-800"
            >
              <button
                type="button"
                onClick={() => onChangeLocale('de')}
                className={`h-full px-2.5 sm:px-3 rounded-md text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  locale === 'de'
                    ? 'bg-[#14285C] text-white dark:bg-[#F0781E] dark:text-[#0B1120]'
                    : 'text-[#26304A] dark:text-slate-300 hover:text-[#14285C] dark:hover:text-white'
                }`}
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => onChangeLocale('en')}
                className={`h-full px-2.5 sm:px-3 rounded-md text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  locale === 'en'
                    ? 'bg-[#14285C] text-white dark:bg-[#F0781E] dark:text-[#0B1120]'
                    : 'text-[#26304A] dark:text-slate-300 hover:text-[#14285C] dark:hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Square Icon-Only Dark / Light Mode Switch matching control height */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={
                theme === 'dark'
                  ? content.utility.themeLight
                  : content.utility.themeDark
              }
              title={
                theme === 'dark'
                  ? content.utility.themeLight
                  : content.utility.themeDark
              }
              className="h-9 w-9 sm:h-10 sm:w-10 inline-flex items-center justify-center rounded-lg bg-[#F4F4FA] dark:bg-[#121C33] border border-[#14285C]/10 dark:border-slate-800 text-[#14285C] dark:text-slate-200 hover:border-[#E86404]/50 transition-colors cursor-pointer shrink-0"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#F0781E]" />
              ) : (
                <Moon className="w-4 h-4 text-[#14285C]" />
              )}
            </button>
          </div>
        </div>

        {/* 2-Column Editorial Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#E86404] dark:text-[#F0781E] mb-4">
              {content.hero.kicker}
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold tracking-tight leading-[1.08] mb-5">
              <span className="block text-[#E86404] dark:text-[#F0781E]">
                {content.hero.headlineAccent}
              </span>
              <span className="block text-[#14285C] dark:text-white">
                {content.hero.headlineMain}
              </span>
            </h1>

            <p className="text-lg sm:text-xl font-bold text-[#14285C] dark:text-slate-100 mb-4 max-w-2xl">
              {content.hero.subline}
            </p>

            <p className="text-base text-[#26304A] dark:text-slate-300 leading-relaxed max-w-xl mb-8">
              {content.hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="min-h-[48px] inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#E86404] hover:bg-[#cf5702] dark:bg-[#F0781E] dark:hover:bg-[#fb8b37] text-white dark:text-[#0B1120] font-semibold text-sm sm:text-base transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14285C]"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{content.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#fees"
                className="min-h-[48px] inline-flex items-center px-6 py-3 rounded-xl border border-[#14285C]/20 dark:border-slate-700 text-[#14285C] dark:text-slate-100 hover:bg-[#F4F4FA] dark:hover:bg-[#121C33] font-semibold text-sm sm:text-base transition-colors whitespace-nowrap shrink-0"
              >
                {content.hero.secondaryCta}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <EditorialImage
              src="images/knopper-kodex-portrait.jpg"
              alt={content.hero.portraitCaption}
              caption={content.hero.portraitCaption}
              subCaption={content.hero.portraitSub}
              className="h-full min-h-[300px] lg:min-h-[420px]"
              imgClassName="object-cover object-top"
            />
          </div>
        </div>

        {/* Full-Width 4-Column Marker Strip Below Hero */}
        <div className="mt-10 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {content.hero.keyMarkers.map((marker) => (
            <div
              key={marker.label}
              className="rounded-xl bg-[#F4F4FA] dark:bg-[#121C33] border border-[#14285C]/10 dark:border-slate-800 px-5 py-4"
            >
              <p className="font-mono-tabular text-xl sm:text-2xl font-bold text-[#14285C] dark:text-white">
                {marker.value}
              </p>
              <p className="text-xs sm:text-sm text-[#26304A]/85 dark:text-slate-300 mt-1">
                {marker.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
