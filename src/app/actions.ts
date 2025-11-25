'use server';

import { optimizeLogisticsProcesses, OptimizeLogisticsProcessesInput } from '@/ai/flows/optimize-logistics-processes';
import { z } from 'zod';

const aiFormSchema = z.object({
  logisticalChallenges: z.string().min(10, {
    message: 'Please describe your logistical challenges in at least 10 characters.',
  }),
});

export async function getLogisticsSuggestion(prevState: any, formData: FormData) {
  const validatedFields = aiFormSchema.safeParse({
    logisticalChallenges: formData.get('logisticalChallenges'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
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
      message: 'An error occurred while generating suggestions. Please try again.',
      suggestions: null,
      errors: null,
    };
  }
}

const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    inquiryType: z.string(),
    message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
    const validation = contactFormSchema.safeParse(data);

    if (!validation.success) {
        return { success: false, message: "Invalid form data." };
    }

    // Here you would typically send an email, save to a database, etc.
    // For this demo, we'll just log it and return success.
    console.log("New contact form submission:", validation.data);

    return { success: true, message: "Thanks for your message! We'll be in touch soon." };
}
