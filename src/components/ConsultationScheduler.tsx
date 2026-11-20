import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Info,
  LogOut,
  MapPin,
  Upload,
  Video,
  X,
  Send,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { PracticeContent } from '../data/content';
import {
  ConsultationFormat,
  ConsultationTopic,
  ConsultationType,
  CreatedCalendarEvent,
  Locale,
  PreCallDocument,
} from '../types/app';
import {
  addMinutesToTimeStr,
  createGoogleCalendarEvent,
  fetchGoogleCalendarBusyIntervals,
  getCalendarAccessToken,
  getViennaOffsetForDate,
  initCalendarAuth,
  signInWithGoogleForCalendar,
  signOutCalendar,
} from '../services/googleCalendar';
import { downloadIcsFile } from '../utils/icsGenerator';

interface ConsultationSchedulerProps {
  content: PracticeContent;
  locale: Locale;
  isModal?: boolean;
  onCloseModal?: () => void;
  onNotify?: (message: string) => void;
  attachedDocument?: PreCallDocument | null;
  onAttachDocument?: (doc: PreCallDocument) => void;
  onRemoveDocument?: () => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const TIME_SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
];

const TOPIC_KEYS: ConsultationTopic[] = [
  'sole_proprietor',
  'artists_creatives',
  'art_cross_border',
  'healthcare',
  'international_tax',
  'general',
];

