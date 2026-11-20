import React, { useMemo, useState } from 'react';
import { CalendarCheck, ChevronDown } from 'lucide-react';
import { PracticeContent } from '../data/content';

type FaqCategory = 'all' | 'fees' | 'cross_border' | 'digital' | 'mandate';

interface FaqSectionProps {
  content: PracticeContent;
  onOpenConsultation: () => void;
}

const CATEGORY_ORDER: Array<'fees' | 'cross_border' | 'digital' | 'mandate'> = [
  'fees',
  'cross_border',
  'digital',
  'mandate',
];

export function FaqSection({ content, onOpenConsultation }: FaqSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('all');
  const [openIds, setOpenIds] = useState<string[]>(() =>
    content.faq.items[0] ? [content.faq.items[0].id] : []
  );

  const visibleItems = useMemo(() => {
    if (selectedCategory === 'all') return content.faq.items;
    return content.faq.items.filter((item) => item.category === selectedCategory);
  }, [content.faq.items, selectedCategory]);

  const allVisibleExpanded =
    visibleItems.length > 0 && visibleItems.every((item) => openIds.includes(item.id));

  const handleToggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    const visibleIdSet = visibleItems.map((item) => item.id);
    if (allVisibleExpanded) {
      setOpenIds((prev) => prev.filter((id) => !visibleIdSet.includes(id)));
    } else {
      setOpenIds((prev) => Array.from(new Set([...prev, ...visibleIdSet])));
    }
  };

  const handleSelectCategory = (category: FaqCategory) => {
    setSelectedCategory(category);
    const matching =
      category === 'all'
        ? content.faq.items
        : content.faq.items.filter((item) => item.category === category);
    if (matching[0] && !matching.some((item) => openIds.includes(item.id))) {
      setOpenIds((prev) => [...prev, matching[0].id]);
    }
  };

  return (
    <section
      id="faq"
      className="py-14 sm:py-20 bg-[#F3F5FA]/55 dark:bg-[#0D1424] border-b border-[#102D69]/10 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Category Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#B84F05] dark:text-[#F28C45] mb-3">
              {content.faq.kicker}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102D69] dark:text-white tracking-tight mb-3 text-balance">
              {content.faq.title}
            </h2>
            <p className="text-base sm:text-lg text-[#1B1F2B] dark:text-slate-300 leading-relaxed">
              {content.faq.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleAll}
            className="min-h-[40px] px-4 py-2 rounded-lg border border-[#102D69]/15 dark:border-slate-700 bg-white dark:bg-[#0B1734] text-xs font-bold text-[#102D69] dark:text-slate-100 hover:border-[#EC6608] dark:hover:border-[#F28C45] transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto cursor-pointer"
          >
            {allVisibleExpanded ? content.faq.collapseAllLabel : content.faq.expandAllLabel}
          </button>
        </div>

        {/* Sleek Segmented Category Filter Tabs */}
        <div className="mb-6 overflow-x-auto pb-1">
          <div
            role="tablist"
            aria-label={content.faq.kicker}
            className="inline-flex flex-nowrap items-center p-1 rounded-xl bg-white dark:bg-[#0B1734] border border-[#102D69]/12 dark:border-slate-800 gap-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              onClick={() => handleSelectCategory('all')}
              className={`h-9 px-3.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#102D69] text-white dark:bg-[#193270]'
                  : 'text-[#1B1F2B] dark:text-slate-300 hover:bg-[#F3F5FA] dark:hover:bg-[#060F26]'
              }`}
            >
              {content.faq.allCategoriesLabel}
            </button>

            {CATEGORY_ORDER.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelectCategory(cat)}
                  className={`h-9 px-3.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#102D69] text-white dark:bg-[#193270]'
                      : 'text-[#1B1F2B] dark:text-slate-300 hover:bg-[#F3F5FA] dark:hover:bg-[#060F26]'
                  }`}
                >
                  {content.faq.categories[cat]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accessible Accordion List */}
        <div className="space-y-3 mb-8">
          {visibleItems.map((item, idx) => {
            const isOpen = openIds.includes(item.id);
            const buttonId = `faq-btn-${item.id}`;
            const panelId = `faq-panel-${item.id}`;
            const itemIndex = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-colors bg-white dark:bg-[#0B1734] ${
                  isOpen
                    ? 'border-[#EC6608]/50 dark:border-[#F28C45]/50'
                    : 'border-[#102D69]/12 dark:border-slate-800 hover:border-[#102D69]/25 dark:hover:border-slate-700'
                }`}
              >
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleToggleItem(item.id)}
                    className="w-full min-h-[56px] px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EC6608] rounded-xl"
                  >
                    <div className="min-w-0 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                      <span className="font-mono-tabular text-xs font-bold text-[#B84F05] dark:text-[#F28C45] shrink-0">
                        {itemIndex}
                      </span>
                      <div className="min-w-0">
                        <span className="block text-sm sm:text-base font-bold text-[#102D69] dark:text-white leading-snug">
                          {item.question}
                        </span>
                        <span className="block text-[11px] font-medium text-[#1B1F2B]/70 dark:text-slate-400 mt-0.5">
                          {content.faq.categories[item.category]}
                        </span>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-[#B84F05] dark:text-[#F28C45] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 sm:px-6 pb-5 pt-0"
                >
                  <div className="sm:pl-8 pt-3 border-t border-[#102D69]/10 dark:border-slate-800">
                    <p className="text-sm sm:text-[15px] text-[#1B1F2B] dark:text-slate-300 leading-relaxed max-w-4xl">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Consultation Escalation Strip */}
        <div className="rounded-xl bg-white dark:bg-[#0B1734] border border-[#102D69]/12 dark:border-slate-800 px-5 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm font-semibold text-[#102D69] dark:text-slate-200">
            {content.faq.ctaPrompt}
          </p>
          <button
            type="button"
            onClick={onOpenConsultation}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#B84F05] hover:bg-[#A84604] dark:bg-[#F28C45] dark:hover:bg-[#F6A96F] text-white dark:text-[#060F26] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{content.faq.ctaButton}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
