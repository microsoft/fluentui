import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

import type { setTheme as _setTheme, Theme } from './set-theme.js';

const theme1: Theme = {
  foo: 'foo1',
  bar: 'bar1',
};

const theme2: Theme = {
  foo: 'foo2',
  bar: 'bar2',
};

declare global {
  interface Window {
    setTheme: typeof _setTheme;
  }
}

test.describe('setTheme()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('theme-settheme--set-theme'));
  });

  test('should set and uset global tokens', async ({ page }) => {
    const html = page.locator('html');
    const body = page.locator('body');
    const div = page.locator('div');

    await page.setContent(`<div></div>`);

    await page.evaluate(theme => {
      window.setTheme(theme);
    }, theme1);

    await expect(html).toHaveCSS('--foo', 'foo1');
    await expect(html).toHaveCSS('--bar', 'bar1');
    await expect(body).toHaveCSS('--foo', 'foo1');
    await expect(body).toHaveCSS('--bar', 'bar1');
    await expect(div).toHaveCSS('--foo', 'foo1');
    await expect(div).toHaveCSS('--bar', 'bar1');

    await page.evaluate(theme => {
      window.setTheme(theme);
    }, theme2);

    await expect(html).toHaveCSS('--foo', 'foo2');
    await expect(html).toHaveCSS('--bar', 'bar2');
    await expect(body).toHaveCSS('--foo', 'foo2');
    await expect(body).toHaveCSS('--bar', 'bar2');
    await expect(div).toHaveCSS('--foo', 'foo2');
    await expect(div).toHaveCSS('--bar', 'bar2');

    await page.evaluate(() => {
      window.setTheme(null);
    });

    // Revert the values back to the registered initial values.
    await expect(html).toHaveCSS('--foo', '');
    await expect(html).toHaveCSS('--bar', '');
    await expect(body).toHaveCSS('--foo', '');
    await expect(body).toHaveCSS('--bar', '');
    await expect(div).toHaveCSS('--foo', '');
    await expect(div).toHaveCSS('--bar', '');
  });

  test('should set and unset tokens in a light DOM subtree', async ({ page }) => {
    const div = page.locator('div');
    const span = page.locator('span');

    await page.setContent(`<div><span></span></div>`);

    await page.evaluate(theme => {
      window.setTheme(theme);
    }, theme1);

    await expect(div).toHaveCSS('--foo', 'foo1');
    await expect(div).toHaveCSS('--bar', 'bar1');
    await expect(span).toHaveCSS('--foo', 'foo1');
    await expect(span).toHaveCSS('--bar', 'bar1');

    await div.evaluate((node: HTMLDivElement, theme) => {
      window.setTheme(theme, node);
    }, theme2);

    await expect(div).toHaveCSS('--foo', 'foo2');
    await expect(div).toHaveCSS('--bar', 'bar2');
    await expect(span).toHaveCSS('--foo', 'foo2');
    await expect(span).toHaveCSS('--bar', 'bar2');

    await div.evaluate((node: HTMLDivElement) => {
      window.setTheme(null, node);
    });

    await expect(div).toHaveCSS('--foo', 'foo1');
    await expect(div).toHaveCSS('--bar', 'bar1');
    await expect(span).toHaveCSS('--foo', 'foo1');
    await expect(span).toHaveCSS('--bar', 'bar1');
  });

  test('should set and unset tokens in a shadow DOM tree', async ({ page }) => {
    const div = page.locator('div');
    const span = page.locator('span');

    // Using Declarative Shadow DOM with `page.setContent()` doesn’t work in Firefox.
    await page.setContent('<div></div>');
    await div.evaluate((node: HTMLDivElement) => {
     node.attachShadow({ mode: 'open' });
     node.shadowRoot!.innerHTML = '<span></span>';
    });

    await page.evaluate(theme => {
      window.setTheme(theme);
    }, theme1);

    await expect(div).toHaveCSS('--foo', 'foo1');
    await expect(div).toHaveCSS('--bar', 'bar1');
    await expect(span).toHaveCSS('--foo', 'foo1');
    await expect(span).toHaveCSS('--bar', 'bar1');

    await div.evaluate((node: HTMLDivElement, theme) => {
      window.setTheme(theme, node);
    }, theme2);

    await expect(div).toHaveCSS('--foo', 'foo2');
    await expect(div).toHaveCSS('--bar', 'bar2');
    await expect(span).toHaveCSS('--foo', 'foo2');
    await expect(span).toHaveCSS('--bar', 'bar2');

    await div.evaluate((node: HTMLDivElement) => {
      window.setTheme(null, node);
    });

    await expect(div).toHaveCSS('--foo', 'foo1');
    await expect(div).toHaveCSS('--bar', 'bar1');
    await expect(span).toHaveCSS('--foo', 'foo1');
    await expect(span).toHaveCSS('--bar', 'bar1');
  });
});
