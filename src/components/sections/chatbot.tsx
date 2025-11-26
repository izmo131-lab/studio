'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { askChatbot } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Loader2, User, Bot } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const initialState = {
  conversation: [],
  formError: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Send className="h-5 w-5" />
      )}
      <span className="sr-only">Enviar pregunta</span>
    </Button>
  );
}

export default function Chatbot() {
  const [state, formAction] = useActionState(askChatbot, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current && state.formError === null) {
      formRef.current.reset();
    }
  }, [state.conversation, state.formError]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [state.conversation]);

  return (
    <section id="chatbot" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Atenció al Client Intel·ligent</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tens alguna pregunta? El nostre assistent virtual, IvoraBot, està aquí per ajudar-te 24/7.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Bot className="text-primary" />
                IvoraBot
              </CardTitle>
              <CardDescription>
                Fes una pregunta sobre els nostres serveis de logística.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
                <ScrollArea className="h-full" ref={scrollAreaRef}>
                    <div className="space-y-6 pr-4">
                    {state.conversation.length === 0 && (
                        <div className="flex items-start gap-4">
                            <Avatar>
                                <AvatarFallback><Bot /></AvatarFallback>
                            </Avatar>
                            <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                                <p className="font-bold">IvoraBot</p>
                                <p className="text-sm">Hola! Sóc IvoraBot. En què et puc ajudar avui?</p>
                            </div>
                        </div>
                    )}
                    {state.conversation.map((entry: { role: string; content: string }, index: number) => (
                        <div key={index} className={`flex items-start gap-4 ${entry.role === 'user' ? 'justify-end' : ''}`}>
                        {entry.role === 'bot' && (
                            <Avatar>
                                <AvatarFallback><Bot /></AvatarFallback>
                            </Avatar>
                        )}
                        <div className={`p-3 rounded-lg max-w-[80%] ${entry.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <p className="font-bold">{entry.role === 'user' ? 'Tu' : 'IvoraBot'}</p>
                            <p className="text-sm whitespace-pre-wrap">{entry.content}</p>
                        </div>
                         {entry.role === 'user' && (
                            <Avatar>
                                <AvatarFallback><User /></AvatarFallback>
                            </Avatar>
                        )}
                        </div>
                    ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <form action={formAction} ref={formRef} className="w-full">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    name="question"
                    placeholder="Escriu la teva pregunta aquí..."
                    autoComplete="off"
                    required
                  />
                  <SubmitButton />
                </div>
                 {state.formError && (
                  <p className="text-sm font-medium text-destructive mt-2">{state.formError}</p>
                )}
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
