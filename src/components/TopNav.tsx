import React from 'react';
import { CalendarCheck } from 'lucide-react';
import { PracticeContent } from '../data/content';
import { MartinKnopperLogo } from './BrandMark';

interface TopNavProps {
  content: PracticeContent;
  activeSection: string;
  onOpenConsultation: () => void;
}

export function TopNav({ content, activeSection, onOpenConsultation }: TopNavProps) {
  const navLinks = [
    { id: 'services', href: '#services', label: content.nav.services },
    { id: 'art-vat', href: '#art-vat', label: content.nav.artVat },
    { id: 'experience', href: '#experience', label: content.nav.experience },
    { id: 'iurio', href: '#iurio', label: content.nav.iurio },
    { id: 'fees', href: '#fees', label: content.nav.fees },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[#14285C]/10 dark:border-slate-800/80 bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Single-line brand wordmark with § seal */}
        <a
          href="#top"
          aria-label={`${content.meta.brandName} — ${content.meta.brandSub}`}
          className="whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E86404]"
        >
          <MartinKnopperLogo variant="compact" className="text-xl sm:text-2xl" />
        </a>

        {/* Zone 2: 5 concise single-line section links with Scroll-Spy active highlight */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-semibold text-[#26304A] dark:text-slate-300"
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
                    ? 'text-[#E86404] dark:text-[#F0781E] border-[#E86404] dark:border-[#F0781E]'
                    : 'border-transparent hover:text-[#E86404] dark:hover:text-[#F0781E] hover:border-[#E86404] dark:hover:border-[#F0781E]'
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
            className="min-h-[40px] inline-flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg bg-[#14285C] hover:bg-[#1d387d] dark:bg-[#F0781E] dark:hover:bg-[#fb8b37] text-white dark:text-[#0B1120] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E86404]"
          >
            <CalendarCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden lg:inline">{content.nav.cta}</span>
            <span className="lg:hidden">{content.nav.ctaShort}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
