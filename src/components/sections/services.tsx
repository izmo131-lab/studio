import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Warehouse, Boxes, Wrench, BrainCircuit } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Truck,
    title: 'Transport de Mercaderies',
    description: 'Solucions de transport fiables i eficients per a tot tipus de càrrega, garantint lliuraments puntuals.',
  },
  {
    icon: Boxes,
    title: 'Logística Integral',
    description: 'Gestió completa de tota la teva cadena de subministrament, des de l\'origen fins a la destinació final.',
  },
  {
    icon: Warehouse,
    title: 'Emmagatzematge i Distribució',
    description: 'Serveis d\'emmagatzematge segur i distribució estratègica per optimitzar el teu inventari i abast.',
  },
  {
    icon: Wrench,
    title: 'Solucions a Mida',
    description: 'Plans logístics personalitzats dissenyats per satisfer els teus requisits i reptes empresarials únics.',
  },
  {
    icon: BrainCircuit,
    title: 'Consultoria Logística',
    description: 'Assessorament expert per optimitzar la teva cadena de subministrament, reduir costos i millorar l\'eficiència general.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Els Nostres Serveis Principals</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Oferim una suite completa de serveis logístics per impulsar el teu negoci.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col text-center items-center hover:shadow-lg transition-shadow duration-300 bg-card">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full">
                  <service.icon className="h-10 w-10 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 font-headline text-xl">{service.title}</CardTitle>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
