import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Warehouse, Boxes, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  imageId: string;
}

const services: Service[] = [
  {
    icon: Truck,
    title: 'Transport Internacional',
    description: 'Solucions de transport internacional de mercaderies fiables i eficients, garantint lliuraments puntuals a tot el món.',
    imageId: 'service-international-transport',
  },
  {
    icon: Boxes,
    title: 'Logística Integral',
    description: 'Gestió completa de la teva cadena de subministrament, des de la planificació i l\'origen fins a la destinació final.',
    imageId: 'service-integral-logistics',
  },
  {
    icon: Warehouse,
    title: 'Emmagatzematge i Distribució',
    description: 'Serveis d\'emmagatzematge segur al nostre magatzem de Constantí i distribució estratègica per optimitzar el teu inventari.',
    imageId: 'service-storage-distribution',
  },
  {
    icon: Wrench,
    title: 'Solucions a Mida',
    description: 'Desenvolupem plans logístics personalitzats i serveis premium adaptats als reptes únics del teu negoci.',
    imageId: 'service-custom-solutions',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight">Els Nostres Serveis</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Oferim una suite completa de serveis per combinar innovació, sostenibilitat i excel·lència.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const serviceImage = PlaceHolderImages.find(p => p.id === service.imageId);
            return (
              <Card key={index} className="flex flex-col transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl bg-card shadow-md overflow-hidden group">
                {serviceImage && (
                  <div className="relative w-full h-48">
                    <Image
                      src={serviceImage.imageUrl}
                      alt={serviceImage.description}
                      fill
                      className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={serviceImage.imageHint}
                    />
                  </div>
                )}
                <CardHeader className="text-center items-center w-full">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full -mt-12 relative z-10 border-4 border-background bg-background">
                    <service.icon className="h-10 w-10 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow px-6 pb-6 pt-0 text-center items-center">
                  <CardTitle className="mb-2 font-headline text-xl font-semibold">{service.title}</CardTitle>
                  <p className="text-muted-foreground flex-grow">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
