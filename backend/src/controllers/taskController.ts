import { Request, Response } from 'express';

import { taskService } from '../services';
import { taskSchemas } from '../schemas';
import { logger } from '../utils';

export async function findAll(req: Request, res: Response) {
  try {
    const tasks = await taskService.findMyTasks(req.user!.id, req.query);
    res.status(200).json({ msg: 'Tasks found', data: tasks });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
}

export async function findOne(req: Request, res: Response): Promise<any> {
  try {
    const task = await taskService.findMyTask(req.params.id, req.user!.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.status(200).json({ msg: 'Task found', data: task });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const body: taskSchemas.CreateTaskSchema = req.body;
    const user = await taskService.createTask(body, req.user!.id);
    res.status(201).json({ msg: 'Task created', data: user });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
}

export async function update(req: Request, res: Response): Promise<any> {
  try {
    const body: taskSchemas.UpdateTaskSchema = req.body;
    const taskId = req.params.id;
    const task = await taskService.findMyTask(taskId, req.user!.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    const updatedTask = await taskService.updateTask(
      taskId,
      body,
      req.user!.id
    );
    res.status(200).json({ msg: 'Task updated', data: updatedTask });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
}

export async function remove(req: Request, res: Response): Promise<any> {
  try {
    const taskId = req.params.id;
    const task = await taskService.findMyTask(taskId, req.user!.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    await taskService.deleteTask(req.params.id, req.user!.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.status(200).json({ msg: 'Task deleted', data: task });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
}
