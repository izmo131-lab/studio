"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [status, setStatus] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/xeoyklyj', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        toast({
          title: "Missatge enviat!",
          description: "Gràcies per contactar-nos. Et respondrem aviat.",
        });
      } else {
        const responseData = await response.json();
        if (responseData.errors) {
            const errorMessages = responseData.errors.map((error: any) => error.message).join(", ");
            throw new Error(errorMessages);
        } else {
            throw new Error('Hi ha hagut un error en enviar el formulari.');
        }
      }
    } catch (error: any) {
      setStatus('error');
      toast({
        variant: "destructive",
        title: "Error en l'enviament",
        description: error.message || 'No s\'ha pogut enviar el missatge. Si us plau, torna-ho a provar.',
      });
    }
  }

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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom Complert</Label>
                  <Input id="name" name="name" placeholder="El teu nom" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Adreça de Correu Electrònic</Label>
                  <Input id="email" name="_replyto" type="email" placeholder="el.teu@correu.com" required />
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
                <Button type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Enviant...' : 'Envia Missatge'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
