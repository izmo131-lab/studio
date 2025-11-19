"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { getLogisticsSuggestion } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bot, Loader2, ThumbsUp } from 'lucide-react';
import { useEffect, useRef } from 'react';

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
          Optimizing...
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          Get AI Suggestions
        </>
      )}
    </Button>
  );
}

export default function AiTool() {
  const [state, formAction] = useFormState(getLogisticsSuggestion, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'Success' && state.suggestions) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section id="ai-tool" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">AI Logistics Optimizer</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Describe your logistical challenges and let our AI provide data-driven suggestions to improve efficiency and reduce costs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <form action={formAction} ref={formRef}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="text-primary" />
                  Describe Your Challenge
                </CardTitle>
                <CardDescription>
                  Be as detailed as possible for the best recommendations. For example, mention delays, high costs, inventory issues, or route inefficiencies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  name="logisticalChallenges"
                  placeholder="e.g., 'We are experiencing frequent delays in our last-mile delivery in urban areas, leading to increased fuel costs and customer dissatisfaction...'"
                  rows={5}
                  required
                />
                {state.errors?.logisticalChallenges && (
                  <p className="text-sm font-medium text-destructive mt-2">{state.errors.logisticalChallenges[0]}</p>
                )}
                 {state.message && state.message !== 'Success' && !state.suggestions && (
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
                  AI-Powered Suggestions
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
