import React, { useState } from 'react';
import {
  Briefcase,
  CalendarCheck,
  Menu,
  Moon,
  Palette,
  Phone,
  Sun,
  X,
} from 'lucide-react';
import { PracticeContent } from '../data/content';
import { Locale, Theme } from '../types/app';
import { MartinKnopperLogo } from './BrandMark';

interface BottomBarAndFooterProps {
  content: PracticeContent;
  locale: Locale;
  theme: Theme;
  activeSection: string;
  onChangeLocale: (locale: Locale) => void;
  onToggleTheme: () => void;
  onOpenConsultation: () => void;
}

export function BottomBarAndFooter({
  content,
  locale,
  theme,
  activeSection,
  onChangeLocale,
  onToggleTheme,
  onOpenConsultation,
}: BottomBarAndFooterProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Quiet Editorial Footer */}
      <footer className="bg-[#102D69] dark:bg-[#070B14] text-white pt-12 pb-28 md:pb-24 border-t border-[#102D69]/10 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/15">
            <div className="md:col-span-5">
              <div className="mb-3">
                <MartinKnopperLogo
                  variant="stacked"
                  subLabel={content.meta.brandSub}
                  invertOnDarkBg
                  className="items-start [&>div]:items-start"
                />
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-300 mb-3">
                {content.meta.credentials}
              </p>
              <p className="text-sm text-slate-200 max-w-md leading-relaxed">
                {content.footer.tagline}
              </p>
            </div>

            <div className="md:col-span-4 space-y-2 text-sm text-slate-200">
              <p className="font-semibold text-white">
                {content.meta.advisorTitle}
              </p>
              <p>{content.footer.address}</p>
              <p className="text-xs text-slate-300 pt-1">{content.footer.legal}</p>
              <p className="text-xs text-slate-300">{content.footer.privacy}</p>
            </div>

            <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end gap-4">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B84F05] hover:bg-[#A84604] dark:bg-[#F28C45] text-white dark:text-[#060F26] font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{content.footer.consultCta}</span>
              </button>
              <p className="text-xs text-slate-400 text-left md:text-right">
                {content.footer.imprint}
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
            <span>
              © {new Date().getFullYear()} {content.meta.advisorTitle} · knopper-stb.at
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#services" className="hover:text-white transition-colors">
                {content.nav.services}
              </a>
              <a href="#art-vat" className="hover:text-white transition-colors">
                {content.nav.artVat}
              </a>
              <a href="#experience" className="hover:text-white transition-colors">
                {content.nav.experience}
              </a>
              <a href="#iurio" className="hover:text-white transition-colors">
                {content.nav.iurio}
              </a>
              <a href="#fees" className="hover:text-white transition-colors">
                {content.nav.fees}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Desktop & Tablet Fixed Bottom Quick-Action Bar (Consultation CTA kept; DE/EN & theme removed per request) */}
      <div
        aria-label="Desktop & Tablet Bottom Bar"
        className="hidden md:block fixed bottom-0 inset-x-0 z-30 bg-white/95 dark:bg-[#060F26]/95 backdrop-blur-md border-t border-[#102D69]/12 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5 text-xs font-semibold text-[#102D69] dark:text-slate-200">
            <a
              href="tel:+43316386097"
              className="inline-flex items-center gap-1.5 hover:text-[#B84F05] dark:hover:text-[#F28C45] transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#B84F05] dark:text-[#F28C45]" />
              <span className="font-mono-tabular">+43 316 38 60 97</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
              |
            </span>
            <span className="text-[#1B1F2B]/80 dark:text-slate-400 truncate max-w-xs lg:max-w-md">
              {content.meta.locationShort}
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenConsultation}
            className="min-h-[36px] inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#B84F05] hover:bg-[#A84604] dark:bg-[#F28C45] dark:hover:bg-[#F6A96F] text-white dark:text-[#060F26] text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <CalendarCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{content.nav.cta}</span>
          </button>
        </div>
      </div>

      {/* Mobile Ergonomic Bottom Navigation Bar (< 768px) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#060F26]/95 backdrop-blur-md border-t border-[#102D69]/12 dark:border-slate-800"
      >
        <div className="grid grid-cols-4 h-16 items-center">
          <a
            href="#services"
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
              activeSection === 'services'
                ? 'text-[#B84F05] dark:text-[#F28C45]'
                : 'text-[#102D69] dark:text-slate-200 hover:text-[#B84F05]'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-[11px] font-semibold mt-0.5 tracking-tight">
              {content.mobileBar.services}
            </span>
          </a>

          <a
            href="#art-vat"
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
              activeSection === 'art-vat'
                ? 'text-[#B84F05] dark:text-[#F28C45]'
                : 'text-[#102D69] dark:text-slate-200 hover:text-[#B84F05]'
            }`}
          >
            <Palette className="w-5 h-5" />
            <span className="text-[11px] font-semibold mt-0.5 tracking-tight">
              {content.mobileBar.artVat}
            </span>
          </a>

          <button
            type="button"
            onClick={onOpenConsultation}
            className="min-h-[44px] flex flex-col items-center justify-center text-[#B84F05] dark:text-[#F28C45] cursor-pointer"
          >
            <CalendarCheck className="w-5 h-5" aria-hidden="true" />
            <span className="text-[11px] font-bold mt-0.5 tracking-tight">
              {content.mobileBar.consult}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            className="min-h-[44px] flex flex-col items-center justify-center text-[#102D69] dark:text-slate-200 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[11px] font-semibold mt-0.5 tracking-tight">
              {content.mobileBar.menu}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Slide-Up Sheet for DE/EN Toggle, Dark Mode, Style Guide & All Sections */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex items-end bg-[#060F26]/60 backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-sheet-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded-t-3xl bg-white dark:bg-[#0B1734] border-t border-[#102D69]/15 dark:border-slate-700 p-6 pb-8 max-h-[82vh] overflow-y-auto"
          >
            <div className="w-10 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-5" />

            <div className="flex items-center justify-between mb-6">
              <h2
                id="mobile-sheet-title"
                className="text-lg font-bold text-[#102D69] dark:text-white"
              >
                {content.mobileBar.sheetTitle}
              </h2>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={content.contactDrawer.closeLabel}
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-[#102D69]/15 dark:border-slate-700 text-[#102D69] dark:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Easy Mobile Language & Square Theme Switches */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#B84F05] dark:text-[#F28C45] mb-3">
                {content.mobileBar.preferencesTitle}
              </p>
              <div className="flex items-center gap-3">
                <div
                  role="group"
                  aria-label={content.utility.languageLabel}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-1 p-1 rounded-xl bg-[#F3F5FA] dark:bg-[#060F26] border border-[#102D69]/10 dark:border-slate-800"
                >
                  <button
                    type="button"
                    onClick={() => onChangeLocale('de')}
                    className={`h-full flex-1 rounded-lg text-xs font-bold ${
                      locale === 'de'
                        ? 'bg-[#102D69] text-white dark:bg-[#F28C45] dark:text-[#060F26]'
                        : 'text-[#1B1F2B] dark:text-slate-300'
                    }`}
                  >
                    DE
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeLocale('en')}
                    className={`h-full flex-1 rounded-lg text-xs font-bold ${
                      locale === 'en'
                        ? 'bg-[#102D69] text-white dark:bg-[#F28C45] dark:text-[#060F26]'
                        : 'text-[#1B1F2B] dark:text-slate-300'
                    }`}
                  >
                    EN
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onToggleTheme}
                  aria-label={
                    theme === 'dark'
                      ? content.utility.themeLight
                      : content.utility.themeDark
                  }
                  className="h-11 w-11 inline-flex items-center justify-center rounded-xl bg-[#F3F5FA] dark:bg-[#060F26] border border-[#102D69]/10 dark:border-slate-800 text-[#102D69] dark:text-white shrink-0"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-[#F28C45]" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#102D69]" />
                  )}
                </button>
              </div>
            </div>

            {/* Section Links */}
            <div className="space-y-2 mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1B1F2B]/70 dark:text-slate-400 mb-2">
                {content.mobileBar.sectionsTitle}
              </p>
              {[
                { href: '#services', label: content.nav.services },
                { href: '#art-vat', label: content.nav.artVat },
                { href: '#experience', label: content.nav.experience },
                { href: '#iurio', label: content.nav.iurio },
                { href: '#fees', label: content.nav.fees },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between min-h-[48px] px-4 rounded-xl bg-[#F3F5FA] dark:bg-[#060F26] text-sm font-bold text-[#102D69] dark:text-white"
                >
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full min-h-[48px] rounded-xl bg-[#B84F05] dark:bg-[#F28C45] text-white dark:text-[#060F26] font-bold text-sm"
            >
              {content.nav.cta}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
