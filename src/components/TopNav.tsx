import React from 'react';
import { CalendarCheck, Menu } from 'lucide-react';
import { PracticeContent } from '../data/content';
import { MartinKnopperLogo } from './BrandMark';

interface TopNavProps {
  content: PracticeContent;
  activeSection: string;
  onOpenConsultation: () => void;
  onOpenMenu: () => void;
}

export function TopNav({ content, activeSection, onOpenConsultation, onOpenMenu }: TopNavProps) {
  const navLinks = [
    { id: 'services', href: '#services', label: content.nav.services },
    { id: 'art-vat', href: '#art-vat', label: content.nav.artVat },
    { id: 'experience', href: '#experience', label: content.nav.experience },
    { id: 'iurio', href: '#iurio', label: content.nav.iurio },
    { id: 'fees', href: '#fees', label: content.nav.fees },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[#102D69]/10 dark:border-slate-800/80 bg-white/90 dark:bg-[#060F26]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Single-line brand wordmark with § seal */}
        <a
          href="#top"
          aria-label={`${content.meta.brandName} — ${content.meta.brandSub}`}
          className="whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EC6608]"
        >
          <MartinKnopperLogo variant="compact" className="text-xl sm:text-2xl" />
        </a>

        {/* Zone 2: 5 concise single-line section links with Scroll-Spy active highlight */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-semibold text-[#1B1F2B] dark:text-slate-300"
        >
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={`py-2 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'text-[#B84F05] dark:text-[#F28C45] border-[#EC6608] dark:border-[#F28C45]'
                    : 'border-transparent hover:text-[#B84F05] dark:hover:text-[#F28C45] hover:border-[#EC6608] dark:hover:border-[#F28C45]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary CTA action with clear consultation icon */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenConsultation}
            className="min-h-[40px] inline-flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg bg-[#B84F05] hover:bg-[#A84604] dark:bg-[#F28C45] dark:hover:bg-[#F6A96F] text-white dark:text-[#060F26] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EC6608]"
          >
            <CalendarCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden lg:inline">{content.nav.cta}</span>
            <span className="lg:hidden">{content.nav.ctaShort}</span>
          </button>
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label={content.mobileBar.menu}
            className="md:hidden ml-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg border border-[#102D69]/15 dark:border-slate-700 text-[#102D69] dark:text-slate-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EC6608]"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
