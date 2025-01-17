'use server';

import * as z from 'zod';

import { registerSchema } from '@/schemas';

export async function register(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid Credentials!' };
  }

  return { success: 'Logged In!' };
}
