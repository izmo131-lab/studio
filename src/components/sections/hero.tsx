import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section className="relative h-[70vh] md:h-screen w-full flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-7xl font-headline font-bold mb-4 tracking-tight text-shadow-lg">
          Ivore Logistics: Excel·lència en transport i logística.
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-shadow">
          La vostra operadora de transport de confiança. Especialistes en productes de disseny i decoració, amb solucions integrals de logística i emmagatzematge.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/contacte">Contacta amb Nosaltres</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/serveis">Els Nostres Serveis</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
