import express from 'express';

import { authController } from '@/controllers';

const router = express.Router();

//Routes
router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;
