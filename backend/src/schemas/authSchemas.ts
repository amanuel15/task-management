import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string(),
    password: z.string()
  })
  .strict();

export const registerSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    password: z.string()
  })
  .strict();

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
