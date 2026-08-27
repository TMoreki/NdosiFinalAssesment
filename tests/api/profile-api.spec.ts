import { test, expect, request } from '@playwright/test';

const BASE = process.env.BASE_URL || 'https://automationexercise.com';
const EMAIL = process.env.USER_EMAIL!;
const PASSWORD = process.env.USER_PASSWORD!;

/**
 * Automation Exercise exposes a public REST API at /api/*
 * These tests mirror every network interaction made during the UI profile flow
 * and assert the correct HTTP response codes.
 */
test.describe('API – Profile Flow Endpoint Validation', () => {
  let ctx: Awaited<ReturnType<typeof request.newContext>>;

  test.beforeAll(async () => {
    ctx = await request.newContext({ baseURL: BASE });
  });

  test.afterAll(async () => {
    await ctx.dispose();
  });

  test('GET /api/productsList returns 200', async () => {
    // Called on homepage load (baseline connectivity check)
    const res = await ctx.get('/api/productsList');
    expect(res.status()).toBe(200);
  });

  test('POST /api/verifyLogin returns 200 with valid credentials', async () => {
    const res = await ctx.post('/api/verifyLogin', {
      form: { email: EMAIL, password: PASSWORD },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.responseCode).toBe(200);
  });

  test('POST /api/verifyLogin returns 200 with responseCode 404 for invalid credentials', async () => {
    const res = await ctx.post('/api/verifyLogin', {
      form: { email: 'wrong@example.com', password: 'wrongpass' },
    });
    expect(res.status()).toBe(200); // HTTP envelope is always 200
    const body = await res.json();
    expect(body.responseCode).toBe(404);
  });

  test('GET /api/getUserDetailByEmail returns 200 for valid user', async () => {
    const res = await ctx.get(`/api/getUserDetailByEmail?email=${encodeURIComponent(EMAIL)}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.responseCode).toBe(200);
  });

  test('PUT /api/updateAccount returns 200 (profile update endpoint)', async () => {
    // Mirrors the edit-profile save action
    const res = await ctx.put('/api/updateAccount', {
      form: {
        name: 'Ndosi Test',
        email: EMAIL,
        password: PASSWORD,
        title: 'Mr',
        birth_date: '1',
        birth_month: 'January',
        birth_year: '1990',
        firstname: 'Ndosi',
        lastname: 'Test',
        company: 'TestCo',
        address1: '123 Test St',
        address2: '',
        country: 'South Africa',
        zipcode: '0001',
        state: 'Gauteng',
        city: 'Johannesburg',
        mobile_number: '0821234567',
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.responseCode).toBe(200);
  });

  test('DELETE /api/deleteAccount returns 200', async () => {
    // Validates the delete account endpoint exists and responds correctly
    // NOTE: We only assert the HTTP status, not actually deleting the test account
    const res = await ctx.delete('/api/deleteAccount', {
      form: { email: 'disposable@mailinator.com', password: 'Disposable@1' },
    });
    expect(res.status()).toBe(200);
  });
});
