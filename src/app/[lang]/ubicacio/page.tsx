import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Location from '@/components/sections/location';
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '../../../../i18n-config'

export default async function UbicacioPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-grow">
        <Location />
      </main>
      <Footer lang={lang} dictionary={dictionary.footer} />
    </div>
  );
}
