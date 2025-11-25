import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Warehouse, Boxes, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Truck,
    title: 'Transport Internacional',
    description: 'Solucions de transport internacional de mercaderies fiables i eficients, garantint lliuraments puntuals a tot el món.',
  },
  {
    icon: Boxes,
    title: 'Logística Integral',
    description: 'Gestió completa de la teva cadena de subministrament, des de la planificació i l\'origen fins a la destinació final.',
  },
  {
    icon: Warehouse,
    title: 'Emmagatzematge i Distribució',
    description: 'Serveis d\'emmagatzematge segur al nostre magatzem de Constantí i distribució estratègica per optimitzar el teu inventari.',
  },
  {
    icon: Wrench,
    title: 'Solucions a Mida',
    description: 'Desenvolupem plans logístics personalitzats i serveis premium adaptats als reptes únics del teu negoci.',
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
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col text-center items-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl bg-card shadow-md">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full">
                  <service.icon className="h-10 w-10 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
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
