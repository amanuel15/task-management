import { TaskPriority } from '@prisma/client';
import { z } from 'zod';

export const createTaskSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    dueDate: z.string(),
    priority: z.nativeEnum(TaskPriority).optional()
  })
  .strict();

export const updateTaskSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    dueDate: z.string().optional(),
    priority: z.nativeEnum(TaskPriority).optional()
  })
  .strict();

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
