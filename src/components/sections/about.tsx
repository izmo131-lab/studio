import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, Building, Target } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">La Nostra Història, La Teva Solució</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Ivora Logistics va néixer de la visió compartida de tres fundadors, Wiam, Álvaro i Izan, amb l'objectiu de redefinir l'excel·lència en el transport i la logística. Ens especialitzem en la manipulació i el transport de productes de disseny i decoració, oferint un servei que combina precisió, cura i eficiència.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Fundada per Experts</h3>
                  <p className="text-muted-foreground">La nostra empresa va ser fundada amb la passió i experiència de Wiam, Álvaro i Izan per oferir un servei logístic de qualitat superior.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Ubicació Estratègica</h3>
                  <p className="text-muted-foreground">Les nostres oficines i magatzem es troben al Polígon Industrial de Constantí, un punt clau per a la distribució eficient.</p>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">La Nostra Visió</h3>
                  <p className="text-muted-foreground">Aspirem a ser líders del sector combinant innovació tecnològica, pràctiques sostenibles i una atenció al client excepcional.</p>
                </div>
              </div>
            </div>
            <Button asChild size="lg">
              <Link href="/contacte">Descobreix com podem ajudar-te</Link>
            </Button>
          </div>
          <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/imatge-removebg-preview.png"
              alt="Logo de Ivore Logistics"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
