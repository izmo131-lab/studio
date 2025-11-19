'use server';

/**
 * @fileOverview An AI tool that provides data-driven suggestions for optimizing logistical processes.
 *
 * - optimizeLogisticsProcesses - A function that handles the optimization process.
 * - OptimizeLogisticsProcessesInput - The input type for the optimizeLogisticsProcesses function.
 * - OptimizeLogisticsProcessesOutput - The return type for the optimizeLogisticsProcesses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeLogisticsProcessesInputSchema = z.object({
  logisticalChallenges: z
    .string()
    .describe('Una descripció detallada dels reptes logístics.'),
});
export type OptimizeLogisticsProcessesInput = z.infer<
  typeof OptimizeLogisticsProcessesInputSchema
>;

const OptimizeLogisticsProcessesOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'Suggeriments basats en dades per optimitzar els processos logístics i millorar l\'eficiència.'
    ),
});
export type OptimizeLogisticsProcessesOutput = z.infer<
  typeof OptimizeLogisticsProcessesOutputSchema
>;

export async function optimizeLogisticsProcesses(
  input: OptimizeLogisticsProcessesInput
): Promise<OptimizeLogisticsProcessesOutput> {
  return optimizeLogisticsProcessesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeLogisticsProcessesPrompt',
  input: {schema: OptimizeLogisticsProcessesInputSchema},
  output: {schema: OptimizeLogisticsProcessesOutputSchema},
  prompt: `Ets un consultor expert en logística. Analitza els següents reptes logístics i proporciona suggeriments basats en dades per optimitzar els processos i millorar l'eficiència. Respon en català.\n\nReptes Logístics: {{{logisticalChallenges}}}\n\nSuggeriments:`,
});

const optimizeLogisticsProcessesFlow = ai.defineFlow(
  {
    name: 'optimizeLogisticsProcessesFlow',
    inputSchema: OptimizeLogisticsProcessesInputSchema,
    outputSchema: OptimizeLogisticsProcessesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
