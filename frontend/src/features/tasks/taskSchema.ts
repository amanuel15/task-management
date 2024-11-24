import { z } from "zod";

export const createTaskSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    dueDate: z.string().datetime(),
    priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
  })
  .strict();

export const updateTaskSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    dueDate: z.string().datetime(),
    priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
  })
  .strict();

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
