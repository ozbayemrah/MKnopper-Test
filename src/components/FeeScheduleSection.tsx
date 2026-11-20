import React from 'react';
import { PracticeContent } from '../data/content';

interface FeeScheduleSectionProps {
  content: PracticeContent;
}

export function FeeScheduleSection({ content }: FeeScheduleSectionProps) {
  return (
    <section
      id="fees"
      className="py-14 sm:py-20 border-b border-[#14285C]/10 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#E86404] dark:text-[#F0781E] mb-3">
            {content.fees.kicker}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14285C] dark:text-white tracking-tight mb-4">
            {content.fees.title}
          </h2>
          <p className="text-base sm:text-lg text-[#26304A] dark:text-slate-300 leading-relaxed">
            {content.fees.intro}
          </p>
        </div>

        {/* Fee Schedule Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#14285C]/12 dark:border-slate-800 bg-white dark:bg-[#121C33] mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#14285C]/12 dark:border-slate-800 bg-[#F4F4FA] dark:bg-[#0B1120]">
                <th className="py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-[#14285C] dark:text-slate-200">
                  {content.fees.columns.service}
                </th>
                <th className="py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-[#14285C] dark:text-slate-200 text-right">
                  {content.fees.columns.rate}
                </th>
                <th className="py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-[#14285C] dark:text-slate-200">
                  {content.fees.columns.unit}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#14285C]/10 dark:divide-slate-800">
              {content.fees.rows.map((row) => (
                <tr
                  key={row.service}
                  className={
                    row.accent
                      ? 'bg-[#E86404]/8 dark:bg-[#F0781E]/12'
                      : 'hover:bg-[#F4F4FA]/70 dark:hover:bg-[#0B1120]/50 transition-colors'
                  }
                >
                  <td className="py-3.5 px-5 text-sm font-semibold text-[#14285C] dark:text-white">
                    {row.service}
                  </td>
                  <td className="py-3.5 px-5 font-mono-tabular text-sm sm:text-base font-bold text-[#E86404] dark:text-[#F0781E] text-right whitespace-nowrap">
                    {row.rate}
                  </td>
                  <td className="py-3.5 px-5 text-xs sm:text-sm text-[#26304A] dark:text-slate-300">
                    {row.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Explanatory Cards (Hairline borders, no thick left accent bars) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-xl bg-[#F4F4FA] dark:bg-[#121C33] border border-[#14285C]/10 dark:border-slate-800 p-6">
            <h3 className="text-base font-bold text-[#14285C] dark:text-white mb-2">
              {content.fees.factorsTitle}
            </h3>
            <p className="text-sm text-[#26304A] dark:text-slate-300 leading-relaxed">
              {content.fees.factorsText}
            </p>
          </div>

          <div className="rounded-xl bg-[#F4F4FA] dark:bg-[#121C33] border border-[#14285C]/10 dark:border-slate-800 p-6">
            <h3 className="text-base font-bold text-[#14285C] dark:text-white mb-2">
              {content.fees.agreementTitle}
            </h3>
            <p className="text-sm text-[#26304A] dark:text-slate-300 leading-relaxed">
              {content.fees.agreementText}
            </p>
          </div>

          <div className="rounded-xl bg-[#14285C] dark:bg-[#162856] text-white border border-[#14285C] dark:border-slate-700 p-6">
            <h3 className="text-base font-bold text-[#F0781E] mb-2">
              {content.fees.deductibleTitle}
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {content.fees.deductibleText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
