'use server';

import { optimizeLogisticsProcesses, OptimizeLogisticsProcessesInput } from '@/ai/flows/optimize-logistics-processes';
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
      message: 'Èxit',
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

const contactFormSchema = z.object({
    name: z.string().min(2, "El nom ha de tenir almenys 2 caràcters."),
    email: z.string().email("Si us plau, introdueix una adreça de correu electrònic vàlida."),
    inquiryType: z.string(),
    message: z.string().min(10, "El missatge ha de tenir almenys 10 caràcters."),
});

export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
    const validation = contactFormSchema.safeParse(data);

    if (!validation.success) {
        return { success: false, message: "Dades del formulari invàlides." };
    }

    // Here you would typically send an email, save to a database, etc.
    // For this demo, we'll just log it and return success.
    console.log("Nou enviament de formulari de contacte:", validation.data);

    return { success: true, message: "Gràcies pel teu missatge! Ens posarem en contacte amb tu aviat." };
}
