import express from 'express';

import { authController } from '../controllers';
import { validateSchema } from '../middlewares';
import { authSchemas } from '../schemas';

const router = express.Router();

//Routes
router.post(
  '/login',
  validateSchema(authSchemas.loginSchema),
  authController.login
);
router.post(
  '/register',
  validateSchema(authSchemas.registerSchema),
  authController.register
);

export default router;
