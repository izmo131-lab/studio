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
    title: 'Freight Transport',
    description: 'Reliable and efficient transport solutions for all types of cargo, ensuring timely delivery.',
  },
  {
    icon: Boxes,
    title: 'Comprehensive Logistics',
    description: 'Complete management of your entire supply chain, from origin to final destination.',
  },
  {
    icon: Warehouse,
    title: 'Warehousing & Distribution',
    description: 'Secure storage and strategic distribution services to optimize your inventory and reach.',
  },
  {
    icon: Wrench,
    title: 'Custom Solutions',
    description: 'Tailor-made logistics plans designed to meet your unique business requirements and challenges.',
  },
  {
    icon: BrainCircuit,
    title: 'Logistics Consulting',
    description: 'Expert advice to optimize your supply chain, reduce costs, and improve overall efficiency.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Core Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We offer a complete suite of logistics services to power your business.
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
