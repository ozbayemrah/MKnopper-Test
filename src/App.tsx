/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUp, CalendarCheck, CheckCircle2, X } from 'lucide-react';
import { PRACTICE_CONTENT } from './data/content';
import { Locale, PreCallDocument, Theme } from './types/app';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ArtVatSection } from './components/ArtVatSection';
import { ExperienceSection } from './components/ExperienceSection';
import { IurioSection } from './components/IurioSection';
import { FeeScheduleSection } from './components/FeeScheduleSection';
import { ConsultationScheduler } from './components/ConsultationScheduler';
import { SlidingContactDrawer } from './components/SlidingContactDrawer';
import { BottomBarAndFooter } from './components/BottomBarAndFooter';
import { updateDocumentSeo } from './utils/seo';

const OBSERVED_SECTION_IDS = [
  'top',
  'services',
  'art-vat',
  'experience',
  'iurio',
  'fees',
  'consultation',
];

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem('knopper_locale');
    if (saved === 'de' || saved === 'en') return saved;
    return 'de';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    // Always open in light mode. Dark mode only when the visitor switched it on
    // (new key, so values auto-saved from the old OS-preference default are ignored).
    const saved = localStorage.getItem('knopper_theme_v2');
    return saved === 'dark' ? 'dark' : 'light';
  });

  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('top');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [attachedDocument, setAttachedDocument] = useState<PreCallDocument | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem('knopper_locale', locale);
  }, [locale]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('knopper_theme_v2', theme);
  }, [theme]);

  // Scroll-Spy via IntersectionObserver for TopNav and Mobile Bottom Bar
  useEffect(() => {
    const elements = OBSERVED_SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Show floating Back to Top button once the user scrolls past the first section (#top)
  useEffect(() => {
    const heroEl = document.getElementById('top');
    if (!heroEl) return;

    const updateVisibility = () => {
      const rect = heroEl.getBoundingClientRect();
      setShowBackToTop(rect.bottom <= 64);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setShowBackToTop(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      {
        rootMargin: '-64px 0px 0px 0px',
        threshold: 0,
      }
    );

    observer.observe(heroEl);
    updateVisibility();

    return () => observer.disconnect();
  }, []);

  // Close open modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && consultationModalOpen) {
        setConsultationModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [consultationModalOpen]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 4500);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const content = PRACTICE_CONTENT[locale];
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  // Update page title, meta description, OpenGraph image/preview, Twitter card, and JSON-LD for active section & locale
  useEffect(() => {
    const seoTarget = consultationModalOpen ? 'consultation' : activeSection;
    updateDocumentSeo(locale, seoTarget, content);
  }, [locale, activeSection, consultationModalOpen, content]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#060F26] text-[#1B1F2B] dark:text-slate-200 transition-colors">
      <TopNav
        content={content}
        activeSection={activeSection}
        onOpenConsultation={() => setConsultationModalOpen(true)}
        onOpenMenu={() => setMobileMenuOpen(true)}
      />

      <main>
        <HeroSection
          content={content}
          locale={locale}
          theme={theme}
          onChangeLocale={setLocale}
          onToggleTheme={toggleTheme}
          onOpenConsultation={() => setConsultationModalOpen(true)}
        />

        <ServicesSection content={content} />

        <ArtVatSection content={content} />

        <ExperienceSection content={content} />

        <IurioSection content={content} />

        <FeeScheduleSection content={content} />


        {/* Inline Consultation Section at the natural conversion end of the flow */}
        <section
          id="consultation"
          className="py-14 sm:py-20 bg-[#FAFBFD] dark:bg-[#0E1526]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EC6608]/10 dark:bg-[#F28C45]/15 text-[#B84F05] dark:text-[#F28C45] flex items-center justify-center shrink-0 mt-1">
                <CalendarCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#B84F05] dark:text-[#F28C45] mb-2">
                  {content.consultation.kicker}
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102D69] dark:text-white tracking-tight mb-3">
                  {content.consultation.title}
                </h2>
                <p className="text-base sm:text-lg text-[#1B1F2B] dark:text-slate-300 leading-relaxed">
                  {content.consultation.subtitle}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-[#0B1734] border border-[#102D69]/12 dark:border-slate-800 p-5 sm:p-8">
              <ConsultationScheduler
                content={content}
                locale={locale}
                onNotify={showToast}
                attachedDocument={attachedDocument}
                onAttachDocument={setAttachedDocument}
                onRemoveDocument={() => setAttachedDocument(null)}
              />
            </div>
          </div>
        </section>
      </main>

      <SlidingContactDrawer
        content={content}
        onOpenConsultation={() => setConsultationModalOpen(true)}
      />

      <BottomBarAndFooter
        content={content}
        locale={locale}
        theme={theme}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
        onChangeLocale={setLocale}
        onToggleTheme={toggleTheme}
        onOpenConsultation={() => setConsultationModalOpen(true)}
      />

      {/* Floating Back to Top Button (appears after scrolling past the hero section) */}
      <button
        type="button"
        onClick={() => {
          const prefersReducedMotion = window.matchMedia?.(
            '(prefers-reduced-motion: reduce)'
          ).matches;
          window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        }}
        aria-label={content.utility.backToTop}
        title={content.utility.backToTop}
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-30 h-11 px-3.5 inline-flex items-center gap-2 rounded-xl bg-[#102D69] hover:bg-[#B84F05] dark:bg-[#0B1734] dark:hover:bg-[#F28C45] text-white dark:text-white dark:hover:text-[#060F26] border border-[#102D69]/20 dark:border-slate-700 shadow-lg transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EC6608] ${
          showBackToTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide whitespace-nowrap">
          {content.utility.backToTop}
        </span>
      </button>

      {/* Feedback Toast Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#102D69] dark:bg-[#193270] text-white border border-[#EC6608]/50 shadow-xl max-w-sm"
        >
          <CheckCircle2 className="w-5 h-5 text-[#F28C45] shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            aria-label={content.contactDrawer.closeLabel}
            className="p-1 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Consultation Modal triggered from TopNav, Hero CTA, Contact Drawer, or Bottom Bar */}
      {consultationModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={content.consultation.title}
          onClick={() => setConsultationModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#060F26]/65 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#060F26] border border-[#102D69]/15 dark:border-slate-800 p-5 sm:p-8 shadow-2xl"
          >
            <ConsultationScheduler
              content={content}
              locale={locale}
              isModal
              onCloseModal={() => setConsultationModalOpen(false)}
              onNotify={showToast}
              attachedDocument={attachedDocument}
              onAttachDocument={setAttachedDocument}
              onRemoveDocument={() => setAttachedDocument(null)}
            />
          </div>
        </div>
      )}

    </div>
  );
}
