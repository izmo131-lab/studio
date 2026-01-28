"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";

export default function Contact({ dictionary }: { dictionary: any }) {
  const { toast } = useToast();
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xeoyklyj', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        toast({
          title: dictionary.toast_success_title,
          description: dictionary.toast_success_description,
        });
      } else {
        throw new Error('There was an error sending the form.');
      }
    } catch (error) {
      setStatus('error');
      toast({
        variant: "destructive",
        title: dictionary.toast_error_title,
        description: dictionary.toast_error_description,
      });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-headline">{dictionary.title}</CardTitle>
            <CardDescription className="text-lg">
              {dictionary.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{dictionary.name_label}</Label>
                  <Input id="name" name="name" placeholder={dictionary.name_placeholder} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{dictionary.email_label}</Label>
                  <Input id="email" name="email" type="email" placeholder={dictionary.email_placeholder} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inquiryType">{dictionary.inquiry_type_label}</Label>
                 <Select name="inquiryType">
                    <SelectTrigger id="inquiryType">
                      <SelectValue placeholder={dictionary.inquiry_type_placeholder} />
                    </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom-solution">{dictionary.inquiry_types.custom_solution}</SelectItem>
                    <SelectItem value="international">{dictionary.inquiry_types.international}</SelectItem>
                    <SelectItem value="storage">{dictionary.inquiry_types.storage}</SelectItem>
                    <SelectItem value="general">{dictionary.inquiry_types.general}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                 <Label htmlFor="message">{dictionary.message_label}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={dictionary.message_placeholder}
                  className="min-h-[120px]"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? dictionary.submit_button_sending : dictionary.submit_button}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
