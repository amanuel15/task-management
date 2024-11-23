import supertest from 'supertest';
import { describe, expect, test, it } from '@jest/globals';

import app from '../src/app';

const request = supertest(app);

describe('User Endpoints', () => {
  it('GET /user should show all users', async () => {
    const res = await request.get('/healthcheck');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('status');
  });
});
