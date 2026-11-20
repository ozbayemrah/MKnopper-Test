import { PracticeContent } from '../data/content';
import { Locale, SeoSectionKey } from '../types/app';

const VALID_SECTION_KEYS: SeoSectionKey[] = [
  'top',
  'services',
  'art-vat',
  'experience',
  'testimonials',
  'iurio',
  'fees',
  'faq',
  'consultation',
];

function setMetaByName(name: string, content: string) {
  const existing = document.querySelector<HTMLMetaElement>(
    `meta[name="${name}"]`
  );
  if (existing) {
    existing.content = content;
    return;
  }
  const meta = document.createElement('meta');
  meta.name = name;
  meta.content = content;
  document.head.appendChild(meta);
}

function setMetaByProperty(property: string, content: string) {
  const existing = document.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`
  );
  if (existing) {
    existing.content = content;
    return;
  }
  const meta = document.createElement('meta');
  meta.setAttribute('property', property);
  meta.content = content;
  document.head.appendChild(meta);
}

function setCanonicalUrl(url: string) {
  const existing = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (existing) {
    existing.href = url;
    return;
  }
  const link = document.createElement('link');
  link.rel = 'canonical';
  link.href = url;
  document.head.appendChild(link);
}

export function resolveSeoSectionKey(activeSection: string): SeoSectionKey {
  if (VALID_SECTION_KEYS.includes(activeSection as SeoSectionKey)) {
    return activeSection as SeoSectionKey;
  }
  return 'top';
}

export function updateDocumentSeo(
  locale: Locale,
  activeSection: string,
  content: PracticeContent
) {
  const sectionKey = resolveSeoSectionKey(activeSection);
  const meta = content.seo[sectionKey] ?? content.seo.top;

  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  const sectionUrl =
    sectionKey === 'top' ? baseUrl : `${baseUrl}#${sectionKey}`;
  const absoluteImageUrl = meta.image.startsWith('http')
    ? meta.image
    : `${window.location.origin}${meta.image}`;

  document.title = meta.title;
  setMetaByName('description', meta.description);

  // OpenGraph social sharing preview tags
  setMetaByProperty('og:type', 'website');
  setMetaByProperty(
    'og:site_name',
    locale === 'de'
      ? 'MMag. Martin Knopper · Steuerberatung'
      : 'MMag. Martin Knopper · Tax Advisory'
  );
  setMetaByProperty('og:locale', locale === 'de' ? 'de_AT' : 'en_US');
  setMetaByProperty('og:url', sectionUrl);
  setMetaByProperty('og:title', meta.title);
  setMetaByProperty('og:description', meta.description);
  setMetaByProperty('og:image', absoluteImageUrl);
  setMetaByProperty('og:image:alt', meta.imageAlt);
  setMetaByProperty('og:image:type', 'image/jpeg');

  // Twitter / X card tags
  setMetaByName('twitter:card', 'summary_large_image');
  setMetaByName('twitter:title', meta.title);
  setMetaByName('twitter:description', meta.description);
  setMetaByName('twitter:image', absoluteImageUrl);
  setMetaByName('twitter:image:alt', meta.imageAlt);

  setCanonicalUrl(sectionUrl);

  // Keep Schema.org JSON-LD aligned with live origin & active section URL
  const ldScript = document.getElementById('knopper-structured-data');
  if (ldScript) {
    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'AccountingService',
          '@id': `${baseUrl}#practice`,
          name:
            locale === 'de'
              ? 'MMag. Martin Knopper · Steuerberatung'
              : 'MMag. Martin Knopper · Tax Advisory',
          url: baseUrl,
          image: `${new URL(import.meta.env.BASE_URL, window.location.href).href}images/knopper-kodex-portrait.jpg`,
          telephone: '+43 316 38 60 97',
          email: 'office@knopper-stb.at',
          priceRange: '€ 185 / 30 min',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Grieskai 56 / 6',
            addressLocality: 'Graz',
            postalCode: '8020',
            addressCountry: 'AT',
          },
          areaServed: ['AT', 'EU', 'International'],
          availableLanguage: ['German', 'English'],
          founder: {
            '@type': 'Person',
            name: 'MMag. Martin Knopper',
            jobTitle: content.meta.credentials,
          },
        },
        {
          '@type': 'WebPage',
          '@id': `${sectionUrl}`,
          url: sectionUrl,
          name: meta.title,
          description: meta.description,
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: absoluteImageUrl,
            caption: meta.imageAlt,
          },
          inLanguage: locale === 'de' ? 'de-AT' : 'en',
          about: { '@id': `${baseUrl}#practice` },
          hasPart: [
            {
              '@type': 'WebPageElement',
              name: content.nav.services,
              url: `${baseUrl}#services`,
            },
            {
              '@type': 'WebPageElement',
              name: content.nav.artVat,
              url: `${baseUrl}#art-vat`,
            },
            {
              '@type': 'WebPageElement',
              name: content.nav.experience,
              url: `${baseUrl}#experience`,
            },
            {
              '@type': 'WebPageElement',
              name: content.testimonials.kicker,
              url: `${baseUrl}#testimonials`,
            },
            {
              '@type': 'WebPageElement',
              name: content.nav.iurio,
              url: `${baseUrl}#iurio`,
            },
            {
              '@type': 'WebPageElement',
              name: content.nav.fees,
              url: `${baseUrl}#fees`,
            },
            {
              '@type': 'WebPageElement',
              name: content.faq.kicker,
              url: `${baseUrl}#faq`,
            },
            {
              '@type': 'WebPageElement',
              name: content.nav.cta,
              url: `${baseUrl}#consultation`,
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `${baseUrl}#faq`,
          inLanguage: locale === 'de' ? 'de-AT' : 'en',
          mainEntity: content.faq.items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        },
      ],
    };
    ldScript.textContent = JSON.stringify(structuredData);
  }
}
