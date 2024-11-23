import { NextFunction, Request, Response } from 'express';

import { User } from '@prisma/client';
import { jwtUtils } from '@/utils';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  const decoded = jwtUtils.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.user = decoded as Pick<User, 'id' | 'email' | 'name'>;
  next();
}
