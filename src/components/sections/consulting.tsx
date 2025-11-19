import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

export default function Consulting() {
  const consultingImage = PlaceHolderImages.find(p => p.id === 'consulting-image');

  const benefits = [
    'Optimitza la gestió de la cadena de subministrament.',
    'Redueix els costos operatius de manera eficaç.',
    'Millora la velocitat i fiabilitat del lliurament.',
    'Aconsegueix coneixements estratègics i un avantatge competitiu.',
  ];

  return (
    <section id="consulting" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Consultoria Logística Experta</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Els nostres serveis de consultoria estan dissenyats per desbloquejar tot el potencial de la teva cadena de subministrament. Analitzem els teus processos, identifiquem colls d'ampolla i implementem estratègies basades en dades per a un rendiment màxim.
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
            {consultingImage && (
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={consultingImage.imageUrl}
                    alt={consultingImage.description}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full rounded-lg shadow-lg"
                    data-ai-hint={consultingImage.imageHint}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
