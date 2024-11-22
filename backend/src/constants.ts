import { env } from 'process';

export const PORT = parseInt(env.PORT || '3000');
export const IS_DEV = env.NODE_ENV === 'development';
