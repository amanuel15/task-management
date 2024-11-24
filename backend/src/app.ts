import express from 'express';
import cors from 'cors';

import { authRoutes, taskRoutes } from '@/routes';
import authMiddleware from './middlewares/authMiddleware';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/healthcheck', (_, res) => {
  res.status(200).json({ status: 'ok' });
});
app.use('/auth', authRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);

export default app;
