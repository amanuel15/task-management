import { hash, compare } from 'bcrypt';

import prisma from '@/models/prismaClient';
import { authSchemas } from '@/schemas';

export async function createUser(user: authSchemas.RegisterSchema) {
  user.password = await hashPassword(user.password);
  return prisma.user.create({
    data: user,
    select: { id: true, email: true, name: true }
  });
}

export function findUser(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true }
  });
}

function hashPassword(password: string) {
  return hash(password, 10);
}

export async function isPasswordValid(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { password: true }
  });
  if (!user) return false;
  return compare(password, user.password);
}
