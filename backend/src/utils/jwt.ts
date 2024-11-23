import jwt from 'jsonwebtoken';

import { JWT_EXPIRES_IN, JWT_SECRET } from '@/constants';
import logger from './logger';

export function generateToken(data: Record<string, unknown>) {
  return jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    logger.error(error);
    return null;
  }
}
