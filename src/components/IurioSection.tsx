import { MobileMore } from './MobileMore';
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { PracticeContent } from '../data/content';
import { EditorialImage } from './BrandMark';

interface IurioSectionProps {
  content: PracticeContent;
}

export function IurioSection({ content }: IurioSectionProps) {
  return (
    <section
      id="iurio"
      className="py-14 sm:py-20 bg-[#FAFBFD] dark:bg-[#161618] border-b border-[#102D69]/10 dark:border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro + Real IURIO Workspace Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-10">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#B84F05] dark:text-[#F28C45] mb-3">
              {content.iurio.kicker}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102D69] dark:text-white tracking-tight mb-4">
              {content.iurio.title}
            </h2>
            <p className="text-base sm:text-lg text-[#1B1F2B] dark:text-neutral-300 leading-relaxed">
              {content.iurio.intro}
            </p>
          </div>

          <div className="lg:col-span-6">
            <EditorialImage
              src="images/iurio-workspace-preview.jpg"
              alt={content.iurio.workspaceCaption}
              caption={content.iurio.workspaceCaption}
              className="h-full min-h-[260px] max-h-[340px]"
              imgClassName="object-contain bg-[#102D69] p-3"
            />
          </div>
        </div>

        <MobileMore moreLabel={content.utility.showMore} lessLabel={content.utility.showLess}>
        {/* 6 IURIO Capabilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
          {content.iurio.features.map((feat) => (
            <div
              key={feat.title}
              className="rounded-xl bg-white dark:bg-[#1C1C1E] border border-[#102D69]/10 dark:border-neutral-800 p-5 sm:p-6"
            >
              <h3 className="text-base sm:text-lg font-bold text-[#B84F05] dark:text-[#F28C45] mb-2">
                {feat.title}
              </h3>
              <p className="text-sm text-[#1B1F2B] dark:text-neutral-300 leading-relaxed">
                {feat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Data Sovereignty Band (Austrian Servers & BMD Cloud ISO 27001) */}
        <div className="rounded-2xl bg-[#102D69] dark:bg-[#2C2C2E] text-white p-6 sm:p-8 lg:p-10 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-[#F28C45] shrink-0" aria-hidden="true" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {content.iurio.securityBand.title}
            </h3>
          </div>
          <ul className="space-y-2.5 text-sm sm:text-base text-slate-100">
            {content.iurio.securityBand.points.map((pt) => (
              <li key={pt} className="flex items-start gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-[#B84F05] dark:bg-[#F28C45] shrink-0" aria-hidden="true" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        </MobileMore>

        {/* 3-Step Onboarding & Daily Collaboration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <h3 className="text-xl sm:text-2xl font-bold text-[#102D69] dark:text-white mb-5">
              {content.iurio.onboardingTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {content.iurio.onboardingSteps.map((step) => (
                <div
                  key={step.num}
                  className="rounded-xl bg-white dark:bg-[#1C1C1E] border border-[#102D69]/10 dark:border-neutral-800 p-5"
                >
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#B84F05] dark:bg-[#F28C45] text-white dark:text-[#121212] font-mono-tabular font-bold mb-3">
                    {step.num}
                  </span>
                  <h4 className="text-base font-bold text-[#102D69] dark:text-white mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#1B1F2B] dark:text-neutral-300 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl bg-white dark:bg-[#1C1C1E] border border-[#102D69]/12 dark:border-neutral-800 p-6">
            <h3 className="text-lg font-bold text-[#102D69] dark:text-white mb-3">
              {content.iurio.workflowTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#1B1F2B] dark:text-neutral-300 mb-4">
              {content.iurio.workflowPoints.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#B84F05] dark:bg-[#F28C45] shrink-0" aria-hidden="true" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[#1B1F2B]/75 dark:text-neutral-400 pt-3 border-t border-[#102D69]/10 dark:border-neutral-800">
              {content.iurio.footNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
