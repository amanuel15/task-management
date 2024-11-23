import express from 'express';

import { taskController } from '@/controllers';

const router = express.Router();

//Routes
router.post('/', taskController.create);
router.get('/', taskController.findAll);
router.get('/:id', taskController.findOne);
router.delete('/:id', taskController.remove);

export default router;
