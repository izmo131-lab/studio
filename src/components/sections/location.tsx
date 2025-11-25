import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Location() {
  const locationImage = PlaceHolderImages.find(p => p.id === 'location-map');

  return (
    <section id="location" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight">On Som?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Visita les nostres oficines i magatzem al cor logístic de Tarragona.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ivora Logistics SL</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">La Nostra Adreça</h3>
                    <p className="text-muted-foreground">Carrer de la Logística, 123<br />Polígon Industrial de Constantí<br />43120 Constantí, Tarragona</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Telèfon de Contacte</h3>
                    <p className="text-muted-foreground"><a href="tel:+34977000000" className="hover:text-primary transition-colors">+34 977 000 000</a></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Correu Electrònic</h3>
                    <p className="text-muted-foreground"><a href="mailto:contacte@ivoralogistics.com" className="hover:text-primary transition-colors">contacte@ivoralogistics.com</a></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            {locationImage && (
              <Image
                src={locationImage.imageUrl}
                alt={locationImage.description}
                fill
                className="object-cover"
                data-ai-hint={locationImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
