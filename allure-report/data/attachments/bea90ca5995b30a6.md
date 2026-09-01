# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.ts >> API – Endpoint Validation (UI Flow Endpoints) >> GET /static/media/Nta%20Logo%20fnl.d253f67aeddc87f99822.png – media asset returns 200
- Location: tests/api.spec.ts:37:7

# Error details

```
TypeError: apiRequestContext.get: Invalid URL
```

# Test source

```ts
  1  | import { test, expect, request } from '@playwright/test';
  2  | import { TestData } from '../src/data/Testdata';
  3  | 
  4  | const BASE = TestData.baseUrl;
  5  | 
  6  | test.describe('API – Endpoint Validation (UI Flow Endpoints)', () => {
  7  |   let ctx: Awaited<ReturnType<typeof request.newContext>>;
  8  | 
  9  |   test.beforeAll(async () => {
  10 |     ctx = await request.newContext({ baseURL: BASE });
  11 |   });
  12 | 
  13 |   test.afterAll(async () => {
  14 |     await ctx.dispose();
  15 |   });
  16 | 
  17 |   test('GET / – home page returns 200', async () => {
  18 |     const res = await ctx.get('/');
  19 |     expect(res.status()).toBe(200);
  20 |   });
  21 | 
  22 |   test('GET /static/css/main.a444fab9.css – stylesheet returns 200', async () => {
  23 |     const res = await ctx.get('/static/css/main.a444fab9.css');
  24 |     expect(res.status()).toBe(200);
  25 |   });
  26 | 
  27 |   test('GET /static/js/main.295bba08.js – JS bundle returns 200', async () => {
  28 |     const res = await ctx.get('/static/js/main.295bba08.js');
  29 |     expect(res.status()).toBe(200);
  30 |   });
  31 | 
  32 |   test('GET /Nta%20Logo%20fnl.png – logo asset returns 200', async () => {
  33 |     const res = await ctx.get('/Nta%20Logo%20fnl.png');
  34 |     expect(res.status()).toBe(200);
  35 |   });
  36 | 
  37 |   test('GET /static/media/Nta%20Logo%20fnl.d253f67aeddc87f99822.png – media asset returns 200', async () => {
> 38 |     const res = await ctx.get('/static/media/Nta%20Logo%20fnl.d253f67aeddc87f99822.png');
     |                           ^ TypeError: apiRequestContext.get: Invalid URL
  39 |     expect(res.status()).toBe(200);
  40 |   });
  41 | });
  42 | 
```