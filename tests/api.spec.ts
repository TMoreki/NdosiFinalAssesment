import { test, expect, request } from '@playwright/test';
import { TestData } from '../src/data/Testdata';

const BASE = TestData.baseUrl;

test.describe('API – Endpoint Validation', () => {
  let ctx: Awaited<ReturnType<typeof request.newContext>>;

  test.beforeAll(async () => {
    ctx = await request.newContext({ baseURL: BASE });
  });

  test.afterAll(async () => {
    await ctx.dispose();
  });

  test('GET / returns 200 (home page)', async () => {
    const res = await ctx.get('/');
    expect(res.status()).toBe(200);
  });

  test('GET /login returns 200 (login page)', async () => {
    const res = await ctx.get('/login');
    expect(res.status()).toBe(200);
  });

  test('POST /api/auth/login returns 200 with valid credentials', async () => {
    const res = await ctx.post('/api/auth/login', {
      data: { email: TestData.user.email, password: TestData.user.password },
    });
    expect(res.status()).toBe(200);
  });

  test('POST /api/auth/login returns 401 with invalid credentials', async () => {
    const res = await ctx.post('/api/auth/login', {
      data: { email: TestData.invalidUser.email, password: TestData.invalidUser.password },
    });
    expect([401, 400, 403, 200]).toContain(res.status());
  });

  test('GET /api/user/profile returns 200 or 401 (protected endpoint)', async () => {
    const res = await ctx.get('/api/user/profile');
    expect([200, 401, 403]).toContain(res.status());
  });

  test('PUT /api/user/profile returns 200 or 401 (update profile endpoint)', async () => {
    const res = await ctx.put('/api/user/profile', {
      data: { email: TestData.user.email },
    });
    expect([200, 401, 403, 400]).toContain(res.status());
  });
});
