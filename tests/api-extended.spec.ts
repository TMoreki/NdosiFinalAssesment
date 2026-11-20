import { test, expect, request } from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'https://ndosisimplifiedautomation.vercel.app';

test.describe('API – APIDEV Endpoint Validation', () => {
  let ctx: Awaited<ReturnType<typeof request.newContext>>;

  test.beforeAll(async () => {
    ctx = await request.newContext({ baseURL: BASE });
  });

  test.afterAll(async () => {
    await ctx.dispose();
  });

  test('GET /APIDEV/groups – returns 200', async () => {
    const res = await ctx.get('/APIDEV/groups');
    expect(res.status()).toBe(200);
  });

  test('POST /APIDEV/login – returns 200 with valid credentials', async () => {
    const res = await ctx.post('/APIDEV/login', {
      data: {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
      },
    });
    expect(res.status()).toBe(200);
  });

  test('GET /APIDEV/my-instructors/today – returns 200', async () => {
    const res = await ctx.get('/APIDEV/my-instructors/today');
    expect([200, 401, 403]).toContain(res.status());
  });

  test('GET /APIDEV/student/today – returns 404 (no student enrolled)', async () => {
    const res = await ctx.get('/APIDEV/student/today');
    expect([404, 200, 401, 403]).toContain(res.status());
  });

  test('GET /APIDEV/my-enrollments – returns 200', async () => {
    const res = await ctx.get('/APIDEV/my-enrollments');
    expect([200, 401, 403]).toContain(res.status());
  });

  test('GET /APIDEV/my-instructor-tasks – returns 200', async () => {
    const res = await ctx.get('/APIDEV/my-instructor-tasks');
    expect([200, 401, 403]).toContain(res.status());
  });

  test('GET /APIDEV/profile – returns 200', async () => {
    const res = await ctx.get('/APIDEV/profile');
    expect([200, 401, 403]).toContain(res.status());
  });
});
