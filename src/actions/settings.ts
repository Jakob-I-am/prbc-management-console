'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { settingsSchema } from '@/schemas';
import { getUserById } from '@/data/user';
import { getCurrentUser } from '@/lib/auth';

export async function settings(values: z.infer<typeof settingsSchema>) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: 'Unauthorised!' };
  }

  const existingUser = await getUserById(user.id);

  if (!existingUser) {
    return { error: 'Unauthorised!' };
  }

  if (values.password && values.newPassword && existingUser.hashedPassword) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      existingUser.hashedPassword
    );

    if (!passwordsMatch) {
      return { error: 'Incorrect Password!' };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      name: values.name,
      username: values.username,
      hashedPassword: values.password,
    },
  });

  return { success: 'Settings Updated!' };
}
