import { hash, compare } from 'bcrypt';

import prisma from '@/models/prismaClient';
import { authSchemas } from '@/schemas';

export async function createUser(user: authSchemas.RegisterSchema) {
  user.password = await hashPassword(user.password);
  return prisma.user.create({ data: user });
}

export function findUser(email: string) {
  return prisma.user.findUnique({ where: { email }, select: { email: true } });
}

function hashPassword(password: string) {
  return hash(password, 10);
}

export function comparePassword(password: string, hash: string) {
  return compare(password, hash);
}
