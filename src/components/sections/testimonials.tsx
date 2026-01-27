import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    id: 1,
    name: 'Marta Soler',
    title: 'Gerent de Disseny a "La llar amb estil"',
    quote: "Ivora Logistics va transformar la nostra logística de productes de decoració. El seu servei especialitzat i l'embalatge a mida van garantir que les nostres peces arribessin impecables. Un soci imprescindible!",
    avatarId: 'testimonial-avatar-1',
  },
  {
    id: 2,
    name: 'Carles Puig',
    title: 'Director d\'Operacions a "Global Deco"',
    quote: "L'eficiència i la transparència que ofereixen són d'un altre nivell. La traçabilitat amb blockchain ens dona una tranquil·litat que no havíem tingut mai. Molt recomanables.",
    avatarId: 'testimonial-avatar-2',
  },
  {
    id: 3,
    name: 'Laura Vidal',
    title: 'Fundadora d\'"EcoDecor"',
    quote: "El seu compromís amb la sostenibilitat va ser clau per a nosaltres. Saber que utilitzen vehicles elèctrics i embalatges reciclables s'alinea perfectament amb els valors de la nostra marca.",
    avatarId: 'testimonial-avatar-3',
  },
];

export default function Testimonials({ dictionary }: { dictionary: any }) {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dictionary.subtitle}
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => {
              const avatar = PlaceHolderImages.find(p => p.id === testimonial.avatarId);
              return (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full flex flex-col">
                      <CardContent className="flex-grow p-6 flex flex-col items-center text-center">
                        <p className="text-muted-foreground mb-6 flex-grow">"{testimonial.quote}"</p>
                        <div className="flex items-center flex-col">
                          {avatar && (
                             <Avatar className="h-16 w-16 mb-4">
                              <AvatarImage src={avatar.imageUrl} alt={testimonial.name} data-ai-hint={avatar.imageHint} />
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
