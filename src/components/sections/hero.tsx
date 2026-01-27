import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero({ dictionary }: { dictionary: any }) {
  return (
    <section className="relative h-[70vh] md:h-screen w-full flex items-center justify-center text-center text-white">
      <Image
        src="/vista-lateral-camion-rosa-moderno-fondo-blanco_62972-38224.avif"
        alt="Camió rosa modern d'Ivora"
        fill
        className="object-cover"
        priority
        data-ai-hint="camió rosa"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-7xl font-headline font-bold mb-4 tracking-tight text-white text-shadow-lg">
          {dictionary.title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-shadow">
          {dictionary.subtitle}
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/contacte">{dictionary.contact_us}</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/serveis">{dictionary.our_services}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
