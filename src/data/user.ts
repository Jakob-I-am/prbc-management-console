import { db } from '../lib/db';

export async function getUserByUsername(username: string) {
  try {
    const user = await db.user.findUnique({ where: { username } });

    return user;
  } catch {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
}

export async function incrementLoginCount(username: string) {
  try {
    await db.user.update({
      where: { username },
      data: { loginCount: { increment: 1 } },
    });
  } catch (error) {
    return null;
  }
}
