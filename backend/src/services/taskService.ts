import prisma from '@/models/prismaClient';
import { taskSchemas } from '@/schemas';

export function findMyTasks(userId: string) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: [{ dueDate: 'asc' }, { priority: 'asc' }, { status: 'asc' }]
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
