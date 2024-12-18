import express from 'express';

import { taskController } from '../controllers';
import { validateSchema } from '../middlewares';
import { taskSchemas, idSchema } from '../schemas';
import { queryTasksSchema } from '@/schemas/taskSchemas';

const router = express.Router();

//Routes
router.post(
  '/',
  validateSchema(taskSchemas.createTaskSchema),
  taskController.create
);
router.put(
  '/:id',
  validateSchema(taskSchemas.updateTaskSchema),
  validateSchema(idSchema, 'params'),
  taskController.update
);
router.get(
  '/',
  validateSchema(queryTasksSchema, 'query'),
  taskController.findAll
);
router.get('/:id', validateSchema(idSchema, 'params'), taskController.findOne);
router.delete(
  '/:id',
  validateSchema(idSchema, 'params'),
  taskController.remove
);

export default router;
