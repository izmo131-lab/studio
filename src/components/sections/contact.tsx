"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {

  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-headline">Posa't en Contacte</CardTitle>
            <CardDescription className="text-lg">
              Tens alguna pregunta o necessites una solució logística a mida? Emplena el formulari.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action="https://formspree.io/f/xeoyklyj" method="POST" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom Complert</Label>
                  <Input id="name" name="name" placeholder="El teu nom" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Adreça de Correu Electrònic</Label>
                  <Input id="email" name="email" type="email" placeholder="el.teu@correu.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inquiryType">Tipus de Consulta</Label>
                 <Select name="inquiryType">
                    <SelectTrigger id="inquiryType">
                      <SelectValue placeholder="Selecciona un tipus de consulta" />
                    </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom-solution">Solució a Mida per a Disseny</SelectItem>
                    <SelectItem value="international">Transport Internacional</SelectItem>
                    <SelectItem value="storage">Emmagatzematge</SelectItem>
                    <SelectItem value="general">Pregunta General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                 <Label htmlFor="message">El Teu Missatge</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Si us plau, descriu les teves necessitats o pregunta en detall..."
                  className="min-h-[120px]"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">
                  Envia Missatge
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
