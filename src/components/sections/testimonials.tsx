import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    id: 1,
    name: 'Joana Pons',
    title: 'CEO, Tech Innovators',
    quote: "Ivora Solutions revolutionized our supply chain. Their custom logistics plan saved us 20% on operational costs in the first quarter. Truly outstanding service!",
    avatarId: 'testimonial-avatar-1',
  },
  {
    id: 2,
    name: 'John Smith',
    title: 'COO, Global Goods',
    quote: "The team's expertise in warehousing and distribution is unmatched. Our products now reach customers faster and more reliably than ever before. Highly recommended.",
    avatarId: 'testimonial-avatar-2',
  },
  {
    id: 3,
    name: 'Sonia Ray',
    title: 'Founder, Eco-Friendly Wares',
    quote: "As a growing business, we needed a logistics partner that could scale with us. Ivora's consulting and flexible solutions have been instrumental in our expansion.",
    avatarId: 'testimonial-avatar-3',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We are proud to have earned the trust of businesses of all sizes.
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
