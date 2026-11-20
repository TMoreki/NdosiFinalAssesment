# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: profile.spec.ts >> Profile Picture Update >> should login, navigate to profile and upload a new profile picture
- Location: tests/profile.spec.ts:5:7

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/#practice", waiting until "networkidle"

```

# Test source

```ts
  1  | import { Page, expect } from '@playwright/test';
  2  | import path from 'path';
  3  | import { TestData } from '../data/Testdata';
  4  | 
  5  | export class BasePage {
  6  |   constructor(protected page: Page) {}
  7  | 
  8  |   protected get menuButton() {
  9  |     return this.page.locator('button.user-pill');
  10 |   }
  11 | 
  12 |   async goto(hash: string = '#practice') {
> 13 |     await this.page.goto(`${TestData.baseUrl}/${hash}`, { waitUntil: 'networkidle' });
     |                     ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  14 |   }
  15 | 
  16 |   async waitForHash(hash: string, timeout = 30000) {
  17 |     await this.page.waitForFunction(
  18 |       (h) => window.location.hash === h,
  19 |       hash,
  20 |       { timeout }
  21 |     );
  22 |   }
  23 | 
  24 |   async waitForSave(ms = 3000) {
  25 |     await this.page.waitForTimeout(ms);
  26 |   }
  27 | 
  28 |   async screenshot(name: string) {
  29 |     await this.page.screenshot({ path: path.join('test-results', `${name}.png`) });
  30 |   }
  31 | 
  32 |   async assertMenuVisible() {
  33 |     await expect(this.menuButton).toContainText('Menu▼', { timeout: 15000 });
  34 |   }
  35 | }
  36 | 
```