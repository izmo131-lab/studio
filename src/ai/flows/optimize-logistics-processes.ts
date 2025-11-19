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
    .describe('A detailed description of the logistical challenges.'),
});
export type OptimizeLogisticsProcessesInput = z.infer<
  typeof OptimizeLogisticsProcessesInputSchema
>;

const OptimizeLogisticsProcessesOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'Data-driven suggestions for optimizing logistical processes and improving efficiency.'
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
  prompt: `You are an expert logistics consultant. Analyze the following logistical challenges and provide data-driven suggestions for optimizing the processes and improving efficiency.\n\nLogistical Challenges: {{{logisticalChallenges}}}\n\nSuggestions:`,
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
