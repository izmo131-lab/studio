'use server';

/**
 * @fileOverview A customer support chatbot flow for Ivora Logistics.
 *
 * - answerQuestion - A function that provides answers to customer questions.
 * - CustomerSupportInput - The input type for the answerQuestion function.
 * - CustomerSupportOutput - The return type for the answerQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomerSupportInputSchema = z.object({
  question: z.string().describe('The customer\'s question.'),
});
export type CustomerSupportInput = z.infer<typeof CustomerSupportInputSchema>;

const CustomerSupportOutputSchema = z.object({
  answer: z.string().describe('The answer to the customer\'s question.'),
});
export type CustomerSupportOutput = z.infer<typeof CustomerSupportOutputSchema>;

export async function answerQuestion(
  input: CustomerSupportInput
): Promise<CustomerSupportOutput> {
  return customerSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customerSupportPrompt',
  input: {schema: CustomerSupportInputSchema},
  output: {schema: CustomerSupportOutputSchema},
  prompt: `You are IvoraBot, a friendly and helpful customer support assistant for Ivora Logistics. Your goal is to answer customer questions accurately and concisely.

Your knowledge base includes:
- International transport solutions.
- Comprehensive logistics management (planning, sourcing, final destination).
- Secure storage and strategic distribution from the warehouse in Constantí.
- Custom logistics plans and premium services, especially for design and decoration products.
- Sustainable practices like electric vehicles and recyclable packaging.
- Use of AI for route optimization and blockchain for traceability.

Based on the user's question, provide a clear and helpful answer.

User Question: {{{question}}}
`,
});

const customerSupportFlow = ai.defineFlow(
  {
    name: 'customerSupportFlow',
    inputSchema: CustomerSupportInputSchema,
    outputSchema: CustomerSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
