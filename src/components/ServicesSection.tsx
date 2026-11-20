import React from 'react';
import { PracticeContent } from '../data/content';

interface ServicesSectionProps {
  content: PracticeContent;
}

export function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="py-14 sm:py-20 border-b border-[#14285C]/10 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#E86404] dark:text-[#F0781E] mb-3">
            {content.services.kicker}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14285C] dark:text-white tracking-tight mb-4">
            {content.services.title}
          </h2>
          <p className="text-base sm:text-lg text-[#26304A] dark:text-slate-300 leading-relaxed">
            {content.services.intro}
          </p>
        </div>

        {/* Asymmetric 3-column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {content.services.items.map((item, idx) => {
            const isWideOnMd = idx === 0 || idx === 5;
            return (
              <article
                key={item.index}
                className={`rounded-2xl p-6 sm:p-7 border transition-colors ${
                  item.highlight
                    ? 'bg-[#14285C] text-white border-[#14285C] dark:bg-[#162856] dark:border-[#F0781E]/30'
                    : 'bg-[#F4F4FA] dark:bg-[#121C33] text-[#26304A] dark:text-slate-200 border-[#14285C]/10 dark:border-slate-800'
                } ${isWideOnMd ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className={`font-mono-tabular text-sm font-semibold ${
                      item.highlight
                        ? 'text-[#F0781E]'
                        : 'text-[#E86404] dark:text-[#F0781E]'
                    }`}
                  >
                    {item.index}.
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      item.highlight
                        ? 'text-slate-300'
                        : 'text-[#26304A]/70 dark:text-slate-400'
                    }`}
                  >
                    {item.subtitle}
                  </span>
                </div>

                <h3
                  className={`text-lg sm:text-xl font-bold tracking-tight mb-2.5 ${
                    item.highlight
                      ? 'text-white'
                      : 'text-[#14285C] dark:text-white'
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-sm sm:text-[15px] leading-relaxed ${
                    item.highlight
                      ? 'text-slate-200'
                      : 'text-[#26304A] dark:text-slate-300'
                  }`}
                >
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
