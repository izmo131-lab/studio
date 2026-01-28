import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Contact from '@/components/sections/contact';
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '../../../../i18n-config'

export default async function ContactePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-grow">
        <Contact dictionary={dictionary.contact} />
      </main>
      <Footer lang={lang} dictionary={dictionary.footer} />
    </div>
  );
}
