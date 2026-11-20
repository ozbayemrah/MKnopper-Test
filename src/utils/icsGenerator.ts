import { addMinutesToTimeStr } from '../services/googleCalendar';

export interface IcsPayload {
  title: string;
  description: string;
  location: string;
  dateStr: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm
  durationMinutes?: number;
  organizerEmail?: string;
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function formatIcsLocalDateTime(dateStr: string, timeStr: string): string {
  const compactDate = dateStr.replace(/-/g, '');
  const compactTime = timeStr.replace(/:/g, '') + '00';
  return `${compactDate}T${compactTime}`;
}

export function generateIcsContent(payload: IcsPayload): string {
  const duration = payload.durationMinutes ?? 30;
  const endTime = addMinutesToTimeStr(payload.timeSlot, duration);
  const dtStart = formatIcsLocalDateTime(payload.dateStr, payload.timeSlot);
  const dtEnd = formatIcsLocalDateTime(payload.dateStr, endTime);

  const now = new Date();
  const dtStamp = now
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');
  const uid = `knopper-${dtStart}-${Math.random().toString(36).slice(2, 8)}@knopper-stb.at`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Martin Knopper Steuerberatung//Consultation Portal//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    'TZID:Europe/Vienna',
    'BEGIN:STANDARD',
    'DTSTART:19701025T030000',
    'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
    'TZOFFSETFROM:+0200',
    'TZOFFSETTO:+0100',
    'TZNAME:CET',
    'END:STANDARD',
    'BEGIN:DAYLIGHT',
    'DTSTART:19700329T020000',
    'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
    'TZOFFSETFROM:+0100',
    'TZOFFSETTO:+0200',
    'TZNAME:CEST',
    'END:DAYLIGHT',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;TZID=Europe/Vienna:${dtStart}`,
    `DTEND;TZID=Europe/Vienna:${dtEnd}`,
    `SUMMARY:${escapeIcsText(payload.title)}`,
    `DESCRIPTION:${escapeIcsText(payload.description)}`,
    `LOCATION:${escapeIcsText(payload.location)}`,
    `ORGANIZER;CN=MMag. Martin Knopper Steuerberatung:MAILTO:${payload.organizerEmail ?? 'office@knopper-stb.at'}`,
    'STATUS:TENTATIVE',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

export function downloadIcsFile(payload: IcsPayload, filename = 'Martin-Knopper-Erstgespraech.ics'): void {
  const content = generateIcsContent(payload);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
