import { TaskPriority, TaskStatus } from '@prisma/client';
import { z } from 'zod';

export const createTaskSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    dueDate: z.string().datetime(),
    priority: z.nativeEnum(TaskPriority).optional()
  })
  .strict();

export const updateTaskSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    dueDate: z.string().datetime(),
    priority: z.nativeEnum(TaskPriority),
    status: z.nativeEnum(TaskStatus)
  })
  .strict();

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
