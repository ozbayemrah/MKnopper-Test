export type Locale = 'de' | 'en';
export type Theme = 'light' | 'dark';

export type ArtBuyerType = 'eu_b2b' | 'eu_b2c' | 'non_eu';

export type ConsultationType = 'initial' | 'adhoc';
export type ConsultationFormat = 'video' | 'graz';
export type ConsultationTopic =
  | 'sole_proprietor'
  | 'artists_creatives'
  | 'art_cross_border'
  | 'healthcare'
  | 'international_tax'
  | 'general';

export interface ConsultationFormData {
  type: ConsultationType;
  topic: ConsultationTopic;
  format: ConsultationFormat;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm (30 min duration)
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export interface CalendarSlotStatus {
  time: string;
  busy: boolean;
}

export interface CreatedCalendarEvent {
  id: string;
  htmlLink?: string;
  summary: string;
  startIso: string;
  endIso: string;
  location: string;
}

export interface PreCallDocument {
  name: string;
  size: number;
  type: string;
}

export type SeoSectionKey =
  | 'top'
  | 'services'
  | 'art-vat'
  | 'experience'
  | 'testimonials'
  | 'iurio'
  | 'fees'
  | 'faq'
  | 'consultation';

export interface SectionSeoMeta {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}
