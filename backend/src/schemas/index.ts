import { z } from 'zod';

export * as authSchemas from './authSchemas';
export * as taskSchemas from './taskSchemas';

export const idSchema = z.object({ id: z.string().uuid() });
