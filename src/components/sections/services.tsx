import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Warehouse, Boxes, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  imageHint: string;
}

export default function Services({ dictionary }: { dictionary: any }) {

  const services: Service[] = [
    {
      icon: Truck,
      title: dictionary.international_transport_title,
      description: dictionary.international_transport_desc,
      imageUrl: '/messi.jpeg',
      imageAlt: 'Servei de Transport Internacional',
      imageHint: 'transport internacional'
    },
    {
      icon: Boxes,
      title: dictionary.integral_logistics_title,
      description: dictionary.integral_logistics_desc,
      imageUrl: '/lamine.jpg',
      imageAlt: 'Servei de Logística Integral',
      imageHint: 'logística integral'
    },
    {
      icon: Warehouse,
      title: dictionary.storage_distribution_title,
      description: dictionary.storage_distribution_desc,
      imageUrl: '/si.jpg',
      imageAlt: 'Servei d\'Emmagatzematge i Distribució',
      imageHint: 'emmagatzematge distribució'
    },
    {
      icon: Wrench,
      title: dictionary.custom_solutions_title,
      description: dictionary.custom_solutions_desc,
      imageUrl: '/nose.jpg',
      imageAlt: 'Servei de Solucions a Mida',
      imageHint: 'solucions a mida'
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dictionary.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
              <Card key={index} className="flex flex-col transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl bg-card shadow-md overflow-hidden group">
                  <div className="relative w-full h-48">
                    <Image
                      src={service.imageUrl}
                      alt={service.imageAlt}
                      fill
                      className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={service.imageHint}
                    />
                  </div>
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
          ))}
        </div>
      </div>
    </section>
  );
}
