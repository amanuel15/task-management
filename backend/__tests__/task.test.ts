import supertest from 'supertest';
import { describe, expect, test, it, beforeAll, afterAll } from '@jest/globals';
import assert from 'assert';

import app from '../src/app';
import prisma from '../src/models/prismaClient';
import { authSchemas, taskSchemas } from '../src/schemas';
import { authService } from '../src/services';

const request = supertest(app);

const testUser: authSchemas.RegisterSchema = {
  email: 'taskuser@test.com',
  name: 'Task User',
  password: 'password'
};

const testTask: taskSchemas.CreateTaskSchema = {
  title: 'Test Task',
  description: 'Test Description',
  dueDate: new Date().toISOString(),
  priority: 'HIGH'
};

function cleanDatabase() {
  return prisma.$transaction([
    prisma.user.deleteMany({
      where: { email: testUser.email }
    }),
    prisma.task.deleteMany({
      where: {
        title: { in: [testTask.title] },
        user: { email: testUser.email }
      }
    })
  ]);
}

describe('Task Endpoints', () => {
  let token: string;
  let taskId: string;
  beforeAll(async () => {
    await cleanDatabase();
    await authService.createUser(Object.assign({}, testUser));
    const res = await request
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password });
    token = res.body.token;
  });

  afterAll(async () => {
    await cleanDatabase();
    await prisma.$disconnect();
  });

  it('POST /api/tasks should create a task', (done) => {
    request
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(testTask)
      .expect(201)
      .expect('Content-Type', /application\/json/) // make sure content type is json
      .expect(function (res) {
        assert(res.body.hasOwnProperty('data'));
        assert(res.body.hasOwnProperty('msg'));
      })
      .end(function (err, res) {
        if (err) throw err;
        taskId = res.body.data.id;
        done();
      });
  });

  it('PUT /api/tasks/:taskId should update a task', (done) => {
    const description = 'New updated description';
    request
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...testTask, description, status: 'IN_PROGRESS' })
      .expect(200)
      .expect('Content-Type', /application\/json/) // make sure content type is json
      .expect(function (res) {
        assert(res.body.hasOwnProperty('data'));
        assert(res.body.hasOwnProperty('msg'));
        assert(res.body.data.description === description);
      })
      .end(function (err) {
        if (err) throw err;
        done();
      });
  });

  it('GET /api/tasks should get all tasks', (done) => {
    request
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/) // make sure content type is json
      .expect(function (res) {
        assert(res.body.hasOwnProperty('data'));
        assert(res.body.hasOwnProperty('msg'));
        assert(res.body.data.length > 0);
      })
      .end(function (err) {
        if (err) throw err;
        done();
      });
  });

  it('GET /api/tasks/:taskId should get a task', (done) => {
    request
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/) // make sure content type is json
      .expect(function (res) {
        assert(res.body.hasOwnProperty('data'));
        assert(res.body.hasOwnProperty('msg'));
        assert(res.body.data.id === taskId);
      })
      .end(function (err) {
        if (err) throw err;
        done();
      });
  });

  it('DELETE /api/tasks/:taskId should delete a task', (done) => {
    request
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/) // make sure content type is json
      .expect(function (res) {
        assert(res.body.hasOwnProperty('data'));
        assert(res.body.hasOwnProperty('msg'));
        assert(res.body.data.id === taskId);
      })
      .end(function (err) {
        if (err) throw err;
        done();
      });
  });
});