function getNextBusinessDateString(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1);
  }
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function ConsultationScheduler({
  content,
  locale,
  isModal = false,
  onCloseModal,
  onNotify,
  attachedDocument,
  onAttachDocument,
  onRemoveDocument,
}: ConsultationSchedulerProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [consultType, setConsultType] = useState<ConsultationType>('initial');
  const [topic, setTopic] = useState<ConsultationTopic | ''>('');
  const [format, setFormat] = useState<ConsultationFormat>('video');
  const [selectedDate, setSelectedDate] = useState<string>(getNextBusinessDateString);
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [touched, setTouched] = useState<{
    name: boolean;
    email: boolean;
    phone: boolean;
  }>({ name: false, email: false, phone: false });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [localDocument, setLocalDocument] = useState<PreCallDocument | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const effectiveTopic: ConsultationTopic = topic || 'general';
  const selectedTypeObj =
    content.consultation.types.find((t) => t.id === consultType) ??
    content.consultation.types[0];
  const selectedFormatObj =
    content.consultation.formats.find((f) => f.id === format) ??
    content.consultation.formats[0];

  // Real-time client-side field validation
  const nameError = useMemo(() => {
    const trimmed = name.trim();
    if (!trimmed) return content.consultation.nameRequiredError;
    if (trimmed.length < 2) return content.consultation.nameTooShortError;
    return null;
  }, [name, content]);

  const emailError = useMemo(() => {
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      return content.consultation.emailInvalidError;
    }
    return null;
  }, [email, content]);

  const phoneError = useMemo(() => {
    const trimmed = phone.trim();
    if (!trimmed) return null; // Optional field
    if (!/^[+\d\s()/-]+$/.test(trimmed)) {
      return content.consultation.phoneInvalidError;
    }
    const digits = trimmed.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 16) {
      return content.consultation.phoneInvalidError;
    }
    return null;
  }, [phone, content]);

  const showNameError = (touched.name || submitAttempted) && Boolean(nameError);
  const showEmailError = (touched.email || submitAttempted) && Boolean(emailError);
  const showPhoneError =
    (touched.phone || submitAttempted || Boolean(phone.trim())) && Boolean(phoneError);

  const isControlledDocument = attachedDocument !== undefined && Boolean(onAttachDocument);
  const activeDocument = isControlledDocument ? attachedDocument : localDocument;
  const fileInputId = isModal ? 'modal-document-upload' : 'inline-document-upload';
  const idPrefix = isModal ? 'modal' : 'inline';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const nextDoc: PreCallDocument = {
      name: file.name,
      size: file.size,
      type: file.type,
    };
    if (onAttachDocument) {
      onAttachDocument(nextDoc);
    } else {
      setLocalDocument(nextDoc);
    }
    onNotify?.(content.contactDrawer.documentUpload.toastAttached);
    e.target.value = '';
  };

  const handleClearDocument = () => {
    if (onRemoveDocument) {
      onRemoveDocument();
    } else {
      setLocalDocument(null);
    }
  };

  // Google Calendar OAuth & Availability State
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(getCalendarAccessToken);
  const [authLoading, setAuthLoading] = useState(false);
  const [busyIntervals, setBusyIntervals] = useState<Array<{ start: number; end: number }>>([]);
  const [checkingBusy, setCheckingBusy] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showGoogleInfo, setShowGoogleInfo] = useState(false);

  // Confirmation & Success State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submittingEvent, setSubmittingEvent] = useState(false);
  const [createdEvent, setCreatedEvent] = useState<CreatedCalendarEvent | null>(null);
  const [icsDownloaded, setIcsDownloaded] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [inlineFeedback, setInlineFeedback] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initCalendarAuth(
      (user, token) => {
        setGoogleUser(user);
        setAccessToken(token);
      },
      () => {
        setGoogleUser(null);
        setAccessToken(null);
        setBusyIntervals([]);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let active = true;
    if (!accessToken || !selectedDate) {
      setBusyIntervals([]);
      return;
    }
    setCheckingBusy(true);
    setApiError(null);
    fetchGoogleCalendarBusyIntervals(selectedDate, accessToken)
      .then((intervals) => {
        if (active) setBusyIntervals(intervals);
      })
      .catch((err) => {
        if (active) {
          setApiError(err instanceof Error ? err.message : 'Calendar availability error.');
        }
      })
      .finally(() => {
        if (active) setCheckingBusy(false);
      });

    return () => {
      active = false;
    };
  }, [accessToken, selectedDate]);

  const slotStatuses = useMemo(() => {
    const offset = getViennaOffsetForDate(selectedDate);
    return TIME_SLOTS.map((slot) => {
      const slotStart = new Date(`${selectedDate}T${slot}:00${offset}`).getTime();
      const slotEnd = slotStart + 30 * 60 * 1000;
      const busy = busyIntervals.some(
        (b) => slotStart < b.end && slotEnd > b.start
      );
      return { time: slot, busy };
    });
  }, [busyIntervals, selectedDate]);

  // Clear selected time slot if it turns out to be busy on a newly selected date
  useEffect(() => {
    if (selectedSlot && slotStatuses.some((s) => s.time === selectedSlot && s.busy)) {
      setSelectedSlot('');
    }
  }, [slotStatuses, selectedSlot]);

  const handleSelectTopic = (chosenTopic: ConsultationTopic) => {
    setTopic(chosenTopic);
    setCurrentStep(2);
  };

  const handleSelectSlot = (slot: string) => {
    setSelectedSlot(slot);
    if (selectedDate) {
      setCurrentStep(3);
    }
  };

  const step2Unlocked = Boolean(topic);
  const step3Unlocked = Boolean(topic && selectedDate && selectedSlot);

  const buildEventDetails = () => {
    const typeLabel = selectedTypeObj.title;
    const topicLabel = content.consultation.topics[effectiveTopic];
    const location =
      format === 'graz'
        ? 'Kanzlei MMag. Martin Knopper, Grieskai 56 / 6, 8020 Graz, Austria'
        : locale === 'de'
        ? 'Verschlüsselter Videocall (Link folgt per E-Mail / IURIO)'
        : 'Encrypted Video Call (link provided via email / IURIO)';

    const summary =
      locale === 'de'
        ? `${consultType === 'initial' ? 'Erstgespräch' : 'Einzelberatung'}: MMag. Martin Knopper · ${topicLabel}`
        : `${consultType === 'initial' ? 'Initial Consultation' : 'Targeted Advisory'}: MMag. Martin Knopper · ${topicLabel}`;

    const descriptionLines = [
      `${typeLabel}`,
      `${content.consultation.topicsLabel}: ${topicLabel}`,
      `${content.consultation.formLabels.name.replace(' *', '')}: ${name}`,
      `${content.consultation.formLabels.email.replace(' *', '')}: ${email}`,
      phone ? `${content.consultation.formLabels.phone}: ${phone}` : '',
      activeDocument
        ? `${locale === 'de' ? 'Vorgemerktes Dokument' : 'Pre-call document'}: ${activeDocument.name} (${formatBytes(activeDocument.size)})`
        : '',
      notes ? `\n${notes}` : '',
      '\n---',
      'MMag. Martin Knopper · Steuerberatung · Grieskai 56 / 6, 8020 Graz · www.knopper-stb.at',
    ].filter(Boolean);

    return {
      summary,
      location,
      description: descriptionLines.join('\n'),
    };
  };

  const activeSlot = selectedSlot || '10:00';
  const isSelectedSlotBusy = useMemo(
    () => slotStatuses.some((s) => s.time === activeSlot && s.busy),
    [slotStatuses, activeSlot]
  );

  const isFormValid =
    Boolean(topic) &&
    Boolean(selectedDate) &&
    Boolean(selectedSlot) &&
    !nameError &&
    !emailError &&
    !phoneError &&
    !isSelectedSlotBusy;

  const hasVisibleBlockingErrors =
    showNameError ||
    showEmailError ||
    showPhoneError ||
    isSelectedSlotBusy ||
    (submitAttempted && !isFormValid);

  const validateForm = (): boolean => {
    setSubmitAttempted(true);
    setTouched({ name: true, email: true, phone: true });
    return isFormValid;
  };

  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    setApiError(null);
    try {
      const result = await signInWithGoogleForCalendar();
      setGoogleUser(result.user);
      setAccessToken(result.accessToken);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : 'Google Sign-In failed.'
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleSignOut = async () => {
    await signOutCalendar();
    setGoogleUser(null);
    setAccessToken(null);
    setBusyIntervals([]);
  };

  const handleRequestGoogleConfirmation = async () => {
    if (!validateForm()) return;
    setApiError(null);

    if (!accessToken) {
      setAuthLoading(true);
      try {
        const result = await signInWithGoogleForCalendar();
        setGoogleUser(result.user);
        setAccessToken(result.accessToken);
        setShowConfirmModal(true);
      } catch (err) {
        setApiError(
          err instanceof Error ? err.message : 'Google Sign-In failed.'
        );
      } finally {
        setAuthLoading(false);
      }
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmCreateGoogleEvent = async () => {
    if (!accessToken || !selectedSlot) return;
    setSubmittingEvent(true);
    setApiError(null);
    try {
      const details = buildEventDetails();
      const event = await createGoogleCalendarEvent({
        accessToken,
        summary: details.summary,
        description: details.description,
        location: details.location,
        dateStr: selectedDate,
        timeSlot: selectedSlot,
        durationMinutes: 30,
        clientEmail: email.trim(),
      });
      setCreatedEvent(event);
      setShowConfirmModal(false);
      setInlineFeedback(content.consultation.success.requestSentBanner);
      onNotify?.(content.consultation.googleToastSuccess);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : 'Failed to create Google Calendar event.'
      );
      setShowConfirmModal(false);
    } finally {
      setSubmittingEvent(false);
    }
  };

  const handleDownloadIcs = () => {
    if (!validateForm() || !selectedSlot) return;
    const details = buildEventDetails();
    downloadIcsFile(
      {
        title: details.summary,
        description: details.description,
        location: details.location,
        dateStr: selectedDate,
        timeSlot: selectedSlot,
        durationMinutes: 30,
      },
      `Martin-Knopper-${selectedDate}-${selectedSlot.replace(':', '')}.ics`
    );
    setIcsDownloaded(true);
    setInlineFeedback(content.consultation.success.requestSentBanner);
    onNotify?.(content.consultation.icsToastSuccess);
  };

  const handleSendRequest = () => {
    setSubmitAttempted(true);
    setTouched({ name: true, email: true, phone: true });
    if (!validateForm() || !selectedSlot) return;
    setSendingRequest(true);
    // Prototype: simulated network round-trip; replace with the practice's booking endpoint.
    window.setTimeout(() => {
      setSendingRequest(false);
      setRequestSent(true);

    }, 1200);
  };

  const handleReset = () => {
    setRequestSent(false);
    setCreatedEvent(null);
    setIcsDownloaded(false);
    setInlineFeedback(null);
    setTouched({ name: false, email: false, phone: false });
    setSubmitAttempted(false);
    setApiError(null);
    setTopic('');
    setSelectedSlot('');
    setCurrentStep(1);
  };

  const eventPreview = buildEventDetails();
  const endSlot = addMinutesToTimeStr(activeSlot, 30);

  return (
    <div className={isModal ? 'relative' : ''}>
      {/* Modal Header if rendered as overlay */}
      {isModal && (
        <div className="flex items-start justify-between gap-3 pb-4 mb-4 sm:pb-6 sm:mb-6 border-b border-[#102D69]/10 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#EC6608]/10 dark:bg-[#F28C45]/15 text-[#B84F05] dark:text-[#F28C45] flex items-center justify-center shrink-0 mt-0.5">
              <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#B84F05] dark:text-[#F28C45] mb-0.5 sm:mb-1">
                {content.consultation.kicker}
              </p>
              <h2 className="text-xl sm:text-3xl font-bold text-[#102D69] dark:text-white leading-tight">
                {content.consultation.title}
              </h2>
              <p className="hidden sm:block text-sm text-[#1B1F2B] dark:text-slate-300 mt-1">
                {content.consultation.subtitle}
              </p>
            </div>
          </div>
          {onCloseModal && (
            <button
              type="button"
              onClick={onCloseModal}
              aria-label={content.contactDrawer.closeLabel}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-[#102D69]/15 dark:border-slate-700 text-[#102D69] dark:text-slate-200 hover:bg-[#F3F5FA] dark:hover:bg-[#0B1734] cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {/* Inline Success Feedback Message after Form Submission */}
      {inlineFeedback && (
        <div
          role="status"
          aria-live="polite"
          className="mb-4 sm:mb-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-4 py-3 flex items-start justify-between gap-3 text-emerald-900 dark:text-emerald-200"
        >
          <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold">
            <CheckCircle2
              className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>{inlineFeedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setInlineFeedback(null)}
            aria-label={content.contactDrawer.closeLabel}
            className="p-1 rounded-md text-emerald-700/70 hover:text-emerald-900 dark:text-emerald-300/80 dark:hover:text-white cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Success Receipt View */}
      {(requestSent || createdEvent || icsDownloaded) ? (
        <div className="rounded-2xl bg-[#F3F5FA] dark:bg-[#0B1734] border border-[#102D69]/12 dark:border-slate-800 p-5 sm:p-8 animate-step-in">
          <div className="flex items-start gap-3.5 sm:gap-4 mb-5 sm:mb-6">
            <div className="w-11 h-11 rounded-full bg-emerald-600/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#102D69] dark:text-white">
                {requestSent
                  ? content.consultation.success.titleSent
                  : createdEvent
                  ? content.consultation.success.titleGoogle
                  : content.consultation.success.titleIcs}
              </h3>
              <p className="text-xs sm:text-base text-[#1B1F2B] dark:text-slate-300 mt-1 leading-relaxed">
                {requestSent
                  ? content.consultation.success.descSent
                  : createdEvent
                  ? content.consultation.success.descGoogle
                  : content.consultation.success.descIcs}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-white dark:bg-[#060F26] border border-[#102D69]/10 dark:border-slate-800 p-4 sm:p-5 mb-5 sm:mb-6 space-y-1.5 text-sm">
            <p className="font-bold text-[#102D69] dark:text-white">
              {eventPreview.summary}
            </p>
            <p className="font-mono-tabular text-[#B84F05] dark:text-[#F28C45] font-semibold">
              {selectedDate} · {activeSlot} – {endSlot} (Europe/Vienna)
            </p>
            <p className="text-xs sm:text-sm text-[#1B1F2B] dark:text-slate-300">
              {eventPreview.location}
            </p>
            {activeDocument && (
              <p className="pt-1 flex items-center gap-2 text-xs font-semibold text-[#102D69] dark:text-slate-200">
                <FileText className="w-4 h-4 text-[#B84F05] dark:text-[#F28C45] shrink-0" aria-hidden="true" />
                <span className="truncate">{activeDocument.name}</span>
                <span className="font-mono-tabular text-[#1B1F2B]/70 dark:text-slate-400 shrink-0">
                  ({formatBytes(activeDocument.size)})
                </span>
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {createdEvent?.htmlLink && (
              <a
                href={createdEvent.htmlLink}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#102D69] text-white dark:bg-[#F28C45] dark:text-[#060F26] text-sm font-semibold hover:opacity-95"
              >
                <span>{content.consultation.success.openCalendarLink}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              type="button"
              onClick={handleDownloadIcs}
              className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#102D69]/20 dark:border-slate-700 text-[#102D69] dark:text-slate-100 text-sm font-semibold hover:bg-white dark:hover:bg-[#060F26] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{content.consultation.success.downloadIcsAgain}</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="min-h-[44px] px-4 py-2.5 text-sm font-semibold text-[#B84F05] dark:text-[#F28C45] hover:underline cursor-pointer"
            >
              {content.consultation.success.scheduleAnother}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {/* Sleek Compact 3-Step Segmented Tab Bar */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <nav
              aria-label={content.consultation.title}
              className="inline-flex flex-nowrap items-center p-1 rounded-xl bg-[#F3F5FA] dark:bg-[#060F26] border border-[#102D69]/12 dark:border-slate-800 gap-1 max-w-full overflow-x-auto"
            >
              {[1, 2, 3].map((stepNum) => {
                const stepIdx = stepNum as 1 | 2 | 3;
                const isActive = currentStep === stepIdx;
                const isCompleted =
                  (stepIdx === 1 && Boolean(topic) && currentStep > 1) ||
                  (stepIdx === 2 && Boolean(selectedDate && selectedSlot) && currentStep > 2);
                const isUnlocked =
                  stepIdx === 1 ||
                  (stepIdx === 2 && step2Unlocked) ||
                  (stepIdx === 3 && step3Unlocked);

                const rawShort = content.consultation.stepLabelsShort[stepIdx - 1].replace(/^\d+\.\s*/, '');
                const rawFull = content.consultation.stepLabels[stepIdx - 1].replace(/^\d+\.\s*/, '');

                return (
                  <button
                    key={stepNum}
                    type="button"
                    disabled={!isUnlocked}
                    onClick={() => isUnlocked && setCurrentStep(stepIdx)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`h-8 sm:h-9 px-2.5 sm:px-3.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#102D69] text-white dark:bg-[#193270] dark:text-white shadow-xs cursor-pointer'
                        : isCompleted
                        ? 'text-[#102D69] dark:text-slate-100 hover:bg-white dark:hover:bg-[#0B1734] cursor-pointer'
                        : isUnlocked
                        ? 'text-[#1B1F2B] dark:text-slate-300 hover:bg-white/80 dark:hover:bg-[#0B1734] cursor-pointer'
                        : 'text-[#1B1F2B]/40 dark:text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span
                      className={`font-mono-tabular text-[10px] font-bold ${
                        isActive
                          ? 'text-[#F28C45]'
                          : isCompleted
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'opacity-70'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3 h-3" aria-hidden="true" />
                      ) : (
                        `0${stepNum}`
                      )}
                    </span>
                    <span className="sm:hidden">{rawShort}</span>
                    <span className="hidden sm:inline">{rawFull}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* STEP 1: Consultation Type Dropdown, Format, and Topic Selection */}
          {currentStep === 1 && (
            <div className="animate-step-in space-y-4 sm:space-y-5">
              {/* Compact Row: Consultation Type Dropdown + Preferred Format */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 items-start">
                {/* Free of Charge / Targeted Advisory Dropdown */}
                <div className="md:col-span-7">
                  <label
                    htmlFor={`${idPrefix}-consult-type`}
                    className="block text-xs font-bold text-[#102D69] dark:text-slate-200 mb-1.5"
                  >
                    {content.consultation.typeLabel}
                  </label>
                  <div className="relative">
                    <select
                      id={`${idPrefix}-consult-type`}
                      value={consultType}
                      onChange={(e) => setConsultType(e.target.value as ConsultationType)}
                      className="w-full min-h-[44px] appearance-none pl-3.5 pr-10 py-2 rounded-xl bg-white dark:bg-[#060F26] border border-[#102D69]/20 dark:border-slate-700 text-xs sm:text-sm font-semibold text-[#102D69] dark:text-slate-100 focus:outline-none focus:border-[#EC6608]"
                    >
                      {content.consultation.types.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.feeLabel} — {item.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="w-4 h-4 text-[#B84F05] dark:text-[#F28C45] pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] sm:text-xs text-[#1B1F2B]/80 dark:text-slate-400 leading-snug">
                    {selectedTypeObj.desc}
                  </p>
                </div>

                {/* Preferred Format Toggle */}
                <div className="md:col-span-5">
                  <span className="block text-xs font-bold text-[#102D69] dark:text-slate-200 mb-1.5">
                    {content.consultation.formatLabel}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {content.consultation.formats.map((fmt) => {
                      const active = format === fmt.id;
                      return (
                        <button
                          key={fmt.id}
                          type="button"
                          onClick={() => setFormat(fmt.id)}
                          className={`min-h-[44px] px-3 py-2 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#B84F05] dark:bg-[#F28C45] text-white dark:text-[#060F26] border-[#EC6608]'
                              : 'bg-white dark:bg-[#060F26] text-[#102D69] dark:text-slate-200 border-[#102D69]/20 dark:border-slate-700 hover:border-[#EC6608]/50'
                          }`}
                        >
                          {fmt.id === 'video' ? (
                            <Video className="w-4 h-4 shrink-0" />
                          ) : (
                            <MapPin className="w-4 h-4 shrink-0" />
                          )}
                          <span className="truncate">{fmt.shortLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Primary Topic Selector (Auto-advances to Step 2 on selection) */}
              <div className="pt-2 border-t border-[#102D69]/10 dark:border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor={`${idPrefix}-topic`}
                    className="text-xs font-bold text-[#102D69] dark:text-slate-200"
                  >
                    {content.consultation.topicsLabel}
                  </label>
                  <span className="text-[11px] text-[#1B1F2B]/75 dark:text-slate-400">
                    {content.consultation.wizard.selectTopicHint}
                  </span>
                </div>

                {/* Mobile Version: Compact Dropdown */}
                <div className="md:hidden relative">
                  <select
                    id={`${idPrefix}-topic`}
                    value={topic}
                    onChange={(e) => {
                      const val = e.target.value as ConsultationTopic | '';
                      if (val) {
                        handleSelectTopic(val);
                      }
                    }}
                    className="w-full min-h-[44px] appearance-none pl-3.5 pr-10 py-2 rounded-xl bg-[#F3F5FA] dark:bg-[#0B1734] border border-[#102D69]/20 dark:border-slate-700 text-sm font-semibold text-[#102D69] dark:text-slate-100 focus:outline-none focus:border-[#EC6608]"
                  >
                    <option value="">{content.consultation.topicPlaceholder}</option>
                    {TOPIC_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {content.consultation.topics[key]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="w-4 h-4 text-[#B84F05] dark:text-[#F28C45] pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                </div>

                {/* Tablet & Desktop Version: Refined Compact Topic Selector */}
                <div
                  className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-2"
                  role="radiogroup"
                  aria-label={content.consultation.topicsLabel}
                >
                  {TOPIC_KEYS.map((key) => {
                    const active = topic === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => handleSelectTopic(key)}
                        className={`min-h-[38px] px-3 py-2 rounded-lg border text-left text-xs font-semibold flex items-center justify-between gap-2 transition-colors cursor-pointer group ${
                          active
                            ? 'bg-[#102D69] text-white border-[#102D69] dark:bg-[#193270] dark:border-[#F28C45]'
                            : 'bg-[#F3F5FA]/65 dark:bg-[#0B1734] text-[#102D69] dark:text-slate-200 border-[#102D69]/12 dark:border-slate-700 hover:border-[#EC6608]/60 hover:bg-white dark:hover:bg-[#162340]'
                        }`}
                      >
                        <span className="leading-snug">{content.consultation.topics[key]}</span>
                        <ArrowRight
                          className={`w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                            active
                              ? 'text-[#F28C45]'
                              : 'text-[#B84F05]/70 dark:text-[#F28C45]/70'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Continue Button when returning to Step 1 with a topic already chosen */}
              {topic && (
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="min-h-[42px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B84F05] hover:bg-[#A84604] dark:bg-[#F28C45] text-white dark:text-[#060F26] text-xs sm:text-sm font-semibold cursor-pointer"
                  >
                    <span>{content.consultation.wizard.continueToDateBtn}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Date Selection & Available Time Slots */}
          {currentStep === 2 && (
            <div className="animate-step-in space-y-4">
              {/* Compact Step 1 Recap + Google Calendar Button & Info Hover Tooltip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex-1 min-w-0 rounded-xl bg-[#F3F5FA] dark:bg-[#0B1734] border border-[#102D69]/12 dark:border-slate-800 px-3 py-2 flex items-center justify-between gap-2">
                  <div className="min-w-0 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                    <span className="font-bold text-[#102D69] dark:text-white truncate">
                      {content.consultation.topics[effectiveTopic]}
                    </span>
                    <span aria-hidden="true" className="text-[#1B1F2B]/40 dark:text-slate-500">
                      ·
                    </span>
                    <span className="text-[#B84F05] dark:text-[#F28C45] font-semibold truncate">
                      {selectedTypeObj.feeLabel}
                    </span>
                    <span aria-hidden="true" className="text-[#1B1F2B]/40 dark:text-slate-500">
                      ·
                    </span>
                    <span className="text-[#1B1F2B] dark:text-slate-300 truncate">
                      {selectedFormatObj.shortLabel}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-[#B84F05] dark:text-[#F28C45] hover:underline whitespace-nowrap shrink-0 cursor-pointer py-0.5 px-1"
                  >
                    {content.consultation.wizard.editBtn}
                  </button>
                </div>

                {/* Google availability check hidden: it reads the visitor's calendar, not the advisor's */}
                <div className="hidden">
                  {accessToken ? (
                    <button
                      type="button"
                      onClick={handleGoogleSignOut}
                      className="h-9 inline-flex items-center gap-1.5 px-3 rounded-lg border border-[#102D69]/20 dark:border-slate-700 bg-white dark:bg-[#060F26] text-xs font-semibold text-[#102D69] dark:text-slate-200 hover:border-[#EC6608]/60 whitespace-nowrap cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                      <span>{content.consultation.googleSignOutBtn}</span>
                      <LogOut className="w-3 h-3 opacity-70" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={authLoading}
                      className="gsi-material-button !h-9 !px-3 !text-xs !rounded-lg"
                    >
                      <div className="gsi-material-button-content-wrapper">
                        <div className="gsi-material-button-icon !w-4 !h-4">
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            style={{ display: 'block' }}
                          >
                            <path
                              fill="#EA4335"
                              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                            />
                            <path
                              fill="#4285F4"
                              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                            />
                            <path
                              fill="#34A853"
                              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                            />
                          </svg>
                        </div>
                        <span className="gsi-material-button-contents">
                          {authLoading ? '...' : content.consultation.googleSignInBtn}
                        </span>
                      </div>
                    </button>
                  )}

                  {/* Hover / Focus / Tap Info Tooltip Icon */}
                  <div
                    className="relative group"
                    onMouseEnter={() => setShowGoogleInfo(true)}
                    onMouseLeave={() => setShowGoogleInfo(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setShowGoogleInfo((prev) => !prev)}
                      onFocus={() => setShowGoogleInfo(true)}
                      onBlur={() => setShowGoogleInfo(false)}
                      aria-label={content.consultation.googleCheckHeading}
                      aria-expanded={showGoogleInfo}
                      aria-describedby={`${idPrefix}-gcal-tooltip`}
                      className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[#102D69]/15 dark:border-slate-700 bg-white dark:bg-[#060F26] text-[#102D69]/75 dark:text-slate-300 hover:text-[#B84F05] hover:border-[#EC6608]/50 dark:hover:text-[#F28C45] transition-colors cursor-pointer"
                    >
                      <Info className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <div
                      id={`${idPrefix}-gcal-tooltip`}
                      role="tooltip"
                      className={`absolute right-0 top-full mt-2 w-64 sm:w-72 rounded-xl bg-white dark:bg-[#0B1734] border border-[#102D69]/15 dark:border-slate-700 p-3 shadow-xl z-30 transition-all duration-150 ${
                        showGoogleInfo
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0'
                      }`}
                    >
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#B84F05] dark:text-[#F28C45] mb-1">
                        {content.consultation.googleCheckHeading}
                      </p>
                      <p className="text-xs text-[#1B1F2B] dark:text-slate-300 leading-relaxed">
                        {accessToken && googleUser
                          ? `${content.consultation.googleCheckConnected} (${googleUser.email})`
                          : content.consultation.googleBusyNote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date Input + Time Slots */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <div className="md:col-span-4">
                  <label
                    htmlFor={`${idPrefix}-date`}
                    className="block text-xs font-bold text-[#102D69] dark:text-slate-200 mb-1.5"
                  >
                    {content.consultation.dateLabel}
                  </label>
                  <input
                    id={`${idPrefix}-date`}
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full min-h-[42px] px-3 py-2 rounded-xl bg-white dark:bg-[#060F26] border border-[#102D69]/20 dark:border-slate-700 font-mono-tabular text-sm text-[#102D69] dark:text-slate-100 focus:outline-none focus:border-[#EC6608]"
                  />
                  <p className="mt-1.5 text-[11px] text-[#1B1F2B]/75 dark:text-slate-400">
                    {content.consultation.timezoneNote}
                  </p>
                </div>

                <div className="md:col-span-8">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-[#102D69] dark:text-slate-200">
                      {content.consultation.timeLabel}
                    </span>
                    <span className="text-[11px] text-[#1B1F2B]/75 dark:text-slate-400">
                      {checkingBusy ? '...' : content.consultation.wizard.selectDateTimeHint}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {slotStatuses.map(({ time, busy }) => {
                      const active = selectedSlot === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={busy}
                          onClick={() => handleSelectSlot(time)}
                          className={`min-h-[40px] sm:min-h-[44px] px-2 py-1.5 rounded-xl border font-mono-tabular text-xs font-semibold flex flex-col items-center justify-center transition-colors ${
                            busy
                              ? 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed line-through'
                              : active
                              ? 'bg-[#B84F05] dark:bg-[#F28C45] text-white dark:text-[#060F26] border-[#EC6608] cursor-pointer'
                              : 'bg-white dark:bg-[#060F26] text-[#102D69] dark:text-slate-200 border-[#102D69]/15 dark:border-slate-700 hover:border-[#EC6608]/60 cursor-pointer'
                          }`}
                        >
                          <span>{time}</span>
                          {busy && (
                            <span className="text-[10px] no-underline font-sans">
                              {content.consultation.busyBadge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#102D69]/10 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#102D69]/20 dark:border-slate-700 text-xs font-semibold text-[#102D69] dark:text-slate-200 hover:bg-[#F3F5FA] dark:hover:bg-[#0B1734] cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{content.consultation.wizard.backBtn}</span>
                </button>

                {selectedDate && selectedSlot && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="min-h-[40px] inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B84F05] hover:bg-[#A84604] dark:bg-[#F28C45] text-white dark:text-[#060F26] text-xs font-semibold cursor-pointer"
                  >
                    <span>{content.consultation.wizard.continueToContactBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Contact Details, Document Attachment & Calendar Submission */}
          {currentStep === 3 && (
            <div className="animate-step-in space-y-4">
              {/* Compact Steps 1 & 2 Recap Bar */}
              <div className="rounded-xl bg-[#F3F5FA] dark:bg-[#0B1734] border border-[#102D69]/12 dark:border-slate-800 px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                  <span className="font-mono-tabular font-bold text-[#B84F05] dark:text-[#F28C45]">
                    {selectedDate} · {activeSlot}
                  </span>
                  <span aria-hidden="true" className="text-[#1B1F2B]/40 dark:text-slate-500">
                    ·
                  </span>
                  <span className="font-bold text-[#102D69] dark:text-white truncate">
                    {content.consultation.topics[effectiveTopic]}
                  </span>
                  <span aria-hidden="true" className="text-[#1B1F2B]/40 dark:text-slate-500">
                    ·
                  </span>
                  <span className="text-[#1B1F2B] dark:text-slate-300 truncate">
                    {selectedFormatObj.shortLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-bold text-[#B84F05] dark:text-[#F28C45] hover:underline whitespace-nowrap shrink-0 cursor-pointer py-1 px-1.5"
                >
                  {content.consultation.wizard.editBtn}
                </button>
              </div>

              {/* Compact Contact Form Card */}
              <div className="rounded-2xl bg-[#F3F5FA] dark:bg-[#0B1734] border border-[#102D69]/12 dark:border-slate-800 p-4 sm:p-6 space-y-3 sm:space-y-4">
                {/* Name & Email Side-by-Side on sm+ to save mobile/tablet height */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor={`${idPrefix}-name`}
                      className="block text-xs font-bold text-[#102D69] dark:text-slate-200 mb-1"
                    >
                      {content.consultation.formLabels.name}
                    </label>
                    <div className="relative">
                      <input
                        id={`${idPrefix}-name`}
                        type="text"
                        required
                        value={name}
                        aria-invalid={showNameError}
                        aria-describedby={showNameError ? `${idPrefix}-name-error` : undefined}
                        onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={content.consultation.formLabels.namePlaceholder}
                        className={`w-full min-h-[42px] pl-3 pr-8 py-2 rounded-xl bg-white dark:bg-[#060F26] text-sm text-[#102D69] dark:text-slate-100 focus:outline-none transition-colors ${
                          showNameError
                            ? 'border-2 border-red-500 dark:border-red-400'
                            : !nameError && name.trim()
                            ? 'border border-emerald-500/70 dark:border-emerald-400/60 focus:border-[#EC6608]'
                            : 'border border-[#102D69]/20 dark:border-slate-700 focus:border-[#EC6608]'
                        }`}
                      />
                      {!nameError && name.trim() && (
                        <CheckCircle2
                          className="w-4 h-4 text-emerald-600 dark:text-emerald-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    {showNameError && (
                      <p
                        id={`${idPrefix}-name-error`}
                        role="alert"
                        className="mt-1 text-xs font-medium text-red-600 dark:text-red-400"
                      >
                        {nameError}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor={`${idPrefix}-email`}
                      className="block text-xs font-bold text-[#102D69] dark:text-slate-200 mb-1"
                    >
                      {content.consultation.formLabels.email}
                    </label>
                    <div className="relative">
                      <input
                        id={`${idPrefix}-email`}
                        type="email"
                        required
                        value={email}
                        aria-invalid={showEmailError}
                        aria-describedby={showEmailError ? `${idPrefix}-email-error` : undefined}
                        onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={content.consultation.formLabels.emailPlaceholder}
                        className={`w-full min-h-[42px] pl-3 pr-8 py-2 rounded-xl bg-white dark:bg-[#060F26] text-sm text-[#102D69] dark:text-slate-100 focus:outline-none transition-colors ${
                          showEmailError
                            ? 'border-2 border-red-500 dark:border-red-400'
                            : !emailError && email.trim()
                            ? 'border border-emerald-500/70 dark:border-emerald-400/60 focus:border-[#EC6608]'
                            : 'border border-[#102D69]/20 dark:border-slate-700 focus:border-[#EC6608]'
                        }`}
                      />
                      {!emailError && email.trim() && (
                        <CheckCircle2
                          className="w-4 h-4 text-emerald-600 dark:text-emerald-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    {showEmailError && (
                      <p
                        id={`${idPrefix}-email-error`}
                        role="alert"
                        className="mt-1 text-xs font-medium text-red-600 dark:text-red-400"
                      >
                        {emailError}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Document Upload Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor={`${idPrefix}-phone`}
                      className="block text-xs font-bold text-[#102D69] dark:text-slate-200 mb-1"
                    >
                      {content.consultation.formLabels.phone}
                    </label>
                    <div className="relative">
                      <input
                        id={`${idPrefix}-phone`}
                        type="tel"
                        inputMode="tel"
                        value={phone}
                        aria-invalid={showPhoneError}
                        aria-describedby={showPhoneError ? `${idPrefix}-phone-error` : undefined}
                        onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={content.consultation.formLabels.phonePlaceholder}
                        className={`w-full min-h-[42px] pl-3 pr-8 py-2 rounded-xl bg-white dark:bg-[#060F26] text-sm text-[#102D69] dark:text-slate-100 focus:outline-none transition-colors ${
                          showPhoneError
                            ? 'border-2 border-red-500 dark:border-red-400'
                            : !phoneError && phone.trim()
                            ? 'border border-emerald-500/70 dark:border-emerald-400/60 focus:border-[#EC6608]'
                            : 'border border-[#102D69]/20 dark:border-slate-700 focus:border-[#EC6608]'
                        }`}
                      />
                      {!phoneError && phone.trim() && (
                        <CheckCircle2
                          className="w-4 h-4 text-emerald-600 dark:text-emerald-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    {showPhoneError && (
                      <p
                        id={`${idPrefix}-phone-error`}
                        role="alert"
                        className="mt-1 text-xs font-medium text-red-600 dark:text-red-400"
                      >
                        {phoneError}
                      </p>
                    )}
                  </div>
                </div>

                {/* Compact Notes */}
                <div>
                  <label
                    htmlFor={`${idPrefix}-notes`}
                    className="block text-xs font-bold text-[#102D69] dark:text-slate-200 mb-1"
                  >
                    {content.consultation.formLabels.notes}
                  </label>
                  <textarea
                    id={`${idPrefix}-notes`}
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={content.consultation.formLabels.notesPlaceholder}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#060F26] border border-[#102D69]/20 dark:border-slate-700 text-sm text-[#102D69] dark:text-slate-100 focus:outline-none focus:border-[#EC6608]"
                  />
                </div>

                {(hasVisibleBlockingErrors || apiError) && (
                  <div
                    role="alert"
                    className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 px-3.5 py-2.5 flex items-start gap-2 text-xs text-red-800 dark:text-red-300"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{apiError || content.consultation.validationError}</span>
                  </div>
                )}

                {/* Actions Row */}
                <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="order-3 sm:order-1 min-h-[42px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#102D69]/20 dark:border-slate-700 bg-white dark:bg-[#060F26] text-xs font-semibold text-[#102D69] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{content.consultation.wizard.backBtn}</span>
                  </button>

                  <div className="order-1 sm:order-2 flex flex-col sm:flex-row gap-2.5 flex-1 sm:justify-end">
                    <button
                      type="button"
                      onClick={handleDownloadIcs}
                      disabled={hasVisibleBlockingErrors}
                      className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-[#102D69]/20 dark:border-slate-700 bg-white dark:bg-[#060F26] text-[#102D69] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 font-semibold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="w-4 h-4 shrink-0" />
                      <span>{content.consultation.actions.downloadIcs}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendRequest}
                      disabled={sendingRequest}
                      aria-busy={sendingRequest}
                      className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-[#B84F05] hover:bg-[#A84604] dark:bg-[#F28C45] dark:hover:bg-[#F6A96F] text-white dark:text-[#060F26] font-semibold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sendingRequest ? (
                        <span className="w-4 h-4 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden="true" />
                      ) : (
                        <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
                      )}
                      <span>
                        {sendingRequest
                          ? content.consultation.actions.sending
                          : content.consultation.actions.sendRequest}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mandatory Explicit Confirmation Dialog before writing to Google Calendar */}
      {showConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gcal-confirm-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060F26]/70 backdrop-blur-sm"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#0B1734] border border-[#102D69]/15 dark:border-slate-700 p-6 sm:p-7 shadow-2xl">
            <h3
              id="gcal-confirm-title"
              className="text-xl font-bold text-[#102D69] dark:text-white mb-2"
            >
              {content.consultation.confirmModal.title}
            </h3>
            <p className="text-sm text-[#1B1F2B] dark:text-slate-300 mb-5">
              {content.consultation.confirmModal.lead}
            </p>

            <dl className="rounded-xl bg-[#F3F5FA] dark:bg-[#060F26] border border-[#102D69]/10 dark:border-slate-800 p-4 space-y-3 text-sm mb-6">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-[#1B1F2B]/70 dark:text-slate-400">
                  {content.consultation.confirmModal.eventLabel}
                </dt>
                <dd className="font-semibold text-[#102D69] dark:text-white mt-0.5">
                  {eventPreview.summary}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-[#1B1F2B]/70 dark:text-slate-400">
                  {content.consultation.confirmModal.whenLabel}
                </dt>
                <dd className="font-mono-tabular font-semibold text-[#B84F05] dark:text-[#F28C45] mt-0.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {selectedDate} · {activeSlot} – {endSlot} (Europe/Vienna)
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-[#1B1F2B]/70 dark:text-slate-400">
                  {content.consultation.confirmModal.whereLabel}
                </dt>
                <dd className="text-[#1B1F2B] dark:text-slate-200 mt-0.5">
                  {eventPreview.location}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-[#1B1F2B]/70 dark:text-slate-400">
                  {content.consultation.confirmModal.attendeesLabel}
                </dt>
                <dd className="text-[#1B1F2B] dark:text-slate-200 mt-0.5">
                  {email.trim()} · office@knopper-stb.at
                </dd>
              </div>
              {activeDocument && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-[#1B1F2B]/70 dark:text-slate-400">
                    {locale === 'de' ? 'Dokument' : 'Attached Document'}
                  </dt>
                  <dd className="text-[#102D69] dark:text-white font-semibold mt-0.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#B84F05] dark:text-[#F28C45] shrink-0" aria-hidden="true" />
                    <span>{activeDocument.name}</span>
                  </dd>
                </div>
              )}
            </dl>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={submittingEvent}
                className="min-h-[44px] px-4 py-2 rounded-xl border border-[#102D69]/20 dark:border-slate-700 text-sm font-semibold text-[#102D69] dark:text-slate-200 hover:bg-[#F3F5FA] dark:hover:bg-[#060F26] cursor-pointer"
              >
                {content.consultation.confirmModal.cancelBtn}
              </button>
              <button
                type="button"
                onClick={handleConfirmCreateGoogleEvent}
                disabled={submittingEvent}
                className="min-h-[44px] px-5 py-2 rounded-xl bg-[#B84F05] hover:bg-[#A84604] dark:bg-[#F28C45] text-white dark:text-[#060F26] text-sm font-semibold cursor-pointer disabled:opacity-60"
              >
                {submittingEvent
                  ? content.consultation.actions.creating
                  : content.consultation.confirmModal.confirmBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
