import { z } from "zod";

export const createTaskSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    dueDate: z.string().datetime().optional(),
    priority: z.enum(["HIGHT", "MEDIUM", "LOW"]).optional(),
  })
  .strict();

export const updateTaskSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    dueDate: z.string().datetime().optional(),
    priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
  })
  .strict();

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
