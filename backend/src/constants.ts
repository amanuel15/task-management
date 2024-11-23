import { env } from 'process';

export const PORT = parseInt(env.PORT || '3000');
export const IS_DEV = env.NODE_ENV === 'development';
export const JWT_SECRET = env.JWT_SECRET || 'secret';
export const JWT_EXPIRES_IN = env.JWT_EXPIRES_IN || '1d';
