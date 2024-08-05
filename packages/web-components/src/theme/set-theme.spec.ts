import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

import type { setTheme, Theme } from './set-theme.js';

const theme1: Theme = {
  foo: 'foo1',
  bar: 'bar2',
};

const theme2: Theme = {
  foo: 'foo1',
  bar: 'bar2',
};

declare global {
  interface Window {
    setTheme: typeof setTheme;
  }
}

test.describe('setTheme()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('theme-settheme--set-theme'));
    await page.setContent(`<div></div>`);
  });

  test('should set tokens with the correct custom property values', async ({ page }) => {
    await page.evaluate(theme => window.setTheme(theme), theme1);
    const val = await page.evaluate(() => getComputedStyle(document.body).getPropertyValue('--foo'));
    expect(val).toBe('foo1');
  });
});
