import React, { useState } from 'react';
import { Music2 } from 'lucide-react';
import { PracticeContent } from '../data/content';
import { EditorialImage } from './BrandMark';

interface ExperienceSectionProps {
  content: PracticeContent;
}

const NOTE_Y_POSITIONS = [52, 60, 44, 52, 36, 44, 28, 36];

export function ExperienceSection({ content }: ExperienceSectionProps) {
  const [selectedNoteIdx, setSelectedNoteIdx] = useState<number>(1);
  const activeNote = content.experience.music.notes[selectedNoteIdx];

  return (
    <section
      id="experience"
      className="py-14 sm:py-20 border-b border-[#14285C]/10 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#E86404] dark:text-[#F0781E] mb-3">
            {content.experience.kicker}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14285C] dark:text-white tracking-tight mb-4">
            {content.experience.title}
          </h2>
          <p className="text-base sm:text-lg text-[#26304A] dark:text-slate-300 leading-relaxed">
            {content.experience.intro}
          </p>
        </div>

        {/* Career Timeline Bar */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold mb-3">
            <span className="inline-flex items-center gap-2 text-[#14285C] dark:text-slate-200">
              <span className="w-3 h-3 rounded-xs bg-[#14285C] dark:bg-[#2a4a9e]" aria-hidden="true" />
              {content.experience.timelineLegend.publicAdmin}
            </span>
            <span className="inline-flex items-center gap-2 text-[#14285C] dark:text-slate-200">
              <span className="w-3 h-3 rounded-xs bg-[#E86404] dark:bg-[#F0781E]" aria-hidden="true" />
              {content.experience.timelineLegend.taxAdvisory}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {content.experience.timeline.map((segment) => {
              const isPublic = segment.world === 'public';
              return (
                <div
                  key={segment.period}
                  className={`rounded-xl px-4 py-3.5 border ${
                    isPublic
                      ? 'bg-[#14285C] text-white border-[#14285C] dark:bg-[#193270] dark:border-[#2a4a9e]'
                      : 'bg-[#E86404] text-white border-[#E86404] dark:bg-[#F0781E] dark:text-[#0B1120] dark:border-[#F0781E]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular opacity-90">
                    <span>{segment.period}</span>
                    <span>{segment.years}</span>
                  </div>
                  <p className="text-sm font-bold mt-1">{segment.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Three Perspectives Grid (Unboxed typographic lists — Zero-Pill discipline) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Card 1: 28 Years + 2 Degrees */}
          <div className="lg:col-span-4 rounded-2xl bg-[#F4F4FA] dark:bg-[#121C33] border border-[#14285C]/10 dark:border-slate-800 p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline gap-2.5 mb-1">
                <span className="font-mono-tabular text-4xl sm:text-5xl font-extrabold text-[#14285C] dark:text-white">
                  {content.experience.summaryCard.yearsNumber}
                </span>
                <span className="text-lg font-bold text-[#14285C] dark:text-slate-200">
                  {content.experience.summaryCard.yearsUnit}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#26304A] dark:text-slate-300 pb-6 mb-6 border-b border-[#14285C]/12 dark:border-slate-700">
                {content.experience.summaryCard.yearsDesc}
              </p>

              <div className="flex items-baseline gap-2.5 mb-2">
                <span className="font-mono-tabular text-3xl font-extrabold text-[#E86404] dark:text-[#F0781E]">
                  {content.experience.summaryCard.degreesNumber}
                </span>
                <span className="text-base font-bold text-[#14285C] dark:text-white">
                  {content.experience.summaryCard.degreesTitle}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#14285C] dark:text-slate-200">
                {content.experience.summaryCard.degreesList.join(' · ')}
              </p>
            </div>

            <p className="mt-8 pt-4 border-t border-[#14285C]/10 dark:border-slate-800 text-sm font-semibold text-[#E86404] dark:text-[#F0781E]">
              {content.experience.summaryCard.motto}
            </p>
          </div>

          {/* Card 2: 15 Years Public Administration & NPO */}
          <div className="lg:col-span-4 rounded-2xl bg-[#14285C] dark:bg-[#162856] text-white border border-[#14285C] dark:border-slate-700 p-6 sm:p-7">
            <div className="flex items-baseline gap-2.5 mb-1">
              <span className="font-mono-tabular text-4xl sm:text-5xl font-extrabold text-white">
                {content.experience.publicCard.yearsNumber}
              </span>
              <span className="text-lg font-bold text-slate-200">
                {content.experience.publicCard.yearsUnit}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-5">
              {content.experience.publicCard.title}
            </h3>

            <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#F0781E] mb-3">
              {content.experience.publicCard.areasLabel}
            </p>
            <p className="text-sm text-slate-200 leading-relaxed">
              {content.experience.publicCard.areas.join(' · ')}
            </p>
          </div>

          {/* Card 3: 13 Years Tax Advisory */}
          <div className="lg:col-span-4 rounded-2xl bg-[#E86404] dark:bg-[#F0781E] text-white dark:text-[#0B1120] border border-[#E86404] dark:border-[#F0781E] p-6 sm:p-7">
            <div className="flex items-baseline gap-2.5 mb-1">
              <span className="font-mono-tabular text-4xl sm:text-5xl font-extrabold">
                {content.experience.taxCard.yearsNumber}
              </span>
              <span className="text-lg font-bold opacity-95">
                {content.experience.taxCard.yearsUnit}
              </span>
            </div>
            <h3 className="text-lg font-bold mb-1">
              {content.experience.taxCard.title}
            </h3>
            <p className="text-xs font-medium opacity-90 mb-5">
              {content.experience.taxCard.subtitle}
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold tracking-[0.14em] uppercase opacity-85 mb-1.5">
                  {content.experience.taxCard.focusLabel}
                </p>
                <p className="text-sm font-medium leading-relaxed">
                  {content.experience.taxCard.focusAreas.join(' · ')}
                </p>
              </div>
              <div className="pt-3 border-t border-white/25 dark:border-[#0B1120]/20">
                <p className="text-xs font-bold tracking-[0.14em] uppercase opacity-85 mb-1.5">
                  {content.experience.taxCard.clientsLabel}
                </p>
                <p className="text-sm font-medium leading-relaxed">
                  {content.experience.taxCard.clients.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Musical Staff + Authentic Childhood Piano Photo */}
        <div className="rounded-2xl bg-[#F4F4FA] dark:bg-[#121C33] border border-[#14285C]/12 dark:border-slate-800 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[#E86404] dark:text-[#F0781E] text-xs font-bold tracking-[0.16em] uppercase mb-2">
                <Music2 className="w-4 h-4" />
                <span>B · A · C · H</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#14285C] dark:text-white">
                {content.experience.music.title}
              </h3>
              <p className="text-sm text-[#26304A] dark:text-slate-300 mt-1">
                {content.experience.music.subtitle}
              </p>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#14285C]/80 dark:text-slate-300">
              {content.experience.music.motifNote}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-9">
              {/* Interactive Staff Row */}
              <div className="relative overflow-x-auto pb-2">
                <div className="min-w-[640px]">
                  {/* Five staff lines */}
                  <div className="relative h-24 flex flex-col justify-between py-4 px-4">
                    {[0, 1, 2, 3, 4].map((line) => (
                      <div
                        key={line}
                        className="w-full h-px bg-[#14285C]/20 dark:bg-slate-600/60"
                      />
                    ))}

                    {/* Interactive Note Heads positioned across the B-A-C-H subject & answer */}
                    <div className="absolute inset-0 px-8 grid grid-cols-8 items-center">
                      {content.experience.music.notes.map((note, idx) => {
                        const isSelected = idx === selectedNoteIdx;
                        const topOffset = NOTE_Y_POSITIONS[idx] ?? 44;
                        return (
                          <div key={note.title} className="relative h-full flex justify-center">
                            <button
                              type="button"
                              onClick={() => setSelectedNoteIdx(idx)}
                              aria-pressed={isSelected}
                              aria-label={`${note.title} (${note.span})`}
                              style={{ top: `${topOffset}%` }}
                              className={`absolute -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full cursor-pointer transition-transform ${
                                isSelected ? 'scale-110' : 'hover:scale-105'
                              }`}
                            >
                              <span
                                className={`flex items-center justify-center w-8 h-8 rounded-full font-mono-tabular text-xs font-bold border-2 transition-colors ${
                                  isSelected
                                    ? 'bg-[#E86404] dark:bg-[#F0781E] border-[#14285C] dark:border-white text-white dark:text-[#0B1120]'
                                    : 'bg-white dark:bg-[#0B1120] border-[#14285C] dark:border-slate-400 text-[#14285C] dark:text-slate-100'
                                }`}
                              >
                                {note.pitch}
                              </span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Station labels aligned beneath each note */}
                  <div className="grid grid-cols-8 gap-2 px-4 pt-2">
                    {content.experience.music.notes.map((note, idx) => {
                      const isSelected = idx === selectedNoteIdx;
                      return (
                        <button
                          key={note.title}
                          type="button"
                          onClick={() => setSelectedNoteIdx(idx)}
                          className={`text-center p-2 rounded-lg transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-white dark:bg-[#0B1120] text-[#14285C] dark:text-white border border-[#E86404]/40'
                              : 'text-[#26304A]/80 dark:text-slate-400 hover:text-[#14285C] dark:hover:text-slate-200'
                          }`}
                        >
                          <span className="block text-xs font-bold leading-tight">
                            {note.title}
                          </span>
                          <span className="block text-[11px] opacity-80 mt-0.5">
                            {note.span}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Active Musical Station Detail */}
              <div className="mt-5 pt-4 border-t border-[#14285C]/10 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-sm font-medium text-[#14285C] dark:text-slate-100">
                  <span className="font-bold text-[#E86404] dark:text-[#F0781E] mr-2">
                    {activeNote.title} ({activeNote.span}):
                  </span>
                  {activeNote.detail}
                </p>
                <span className="text-xs text-[#26304A]/70 dark:text-slate-400 shrink-0">
                  {content.experience.music.caption}
                </span>
              </div>
            </div>

            {/* Childhood Piano Photograph from Client PDF */}
            <div className="lg:col-span-3">
              <EditorialImage
                src="/images/knopper-piano-childhood.jpg"
                alt={content.experience.music.pianoAlt}
                caption={content.experience.music.pianoCaption}
                className="aspect-[3/4] max-w-[240px] mx-auto lg:max-w-none"
                imgClassName="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
