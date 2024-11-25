import { Prisma } from '@prisma/client';
import prisma from '../models/prismaClient';
import { taskSchemas } from '../schemas';

export function findMyTasks(
  userId: string,
  query: taskSchemas.QueryTasksSchema
) {
  const where: Prisma.TaskWhereInput = { userId };
  const orderBy: Prisma.TaskOrderByWithRelationInput[] = [];

  if (query.status?.length) where.status = { in: query.status };
  if (query.priority?.length) where.priority = { in: query.priority };

  if (query.orderBy?.length) {
    (['dueDate', 'priority', 'status'] as const).forEach((field) => {
      const exists = query.orderBy!.find((item) => item[field]);
      if (exists) orderBy.push({ [field]: exists[field] });
      else orderBy.push({ [field]: 'asc' });
    });
  }

  return prisma.task.findMany({
    where,
    orderBy
  });
}

export function findMyTask(taskId: string, userId: string) {
  return prisma.task.findUnique({ where: { id: taskId, userId } });
}

export function createTask(task: taskSchemas.CreateTaskSchema, userId: string) {
  return prisma.task.create({ data: { ...task, userId } });
}

export function updateTask(
  taskId: string,
  task: taskSchemas.UpdateTaskSchema,
  userId: string
) {
  return prisma.task.update({ where: { id: taskId, userId }, data: task });
}

export function deleteTask(taskId: string, userId: string) {
  return prisma.task.delete({ where: { id: taskId, userId } });
}
