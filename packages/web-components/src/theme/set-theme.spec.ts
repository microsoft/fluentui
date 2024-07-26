import { expect, test } from '@playwright/test';
import type { JSHandle, Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

import { setTheme, type Theme } from './set-theme.js';

const theme1: Theme = {
  '--foo': 'foo1',
  '--bar': 'bar2',
};

const theme2: Theme = {
  '--foo': 'foo1',
  '--bar': 'bar2',
};

test.describe('setTheme()', () => {
  let page: Page;
  let root: Locator;
  let local: Locator;
  let shadow: Locator;
  let shadowChild: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.exposeFunction('setTheme', setTheme);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should set tokens with the correct custom property values', async () => {
    await page.setContent(`
      <script>
        setTheme(${JSON.stringify(theme1)});
      </script>
    `);
    const body = page.locator('body');
    await expect(body).toHaveCSS('--foo', 'foo1');
  });
});
