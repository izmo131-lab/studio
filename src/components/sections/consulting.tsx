import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

export default function Consulting() {
  const benefits = [
    'Optimització de rutes i gestió d\'inventaris amb IA.',
    'Automatització i robòtica col·laborativa als nostres magatzems.',
    'Logística verda amb vehicles elèctrics i embalatges sostenibles.',
    'Transparència total amb tecnologia blockchain per a la traçabilitat.',
  ];

  return (
    <section id="consulting" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Innovació, Sostenibilitat i Tecnologia</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Per mantenir-nos com a referents, combinem innovació tecnològica, sostenibilitat i excel·lència. Adoptem la digitalització, la IA i l'automatització per oferir un servei eficient, segur i respectuós amb el medi ambient.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative h-[450px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/Sostenible.jpg"
                alt="Imatge sobre innovació i sostenibilitat a la logística"
                fill
                className="object-cover w-full h-full"
                data-ai-hint="logística sostenible"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
