import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { CreatedCalendarEvent } from '../types/app';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export const CALENDAR_SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.freebusy',
] as const;

const provider = new GoogleAuthProvider();
for (const scope of CALENDAR_SCOPES) {
  provider.addScope(scope);
}
provider.setCustomParameters({
  prompt: 'select_account',
});

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initCalendarAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        onAuthSuccess?.(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        onAuthFailure?.();
      }
    } else {
      cachedAccessToken = null;
      onAuthFailure?.();
    }
  });
};

export const signInWithGoogleForCalendar = async (): Promise<{
  user: User;
  accessToken: string;
}> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('No Google Calendar access token was returned.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } finally {
    isSigningIn = false;
  }
};

export const signOutCalendar = async (): Promise<void> => {
  await auth.signOut();
  cachedAccessToken = null;
};

export const getCalendarAccessToken = (): string | null => cachedAccessToken;

/**
 * Computes Europe/Vienna UTC offset string (+01:00 or +02:00) for a given YYYY-MM-DD
 * so Calendar FreeBusy and Event payloads map cleanly to Austrian local office hours.
 */
export function getViennaOffsetForDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const probe = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const formatted = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Vienna',
    timeZoneName: 'shortOffset',
  }).format(probe);
  const match = formatted.match(/GMT([+-]\d{1,2})(?::(\d{2}))?/);
  if (!match) return '+01:00';
  const sign = match[1].startsWith('-') ? '-' : '+';
  const hours = match[1].replace(/[+-]/, '').padStart(2, '0');
  const mins = match[2] ?? '00';
  return `${sign}${hours}:${mins}`;
}

export function buildViennaIsoDateTime(dateStr: string, timeStr: string): string {
  const offset = getViennaOffsetForDate(dateStr);
  return `${dateStr}T${timeStr}:00${offset}`;
}

export function addMinutesToTimeStr(timeStr: string, minutesToAdd: number): string {
  const [h, m] = timeStr.split(':').map(Number);
  const total = h * 60 + m + minutesToAdd;
  const nextH = Math.floor(total / 60) % 24;
  const nextM = total % 60;
  return `${String(nextH).padStart(2, '0')}:${String(nextM).padStart(2, '0')}`;
}

export async function fetchGoogleCalendarBusyIntervals(
  dateStr: string,
  accessToken: string
): Promise<Array<{ start: number; end: number }>> {
  const offset = getViennaOffsetForDate(dateStr);
  const timeMin = `${dateStr}T00:00:00${offset}`;
  const timeMax = `${dateStr}T23:59:59${offset}`;

  const res = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timeMin,
      timeMax,
      timeZone: 'Europe/Vienna',
      items: [{ id: 'primary' }],
    }),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(
      errBody?.error?.message || `Google Calendar availability check failed (${res.status}).`
    );
  }

  const data = await res.json();
  const busyList: Array<{ start: string; end: string }> =
    data?.calendars?.primary?.busy ?? [];

  return busyList.map((item) => ({
    start: new Date(item.start).getTime(),
    end: new Date(item.end).getTime(),
  }));
}

export interface CreateCalendarEventInput {
  accessToken: string;
  summary: string;
  description: string;
  location: string;
  dateStr: string;
  timeSlot: string;
  durationMinutes?: number;
  clientEmail?: string;
}

export async function createGoogleCalendarEvent(
  input: CreateCalendarEventInput
): Promise<CreatedCalendarEvent> {
  const duration = input.durationMinutes ?? 30;
  const endTime = addMinutesToTimeStr(input.timeSlot, duration);
  const startIso = buildViennaIsoDateTime(input.dateStr, input.timeSlot);
  const endIso = buildViennaIsoDateTime(input.dateStr, endTime);

  const attendees =
    input.clientEmail && input.clientEmail.includes('@')
      ? [{ email: input.clientEmail }]
      : []; // Prototype: never invite the real office address from the test site.

  const res = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${input.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summary: input.summary,
        location: input.location,
        description: input.description,
        start: {
          dateTime: startIso,
          timeZone: 'Europe/Vienna',
        },
        end: {
          dateTime: endIso,
          timeZone: 'Europe/Vienna',
        },
        attendees,
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 },
          ],
        },
      }),
    }
  );

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(
      errBody?.error?.message || `Unable to create calendar event (${res.status}).`
    );
  }

  const created = await res.json();
  return {
    id: created.id,
    htmlLink: created.htmlLink,
    summary: created.summary || input.summary,
    startIso,
    endIso,
    location: input.location,
  };
}
