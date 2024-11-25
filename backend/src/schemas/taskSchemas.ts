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

const orderBySchema = z
  .array(
    z
      .object({
        dueDate: z.enum(['asc', 'desc']).optional(),
        priority: z.enum(['asc', 'desc']).optional(),
        status: z.enum(['asc', 'desc']).optional()
      })
      .strict()
      .refine((data) => Object.keys(data).length === 1, {
        message:
          "Object must have exactly one of 'dueDate', 'priority', or 'status' as a key."
      })
  )
  .optional();
const statusSchema = z.array(z.nativeEnum(TaskStatus)).optional();
const prioritySchema = z.array(z.nativeEnum(TaskPriority)).optional();

export const queryTasksSchema = z
  .object({
    status: z
      .string()
      .optional()
      .transform((val, ctx) => {
        try {
          if (!val) return [];
          return JSON.parse(val) as z.infer<typeof statusSchema>; // Parse the JSON string into an array
        } catch (error) {
          console.log(error);
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'status is not a correct JSON string'
          });
          // This is a special symbol you can use to return early from the transform function.
          // It has type `never` so it does not affect the inferred return type.
          return z.NEVER;
        }
      })
      .refine(
        (item) => Array.isArray(item) && statusSchema.safeParse(item).success,
        { message: 'Each element in the array must be a valid TaskStatus' }
      ),
    priority: z
      .string()
      .optional()
      .transform((val, ctx) => {
        try {
          if (!val) return [];
          return JSON.parse(val) as z.infer<typeof prioritySchema>; // Parse the JSON string into an array
        } catch (error) {
          console.log(error);
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'priority is not a correct JSON string'
          });
          // This is a special symbol you can use to return early from the transform function.
          // It has type `never` so it does not affect the inferred return type.
          return z.NEVER;
        }
      })
      .refine(
        (item) => Array.isArray(item) && prioritySchema.safeParse(item).success,
        { message: 'Each element in the array must be a valid TaskPriority' }
      ),
    orderBy: z
      .string()
      .optional() // Mark orderBy as optional
      .transform((val, ctx) => {
        // Parse the string into an array
        try {
          if (!val) return [];
          return JSON.parse(val) as z.infer<typeof orderBySchema>; // Parse the JSON string into an array
        } catch (error) {
          console.log(error);
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'orderby is not a correct JSON string'
          });
          // This is a special symbol you can use to return early from the transform function.
          // It has type `never` so it does not affect the inferred return type.
          return z.NEVER;
        }
      })
      .refine((item) => orderBySchema.safeParse(item).success, {
        message:
          'Each element in the array must follow the specified object schema'
      })
  })
  .strict();

export type QueryTasksSchema = z.infer<typeof queryTasksSchema>;
export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
