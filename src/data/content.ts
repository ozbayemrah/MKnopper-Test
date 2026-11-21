import { ArtBuyerType, ConsultationTopic, Locale, SectionSeoMeta, SeoSectionKey } from '../types/app';

export interface PracticeContent {
  meta: {
    brandName: string;
    brandSub: string;
    advisorTitle: string;
    credentials: string;
    locationShort: string;
  };
  nav: {
    services: string;
    artVat: string;
    experience: string;
    iurio: string;
    fees: string;
    cta: string;
    ctaShort: string;
  };
  utility: {
    showMore: string;
    showLess: string;
    languageLabel: string;
    themeLight: string;
    themeDark: string;
    officeBadge: string;
    backToTop: string;
  };
  hero: {
    kicker: string;
    headlineAccent: string;
    headlineMain: string;
    subline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    portraitCaption: string;
    portraitSub: string;
    keyMarkers: Array<{ value: string; label: string }>;
  };
  services: {
    kicker: string;
    title: string;
    intro: string;
    items: Array<{
      index: string;
      title: string;
      subtitle: string;
      description: string;
      highlight?: boolean;
    }>;
  };
  artVat: {
    kicker: string;
    title: string;
    intro: string;
    imageCaption: string;
    baselineHeading: string;
    baselines: Array<{
      figure: string;
      title: string;
      detail: string;
    }>;
    scenarioHeading: string;
    scenarios: Record<
      ArtBuyerType,
      {
        tabLabel: string;
        headline: string;
        summary: string;
        steps: Array<{ num: string; title: string; detail: string }>;
        note: string;
      }
    >;
    pitfallsHeading: string;
    pitfalls: Array<{ num: string; title: string; detail: string }>;
    disclaimer: string;
  };
  experience: {
    kicker: string;
    title: string;
    intro: string;
    timelineLegend: { publicAdmin: string; taxAdvisory: string };
    timeline: Array<{
      period: string;
      years: string;
      label: string;
      world: 'public' | 'tax';
    }>;
    summaryCard: {
      yearsNumber: string;
      yearsUnit: string;
      yearsDesc: string;
      degreesNumber: string;
      degreesTitle: string;
      degreesList: string[];
      motto: string;
    };
    publicCard: {
      yearsNumber: string;
      yearsUnit: string;
      title: string;
      areasLabel: string;
      areas: string[];
    };
    taxCard: {
      yearsNumber: string;
      yearsUnit: string;
      title: string;
      subtitle: string;
      focusLabel: string;
      focusAreas: string[];
      clientsLabel: string;
      clients: string[];
    };
    music: {
      title: string;
      subtitle: string;
      motifNote: string;
      caption: string;
      pianoCaption: string;
      pianoAlt: string;
      notes: Array<{
        pitch: string;
        accidental?: 'flat' | 'natural' | 'sharp';
        title: string;
        span: string;
        detail: string;
      }>;
    };
  };
  testimonials: {
    kicker: string;
    title: string;
    subtitle: string;
    confidentialityNote: string;
    ratingSummary: string;
    ratingCountLabel: string;
    prevLabel: string;
    nextLabel: string;
    slideNavLabel: string;
    items: Array<{
      id: string;
      quote: string;
      authorLabel: string;
      role: string;
      location: string;
      scope: string;
      since: string;
      outcome: string;
      rating: number;
    }>;
  };
  iurio: {
    kicker: string;
    title: string;
    intro: string;
    workspaceCaption: string;
    features: Array<{ title: string; detail: string }>;
    securityBand: {
      title: string;
      points: string[];
    };
    onboardingTitle: string;
    onboardingSteps: Array<{ num: string; title: string; detail: string }>;
    workflowTitle: string;
    workflowPoints: string[];
    footNote: string;
  };
  fees: {
    kicker: string;
    title: string;
    intro: string;
    columns: { service: string; rate: string; unit: string };
    rows: Array<{ service: string; rate: string; unit: string; accent?: boolean }>;
    factorsTitle: string;
    factorsText: string;
    agreementTitle: string;
    agreementText: string;
    deductibleTitle: string;
    deductibleText: string;
  };
  faq: {
    kicker: string;
    title: string;
    subtitle: string;
    allCategoriesLabel: string;
    expandAllLabel: string;
    collapseAllLabel: string;
    categories: Record<'fees' | 'cross_border' | 'digital' | 'mandate', string>;
    ctaPrompt: string;
    ctaButton: string;
    items: Array<{
      id: string;
      category: 'fees' | 'cross_border' | 'digital' | 'mandate';
      question: string;
      answer: string;
    }>;
  };
  consultation: {
    kicker: string;
    title: string;
    subtitle: string;
    stepLabels: [string, string, string];
    stepLabelsShort: [string, string, string];
    typeLabel: string;
    types: Array<{
      id: 'initial' | 'adhoc';
      title: string;
      feeLabel: string;
      desc: string;
    }>;
    topicsLabel: string;
    topicPlaceholder: string;
    topics: Record<ConsultationTopic, string>;
    wizard: {
      backBtn: string;
      continueToDateBtn: string;
      continueToContactBtn: string;
      editBtn: string;
      selectTopicHint: string;
      selectDateTimeHint: string;
    };
    formatLabel: string;
    formats: Array<{ id: 'video' | 'graz'; shortLabel: string; title: string; detail: string }>;
    dateLabel: string;
    timeLabel: string;
    timezoneNote: string;
    inPersonPaidOnly: string;
    googleCheckHeading: string;
    googleCheckConnected: string;
    googleSignInBtn: string;
    googleSignOutBtn: string;
    googleBusyNote: string;
    busyBadge: string;
    formLabels: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      notes: string;
      notesPlaceholder: string;
    };
    validationError: string;
    nameRequiredError: string;
    nameTooShortError: string;
    emailInvalidError: string;
    phoneInvalidError: string;
    icsToastSuccess: string;
    googleToastSuccess: string;
    actions: {
      sendRequest: string;
      sending: string;
      addToGoogleCalendar: string;
      downloadIcs: string;
      creating: string;
    };
    confirmModal: {
      title: string;
      lead: string;
      eventLabel: string;
      whenLabel: string;
      whereLabel: string;
      attendeesLabel: string;
      confirmBtn: string;
      cancelBtn: string;
    };
    success: {
      requestSentBanner: string;
      titleSent: string;
      descSent: string;
      titleGoogle: string;
      titleIcs: string;
      descGoogle: string;
      descIcs: string;
      openCalendarLink: string;
      downloadIcsAgain: string;
      scheduleAnother: string;
      prototypeNote: string;
    };
  };
  contactDrawer: {
    tabLabel: string;
    title: string;
    subtitle: string;
    addressLabel: string;
    addressValue: string;
    phoneLabel: string;
    mobileLabel: string;
    emailLabel: string;
    webLabel: string;
    emailSecurityNote: string;
    responseNote: string;
    primaryBtn: string;
    closeLabel: string;
    documentUpload: {
      prompt: string;
      label: string;
      buttonLabel: string;
      folderLabel: string;
      replaceLabel: string;
      removeLabel: string;
      attachedNote: string;
      toastAttached: string;
    };
  };
  mobileBar: {
    services: string;
    artVat: string;
    consult: string;
    menu: string;
    sheetTitle: string;
    sectionsTitle: string;
    preferencesTitle: string;
    currentLabel: string;
    callLabel: string;
    mailLabel: string;
  };
  footer: {
    tagline: string;
    address: string;
    legal: string;
    imprint: string;
    privacy: string;
    consultCta: string;
  };
  legal: {
    imprintLink: string;
    termsLink: string;
    loginShort: string;
    loginLabel: string;
    dialogTitle: string;
    closeLabel: string;
    imprintHeading: string;
    disclosure: string;
    rows: Array<{ label: string; value: string; href?: string }>;
    termsHeading: string;
    termsText: string;
  };
  seo: Record<SeoSectionKey, SectionSeoMeta>;
}

