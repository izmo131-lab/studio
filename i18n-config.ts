export const i18n = {
  defaultLocale: 'ca',
  locales: ['en', 'ca', 'es'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
