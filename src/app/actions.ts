'use server';

import { optimizeLogisticsProcesses, OptimizeLogisticsProcessesInput } from '@/ai/flows/optimize-logistics-processes';
import { answerQuestion, CustomerSupportInput } from '@/ai/flows/customer-support-flow';
import { z } from 'zod';

const aiFormSchema = z.object({
  logisticalChallenges: z.string().min(10, {
    message: 'Si us plau, descriu els teus reptes logístics en almenys 10 caràcters.',
  }),
});

export async function getLogisticsSuggestion(prevState: any, formData: FormData) {
  const validatedFields = aiFormSchema.safeParse({
    logisticalChallenges: formData.get('logisticalChallenges'),
  });

  if (!validatedFields.success) {
    return {
      message: 'La validació ha fallat.',
      errors: validatedFields.error.flatten().fieldErrors,
      suggestions: null,
    };
  }

  try {
    const input: OptimizeLogisticsProcessesInput = {
      logisticalChallenges: validatedFields.data.logisticalChallenges,
    };
    const result = await optimizeLogisticsProcesses(input);
    return {
      message: 'Success',
      suggestions: result.suggestions,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'S\'ha produït un error en generar els suggeriments. Si us plau, torna-ho a provar.',
      suggestions: null,
      errors: null,
    };
  }
}

const chatBotSchema = z.object({
  question: z.string().min(5, {
    message: 'La pregunta ha de tenir almenys 5 caràcters.',
  }),
});

export async function askChatbot(prevState: any, formData: FormData) {
  const validatedFields = chatBotSchema.safeParse({
    question: formData.get('question'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      formError: validatedFields.error.flatten().fieldErrors.question?.[0]
    };
  }

  const newQuestion = validatedFields.data.question;

  try {
    const input: CustomerSupportInput = {
      question: newQuestion,
    };
    const result = await answerQuestion(input);
    
    const newConversation = [
      ...(prevState.conversation || []),
      { role: 'user', content: newQuestion },
      { role: 'bot', content: result.answer },
    ];
    
    return {
      conversation: newConversation,
      formError: null,
    };

  } catch (error) {
    console.error(error);
    return {
      ...prevState,
      formError: 'S\'ha produït un error. Si us plau, torna-ho a provar.',
    };
  }
}
