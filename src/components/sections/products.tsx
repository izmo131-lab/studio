"use client"

import { Card, CardContent } from '@/components/ui/card';
import { Palette, Home } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Product {
  icon: LucideIcon;
  title: string;
  description: string;
  imageId: string;
}

export default function Products({ dictionary }: { dictionary: any }) {

  const products: Product[] = [
    {
      icon: Palette,
      title: dictionary.design_specialists_title,
      description: dictionary.design_specialists_desc,
      imageId: 'product-design-specialists',
    },
    {
      icon: Home,
      title: dictionary.home_decor_title,
      description: dictionary.home_decor_desc,
      imageId: 'product-home-decor',
    },
  ];

  return (
    <section id="products" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dictionary.subtitle}
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {products.map((product, index) => {
               const productImage = PlaceHolderImages.find(p => p.id === product.imageId);
               return (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="p-1 h-full">
                    <Card className="h-full overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300">
                       {productImage && (
                         <div className="relative h-80 w-full">
                          <Image
                            src={productImage.imageUrl}
                            alt={productImage.description}
                            fill
                            className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                            data-ai-hint={productImage.imageHint}
                          />
                         </div>
                       )}
                      <CardContent className="p-6 text-center">
                        <div className="mx-auto bg-primary/10 p-3 rounded-full inline-block mb-4">
                          <product.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-headline text-xl font-semibold mb-2">{product.title}</h3>
                        <p className="text-muted-foreground">{product.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
