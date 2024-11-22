import express from 'express';

import { authRoutes, taskRoutes } from '@/routes';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api/task', taskRoutes);

export default app;
