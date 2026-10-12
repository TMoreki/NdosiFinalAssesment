# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.ts >> API – Endpoint Validation (UI Flow Endpoints) >> GET /static/js/main.295bba08.js – JS bundle returns 200
- Location: tests/api.spec.ts:26:7

# Error details

```
TypeError: apiRequestContext.get: Invalid URL
```

# Test source

```ts
  1  | import { test, expect, request } from '@playwright/test';
  2  | 
  3  | const BASE = process.env.BASE_URL ?? 'https://ndosisimplifiedautomation.vercel.app';
  4  | 
  5  | test.describe('API – Endpoint Validation (UI Flow Endpoints)', () => {
  6  |   let ctx: Awaited<ReturnType<typeof request.newContext>>;
  7  | 
  8  |   test.beforeAll(async () => {
  9  |     ctx = await request.newContext({ baseURL: BASE });
  10 |   });
  11 | 
  12 |   test.afterAll(async () => {
  13 |     await ctx.dispose();
  14 |   });
  15 | 
  16 |   test('GET / – home page returns 200', async () => {
  17 |     const res = await ctx.get('/');
  18 |     expect(res.status()).toBe(200);
  19 |   });
  20 | 
  21 |   test('GET /static/css/main.a444fab9.css – stylesheet returns 200', async () => {
  22 |     const res = await ctx.get('/static/css/main.a444fab9.css');
  23 |     expect(res.status()).toBe(200);
  24 |   });
  25 | 
  26 |   test('GET /static/js/main.295bba08.js – JS bundle returns 200', async () => {
> 27 |     const res = await ctx.get('/static/js/main.295bba08.js');
     |                           ^ TypeError: apiRequestContext.get: Invalid URL
  28 |     expect(res.status()).toBe(200);
  29 |   });
  30 | 
  31 |   test('GET /Nta%20Logo%20fnl.png – logo asset returns 200', async () => {
  32 |     const res = await ctx.get('/Nta%20Logo%20fnl.png');
  33 |     expect(res.status()).toBe(200);
  34 |   });
  35 | 
  36 |   test('GET /static/media/Nta%20Logo%20fnl.d253f67aeddc87f99822.png – media asset returns 200', async () => {
  37 |     const res = await ctx.get('/static/media/Nta%20Logo%20fnl.d253f67aeddc87f99822.png');
  38 |     expect(res.status()).toBe(200);
  39 |   });
  40 | });
  41 | 
```