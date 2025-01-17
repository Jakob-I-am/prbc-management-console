'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { registerSchema } from '@/schemas';
import { db } from '@/lib/db';
import { getUserByUsername } from '@/data/user';

export async function register(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid Credentials!' };
  }

  const { username, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const exisitingUser = await getUserByUsername(username.toLowerCase());

  if (exisitingUser) {
    return { error: 'Username is already taken!' };
  }

  await db.user.create({
    data: {
      username,
      hashedPassword,
      name,
    },
  });

  return { success: 'User Created!' };
}
