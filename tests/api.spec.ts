import { test, expect, request } from '@playwright/test';
import { TestData } from '../src/data/Testdata';

const BASE = process.env.BASE_URL || 'https://automationexercise.com';

test.describe('API – Profile Flow Endpoint Validation', () => {
  let ctx: Awaited<ReturnType<typeof request.newContext>>;

  test.beforeAll(async () => {
    ctx = await request.newContext({ baseURL: BASE });
  });

  test.afterAll(async () => {
    await ctx.dispose();
  });

  test('GET /api/productsList returns 200', async () => {
    const res = await ctx.get('/api/productsList');
    expect(res.status()).toBe(200);
  });

  test('POST /api/verifyLogin – valid credentials returns responseCode 200', async () => {
    const res = await ctx.post('/api/verifyLogin', {
      form: { email: TestData.user.email, password: TestData.user.password },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.responseCode).toBe(200);
  });

  test('POST /api/verifyLogin – invalid credentials returns responseCode 404', async () => {
    const res = await ctx.post('/api/verifyLogin', {
      form: { email: TestData.invalidUser.email, password: TestData.invalidUser.password },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.responseCode).toBe(404);
  });

  test('GET /api/getUserDetailByEmail returns responseCode 200', async () => {
    const res = await ctx.get(`/api/getUserDetailByEmail?email=${encodeURIComponent(TestData.user.email)}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.responseCode).toBe(200);
  });

  test('PUT /api/updateAccount returns responseCode 200', async () => {
    const res = await ctx.put('/api/updateAccount', {
      form: {
        ...TestData.updateAccount,
        email: TestData.user.email,
        password: TestData.user.password,
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.responseCode).toBe(200);
  });

  test('DELETE /api/deleteAccount returns 200', async () => {
    const res = await ctx.delete('/api/deleteAccount', {
      form: { email: TestData.disposableUser.email, password: TestData.disposableUser.password },
    });
    expect(res.status()).toBe(200);
  });
});
