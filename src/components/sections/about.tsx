import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, Building, Target } from 'lucide-react';

export default function About({ dictionary }: { dictionary: any }) {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">{dictionary.title}</h2>
            <p className="text-lg text-muted-foreground mb-6">
              {dictionary.subtitle}
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{dictionary.founded_by_experts_title}</h3>
                  <p className="text-muted-foreground">{dictionary.founded_by_experts_desc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{dictionary.strategic_location_title}</h3>
                  <p className="text-muted-foreground">{dictionary.strategic_location_desc}</p>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{dictionary.our_vision_title}</h3>
                  <p className="text-muted-foreground">{dictionary.our_vision_desc}</p>
                </div>
              </div>
            </div>
            <Button asChild size="lg">
              <Link href="/contacte">{dictionary.cta_button}</Link>
            </Button>
          </div>
          <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/imatge-removebg-preview.png"
              alt="Logo de Ivora"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