export const PRACTICE_CONTENT: Record<Locale, PracticeContent> = {
  de: {
    meta: {
      brandName: 'martin knopper',
      brandSub: 'steuerberatung',
      advisorTitle: 'MMag. Martin Knopper',
      credentials: 'Steuerberater · Jurist · Betriebswirt',
      locationShort: 'Grieskai 56 / 6, 8020 Graz · Volldigital & International',
    },
    nav: {
      services: 'Leistungen',
      artVat: 'Kunst & USt',
      experience: 'Erfahrung',
      iurio: 'IURIO',
      fees: 'Honorare',
      cta: 'Erstgespräch anfragen',
      ctaShort: 'Erstgespräch',
    },
    utility: {
      showMore: 'Mehr anzeigen',
      showLess: 'Weniger anzeigen',
      languageLabel: 'Sprache',
      themeLight: 'Hell',
      themeDark: 'Dunkel',
      officeBadge: 'Kanzlei Graz · Österreichweit & International via IURIO',
      backToTop: 'Nach oben',
    },
    hero: {
      kicker: 'Jurist · Betriebswirt · Steuerberatung · Graz',
      headlineAccent: 'steuer?!',
      headlineMain: 'lass ihn machen!',
      subline: 'Recht und Wirtschaft in einem Kopf.',
      description:
        'Der erste Schritt ist ein Termin, persönlich oder per Videocall. Kommt es zur Zusammenarbeit, ist das Erstgespräch kostenlos.',
      primaryCta: 'Erstgespräch anfragen',
      secondaryCta: 'Honorare ansehen',
      portraitCaption: 'MMag. Martin Knopper · Steuerberater',
      portraitSub: 'Jurist & Betriebswirt · Kanzlei am Grieskai, Graz',
      keyMarkers: [
        { value: '28 Jahre', label: 'Erfahrung aus drei Welten' },
        { value: '2 Studien', label: 'Recht & Betriebswirtschaft' },
        { value: '100 %', label: 'Verschlüsselte Daten in Österreich' },
        { value: '0 €', label: 'Erstgespräch bei Beauftragung' },
      ],
    },
    services: {
      kicker: 'Wofür ich da bin',
      title: 'ihre kunst. ihre praxis. ihre kamera. meine steuer.',
      intro:
        'Ich bin Steuerberater mit Kanzlei in Graz. Ich arbeite volldigital und international, von Graz aus ebenso wie von Berlin oder von unterwegs.',
      items: [
        {
          index: '01',
          title: 'Einzelunternehmer und Selbständige',
          subtitle: 'Friseure · Fotografen · Dienstleister',
          description:
            'Sie führen den Betrieb, ich führe die Zahlen. Buchhaltung und Lohnverrechnung laufen mit verlässlichen Fachkräften.',
          highlight: true,
        },
        {
          index: '02',
          title: 'Künstlerinnen und Kreative',
          subtitle: 'Honorare · Stipendien · Aufträge',
          description:
            'Künstlersozialfonds: Für Kunst gelten eigene Regeln. Ich kenne sie und rechne mit ihnen.',
        },
        {
          index: '03',
          title: 'Gesundheitswesen',
          subtitle: 'Ärztinnen · Ärzte · Therapeutinnen und Therapeuten',
          description:
            'Wer Menschen behandelt, soll sich darum kümmern, nicht um die Steuer oder die Sozialversicherung.',
        },
        {
          index: '04',
          title: 'Kunst über Grenzen',
          subtitle: 'Auftritte · Verkäufe über Grenzen hinweg',
          description:
            'Auftritte und Verkäufe über Grenzen hinweg: Ich prüfe, welches Land wofür zuständig ist, denn schließlich wollen Sie ja nicht doppelt besteuert werden.',
        },
        {
          index: '05',
          title: 'Internationale Steuerfälle',
          subtitle: 'Kapitalvermögen · RSU-Auszahlungen · Immobilien',
          description:
            'Auslandsbezug, Kapitalvermögen, RSU-Auszahlungen, Immobilien: Komplexes ordne ich Schritt für Schritt, bis Klarheit entsteht.',
        },
        {
          index: '06',
          title: 'Ruhe als Leistung',
          subtitle: 'Fristen im Blick · Fragen beantwortet',
          description:
            'Fristen im Blick, Fragen beantwortet, Bürokratie abgenommen. Ich bleibe ruhig, damit Sie es bleiben können.',
          highlight: true,
        },
      ],
    },
    artVat: {
      kicker: 'Praxisleitfaden · Kunst über Grenzen',
      title: 'Was beim Kunstverkauf ins Ausland umsatzsteuerlich gilt',
      intro:
        'Drei Fragen entscheiden vor jedem Verkauf ins Ausland: An wen geht das Werk? Wohin wird es geliefert? Und sind alle Nachweise vorhanden?',
      imageCaption: 'Grenzüberschreitender Werkversand · EU & Drittland',
      baselineHeading: 'Zwei Zahlen vorweg',
      baselines: [
        {
          figure: '13 %',
          title: 'Umsatzsteuer auf Kunstgegenstände',
          detail:
            'Für die Lieferung von Gemälden, Originalzeichnungen und Originalskulpturen gilt in Österreich der ermäßigte Satz von 13 %.',
        },
        {
          figure: '55.000 €',
          title: 'Kleinunternehmergrenze ab 2025',
          detail:
            'Bis dahin wird keine Umsatzsteuer geschuldet. Für Lieferungen in andere EU-Staaten gibt es die EU-Kleinunternehmerregelung (Anmeldung in FinanzOnline, Kennung „EX“, EU-Umsatz höchstens 100.000 €).',
        },
      ],
      scenarioHeading: 'An wen geht das Werk? Wählen Sie Ihren Verkaufsfall',
      scenarios: {
        eu_b2b: {
          tabLabel: '1. Unternehmen in der EU (B2B)',
          headline: 'Steuerfrei als innergemeinschaftliche Lieferung — wenn alles belegt ist',
          summary:
            'Fehlt auch nur eine Voraussetzung, bleibt die Lieferung in Österreich steuerpflichtig.',
          steps: [
            {
              num: '1',
              title: 'Gültige UID auf Käuferseite',
              detail: 'Prüfung der Umsatzsteuer-Identifikationsnummer vorab über FinanzOnline oder VIES.',
            },
            {
              num: '2',
              title: 'Das Werk verlässt Österreich',
              detail: 'Lückenloser Nachweis durch unterzeichneten Lieferschein, Speditions- oder Versandbeleg.',
            },
            {
              num: '3',
              title: 'Rechnung ohne Umsatzsteuer',
              detail: 'Mit beiden UID-Nummern und explizitem Hinweis auf die Steuerfreiheit als innergemeinschaftliche Lieferung.',
            },
            {
              num: '4',
              title: 'Zusammenfassende Meldung (ZM)',
              detail: 'Fristgerechte Übermittlung bis Ende des Folgemonats über FinanzOnline.',
            },
          ],
          note: 'Besonderheiten für Kleinunternehmer:innen (55.000 €-Grenze bzw. EU-EX-Regelung) sind gesondert zu prüfen.',
        },
        eu_b2c: {
          tabLabel: '2. Privatperson in der EU (B2C)',
          headline: 'Entscheidend ist die EU-weite „Lieferschwelle“ von 10.000 €',
          summary:
            'Für Verkäufer:innen, die nur in einem EU-Staat ansässig sind, zählen alle EU-Fernverkäufe an Private zusammen.',
          steps: [
            {
              num: '1',
              title: 'Bis 10.000 €: Lieferschwelle nicht überschritten',
              detail: 'Alle Fernverkäufe in andere EU-Staaten zusammen unter 10.000 €: Es wird österreichische Umsatzsteuer (13 % bei Kunst) geschuldet.',
            },
            {
              num: '2',
              title: 'Über 10.000 €: Bestimmungslandprinzip & OSS',
              detail: 'Ab Überschreiten gilt die Umsatzsteuer des Ziellandes. Die gebündelte Abwicklung ist bequem über den One-Stop-Shop (OSS) möglich.',
            },
          ],
          note: 'Im Zusammenhang mit der Kleinunternehmerregelung bestehen Sonderbestimmungen, die wir gerne individuell im Erstgespräch klären.',
        },
        non_eu: {
          tabLabel: '3. Käufer:in außerhalb der EU (Drittland)',
          headline: 'Ausfuhr ins Drittland — steuerfrei nur mit Ausfuhrnachweis',
          summary:
            'Lieferungen in Länder wie die Schweiz, Großbritannien oder die USA erfordern zollrechtliche Dokumentation.',
          steps: [
            {
              num: '1',
              title: 'Das Werk wird ausgeführt',
              detail: 'Beförderung oder Versendung durch Verkäufer:in oder Käufer:in in ein Land außerhalb der EU.',
            },
            {
              num: '2',
              title: 'Ausfuhr steuerfrei mit Nachweis',
              detail: 'Steuerfreiheit gilt, wenn der formelle Ausfuhrnachweis vorliegt, etwa die elektronische Bestätigung des Zollamtes.',
            },
            {
              num: '3',
              title: 'Ohne Nachweis steuerpflichtig',
              detail: 'Fehlt der zollamtliche Ausfuhrnachweis, bleibt der Verkauf in Österreich umsatzsteuerpflichtig.',
            },
            {
              num: '4',
              title: 'Abgaben im Zielland klären',
              detail: 'Im Empfangsland können Einfuhrumsatzsteuer oder Zoll anfallen — vorab vertraglich klären, wer diese trägt.',
            },
          ],
          note: 'Nicht behandelt in dieser Übersicht: Einkommensteuerliche Zuordnung und spezifische Zolltarifnummern.',
        },
      },
      pitfallsHeading: 'Typische Stolpersteine in der Praxis',
      pitfalls: [
        {
          num: '01',
          title: 'Versandnachweis fehlt',
          detail: 'Ohne Beleg ist auch eine echte Lieferung ins Ausland in Österreich steuerpflichtig.',
        },
        {
          num: '02',
          title: 'UID nicht geprüft',
          detail: 'Die dokumentierte, gültige UID-Nummer auf Käuferseite ist zwingende Voraussetzung bei B2B-Lieferungen.',
        },
        {
          num: '03',
          title: 'Meldung zu spät',
          detail: 'Die fristgerechte Zusammenfassende Meldung ist materielle Voraussetzung für die Steuerfreiheit.',
        },
        {
          num: '04',
          title: 'Umsatzsteuer trotz Kleinunternehmer:in',
          detail: 'Wird auf der Rechnung fälschlich Umsatzsteuer ausgewiesen, schuldet man sie dem Finanzamt kraft Rechnungslegung.',
        },
      ],
      disclaimer:
        'Allgemeine Information, Stand Oktober 2026. Keine Beratung im Einzelfall. Nicht behandelt: Einkommensteuer und Zoll.',
    },
    experience: {
      kicker: 'Was mich ausmacht',
      title: '28 jahre erfahrung aus drei welten.',
      intro:
        'Öffentliche Verwaltung, NPO und Steuerberatung: drei Perspektiven vereint in einer Einzelkanzlei.',
      timelineLegend: {
        publicAdmin: 'Öffentliche Verwaltung & NPO',
        taxAdvisory: 'Steuerberatung & Eigene Kanzlei',
      },
      timeline: [
        { period: '1999 – 2010', years: '11 J.', label: 'Öffentliche Verwaltung', world: 'public' },
        { period: '2010 – 2016', years: '6 J.', label: 'Steuerberatung', world: 'tax' },
        { period: '2016 – 2020', years: '4 J.', label: 'Öff. Verwaltung & NPO', world: 'public' },
        { period: '2020 – 2023', years: '3 J.', label: 'Steuerberatung', world: 'tax' },
        { period: 'seit 2023', years: 'aktuell', label: 'Eigene Kanzlei', world: 'tax' },
      ],
      summaryCard: {
        yearsNumber: '28',
        yearsUnit: 'Jahre',
        yearsDesc: 'Berufserfahrung seit 1999',
        degreesNumber: '2',
        degreesTitle: 'abgeschlossene Studien',
        degreesList: ['Rechtswissenschaften', 'Betriebswirtschaft'],
        motto: 'Recht und Wirtschaft in einem Kopf.',
      },
      publicCard: {
        yearsNumber: '15',
        yearsUnit: 'Jahre',
        title: 'Öffentliche Verwaltung und NPO',
        areasLabel: 'Tätigkeitsfelder',
        areas: [
          'HR Management',
          'Payroll',
          'Finanzen',
          'Steuerlegistik',
          'Rechnungshofkontrolle',
          'Rechnungswesen',
          'Controlling',
          'Immobilienverwaltung',
          'Projektmanagement',
          'Change Management',
          'Konfliktregelung',
          'Internationale Finanzverantwortung',
        ],
      },
      taxCard: {
        yearsNumber: '13',
        yearsUnit: 'Jahre',
        title: 'Steuerberatung',
        subtitle: 'seit knapp 4 Jahren selbständig in eigener Kanzlei',
        focusLabel: 'Schwerpunkte',
        focusAreas: [
          'Verfahrensrecht',
          'Rechtsmittel',
          'Sozialversicherungsrecht',
          'Internationales Steuerrecht',
          'Immobilien',
          'Kapitalvermögen',
        ],
        clientsLabel: 'Klientel',
        clients: [
          'Selbständige',
          'KMU',
          'Gesundheitsberufe',
          'Künstler:innen',
          'Kreativwirtschaft',
          'Vereine',
        ],
      },
      music: {
        title: 'Von Bach bis Tango Argentino',
        subtitle: 'Musik seit dem 6. Lebensjahr · Mit acht Jahren am Klavier, und Bach schon in den Fingern.',
        motifNote: 'Das B-A-C-H-Motiv, notiert wie in einer Fuge: Thema und Antwort',
        caption: 'Klicken Sie auf einen Ton im Notenbild, um die Station zu erkunden.',
        pianoCaption: 'Mit acht Jahren am Klavier, und Bach schon in den Fingern.',
        pianoAlt: 'Martin Knopper mit acht Jahren am Klavier',
        notes: [
          { pitch: 'B♭', accidental: 'flat', title: 'Flöte', span: 'ab dem 6. Lebensjahr', detail: 'Erste musikalische Grundlagen und Melodieführung auf der Flöte.' },
          { pitch: 'A', title: 'Klavier', span: 'ab dem 8. Lebensjahr', detail: 'Mit acht Jahren am Klavier — Johann Sebastian Bach fest in den Fingern.' },
          { pitch: 'C', title: 'Musiklehre & Tonsatz', span: '5 Jahre', detail: 'Fundierte Ausbildung in Harmonie- und Satzlehre sowie Fugenstruktur.' },
          { pitch: 'B♮', accidental: 'natural', title: 'Chorgesang', span: '35 Jahre', detail: 'Jahrzehntelange Ensemble- und Chorerfahrung im mehrstimmigen Zusammenspiel.' },
          { pitch: 'B♭', accidental: 'flat', title: 'Stimmbildung', span: '3 Jahre', detail: 'Gezielte Stimmtechnik und Ausdrucksschulung.' },
          { pitch: 'A', title: 'Keyboard in der Band', span: '10 Jahre', detail: 'Ein Jahrzehnt Live-Erfahrung, Timing und Improvisation im Bandgefüge.' },
          { pitch: 'C', title: 'Saxophon', span: 'seit 2006', detail: 'Ausdrucksstarke Klangfarbe zwischen Jazz und moderner Ensemblearbeit.' },
          { pitch: 'B♮', accidental: 'sharp', title: 'Tango Argentino', span: 'seit 2008', detail: 'Präzision, Balance und Führen im Dialog — genau wie in der Beratung.' },
        ],
      },
    },
    testimonials: {
      kicker: 'Klientenstimmen',
      title: 'Was Mandantinnen und Mandanten an unserer Zusammenarbeit schätzen.',
      subtitle:
        'Persönliche Betreuung durch einen Berufsträger statt anonymer Durchlaufkanzlei — ausgewählte Rückmeldungen aus laufenden Mandaten.',
      confidentialityNote:
        'Hinweis zur Verschwiegenheit (§ 80 WTBG): Aus berufsrechtlichen Gründen veröffentlichen wir Mandate nach Branche und Ort anonymisiert.',
      ratingSummary: '4,9 / 5,0',
      ratingCountLabel: 'Durchschnittliche Zufriedenheit aus laufenden Dauermandaten',
      prevLabel: 'Vorherige Klientenstimme',
      nextLabel: 'Nächste Klientenstimme',
      slideNavLabel: 'Klientenstimme auswählen',
      items: [
        {
          id: 'artist-vat',
          quote:
            'Vor meinem Wechsel hatte ich bei Ausstellungen in Deutschland und der Schweiz ständig Sorge wegen falscher Rechnungen und verlorener Vorsteuer. Herr Knopper hat meine Galerie- und Direktverkäufe in zwei Gesprächen sauber sortiert — heute prüfe ich UID und Ausfuhrbeleg vorab in fünf Minuten.',
          authorLabel: 'Bildende Künstlerin (Skulptur & Installation)',
          role: 'Freischaffend & Galeriekooperationen',
          location: 'Graz & Berlin',
          scope: 'Kunst & USt-Ausland · Jahresabschluss',
          since: 'Mandat seit 2021',
          outcome: 'Rechtssichere 0-%- und 13-%-Fakturierung bei EU- und Schweiz-Verkäufen',
          rating: 5,
        },
        {
          id: 'wahlarzt-practice',
          quote:
            'Als niedergelassener Facharzt wollte ich keinen anonymen Sachbearbeiter-Wechsel alle sechs Monate. Durch IURIO sehe ich am grünen Punkt sofort, wenn eine Rückfrage offen ist, und habe bei SVS-Vorauszahlungen sowie Ordinationsinvestitionen immer direkt Herrn Knopper am Telefon.',
          authorLabel: 'Facharzt für Orthopädie',
          role: 'Wahlarzt-Ordination',
          location: 'Graz',
          scope: 'Heilberufe · Buchhaltung & SVS-Planung',
          since: 'Mandat seit 2019',
          outcome: 'Planbare SVS-Anpassung und durchgängig digitaler Belegfluss über IURIO',
          rating: 5,
        },
        {
          id: 'architect-sole',
          quote:
            'Das jährliche Honorar von rund 2 bis 3 % vom Umsatz ohne versteckte Zusatzrechnungen war für meine Planung entscheidend. Dazu kommt ein Berater, der juristisch und wirtschaftlich mitdenkt — egal ob bei Projektverträgen, Honorarnoten oder der Jahreserklärung.',
          authorLabel: 'Architektin ZT',
          role: 'Einzelunternehmen',
          location: 'Graz & Steiermark',
          scope: 'Einzelunternehmen · Rechts- & Steuerberatung',
          since: 'Mandat seit 2018',
          outcome: 'Transparentes Jahresbudget und 40 % weniger Zeitaufwand für Monatsbelege',
          rating: 5,
        },
        {
          id: 'rsu-expat',
          quote:
            'Bei US-Aktienpaketen (RSUs) und Einkünften aus zwei Ländern habe ich zuvor widersprüchliche Auskünfte bekommen. Die Verbindung aus Doppelbesteuerungsrecht und österreichischer Veranlagung hat mir nicht nur Sicherheit gebracht, sondern auch eine deutliche Steuerersparnis.',
          authorLabel: 'Principal Software Engineer',
          role: 'Unsichere RSU- & Auslandsbezüge',
          location: 'Wien / Remote für US-Tech',
          scope: 'Aktienpakete (RSUs) · Internationales Steuerrecht',
          since: 'Mandat seit 2022',
          outcome: 'Korrekte Anrechnung ausländischer Quellensteuer ohne Doppelbesteuerung',
          rating: 5,
        },
      ],
    },
    iurio: {
      kicker: 'Zusammenarbeit mit IURIO',
      title: 'Unsere Zusammenarbeit auf Distanz. Sicher und persönlich.',
      intro:
        'Ich arbeite mit meinen Klientinnen und Klienten volldigital über IURIO, eine verschlüsselte Plattform mit Servern in Österreich. Das geht ortsunabhängig, übersichtlich und mit direktem Draht zu mir als Einzelkanzlei.',
      workspaceCaption: 'IURIO Kundenbereich · Anmeldung per Passkey & QR-Code · Server in Österreich',
      features: [
        {
          title: 'Alles an einem Ort',
          detail: 'Dokumente, Aufgaben, Nachrichten und Unterschrift liegen in einem persönlichen Bereich.',
        },
        {
          title: 'Passkey statt Passwort',
          detail: 'Anmeldung per Handy und Fingerabdruck. Kein Passwort, das Sie sich merken müssen.',
        },
        {
          title: 'Verschlüsselt, Server in Österreich',
          detail: 'Ihre Dokumente liegen verschlüsselt. Auch die Administratoren der Plattform können sie nicht lesen.',
        },
        {
          title: 'Abhörsichere Videokonferenz',
          detail: 'Besprechungen per Link. Videokonferenz und Chat sind verschlüsselt und abhörsicher.',
        },
        {
          title: 'Digital unterschreiben',
          detail: 'Direkt am Dokument, zum Beispiel mit ID Austria. Drucken und Scannen entfallen.',
        },
        {
          title: 'Immer im Blick',
          detail: 'Ein grüner Punkt zeigt Neues. Sie behalten die Übersicht über Dokumente und Aufgaben.',
        },
      ],
      securityBand: {
        title: 'Ihre Daten bleiben in Österreich',
        points: [
          'IURIO: Dokumente liegen verschlüsselt auf Servern in Österreich.',
          'BMD Cloud: Ihre Buchhaltung läuft im Rechenzentrum in Österreich (ISO 27001).',
          'Mit beiden Anbietern bestehen Verträge zur Auftragsverarbeitung — damit wird durchgehend europäisches Datenschutzrecht (DSGVO) erfüllt.',
        ],
      },
      onboardingTitle: 'So beginnen wir',
      onboardingSteps: [
        {
          num: '1',
          title: 'Erstgespräch',
          detail: 'Sie vereinbaren online einen Termin. Wir klären Rahmenbedingungen und Atmosphäre. Kommt es zur Zusammenarbeit, ist das Erstgespräch kostenlos.',
        },
        {
          num: '2',
          title: 'Einladung zu IURIO',
          detail: 'Sie erhalten von mir eine Einladung in Ihren persönlichen Bereich. Die Anmeldung dauert wenige Minuten.',
        },
        {
          num: '3',
          title: 'Loslegen',
          detail: 'Unterlagen hochladen, Aufgaben ansehen, Nachrichten schreiben und digital unterschreiben — auch mit der kostenlosen App.',
        },
      ],
      workflowTitle: 'So arbeiten wir zusammen',
      workflowPoints: [
        'Steuerrelevante Belege und Vertrauliches tauschen wir über IURIO aus.',
        'E-Mail nutze ich nur für Organisatorisches und ohne Anhänge.',
        'Telefon und persönliche Termine bleiben selbstverständlich möglich.',
        'Ich antworte in der Regel innerhalb von ein bis zwei Werktagen.',
      ],
      footNote:
        'Ein ausführlicher Leitfaden führt Sie Schritt für Schritt durch die erste Anmeldung.',
    },
    fees: {
      kicker: 'Transparenz von Anfang an',
      title: 'meine honorare im überblick.',
      intro:
        'Vor Beginn unserer Zusammenarbeit besprechen wir den voraussichtlichen Leistungsumfang und vereinbaren auf Wunsch einen passenden Honorarrahmen.',
      columns: {
        service: 'Leistungsbereich',
        rate: 'Honorar',
        unit: 'Abrechnungseinheit',
      },
      rows: [
        { service: 'Personalverrechnung Abrechnung Dienstnehmer', rate: '€ 25', unit: 'pro Dienstnehmer:in und Monat' },
        { service: 'Personalverrechnung sonstiges', rate: '€ 95', unit: 'pro Stunde' },
        { service: 'Buchhaltung', rate: '€ 95', unit: 'pro Stunde' },
        { service: 'Steuererklärungen', rate: '€ 150', unit: 'pro Stunde' },
        { service: 'Steuerberatung', rate: '€ 185', unit: 'pro Stunde' },
        { service: 'Einnahmen-Ausgaben-Rechnung', rate: 'ab € 700', unit: '' },
        { service: 'Jahresabschluss für Einzelunternehmen und Personengesellschaften', rate: 'ab € 1.200', unit: '' },
        { service: 'Jahresabschluss Kapitalgesellschaften', rate: 'ab € 1.800', unit: '' },
        { service: 'Erstgespräch', rate: 'honorarfrei', unit: 'falls in der Folge Beauftragung', accent: true },
        { service: 'Onboarding', rate: '€ 300', unit: 'einmalig' },
        { service: 'Beratung ohne bestehendes Mandat', rate: '€ 185', unit: 'pro halber Stunde' },
      ],
      factorsTitle: 'Wovon das Honorar abhängt',
      factorsText:
        'Das Honorar richtet sich nach dem Aufwand. Wichtig sind vor allem der Umfang der Belege, die Qualität und Vollständigkeit der Unterlagen, die Anzahl der Geschäftsvorfälle, die Rechtsform, die steuerliche Komplexität sowie der Abstimmungs- und Beratungsaufwand.',
      agreementTitle: 'Individuelle Vereinbarung',
      agreementText:
        'So haben Sie von Anfang an Klarheit über die zu erwartenden Kosten. Die ausgewiesenen Honorare verstehen sich zuzüglich 20 % Umsatzsteuer.',
      deductibleTitle: 'Wichtiger Hinweis',
      deductibleText:
        'Meine Honorare sind nach Maßgabe der gesetzlichen Bestimmungen steuerlich abzugsfähig, als Betriebsausgaben oder als Sonderausgaben. Die dadurch resultierende tatsächliche steuerliche Entlastung hängt von der individuellen steuerlichen Situation ab. Gerne informiere ich Sie über die mögliche steuerliche Berücksichtigung in Ihrem konkreten Fall.',
    },
    faq: {
      kicker: 'Häufige Fragen',
      title: 'Klarheit vor dem ersten Gespräch.',
      subtitle:
        'Antworten auf die häufigsten steuerlichen und organisatorischen Fragen — kompakt aufbereitet, bevor Sie uns schreiben oder einen Termin buchen.',
      allCategoriesLabel: 'Alle Themen',
      expandAllLabel: 'Alle öffnen',
      collapseAllLabel: 'Alle schließen',
      categories: {
        fees: 'Honorare & Erstgespräch',
        cross_border: 'Kunst, Ausland & RSU',
        digital: 'IURIO & Datenschutz',
        mandate: 'Mandat & Zusammenarbeit',
      },
      ctaPrompt: 'Ihre konkrete Konstellation ist hier nicht abgebildet?',
      ctaButton: 'Erstgespräch anfragen',
      items: [
        {
          id: 'initial-fee',
          category: 'fees',
          question: 'Wann ist das Erstgespräch kostenlos und wann fällt ein Honorar an?',
          answer:
            'Das 30-minütige Erstgespräch dient zum Kennenlernen sowie zur Klärung von Leistungsumfang, Honorarrahmen und Zusammenarbeit über IURIO. Kommt anschließend ein laufendes Mandat zustande, bleibt das Erstgespräch honorarfrei. Wünschen Sie eine punktuelle steuerliche Einschätzung ohne anschließendes Mandat (Einzelberatung), verrechnen wir € 185 zzgl. 20 % USt. pro halber Stunde.',
        },
        {
          id: 'annual-cost',
          category: 'fees',
          question: 'Mit welchem laufenden Jahresbudget sollte ich als Einzelunternehmen rechnen?',
          answer:
            'Als realistischer Richtwert liegen laufende Steuerberatungs- und Jahresabschlusskosten bei geordneter digitaler Belegführung erfahrungsgemäß bei etwa 2 bis 3 % Ihres Netto-Jahresumsatzes. Vor Start unserer Zusammenarbeit erhalten Sie eine klare, individuelle Honorareinschätzung auf Basis Ihres Belegvolumens.',
        },
        {
          id: 'art-vat-rules',
          category: 'cross_border',
          question: 'Welcher Umsatzsteuersatz gilt beim Verkauf eigener Kunstwerke ins Ausland?',
          answer:
            'In Österreich gilt für eigene Kunstgegenstände grundsätzlich der ermäßigte Steuersatz von 13 % USt. Bei Verkäufen an Unternehmer in anderen EU-Staaten (B2B mit gültiger UID-Nummer) sowie bei nachgewiesenen Exporten in Drittländer wie die Schweiz oder die USA greift in der Regel die Steuerbefreiung (0 % USt.) — entscheidend sind vorab geprüfte UID-Nummern, Transport- oder Ausfuhrnachweise und die korrekte Rechnungslegung.',
        },
        {
          id: 'small-business-eu',
          category: 'cross_border',
          question: 'Was ändert sich durch die Kleinunternehmerregelung (€ 55.000) seit 2025?',
          answer:
            'Die österreichische Kleinunternehmergrenze beträgt € 55.000 Jahresumsatz (brutto) und ermöglicht nun auch eine grenzüberschreitende Befreiung innerhalb der EU bis zu einem unionsweiten Schwellenwert von € 100.000. Ob der Verzicht (Regelbesteuerung) wegen höherer Vorsteuerabzüge — etwa bei Atelier-, Material- oder Ordinationsinvestitionen — vorteilhafter ist, prüfen wir gemeinsam im Erstgespräch.',
        },
        {
          id: 'rsu-foreign-tax',
          category: 'cross_border',
          question: 'Wie werden US-Aktienpakete (RSUs / Stock Options) und Auslandseinkünfte in Österreich besteuert?',
          answer:
            'RSUs werden bei Vesting grundsätzlich als Einkünfte aus nichtselbständiger Arbeit in Österreich besteuert — häufig kombiniert mit ausländischer Quellensteuer oder abweichenden Lohnabrechnungen des Konzerns. Wir prüfen Doppelbesteuerungsabkommen (DBA), ordnen Vesting-Zeiträume und Wechselkurse sauber zu und verhindern eine doppelte Steuerbelastung.',
        },
        {
          id: 'iurio-no-email',
          category: 'digital',
          question: 'Warum darf ich keine Steuerbelege per normaler E-Mail senden?',
          answer:
            'Unverschlüsselte E-Mails entsprechen nicht den strengen Anforderungen an berufsrechtliche Verschwiegenheit und DSGVO. Über IURIO laden Sie Belege, Verträge und Steuerbescheide verschlüsselt auf österreichischen Servern hoch, melden sich bequem per Handy-Passkey an und sehen am grünen Punkt sofort, wo eine Rückfrage offen ist.',
        },
        {
          id: 'switch-advisor',
          category: 'mandate',
          question: 'Wie läuft der Kanzleiwechsel ab, wenn ich bereits bei einer Steuerberatung bin?',
          answer:
            'Der Wechsel ist unkompliziert und ganzjährig möglich — idealerweise nach Abschluss eines Wirtschaftsjahres oder zu Quartalsbeginn. Nach Ihrer Vollmacht fordern wir alle Vorjahresunterlagen, Kontenstände und BMD-Daten geordnet bei der bisherigen Kanzlei an, sodass für Sie kaum Abstimmungsaufwand entsteht.',
        },
        {
          id: 'remote-clients',
          category: 'mandate',
          question: 'Betreut die Kanzlei auch Mandantinnen und Mandanten außerhalb von Graz?',
          answer:
            'Ja. Unsere Kanzlei arbeitet volldigital mit Klientinnen und Klienten in ganz Österreich (insbesondere Wien, Graz und Steiermark) sowie im internationalen Umfeld. Beratungsgespräche führen wir wahlweise persönlich am Grieskai in Graz oder per abhörsicherer IURIO-Videokonferenz.',
        },
      ],
    },
    consultation: {
      kicker: 'Der erste Schritt',
      title: 'Erstgespräch anfragen',
      subtitle:
        'Ein Gespräch klärt Rahmenbedingungen und Atmosphäre — persönlich in Graz oder per verschlüsseltem Videocall.',
      stepLabels: ['1. Thema & Art', '2. Datum & Uhrzeit', '3. Kontaktdaten'],
      stepLabelsShort: ['1. Thema', '2. Termin', '3. Kontakt'],
      typeLabel: 'Art der Beratung',
      types: [
        {
          id: 'initial',
          title: 'Erstgespräch (Kennenlernen & Mandatsklärung)',
          feeLabel: 'Honorarfrei bei Beauftragung',
          desc: 'Wir klären Ihre Situation, den passenden Leistungsrahmen und die Zusammenarbeit über IURIO (30 Minuten).',
        },
        {
          id: 'adhoc',
          title: 'Einzelberatung ohne bestehendes Mandat',
          feeLabel: '€ 185 / 30 Min. zzgl. USt.',
          desc: 'Gezielte steuerliche Einschätzung zu konkreten Einzelfragen, z. B. Kunstverkauf, RSU oder Auslandsbezug.',
        },
      ],
      topicsLabel: 'Beratungsschwerpunkt wählen',
      topicPlaceholder: '— Schwerpunkt auswählen —',
      topics: {
        sole_proprietor: 'Einzelunternehmen & Selbständige',
        artists_creatives: 'Künstler:innen & Kreativwirtschaft',
        art_cross_border: 'Kunst über Grenzen & Umsatzsteuer',
        healthcare: 'Gesundheitsberufe (Ärzt:innen / Therapie)',
        international_tax: 'Internationale Steuerfälle, RSUs & Immobilien',
        general: 'Allgemeine steuerliche Anfrage',
      },
      wizard: {
        backBtn: 'Zurück',
        continueToDateBtn: 'Weiter zu Datum & Uhrzeit',
        continueToContactBtn: 'Weiter zu den Kontaktdaten',
        editBtn: 'Ändern',
        selectTopicHint: 'Wählen Sie ein Thema, um direkt zum Wunschtermin zu gelangen.',
        selectDateTimeHint: 'Wählen Sie Datum und Uhrzeit für Ihre Kontaktdaten.',
      },
      formatLabel: 'Bevorzugtes Format',
      formats: [
        {
          id: 'video',
          shortLabel: 'Videocall',
          title: 'Verschlüsselter Videocall (IURIO / Online)',
          detail: 'Ortsunabhängig via sicherem Konferenzlink',
        },
        {
          id: 'graz',
          shortLabel: 'Persönlich vor Ort',
          title: 'Persönlich vor Ort (Kanzlei Graz)',
          detail: 'Grieskai 56 / 6, 8020 Graz',
        },
      ],
      dateLabel: 'Datum wählen (Mo–Fr)',
      timeLabel: 'Uhrzeit wählen (30 Min., 9–16 Uhr)',
      timezoneNote: 'Alle Zeiten in Ortszeit Österreich (Europe/Vienna).',
      inPersonPaidOnly: 'Persönlich in Graz nur bei der Einzelberatung (kostenpflichtig). Das kostenlose Erstgespräch findet per Videocall statt.',
      googleCheckHeading: 'Google Kalender Live-Verfügbarkeit',
      googleCheckConnected: 'Mit Google Kalender verbunden — belegte Zeiten in Ihrem Kalender werden markiert.',
      googleSignInBtn: 'Mit Google anmelden & Verfügbarkeit prüfen',
      googleSignOutBtn: 'Google-Verbindung trennen',
      googleBusyNote: 'Optional: Prüfen Sie Konflikte in Ihrem Google Kalender oder laden Sie den Termin direkt als .ics-Datei herunter.',
      busyBadge: 'Belegt',
      formLabels: {
        name: 'Ihr Name *',
        namePlaceholder: 'z. B. Mag. Anna Muster',
        email: 'E-Mail-Adresse *',
        emailPlaceholder: 'name@beispiel.at',
        phone: 'Telefonnummer (optional)',
        phonePlaceholder: '+43 ...',
        notes: 'Kurze Schilderung Ihres Anliegens',
        notesPlaceholder: 'z. B. Freischaffende Künstlerin, geplante Werkverkäufe in die Schweiz und nach Deutschland...',
      },
      validationError: 'Bitte überprüfen Sie die markierten Felder vor dem Absenden.',
      nameRequiredError: 'Bitte geben Sie Ihren Namen an.',
      nameTooShortError: 'Bitte geben Sie mindestens 2 Zeichen für Ihren Namen an.',
      emailInvalidError: 'Bitte geben Sie eine gültige E-Mail-Adresse an (z. B. name@beispiel.at).',
      phoneInvalidError: 'Bitte geben Sie eine gültige Telefonnummer an (7–16 Ziffern, z. B. +43 316 38 60 97).',
      icsToastSuccess: 'Beratungsanfrage vorbereitet & Kalenderdatei (.ics) heruntergeladen.',
      googleToastSuccess: 'Beratungsanfrage gesendet & im Google Kalender eingetragen.',
      actions: {
        sendRequest: 'Erstgespräch anfragen',
        sending: 'Wird gesendet …',
        addToGoogleCalendar: 'In Google Kalender eintragen',
        downloadIcs: 'Kalenderdatei (.ics) laden',
        creating: 'Termin wird eingetragen...',
      },
      confirmModal: {
        title: 'Kalendereintrag bestätigen',
        lead: 'Bitte prüfen Sie die Details, bevor der Termin in Ihrem Google Kalender erstellt wird:',
        eventLabel: 'Termin',
        whenLabel: 'Datum & Uhrzeit',
        whereLabel: 'Ort / Format',
        attendeesLabel: 'Teilnehmer',
        confirmBtn: 'Bestätigen & Termin erstellen',
        cancelBtn: 'Abbrechen',
      },
      success: {
        requestSentBanner:
          'Ihre Anfrage wurde erfolgreich übermittelt — alle Details für Ihren Wunschtermin finden Sie unten.',
        titleSent: 'Vielen Dank! Ihre Anfrage ist eingegangen.',
        prototypeNote: 'Prototyp: Die Anfrage wird in dieser Testversion nicht versendet.',
        descSent: 'Ich antworte in der Regel innerhalb von ein bis zwei Werktagen. Kommt es zur Zusammenarbeit, ist das Erstgespräch kostenlos.',
        titleGoogle: 'Termin in Ihrem Google Kalender erstellt',
        titleIcs: 'Kalenderdatei (.ics) heruntergeladen',
        descGoogle:
          'Ihr Terminwunsch wurde in Ihrem Google Kalender gespeichert. Für vertrauliche Unterlagen erhalten Sie bei Bedarf eine IURIO-Einladung.',
        descIcs:
          'Die .ics-Datei enthält alle Termindaten für Ihren Kalender (Apple, Outlook, Thunderbird). Bitte senden Sie vertrauliche Belege erst nach Einladung über IURIO.',
        openCalendarLink: 'In Google Kalender öffnen',
        downloadIcsAgain: 'Zusätzlich als .ics speichern',
        scheduleAnother: 'Weiteren Termin anfragen',
      },
    },
    contactDrawer: {
      tabLabel: 'Kontakt',
      title: 'Direkter Kontakt',
      subtitle: 'Steuerberater MMag. Martin Knopper · Einzelkanzlei in Graz',
      addressLabel: 'Kanzleianschrift',
      addressValue: 'Grieskai 56 / 6, 8020 Graz, Österreich',
      phoneLabel: 'Telefon',
      mobileLabel: 'Mobil',
      emailLabel: 'E-Mail (Organisatorisches)',
      webLabel: 'Web',
      emailSecurityNote:
        'Datenschutz-Hinweis: E-Mail nutze ich ausschließlich für Organisatorisches ohne Dateianhänge. Steuerrelevante Belege tauschen wir verschlüsselt über IURIO aus.',
      responseNote: 'Antwortzeit in der Regel innerhalb von ein bis zwei Werktagen.',
      primaryBtn: 'Erstgespräch anfragen',
      closeLabel: 'Kontaktleiste schließen',
      documentUpload: {
        prompt: 'Falls wir vor dem Gespräch ein Dokument prüfen sollen, laden Sie es bitte hoch.',
        label: 'Dokumente (optional)',
        buttonLabel: 'Dateien hochladen',
        folderLabel: 'Ordner hochladen',
        replaceLabel: 'Anderes Dokument wählen',
        removeLabel: 'Entfernen',
        attachedNote: 'Für die Gesprächsvorbereitung vorgemerkt · Vertrauliche Belege anschließend verschlüsselt via IURIO.',
        toastAttached: 'Dokument für die Gesprächsvorbereitung vorgemerkt.',
      },
    },
    mobileBar: {
      services: 'Leistungen',
      artVat: 'Kunst & USt',
      consult: 'Erstgespräch',
      menu: 'Menü',
      sheetTitle: 'Navigation & Einstellungen',
      sectionsTitle: 'Bereiche der Kanzlei',
      preferencesTitle: 'Sprache & Darstellung',
      currentLabel: 'Hier sind Sie',
      callLabel: 'Anrufen',
      mailLabel: 'E-Mail',
    },
    footer: {
      tagline: 'Recht und Wirtschaft in einem Kopf. Volldigital, ruhig und persönlich.',
      address: 'Grieskai 56 / 6 · 8020 Graz · +43 316 38 60 97 · office@knopper-stb.at',
      legal: 'Kammer der Steuerberater und Wirtschaftsprüfer (KSW) · Österreich',
      imprint: 'Standort Graz · Österreichisches Recht',
      privacy: 'DSGVO · Verschlüsselt über IURIO & BMD Cloud (ISO 27001)',
      consultCta: 'Erstgespräch anfragen',
    },
    legal: {
      imprintLink: 'Impressum',
      termsLink: 'AGB',
      loginShort: 'Login',
      loginLabel: 'Klient:innen-Login (IURIO)',
      dialogTitle: 'Impressum & AGB',
      closeLabel: 'Schließen',
      imprintHeading: 'Impressum',
      disclosure: 'Offenlegung gemäß § 5 E-Commerce-Gesetz',
      rows: [
        { label: '', value: 'MMag. Martin Knopper' },
        { label: '', value: 'Steuerberater und Wirtschaftstreuhänder' },
        { label: 'Anschrift', value: 'Grieskai 56 / 6, 8020 Graz' },
        { label: 'Telefon', value: '+43 316 38 60 97', href: 'tel:+43316386097' },
        { label: 'E-Mail', value: 'office@knopper-stb.at', href: 'mailto:office@knopper-stb.at' },
        { label: 'Unternehmensform', value: 'Einzelunternehmen' },
        { label: 'Gerichtsstand', value: 'Graz' },
        { label: 'WT-Code', value: '230061' },
        { label: 'UID', value: 'ATU79946025' },
        { label: 'Kammerzugehörigkeit', value: 'Kammer der Steuerberater:innen und Wirtschaftsprüfer:innen' },
        { label: 'Standesrecht', value: 'WTBG 2017, abrufbar unter www.ris.bka.gv.at', href: 'https://www.ris.bka.gv.at/' },
      ],
      termsHeading: 'Allgemeine Auftragsbedingungen',
      termsText: 'Informationen zu unseren allgemeinen Auftragsbedingungen (AAB) stellen wir auf Anfrage gerne zur Verfügung.',
    },
    seo: {
      top: {
        title: 'MMag. Martin Knopper · Steuerberatung Graz',
        description:
          'Volldigitale Steuerberatung in Graz für Kunst, Kultur, Ärztinnen, Selbständige und internationale Fälle. Erstgespräch online anfragen.',
        image: 'images/knopper-kodex-portrait.jpg',
        imageAlt: 'MMag. Martin Knopper · Steuerberater, Jurist und Betriebswirt in Graz',
      },
      services: {
        title: 'Leistungen · Martin Knopper Steuerberatung',
        description:
          'Steuerberatung für Einzelunternehmen, Kunst und Kultur, Gesundheitsberufe, Immobilien sowie RSUs und Stock Options in Österreich.',
        image: 'images/knopper-blazer-portrait.jpg',
        imageAlt: 'Beratungsschwerpunkte der Steuerkanzlei MMag. Martin Knopper in Graz',
      },
      'art-vat': {
        title: 'Kunstverkauf ins Ausland & USt · Knopper',
        description:
          'Praxisleitfaden für bildende Künstler:innen: EU-Lieferungen (B2B/B2C), Drittland-Exporte und 13 % bzw. 0 % Umsatzsteuer kompakt erklärt.',
        image: 'images/art-gallery-export.jpg',
        imageAlt: 'Umsatzsteuer-Leitfaden für Kunstverkäufe ins Ausland',
      },
      experience: {
        title: '28 Jahre Erfahrung · Martin Knopper Graz',
        description:
          'Steuerberater, Jurist und Betriebswirt: Öffentliche Verwaltung, NPO und Steuerberatung: drei Perspektiven in einer Kanzlei. Recht und Wirtschaft in einem Kopf.',
        image: 'images/knopper-piano-childhood.jpg',
        imageAlt: 'MMag. Martin Knopper, Steuerberater in Graz',
      },
      testimonials: {
        title: 'Klientenstimmen · Martin Knopper Graz',
        description:
          'Erfahrungsberichte von Künstler:innen, Ärzt:innen, Einzelunternehmen und RSU-Mandant:innen über die Zusammenarbeit mit MMag. Martin Knopper.',
        image: 'images/knopper-blazer-portrait.jpg',
        imageAlt: 'Mandantenbewertungen und Erfahrungsberichte zur Kanzlei MMag. Martin Knopper',
      },
      iurio: {
        title: 'IURIO Klientenportal · Martin Knopper Graz',
        description:
          'Sicher und übersichtlich zusammenarbeiten über IURIO: verschlüsselter Belegaustausch, grüner Punkt für Neues und Aufgabenstatus.',
        image: 'images/iurio-workspace-preview.jpg',
        imageAlt: 'Digitales Klientenportal IURIO für verschlüsselte Zusammenarbeit',
      },
      fees: {
        title: 'Honorare & Erstgespräch · Martin Knopper',
        description:
          'Klare Honorarstruktur: € 185 pro 30 Min. Einzelberatung, Erstgespräch bei Mandat honorarfrei und Richtwert 2–3 % vom Netto-Umsatz.',
        image: 'images/knopper-kodex-portrait.jpg',
        imageAlt: 'Transparente Honorare bei Steuerberatung MMag. Martin Knopper',
      },
      faq: {
        title: 'Häufige Fragen (FAQ) · Martin Knopper Graz',
        description:
          'Antworten zu Erstgespräch, Honoraren, Kunst-Umsatzsteuer, RSUs, IURIO-Datenschutz und Kanzleiwechsel bei MMag. Martin Knopper.',
        image: 'images/knopper-kodex-portrait.jpg',
        imageAlt: 'Häufige Fragen zur Steuerberatung MMag. Martin Knopper in Graz',
      },
      consultation: {
        title: 'Erstgespräch anfragen · Martin Knopper Graz',
        description:
          'Vereinbaren Sie ein Erstgespräch vor Ort in Graz oder per Videocall inklusive Google-Kalender-Synchronisation und .ics-Einladung.',
        image: 'images/knopper-blazer-portrait.jpg',
        imageAlt: 'Erstgespräch bei MMag. Martin Knopper anfragen',
      },
    },
  },
  en: {
    meta: {
      brandName: 'martin knopper',
      brandSub: 'tax advisory',
      advisorTitle: 'MMag. Martin Knopper',
      credentials: 'Tax Advisor · Lawyer · Business Economist',
      locationShort: 'Grieskai 56 / 6, 8020 Graz · Fully Digital & International',
    },
    nav: {
      services: 'Services',
      artVat: 'Art & VAT',
      experience: 'Experience',
      iurio: 'IURIO',
      fees: 'Fees',
      cta: 'Request Initial Consultation',
      ctaShort: 'Consultation',
    },
    utility: {
      showMore: 'Show more',
      showLess: 'Show less',
      languageLabel: 'Language',
      themeLight: 'Light',
      themeDark: 'Dark',
      officeBadge: 'Graz Practice · Austria-wide & International via IURIO',
      backToTop: 'Back to Top',
    },
    hero: {
      kicker: 'Tax Advisory MMag. Martin Knopper · Graz, Austria',
      headlineAccent: 'tax?!',
      headlineMain: 'leave it to him.',
      subline: 'Your art. Your practice. Your camera. My tax expertise.',
      description:
        'Fully digital and personal tax advisory from Graz — supporting sole proprietors, artists, healthcare professionals, cross-border art sales, and international tax cases.',
      primaryCta: 'Request Initial Consultation',
      secondaryCta: 'View Fee Schedule',
      portraitCaption: 'MMag. Martin Knopper · Tax Advisor',
      portraitSub: 'Law & Business Administration · Grieskai, Graz',
      keyMarkers: [
        { value: '28 Years', label: 'Experience across three worlds' },
        { value: '2 Degrees', label: 'Law & Business Administration' },
        { value: '100 %', label: 'Encrypted data hosted in Austria' },
        { value: '€ 0', label: 'Initial consultation if mandated' },
      ],
    },
    services: {
      kicker: 'How I Support You',
      title: 'Clarity across tax, legal, and economic decisions',
      intro:
        'From my sole practice in Graz, I work fully digitally and internationally — serving clients across Austria, Berlin, or wherever your work takes you.',
      items: [
        {
          index: '01',
          title: 'Sole Proprietors & Self-Employed',
          subtitle: 'Salons · Photographers · Service Providers',
          description:
            'You run the business; I handle the numbers. Bookkeeping and payroll run reliably in the background with experienced specialists.',
          highlight: true,
        },
        {
          index: '02',
          title: 'Artists & Creative Industries',
          subtitle: 'Fees · Grants · Commissions',
          description:
            'Royalties, stipends, and Artists’ Social Security Fund rules follow distinct legal frameworks. I know them inside out and account for them accurately.',
        },
        {
          index: '03',
          title: 'Healthcare Professionals',
          subtitle: 'Physicians · Dentists · Therapists',
          description:
            'Those who care for patients should focus on their practice — not on VAT exemptions, social security contributions, or filing deadlines.',
        },
        {
          index: '04',
          title: 'Art Across Borders',
          subtitle: 'International Exhibitions · Galleries · Sales',
          description:
            'Performances and artwork sales across national borders: I determine which jurisdiction applies so you never pay tax twice.',
        },
        {
          index: '05',
          title: 'International Tax Cases',
          subtitle: 'Capital Assets · RSU Payouts · Real Estate',
          description:
            'Foreign income, equity compensation (RSUs), and cross-border property holdings structured step by step until complete clarity emerges.',
        },
        {
          index: '06',
          title: 'Calm as a Service',
          subtitle: 'Deadlines Monitored · Direct Access',
          description:
            'Filings tracked, questions answered promptly, bureaucracy removed. I keep calm so you can stay focused on your craft.',
          highlight: true,
        },
      ],
    },
    artVat: {
      kicker: 'Practice Guide · Art Across Borders',
      title: 'VAT rules when selling artwork abroad from Austria',
      intro:
        'Three questions govern every cross-border art sale: Who is receiving the artwork? Where is it shipped? And are all required proofs on file?',
      imageCaption: 'Cross-border art logistics · EU & Non-EU exports',
      baselineHeading: 'Two key figures upfront',
      baselines: [
        {
          figure: '13 %',
          title: 'Reduced VAT on original artwork',
          detail:
            'For deliveries of paintings, original drawings, and original sculptures, Austria applies the reduced VAT rate of 13%.',
        },
        {
          figure: '€ 55,000',
          title: 'Small business threshold from 2025',
          detail:
            'No VAT is owed up to € 55,000 domestic turnover. For deliveries into other EU states, the EU small-business scheme applies via FinanzOnline (“EX” ID, max € 100,000 EU turnover).',
        },
      ],
      scenarioHeading: 'Who is the buyer? Select your transaction scenario',
      scenarios: {
        eu_b2b: {
          tabLabel: '1. EU Business Buyer (B2B)',
          headline: 'VAT-exempt intra-Community supply — when every proof is documented',
          summary:
            'If even a single formal requirement is missing, the delivery remains taxable in Austria.',
          steps: [
            {
              num: '1',
              title: 'Valid buyer VAT ID (UID)',
              detail: 'Verify the buyer’s VAT identification number upfront via FinanzOnline or VIES.',
            },
            {
              num: '2',
              title: 'Artwork physically leaves Austria',
              detail: 'Retain solid transport documentation such as a signed delivery note or carrier dispatch receipt.',
            },
            {
              num: '3',
              title: 'Invoice issued without VAT',
              detail: 'Include both VAT ID numbers and an explicit legal note referencing intra-Community tax exemption.',
            },
            {
              num: '4',
              title: 'EC Sales List (ZM)',
              detail: 'Submit the recapitulative statement via FinanzOnline by the end of the following month.',
            },
          ],
          note: 'Special rules apply to small-business owners (domestic € 55,000 threshold or EU EX registration).',
        },
        eu_b2c: {
          tabLabel: '2. EU Private Buyer (B2C)',
          headline: 'Governed by the € 10,000 EU-wide distance-selling threshold',
          summary:
            'For sellers established in a single EU member state, all EU-wide B2C distance sales count together toward one limit.',
          steps: [
            {
              num: '1',
              title: 'Up to € 10,000: Austrian VAT applies',
              detail: 'While combined EU distance sales to private individuals stay under € 10,000, Austrian VAT (13% on art) is due.',
            },
            {
              num: '2',
              title: 'Above € 10,000: Destination VAT & One-Stop-Shop (OSS)',
              detail: 'The VAT rate of the buyer’s destination country applies, conveniently settled via the EU One-Stop-Shop (OSS).',
            },
          ],
          note: 'Interactions with the small-business exemption involve specific nuances best reviewed in an initial consultation.',
        },
        non_eu: {
          tabLabel: '3. Non-EU Buyer (Third Country)',
          headline: 'Export outside the EU — exempt only with formal export proof',
          summary:
            'Sales to Switzerland, the UK, the US, or other non-EU destinations require formal customs confirmation.',
          steps: [
            {
              num: '1',
              title: 'Artwork is exported',
              detail: 'Transported or dispatched by either the seller or the buyer to a country outside the EU.',
            },
            {
              num: '2',
              title: 'Tax-exempt export with proof',
              detail: 'Exempt from Austrian VAT once formal export evidence — such as customs office confirmation — is secured.',
            },
            {
              num: '3',
              title: 'Taxable without export evidence',
              detail: 'Without valid export documentation, the transaction remains subject to Austrian VAT.',
            },
            {
              num: '4',
              title: 'Destination import duties',
              detail: 'Import VAT or customs duties may arise in the destination country — agree in advance who bears them.',
            },
          ],
          note: 'General overview only (as of October 2026); income tax treatment and customs tariff classifications excluded.',
        },
      },
      pitfallsHeading: 'Typical practical pitfalls',
      pitfalls: [
        {
          num: '01',
          title: 'Missing dispatch proof',
          detail: 'Without transport records, even a genuine shipment abroad becomes taxable in Austria.',
        },
        {
          num: '02',
          title: 'VAT ID not verified',
          detail: 'A validated buyer VAT ID at the time of supply is a strict prerequisite for B2B exemption.',
        },
        {
          num: '03',
          title: 'Late EC Sales List filing',
          detail: 'Timely filing of the Zusammenfassende Meldung is a substantive condition for tax exemption.',
        },
        {
          num: '04',
          title: 'Charging VAT despite small-business status',
          detail: 'If VAT is shown on an invoice anyway, it becomes payable to the tax office by invoice liability.',
        },
      ],
      disclaimer:
        'General information, status October 2026. Not individual tax advice. Excludes income tax and customs law.',
    },
    experience: {
      kicker: 'Background & Credentials',
      title: '28 years of experience from three worlds',
      intro:
        'Public administration, non-profit sector, and tax advisory: three perspectives united in one practice.',
      timelineLegend: {
        publicAdmin: 'Public administration & non-profit',
        taxAdvisory: 'Tax advisory & own practice',
      },
      timeline: [
        { period: '1999 – 2010', years: '11 yrs', label: 'Public administration', world: 'public' },
        { period: '2010 – 2016', years: '6 yrs', label: 'Tax advisory', world: 'tax' },
        { period: '2016 – 2020', years: '4 yrs', label: 'Public admin. & NPO', world: 'public' },
        { period: '2020 – 2023', years: '3 yrs', label: 'Tax advisory', world: 'tax' },
        { period: 'since 2023', years: 'current', label: 'Own practice', world: 'tax' },
      ],
      summaryCard: {
        yearsNumber: '28',
        yearsUnit: 'years',
        yearsDesc: 'professional experience since 1999',
        degreesNumber: '2',
        degreesTitle: 'university degrees',
        degreesList: ['Law', 'Business administration'],
        motto: 'Law and business in one mind.',
      },
      publicCard: {
        yearsNumber: '15',
        yearsUnit: 'years',
        title: 'Public administration and non-profit',
        areasLabel: 'Areas of work',
        areas: [
          'HR management',
          'Payroll',
          'Finance',
          'Tax legislation',
          'Audit and oversight',
          'Accounting',
          'Controlling',
          'Property management',
          'Project management',
          'Change management',
          'Conflict resolution',
          'International financial responsibility',
        ],
      },
      taxCard: {
        yearsNumber: '13',
        yearsUnit: 'years',
        title: 'Tax advisory',
        subtitle: 'self-employed in own practice for nearly 4 years',
        focusLabel: 'Focus areas',
        focusAreas: [
          'Tax procedure',
          'Appeals',
          'Social security law',
          'International tax law',
          'Real estate',
          'Investment income',
        ],
        clientsLabel: 'Clients',
        clients: [
          'Self-employed',
          'SMEs',
          'Healthcare professionals',
          'Artists',
          'Creative industries',
          'Associations & clubs',
        ],
      },
      music: {
        title: 'From Bach to Argentine tango',
        subtitle: 'Music since the age of 6 · At the piano at age eight, with Bach already in my fingers.',
        motifNote: 'The B-A-C-H motif, notated as in a fugue: subject and answer',
        caption: 'Select any note on the staff to explore each musical chapter.',
        pianoCaption: 'At the piano at age eight, with Bach already in my fingers.',
        pianoAlt: 'Martin Knopper at the piano at age eight',
        notes: [
          { pitch: 'B♭', accidental: 'flat', title: 'Flute', span: 'from age 6', detail: 'Early musical foundation, phrasing, and breath discipline.' },
          { pitch: 'A', title: 'Piano', span: 'from age 8', detail: 'At the piano from age eight — polyphonic precision with J. S. Bach.' },
          { pitch: 'C', title: 'Music theory & harmony', span: '5 years', detail: 'Formal study of counterpoint, harmonic structure, and fugue writing.' },
          { pitch: 'B♮', accidental: 'natural', title: 'Choir singing', span: '35 years', detail: 'Decades of choral collaboration and listening across voices.' },
          { pitch: 'B♭', accidental: 'flat', title: 'Voice training', span: '3 years', detail: 'Focused vocal technique and tonal expression.' },
          { pitch: 'A', title: 'Keyboards in a band', span: '10 years', detail: 'Ten years of live ensemble timing and stage adaptability.' },
          { pitch: 'C', title: 'Saxophone', span: 'since 2006', detail: 'Expressive solo and ensemble phrasing across jazz and contemporary repertoire.' },
          { pitch: 'B♮', accidental: 'sharp', title: 'Argentine tango', span: 'since 2008', detail: 'Structure, balance, and responsive partnership — much like good counsel.' },
        ],
      },
    },
    testimonials: {
      kicker: 'Client Voices',
      title: 'What clients value about working directly with our practice.',
      subtitle:
        'Direct counsel from a single qualified advisor rather than an anonymous rotating desk — selected feedback across active retainers.',
      confidentialityNote:
        'Statutory confidentiality (§ 80 Austrian Tax Advisory Act): Client engagements are published anonymized by profession and city.',
      ratingSummary: '4.9 / 5.0',
      ratingCountLabel: 'Average client satisfaction across ongoing retainers',
      prevLabel: 'Previous client review',
      nextLabel: 'Next client review',
      slideNavLabel: 'Select client review',
      items: [
        {
          id: 'artist-vat',
          quote:
            'Before switching, exhibitions in Germany and Switzerland always left me anxious about misapplied VAT or lost input tax. Martin structured my gallery consignments and direct sales in two clear sessions — now I verify UID and export proof in five minutes.',
          authorLabel: 'Visual Artist (Sculpture & Installation)',
          role: 'Self-Employed & Gallery Representation',
          location: 'Graz & Berlin',
          scope: 'Cross-Border Art VAT · Annual Filings',
          since: 'Client since 2021',
          outcome: 'Compliant 0% export and 13% Austrian art VAT across EU & Swiss sales',
          rating: 5,
        },
        {
          id: 'wahlarzt-practice',
          quote:
            'Running a private specialist practice, I refused to deal with a new junior clerk every six months. With IURIO I immediately spot open queries via the green dot, and for SVS social insurance or equipment investments I speak directly with Martin.',
          authorLabel: 'Specialist Physician (Orthopaedics)',
          role: 'Private Medical Practice',
          location: 'Graz',
          scope: 'Healthcare · Bookkeeping & SVS Planning',
          since: 'Client since 2019',
          outcome: 'Predictable SVS prepayment adjustments and streamlined digital IURIO document flow',
          rating: 5,
        },
        {
          id: 'architect-sole',
          quote:
            'Knowing the annual fee sits predictably around 2–3% of net revenue without surprise add-on invoices made budgeting straightforward. Having one advisor who brings legal and business judgement together is rare.',
          authorLabel: 'Chartered Architect',
          role: 'Sole Proprietorship',
          location: 'Graz & Styria',
          scope: 'Sole Proprietors · Legal & Tax Counsel',
          since: 'Client since 2018',
          outcome: 'Clear annual fee predictability and 40% less time spent on monthly paperwork',
          rating: 5,
        },
        {
          id: 'rsu-expat',
          quote:
            'Dealing with US company RSUs and income taxed in two jurisdictions, I received conflicting answers elsewhere. Combining double-taxation treaty law with Austrian filing rules brought clarity and prevented costly double withholding.',
          authorLabel: 'Principal Software Engineer',
          role: 'Equity Compensation & Cross-Border Income',
          location: 'Vienna / Remote for US Tech',
          scope: 'RSUs & Stock Options · International Tax',
          since: 'Client since 2022',
          outcome: 'Accurate foreign tax credit allocation without double taxation',
          rating: 5,
        },
      ],
    },
    iurio: {
      kicker: 'Working with IURIO',
      title: 'Our collaboration at a distance. Secure and personal.',
      intro:
        'I work with my clients fully digitally through IURIO, an encrypted platform with servers in Austria. It works from anywhere, is clear and well organised, and gives you a direct line to me as a sole practitioner.',
      workspaceCaption: 'IURIO Client Workspace · Passkey & QR Sign-in · Servers in Austria',
      features: [
        {
          title: 'Everything in one place',
          detail: 'Documents, tasks, messages and signatures live in one personal workspace.',
        },
        {
          title: 'Passkey instead of password',
          detail: 'Log in with your phone and fingerprint. No password for you to remember.',
        },
        {
          title: 'Encrypted, servers in Austria',
          detail: 'Your documents are stored encrypted. Even the platform administrators cannot read them.',
        },
        {
          title: 'Eavesdrop-proof video calls',
          detail: 'Meetings via a link. Video conferences and chat are encrypted and protected against eavesdropping.',
        },
        {
          title: 'Sign digitally',
          detail: 'Directly on the document, for example with ID Austria. No printing, no scanning.',
        },
        {
          title: 'Always in view',
          detail: 'A green dot shows what is new. You keep track of documents and tasks.',
        },
      ],
      securityBand: {
        title: 'Your data stays in Austria',
        points: [
          'IURIO: Documents are stored encrypted on servers in Austria',
          'BMD Cloud: Accounting runs in an Austrian data centre certified to ISO 27001',
          'Data processing agreements are in place with both providers — full EU GDPR compliance',
        ],
      },
      onboardingTitle: 'How we get started',
      onboardingSteps: [
        {
          num: '1',
          title: 'Request Initial Consultation',
          detail: 'Schedule an appointment online — in person in Graz or by video call. If we work together, the initial consultation is free.',
        },
        {
          num: '2',
          title: 'Invitation to IURIO',
          detail: 'You receive a personal invitation from me to your personal workspace and set up passkey access with your phone in a few minutes.',
        },
        {
          num: '3',
          title: 'Get started',
          detail: 'Upload documents, view tasks, write messages, and sign digitally — also available via the free IURIO mobile app.',
        },
      ],
      workflowTitle: 'How we work together day to day',
      workflowPoints: [
        'We exchange tax-relevant receipts and confidential information exclusively via IURIO.',
        'I use email strictly for scheduling and organisational notes without attachments.',
        'Phone calls and in-person appointments in Graz naturally remain available.',
        'I usually reply within one to two working days.',
      ],
      footNote:
        'I usually reply within one to two working days. A detailed guide takes you through the first login step by step.',
    },
    fees: {
      kicker: 'Transparency from the Start',
      title: 'My fees at a glance',
      intro:
        'Before we begin working together, we review the anticipated scope and agree on an appropriate fee framework upon request.',
      columns: {
        service: 'Service Area',
        rate: 'Fee',
        unit: 'Billing Basis',
      },
      rows: [
        { service: 'Payroll processing per employee', rate: '€ 25', unit: 'per employee and month' },
        { service: 'Payroll — additional services', rate: '€ 95', unit: 'per hour' },
        { service: 'Bookkeeping', rate: '€ 95', unit: 'per hour' },
        { service: 'Tax returns', rate: '€ 150', unit: 'per hour' },
        { service: 'Tax advisory', rate: '€ 185', unit: 'per hour' },
        { service: 'Cash-basis accounting (Einnahmen-Ausgaben-Rechnung)', rate: 'from € 700', unit: 'depending on scope' },
        { service: 'Annual financial statements — sole proprietors & partnerships', rate: 'from € 1,200', unit: 'depending on scope' },
        { service: 'Annual financial statements — corporations', rate: 'from € 1,800', unit: 'depending on scope' },
        { service: 'Initial consultation', rate: 'complimentary', unit: 'if a mandate follows', accent: true },
        { service: 'Client onboarding (IURIO & BMD setup)', rate: '€ 300', unit: 'one-time' },
        { service: 'Advisory without an existing mandate', rate: '€ 185', unit: 'per half hour' },
      ],
      factorsTitle: 'What determines the fee',
      factorsText:
        'Fees reflect actual effort: volume of receipts, quality and completeness of records, number of business transactions, legal form, tax complexity, and coordination requirements.',
      agreementTitle: 'Individual framework & VAT',
      agreementText:
        'You have full clarity on expected costs from day one. All stated fees are subject to 20% statutory Austrian VAT.',
      deductibleTitle: 'Important tax deductibility note',
      deductibleText:
        'My fees are generally tax-deductible under Austrian law as business expenses (Betriebsausgaben) or special expenses (Sonderausgaben). I will gladly explain how this applies to your individual case.',
    },
    faq: {
      kicker: 'Frequently Asked Questions',
      title: 'Clear answers before our first conversation.',
      subtitle:
        'Practical guidance on fees, cross-border VAT, equity compensation, and digital collaboration — answering common questions before you write.',
      allCategoriesLabel: 'All topics',
      expandAllLabel: 'Expand all',
      collapseAllLabel: 'Collapse all',
      categories: {
        fees: 'Fees & Initial Call',
        cross_border: 'Art, Cross-Border & RSUs',
        digital: 'IURIO & Data Privacy',
        mandate: 'Mandate & Onboarding',
      },
      ctaPrompt: 'Have a specific tax setup not covered above?',
      ctaButton: 'Request Initial Consultation',
      items: [
        {
          id: 'initial-fee',
          category: 'fees',
          question: 'When is the initial consultation free of charge, and when does a fee apply?',
          answer:
            'The 30-minute initial consultation clarifies your situation, anticipated scope, fee framework, and collaboration via IURIO. If we enter an ongoing retainer afterwards, the initial consultation is complimentary. If you only require focused one-off tax advice without an ongoing mandate, the fee is € 185 + 20% VAT per half hour.',
        },
        {
          id: 'annual-cost',
          category: 'fees',
          question: 'What annual fee budget should a sole proprietor realistically expect?',
          answer:
            'With well-organised digital bookkeeping, annual advisory and financial statement costs typically range around 2–3% of annual net revenue. Before any engagement begins, we review your transaction volume and agree on a clear, transparent fee framework.',
        },
        {
          id: 'art-vat-rules',
          category: 'cross_border',
          question: 'Which Austrian VAT rate applies when visual artists sell works abroad?',
          answer:
            'Within Austria, original artworks supplied by the creator generally qualify for the reduced 13% VAT rate. Intra-EU B2B sales to VAT-registered galleries or dealers (validated UID) and documented exports to non-EU countries such as Switzerland or the US typically qualify for 0% VAT — provided UID checks, transport proof, and invoice wording are properly documented.',
        },
        {
          id: 'small-business-eu',
          category: 'cross_border',
          question: 'How does the € 55,000 Austrian small-business VAT exemption work since 2025?',
          answer:
            'Since 2025, the Austrian small-business threshold stands at € 55,000 gross annual turnover and can be extended to EU cross-border supplies up to a € 100,000 EU-wide ceiling. Whether opting into regular VAT instead makes sense to reclaim input VAT on studio equipment or practice investments is evaluated during your initial call.',
        },
        {
          id: 'rsu-foreign-tax',
          category: 'cross_border',
          question: 'How are US employer RSUs, stock options, and foreign income taxed in Austria?',
          answer:
            'Upon vesting, Restricted Stock Units are generally taxed as employment income in Austria, often overlapping with foreign withholding or multi-country workdays. Combining Austrian tax law with applicable double-taxation treaties ensures accurate foreign tax credits and prevents double taxation.',
        },
        {
          id: 'iurio-no-email',
          category: 'digital',
          question: 'Why shouldn’t confidential tax receipts be sent via standard email?',
          answer:
            'Standard email is unencrypted and unsuitable for sensitive tax filings under GDPR and statutory Austrian advisory confidentiality. Through IURIO, all receipts, contracts, and notices remain encrypted on Austrian servers with convenient phone Passkey login and instant green-dot visibility for open items.',
        },
        {
          id: 'switch-advisor',
          category: 'mandate',
          question: 'How smooth is switching from another Austrian tax advisor?',
          answer:
            'Switching is straightforward at any point in the year — ideally right after closing a fiscal year or at the start of a quarter. With your signed power of attorney, we request prior filings, trial balances, and BMD records directly from your previous firm.',
        },
        {
          id: 'remote-clients',
          category: 'mandate',
          question: 'Do you work with clients outside Graz or internationally?',
          answer:
            'Yes. While our office is located at Grieskai 56 / 6 in Graz, we advise sole proprietors, artists, medical practices, and internationally mobile taxpayers across Austria (including Vienna) and abroad via encrypted IURIO video calls.',
        },
      ],
    },
    consultation: {
      kicker: 'The First Step',
      title: 'Request Initial Consultation',
      subtitle:
        'One conversation clarifies scope, expectations, and working chemistry — in person in Graz or via encrypted video call.',
      stepLabels: ['1. Topic & Type', '2. Date & Time', '3. Contact Details'],
      stepLabelsShort: ['1. Topic', '2. Date', '3. Contact'],
      typeLabel: 'Consultation type',
      types: [
        {
          id: 'initial',
          title: 'Initial Consultation (Scope & Mandate Check)',
          feeLabel: 'Free of charge if mandated',
          desc: 'We discuss your situation, scope of services, and digital collaboration via IURIO (30 minutes).',
        },
        {
          id: 'adhoc',
          title: 'Targeted Advisory without Mandate',
          feeLabel: '€ 185 / 30 min + 20% VAT',
          desc: 'Focused tax assessment on a specific topic such as cross-border art VAT, RSUs, or foreign assets.',
        },
      ],
      topicsLabel: 'Select primary topic',
      topicPlaceholder: '— Select a topic —',
      topics: {
        sole_proprietor: 'Sole Proprietors & Self-Employed',
        artists_creatives: 'Artists & Creative Industries',
        art_cross_border: 'Cross-Border Art & VAT',
        healthcare: 'Healthcare Professionals',
        international_tax: 'International Tax, RSUs & Real Estate',
        general: 'General Tax Advisory Inquiry',
      },
      wizard: {
        backBtn: 'Back',
        continueToDateBtn: 'Continue to Date & Time',
        continueToContactBtn: 'Continue to Contact Details',
        editBtn: 'Edit',
        selectTopicHint: 'Select a topic to proceed to date & time selection.',
        selectDateTimeHint: 'Choose a date and time slot to enter your contact details.',
      },
      formatLabel: 'Preferred format',
      formats: [
        {
          id: 'video',
          shortLabel: 'Video Call',
          title: 'Encrypted Video Call (IURIO / Online)',
          detail: 'Remote via secure conference link',
        },
        {
          id: 'graz',
          shortLabel: 'In-person',
          title: 'In-person (Graz Office)',
          detail: 'Grieskai 56 / 6, 8020 Graz, Austria',
        },
      ],
      dateLabel: 'Select date (Mon–Fri)',
      timeLabel: 'Select time (30 min, 9:00–16:00)',
      timezoneNote: 'All times shown in Austria local time (Europe/Vienna).',
      inPersonPaidOnly: 'In person in Graz only for the paid advisory session. The free initial consultation takes place by video call.',
      googleCheckHeading: 'Google Calendar Live Availability',
      googleCheckConnected: 'Connected to Google Calendar — conflicts in your schedule are flagged below.',
      googleSignInBtn: 'Sign in with Google to check availability',
      googleSignOutBtn: 'Disconnect Google Calendar',
      googleBusyNote: 'Optional: Sign in with Google to avoid calendar conflicts and create the event directly, or download a universal .ics invite.',
      busyBadge: 'Busy',
      formLabels: {
        name: 'Full Name *',
        namePlaceholder: 'e.g. Dr. Anna Example',
        email: 'Email Address *',
        emailPlaceholder: 'name@example.at',
        phone: 'Phone Number (optional)',
        phonePlaceholder: '+43 ...',
        notes: 'Brief outline of your question',
        notesPlaceholder: 'e.g. Visual artist selling works to galleries in Germany and Switzerland...',
      },
      validationError: 'Please review the highlighted fields before submitting.',
      nameRequiredError: 'Please enter your full name.',
      nameTooShortError: 'Please enter at least 2 characters for your name.',
      emailInvalidError: 'Please enter a valid email address (e.g. name@example.at).',
      phoneInvalidError: 'Please enter a valid phone number (7–16 digits, e.g. +43 316 38 60 97).',
      icsToastSuccess: 'Consultation request prepared and calendar file (.ics) downloaded.',
      googleToastSuccess: 'Consultation request sent and added to Google Calendar.',
      actions: {
        sendRequest: 'Request initial consultation',
        sending: 'Sending …',
        addToGoogleCalendar: 'Add to Google Calendar',
        downloadIcs: 'Download Calendar Invite (.ics)',
        creating: 'Creating calendar event...',
      },
      confirmModal: {
        title: 'Confirm Calendar Appointment',
        lead: 'Please review these details before creating the event in your Google Calendar:',
        eventLabel: 'Appointment',
        whenLabel: 'Date & Time',
        whereLabel: 'Location / Format',
        attendeesLabel: 'Participants',
        confirmBtn: 'Confirm & Create Event',
        cancelBtn: 'Cancel',
      },
      success: {
        requestSentBanner:
          'Your consultation request has been sent successfully — your appointment details are confirmed below.',
        titleSent: 'Thank you! Your request has been received.',
        prototypeNote: 'Prototype: in this test version the request is not sent.',
        descSent: 'I usually reply within one to two working days. If we decide to work together, the initial consultation is free of charge.',
        titleGoogle: 'Appointment created in Google Calendar',
        titleIcs: 'Calendar invitation (.ics) downloaded',
        descGoogle:
          'Your consultation slot has been added to your Google Calendar. For confidential records, you will receive a personal IURIO invitation.',
        descIcs:
          'Your .ics file is ready for Apple Calendar, Outlook, or Thunderbird. Please share confidential receipts only via IURIO once invited.',
        openCalendarLink: 'Open in Google Calendar',
        downloadIcsAgain: 'Download .ics copy',
        scheduleAnother: 'Request another consultation',
      },
    },
    contactDrawer: {
      tabLabel: 'Contact now',
      title: 'Direct Contact',
      subtitle: 'Tax Advisor MMag. Martin Knopper · Sole Practice, Graz',
      addressLabel: 'Office Address',
      addressValue: 'Grieskai 56 / 6, 8020 Graz, Austria',
      phoneLabel: 'Phone',
      mobileLabel: 'Mobile',
      emailLabel: 'Email (Organisational)',
      webLabel: 'Website',
      emailSecurityNote:
        'Privacy note: Email is used strictly for organisational matters without attachments. Confidential records are exchanged exclusively via encrypted IURIO.',
      responseNote: 'Typical response time: one to two working days.',
      primaryBtn: 'Request Initial Consultation',
      closeLabel: 'Close contact drawer',
      documentUpload: {
        prompt: 'If you have a document we need to check before the call, please upload.',
        label: 'Documents (optional)',
        buttonLabel: 'Upload files',
        folderLabel: 'Upload folder',
        replaceLabel: 'Replace Document',
        removeLabel: 'Remove',
        attachedNote: 'Ready for pre-call review · Confidential files are exchanged encrypted via IURIO.',
        toastAttached: 'Document attached for pre-call review.',
      },
    },
    mobileBar: {
      services: 'Services',
      artVat: 'Art & VAT',
      consult: 'Consult',
      menu: 'Menu',
      sheetTitle: 'Navigation & Preferences',
      sectionsTitle: 'Practice Sections',
      preferencesTitle: 'Language & Appearance',
      currentLabel: 'You are here',
      callLabel: 'Call',
      mailLabel: 'Email',
    },
    footer: {
      tagline: 'Law and business in one mind. Fully digital, calm, and personal.',
      address: 'Grieskai 56 / 6 · 8020 Graz · +43 316 38 60 97 · office@knopper-stb.at',
      legal: 'Austrian Chamber of Tax Advisors and Public Accountants (KSW)',
      imprint: 'Graz, Austria · Austrian Professional Standards',
      privacy: 'GDPR · Encrypted via IURIO & BMD Cloud (ISO 27001)',
      consultCta: 'Request Initial Consultation',
    },
    legal: {
      imprintLink: 'Legal notice',
      termsLink: 'Terms',
      loginShort: 'Login',
      loginLabel: 'Client login (IURIO)',
      dialogTitle: 'Legal notice & terms',
      closeLabel: 'Close',
      imprintHeading: 'Legal notice (Impressum)',
      disclosure: 'Disclosure pursuant to § 5 Austrian E-Commerce Act (ECG)',
      rows: [
        { label: '', value: 'MMag. Martin Knopper' },
        { label: '', value: 'Steuerberater und Wirtschaftstreuhänder (tax advisor)' },
        { label: 'Address', value: 'Grieskai 56 / 6, 8020 Graz, Austria' },
        { label: 'Phone', value: '+43 316 38 60 97', href: 'tel:+43316386097' },
        { label: 'Email', value: 'office@knopper-stb.at', href: 'mailto:office@knopper-stb.at' },
        { label: 'Legal form', value: 'Sole proprietorship (Einzelunternehmen)' },
        { label: 'Place of jurisdiction', value: 'Graz' },
        { label: 'WT code', value: '230061' },
        { label: 'VAT ID', value: 'ATU79946025' },
        { label: 'Chamber', value: 'Kammer der Steuerberater:innen und Wirtschaftsprüfer:innen' },
        { label: 'Professional law', value: 'WTBG 2017, available at www.ris.bka.gv.at', href: 'https://www.ris.bka.gv.at/' },
      ],
      termsHeading: 'General terms of engagement (AAB)',
      termsText: 'Information on our general terms of engagement (AAB) is available on request.',
    },
    seo: {
      top: {
        title: 'MMag. Martin Knopper · Tax Advisory Graz',
        description:
          'Fully digital Austrian tax advisory for artists, medical practices, sole proprietors, and cross-border cases. Request a consultation.',
        image: 'images/knopper-kodex-portrait.jpg',
        imageAlt: 'MMag. Martin Knopper · Tax Advisor, Lawyer and Business Economist in Graz',
      },
      services: {
        title: 'Services · Martin Knopper Tax Advisory Graz',
        description:
          'Tax advisory for sole proprietors, visual artists, healthcare professionals, real estate, RSUs, and international cases in Austria.',
        image: 'images/knopper-blazer-portrait.jpg',
        imageAlt: 'Core tax advisory services by MMag. Martin Knopper in Graz, Austria',
      },
      'art-vat': {
        title: 'Cross-Border Art & VAT Guide · Knopper',
        description:
          'Practical VAT guide for Austrian artists selling across EU B2B, EU B2C, and non-EU exports, including the € 55,000 threshold and 13% rate.',
        image: 'images/art-gallery-export.jpg',
        imageAlt: 'Cross-border art sales and Austrian VAT guide for visual artists',
      },
      experience: {
        title: '28 Years Experience · Martin Knopper Graz',
        description:
          'Tax advisor, lawyer, and economist combining 28 years in Austrian public administration, advisory, and music into one practice.',
        image: 'images/knopper-piano-childhood.jpg',
        imageAlt: 'MMag. Martin Knopper — 28 years spanning public administration, tax law and music',
      },
      testimonials: {
        title: 'Client Reviews · Martin Knopper Graz',
        description:
          'Read anonymized client reviews from visual artists, private physicians, sole proprietors, and international RSU taxpayers in Austria.',
        image: 'images/knopper-blazer-portrait.jpg',
        imageAlt: 'Client testimonials and credibility reviews for MMag. Martin Knopper Tax Advisory',
      },
      iurio: {
        title: 'IURIO Digital Portal · Martin Knopper Graz',
        description:
          'Collaborate securely with IURIO in Austria: encrypted document exchange, green dot tracking for updates, and clear task checklists.',
        image: 'images/iurio-workspace-preview.jpg',
        imageAlt: 'IURIO secure digital collaboration portal preview',
      },
      fees: {
        title: 'Fee Schedule · Martin Knopper Tax Advisory',
        description:
          'Transparent fee framework: € 185 per 30 min advisory, free initial consultation upon mandate, and 2–3% annual net revenue guidance.',
        image: 'images/knopper-kodex-portrait.jpg',
        imageAlt: 'Transparent fee framework at MMag. Martin Knopper Tax Advisory',
      },
      faq: {
        title: 'FAQ · Martin Knopper Tax Advisory Graz',
        description:
          'Answers to common Austrian tax questions on initial consultation fees, cross-border art VAT, RSUs, IURIO privacy, and switching advisors.',
        image: 'images/knopper-kodex-portrait.jpg',
        imageAlt: 'Frequently asked tax advisory questions — MMag. Martin Knopper Graz',
      },
      consultation: {
        title: 'Request Consultation · Martin Knopper Graz',
        description:
          'Schedule an initial consultation in person or via encrypted video call with Google Calendar availability sync or instant .ics invite.',
        image: 'images/knopper-blazer-portrait.jpg',
        imageAlt: 'Request an initial consultation with MMag. Martin Knopper',
      },
    },
  },
};
