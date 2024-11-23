import supertest from 'supertest';
import { describe, expect, test, it, beforeAll, afterAll } from '@jest/globals';
import assert from 'assert';

import app from '../src/app';
import prisma from '../src/models/prismaClient';
import { authSchemas } from '../src/schemas';
import { authService } from '../src/services';

const request = supertest(app);

const testUser: authSchemas.RegisterSchema = {
  email: 'test@test.com',
  name: 'Test User',
  password: 'password'
};

const testUser2: authSchemas.RegisterSchema = {
  email: 'test2@test.com',
  name: 'Test User2',
  password: 'pass123'
};

function cleanDatabase() {
  return prisma.$transaction([
    prisma.user.deleteMany({
      where: { email: { in: [testUser.email, testUser2.email] } }
    }),
    prisma.task.deleteMany()
  ]);
}

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    await cleanDatabase();
    await authService.createUser(Object.assign({}, testUser));
  });

  afterAll(async () => {
    await cleanDatabase();
    await prisma.$disconnect();
  });

  it('POST /auth/register should register a new user', (done) => {
    request
      .post('/auth/register')
      .send(testUser2)
      .expect(201)
      .expect('Content-Type', /application\/json/) // make sure content type is json
      .expect(function (res) {
        assert(res.body.hasOwnProperty('data'));
        assert(res.body.hasOwnProperty('msg'));
      })
      .end(function (err) {
        if (err) throw err;
        done();
      });
  });

  it('POST /auth/login should login a registered user', (done) => {
    request
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password })
      .expect(200)
      .expect('Content-Type', /application\/json/) // make sure content type is json
      .expect(function (res) {
        assert(res.body.hasOwnProperty('token'));
        assert(res.body.hasOwnProperty('msg'));
      })
      .end(function (err) {
        if (err) throw err;
        done();
      });
  });
});
