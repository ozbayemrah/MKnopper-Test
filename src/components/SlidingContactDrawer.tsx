import React, { useState } from 'react';
import {
  ArrowRight,
  CalendarCheck,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldAlert,
  Smartphone,
  X,
} from 'lucide-react';
import { PracticeContent } from '../data/content';

interface SlidingContactDrawerProps {
  content: PracticeContent;
  onOpenConsultation: () => void;
}

export function SlidingContactDrawer({
  content,
  onOpenConsultation,
}: SlidingContactDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Persistent Sliding Right-Side Icon Handle that follows scroll and grows on hover */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-label={content.contactDrawer.tabLabel}
        title={content.contactDrawer.tabLabel}
        className="group fixed right-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 inline-flex items-center justify-center rounded-l-xl bg-[#14285C] hover:bg-[#E86404] dark:bg-[#F0781E] dark:hover:bg-[#fb8b37] text-white dark:text-[#0B1120] shadow-lg origin-right transition-all duration-200 hover:scale-125 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E86404]"
      >
        <MessageSquare
          className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
          aria-hidden="true"
        />
      </button>

      {/* Backdrop & Slide-over Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-[#0B1120]/55 backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-drawer-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md h-full bg-white dark:bg-[#0B1120] border-l border-[#14285C]/15 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto p-6 sm:p-7"
          >
            <div>
              <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-[#14285C]/10 dark:border-slate-800">
                <div className="flex items-center gap-3.5">
                  <img
                    src="images/knopper-blazer-portrait.jpg"
                    alt={content.meta.advisorTitle}
                    className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#E86404] dark:border-[#F0781E] shrink-0"
                  />
                  <div>
                    <p className="text-xs font-bold tracking-[0.16em] uppercase text-[#E86404] dark:text-[#F0781E] mb-0.5">
                      {content.meta.brandSub}
                    </p>
                    <h2
                      id="contact-drawer-title"
                      className="text-xl sm:text-2xl font-bold text-[#14285C] dark:text-white leading-tight"
                    >
                      {content.contactDrawer.title}
                    </h2>
                    <p className="text-xs text-[#26304A] dark:text-slate-300 mt-0.5">
                      {content.contactDrawer.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label={content.contactDrawer.closeLabel}
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-[#14285C]/15 dark:border-slate-700 text-[#14285C] dark:text-slate-200 hover:bg-[#F4F4FA] dark:hover:bg-[#121C33] cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contact Rows */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#F4F4FA] dark:bg-[#121C33]">
                  <MapPin className="w-5 h-5 text-[#E86404] dark:text-[#F0781E] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#26304A]/70 dark:text-slate-400">
                      {content.contactDrawer.addressLabel}
                    </p>
                    <p className="text-sm font-semibold text-[#14285C] dark:text-white mt-0.5">
                      {content.contactDrawer.addressValue}
                    </p>
                  </div>
                </div>

                <a
                  href="tel:+43316386097"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#F4F4FA] dark:bg-[#121C33] hover:border-[#E86404]/40 border border-transparent transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#E86404] dark:text-[#F0781E] shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#26304A]/70 dark:text-slate-400">
                      {content.contactDrawer.phoneLabel}
                    </p>
                    <p className="font-mono-tabular text-sm font-semibold text-[#14285C] dark:text-white mt-0.5">
                      +43 316 38 60 97
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+436645210778"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#F4F4FA] dark:bg-[#121C33] hover:border-[#E86404]/40 border border-transparent transition-colors"
                >
                  <Smartphone className="w-5 h-5 text-[#E86404] dark:text-[#F0781E] shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#26304A]/70 dark:text-slate-400">
                      {content.contactDrawer.mobileLabel}
                    </p>
                    <p className="font-mono-tabular text-sm font-semibold text-[#14285C] dark:text-white mt-0.5">
                      +43 664 52 10 778
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:office@knopper-stb.at"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#F4F4FA] dark:bg-[#121C33] hover:border-[#E86404]/40 border border-transparent transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#E86404] dark:text-[#F0781E] shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#26304A]/70 dark:text-slate-400">
                      {content.contactDrawer.emailLabel}
                    </p>
                    <p className="text-sm font-semibold text-[#14285C] dark:text-white mt-0.5">
                      office@knopper-stb.at
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.knopper-stb.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#F4F4FA] dark:bg-[#121C33] hover:border-[#E86404]/40 border border-transparent transition-colors"
                >
                  <Globe className="w-5 h-5 text-[#E86404] dark:text-[#F0781E] shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#26304A]/70 dark:text-slate-400">
                      {content.contactDrawer.webLabel}
                    </p>
                    <p className="text-sm font-semibold text-[#14285C] dark:text-white mt-0.5">
                      www.knopper-stb.at
                    </p>
                  </div>
                </a>
              </div>

              {/* Security & Response Note */}
              <div className="rounded-xl border border-[#14285C]/15 dark:border-slate-800 p-4 space-y-2 mb-6">
                <div className="flex items-start gap-2.5 text-xs text-[#26304A] dark:text-slate-300 leading-relaxed">
                  <ShieldAlert className="w-4 h-4 text-[#E86404] dark:text-[#F0781E] shrink-0 mt-0.5" />
                  <span>{content.contactDrawer.emailSecurityNote}</span>
                </div>
                <p className="text-xs font-semibold text-[#14285C] dark:text-slate-200 pl-6">
                  {content.contactDrawer.responseNote}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#14285C]/10 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenConsultation();
                }}
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#E86404] hover:bg-[#cf5702] dark:bg-[#F0781E] dark:hover:bg-[#fb8b37] text-white dark:text-[#0B1120] font-semibold text-sm transition-colors cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{content.contactDrawer.primaryBtn}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
