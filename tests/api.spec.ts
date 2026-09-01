import { test, expect, request } from '@playwright/test';
import { TestData } from '../src/data/Testdata';

const BASE = TestData.baseUrl;

test.describe('API – Endpoint Validation (UI Flow Endpoints)', () => {
  let ctx: Awaited<ReturnType<typeof request.newContext>>;

  test.beforeAll(async () => {
    ctx = await request.newContext({ baseURL: BASE });
  });

  test.afterAll(async () => {
    await ctx.dispose();
  });

  test('GET / – home page returns 200', async () => {
    const res = await ctx.get('/');
    expect(res.status()).toBe(200);
  });

  test('GET /static/css/main.a444fab9.css – stylesheet returns 200', async () => {
    const res = await ctx.get('/static/css/main.a444fab9.css');
    expect(res.status()).toBe(200);
  });

  test('GET /static/js/main.295bba08.js – JS bundle returns 200', async () => {
    const res = await ctx.get('/static/js/main.295bba08.js');
    expect(res.status()).toBe(200);
  });

  test('GET /Nta%20Logo%20fnl.png – logo asset returns 200', async () => {
    const res = await ctx.get('/Nta%20Logo%20fnl.png');
    expect(res.status()).toBe(200);
  });

  test('GET /static/media/Nta%20Logo%20fnl.d253f67aeddc87f99822.png – media asset returns 200', async () => {
    const res = await ctx.get('/static/media/Nta%20Logo%20fnl.d253f67aeddc87f99822.png');
    expect(res.status()).toBe(200);
  });
});
