import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import Testimonials from '@/components/sections/testimonials';
import Footer from '@/components/layout/footer';
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '../../../i18n-config'

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang)
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-grow">
        <Hero dictionary={dictionary.hero} />
        <Testimonials dictionary={dictionary.testimonials} />
      </main>
      <Footer lang={lang} dictionary={dictionary.footer} />
    </div>
  );
}
