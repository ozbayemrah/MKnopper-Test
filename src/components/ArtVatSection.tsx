import { MobileMore } from './MobileMore';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PracticeContent } from '../data/content';
import { ArtBuyerType } from '../types/app';
import { EditorialImage } from './BrandMark';

interface ArtVatSectionProps {
  content: PracticeContent;
}

const BUYER_TYPES: ArtBuyerType[] = ['eu_b2b', 'eu_b2c', 'non_eu'];

export function ArtVatSection({ content }: ArtVatSectionProps) {
  const [selectedBuyer, setSelectedBuyer] = useState<ArtBuyerType>('eu_b2b');
  const activeScenario = content.artVat.scenarios[selectedBuyer];

  return (
    <section
      id="art-vat"
      className="py-14 sm:py-20 bg-[#FAFBFD] dark:bg-[#0E1526] border-b border-[#102D69]/10 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#B84F05] dark:text-[#F28C45] mb-3">
              {content.artVat.kicker}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102D69] dark:text-white tracking-tight mb-4">
              {content.artVat.title}
            </h2>
            <p className="text-base sm:text-lg text-[#1B1F2B] dark:text-slate-300 leading-relaxed mb-8">
              {content.artVat.intro}
            </p>

            {/* Two Key Numbers Upfront */}
            <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#102D69]/70 dark:text-slate-400 mb-3">
              {content.artVat.baselineHeading}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.artVat.baselines.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl bg-white dark:bg-[#0B1734] border border-[#102D69]/12 dark:border-slate-800 p-5"
                >
                  <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#B84F05] dark:text-[#F28C45] mb-2">
                    {item.figure}
                  </p>
                  <h4 className="text-sm sm:text-base font-bold text-[#102D69] dark:text-white mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#1B1F2B] dark:text-slate-300 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <EditorialImage
              src="images/art-gallery-export.jpg"
              alt={content.artVat.imageCaption}
              caption={content.artVat.imageCaption}
              className="h-full min-h-[280px]"
            />
          </div>
        </div>

        <MobileMore moreLabel={content.utility.showMore} lessLabel={content.utility.showLess}>
        {/* Interactive Buyer Scenario Navigator */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1734] border border-[#102D69]/12 dark:border-slate-800 p-5 sm:p-8 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#102D69]/10 dark:border-slate-800">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#102D69] dark:text-white">
                {content.artVat.scenarioHeading}
              </h3>
            </div>

            {/* Mobile Dropdown for Topics / Buyer Scenarios */}
            <div className="md:hidden relative w-full">
              <label htmlFor="art-vat-scenario-select" className="sr-only">
                {content.artVat.scenarioHeading}
              </label>
              <select
                id="art-vat-scenario-select"
                value={selectedBuyer}
                onChange={(e) => setSelectedBuyer(e.target.value as ArtBuyerType)}
                className="w-full min-h-[44px] appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-[#F3F5FA] dark:bg-[#060F26] border border-[#102D69]/15 dark:border-slate-700 text-sm font-bold text-[#102D69] dark:text-white focus:outline-none focus:border-[#EC6608]"
              >
                {BUYER_TYPES.map((buyerKey) => (
                  <option key={buyerKey} value={buyerKey}>
                    {content.artVat.scenarios[buyerKey].tabLabel}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="w-4 h-4 text-[#B84F05] dark:text-[#F28C45] pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
            </div>

            {/* Tablet & Desktop Segmented Tabs */}
            <div
              role="tablist"
              aria-label={content.artVat.scenarioHeading}
              className="hidden md:flex flex-wrap gap-2 p-1 rounded-xl bg-[#F3F5FA] dark:bg-[#060F26]"
            >
              {BUYER_TYPES.map((buyerKey) => {
                const isActive = selectedBuyer === buyerKey;
                return (
                  <button
                    key={buyerKey}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedBuyer(buyerKey)}
                    className={`min-h-[44px] px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#102D69] text-white dark:bg-[#F28C45] dark:text-[#060F26]'
                        : 'text-[#1B1F2B] dark:text-slate-300 hover:text-[#102D69] dark:hover:text-white'
                    }`}
                  >
                    {content.artVat.scenarios[buyerKey].tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div role="tabpanel" className="space-y-6">
            <div>
              <h4 className="text-lg sm:text-2xl font-bold text-[#102D69] dark:text-white mb-2">
                {activeScenario.headline}
              </h4>
              <p className="text-sm sm:text-base text-[#1B1F2B] dark:text-slate-300">
                {activeScenario.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeScenario.steps.map((step) => (
                <div
                  key={step.num}
                  className="flex items-start gap-4 rounded-xl bg-[#F3F5FA] dark:bg-[#060F26]/70 border border-[#102D69]/10 dark:border-slate-800 p-5"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#B84F05] dark:bg-[#F28C45] text-white dark:text-[#060F26] font-mono-tabular text-sm font-bold shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-[#102D69] dark:text-white mb-1">
                      {step.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#1B1F2B] dark:text-slate-300 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm font-medium text-[#B84F05] dark:text-[#F28C45] pt-1">
              {activeScenario.note}
            </p>
          </div>
        </div>

        {/* 4 Typical Pitfalls */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[#102D69] dark:text-white mb-4">
            {content.artVat.pitfallsHeading}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {content.artVat.pitfalls.map((pitfall) => (
              <div
                key={pitfall.num}
                className="rounded-xl bg-white dark:bg-[#0B1734] border border-[#102D69]/10 dark:border-slate-800 p-5"
              >
                <span className="font-mono-tabular text-xs font-bold text-[#B84F05] dark:text-[#F28C45] block mb-2">
                  {pitfall.num}.
                </span>
                <h4 className="text-sm sm:text-base font-bold text-[#102D69] dark:text-white mb-1.5">
                  {pitfall.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#1B1F2B] dark:text-slate-300 leading-relaxed">
                  {pitfall.detail}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#1B1F2B]/70 dark:text-slate-400">
            {content.artVat.disclaimer}
          </p>
        </div>
        </MobileMore>
      </div>
    </section>
  );
}
