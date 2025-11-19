"use client";

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { getLogisticsSuggestion } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bot, Loader2, ThumbsUp } from 'lucide-react';

const initialState = {
  message: null,
  suggestions: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Optimitzant...
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          Obtenir Suggeriments d'IA
        </>
      )}
    </Button>
  );
}

export default function AiTool() {
  const [state, formAction] = useActionState(getLogisticsSuggestion, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'Èxit' && state.suggestions) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section id="ai-tool" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Optimitzador Logístic amb IA</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Descriu els teus reptes logístics i deixa que la nostra IA proporcioni suggeriments basats en dades per millorar l'eficiència i reduir costos.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <form action={formAction} ref={formRef}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="text-primary" />
                  Descriu el Teu Repte
                </CardTitle>
                <CardDescription>
                  Sigues tan detallat com sigui possible per a les millors recomanacions. Per exemple, esmenta retards, costos elevats, problemes d'inventari o ineficiències de ruta.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  name="logisticalChallenges"
                  placeholder="p. ex., 'Estem experimentant retards freqüents en el nostre lliurament d'última milla a les zones urbanes, la qual cosa comporta un augment dels costos de combustible i la insatisfacció dels clients...'"
                  rows={5}
                  required
                />
                {state.errors?.logisticalChallenges && (
                  <p className="text-sm font-medium text-destructive mt-2">{state.errors.logisticalChallenges[0]}</p>
                )}
                 {state.message && state.message !== 'Èxit' && !state.suggestions && (
                  <p className="text-sm font-medium text-destructive mt-2">{state.message}</p>
                )}
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <SubmitButton />
              </CardFooter>
            </form>
          </Card>

          {state.suggestions && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ThumbsUp className="text-green-500" />
                  Suggeriments Impulsats per IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-sans">
                  {state.suggestions}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
