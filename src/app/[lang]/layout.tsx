import type {Metadata} from 'next';
import '../globals.css';
import { i18n } from '../../../i18n-config';
import { Locale } from '../../../i18n-config';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: 'Ivora',
  description: 'Operadora de transport i logística. Solucions integrals, emmagatzematge i distribució.',
};

export default function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  // Aquest component és un layout niuat. El layout arrel a src/app/layout.tsx
  // ja renderitza les etiquetes <html> i <body>. Renderitzar-les aquí de nou
  // causaria un HTML invàlid i un error d'hidratació.
  return (
    <>
     {children}
    </>
  );
}
