import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    id: 1,
    name: 'Joana Pons',
    title: 'CEO, Tech Innovators',
    quote: "Ivora Solutions va revolucionar la nostra cadena de subministrament. El seu pla logístic personalitzat ens va estalviar un 20% en costos operatius el primer trimestre. Un servei realment excepcional!",
    avatarId: 'testimonial-avatar-1',
  },
  {
    id: 2,
    name: 'Joan Smith',
    title: 'COO, Global Goods',
    quote: "L'experiència de l'equip en emmagatzematge i distribució és inigualable. Els nostres productes ara arriben als clients més ràpid i de manera més fiable que mai. Molt recomanable.",
    avatarId: 'testimonial-avatar-2',
  },
  {
    id: 3,
    name: 'Sònia Ray',
    title: 'Fundadora, Eco-Friendly Wares',
    quote: "Com a empresa en creixement, necessitàvem un soci logístic que pogués escalar amb nosaltres. La consultoria i les solucions flexibles d'Ivora han estat fonamentals en la nostra expansió.",
    avatarId: 'testimonial-avatar-3',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Què Diuen Els Nostres Clients</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Estem orgullosos d'haver-nos guanyat la confiança d'empreses de totes les mides.
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
