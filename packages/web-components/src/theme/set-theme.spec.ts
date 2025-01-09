import { expect, test } from '../../test/playwright/index.js';

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
  test('should set and uset global tokens', async ({ fastPage, page }) => {
    const html = page.locator('html');
    const body = page.locator('body');
    const div = page.locator('div');

    await fastPage.setTemplate(`<div></div>`);

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

  test('should set and unset tokens in a light DOM subtree', async ({ fastPage, page }) => {
    const div = page.locator('div');
    const span = page.locator('span');

    await fastPage.setTemplate(`<div><span></span></div>`);

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

  test('should set and unset tokens in a shadow DOM tree', async ({ fastPage, page }) => {
    const div = page.locator('div');
    const span = page.locator('span');

    await fastPage.setTemplate('<div></div>');
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

  test('should not inherit token values from light DOM subtree once tokens are set in the shadow DOM tree', async ({
    fastPage,
    page,
  }) => {
    const parent = page.locator('div.parent');
    const host = page.locator('div.host');
    const span = host.locator('span');

    await fastPage.setTemplate(/* html */ `
      <div class="parent">
        <div class="host"></div>
      </div>
    `);
    await host.evaluate((node: HTMLDivElement) => {
      node.attachShadow({ mode: 'open' });
      node.shadowRoot!.innerHTML = '<span></span>';
    });

    await parent.evaluate((node: HTMLDivElement, theme) => {
      window.setTheme(theme, node);
    }, theme1);

    await host.evaluate((node: HTMLDivElement, theme) => {
      window.setTheme(theme, node);
    }, theme2);

    await expect(parent).toHaveCSS('--foo', 'foo1');
    await expect(parent).toHaveCSS('--bar', 'bar1');
    await expect(host).toHaveCSS('--foo', 'foo2');
    await expect(host).toHaveCSS('--bar', 'bar2');
    await expect(span).toHaveCSS('--foo', 'foo2');
    await expect(span).toHaveCSS('--bar', 'bar2');

    await parent.evaluate((node: HTMLDivElement) => {
      window.setTheme(null, node);
    });

    await expect(parent).toHaveCSS('--foo', '');
    await expect(parent).toHaveCSS('--bar', '');
    await expect(host).toHaveCSS('--foo', 'foo2');
    await expect(host).toHaveCSS('--bar', 'bar2');
    await expect(span).toHaveCSS('--foo', 'foo2');
    await expect(span).toHaveCSS('--bar', 'bar2');
  });
});
