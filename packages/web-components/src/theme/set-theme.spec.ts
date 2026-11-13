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

test.skip(
  ({ ssr }) => ssr === true,
  'setTheme tests are the same in SSR and CSR, so they are only run in CSR to avoid unnecessary test runs.',
);

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

  test('should share one style sheet for element-scoped themes with equal tokens', async ({ fastPage, page }) => {
    const a = page.locator('div.a');
    const b = page.locator('div.b');

    await fastPage.setTemplate(/* html */ `
      <div class="parent">
        <div class="a"></div>
        <div class="b"></div>
      </div>
    `);

    const supportsScopedTheme = await page.evaluate(() => 'adoptedStyleSheets' in document && 'CSSScopeRule' in window);
    test.skip(!supportsScopedTheme, 'Element-scoped themes require CSS `@scope` and adopted style sheets.');

    const result = await page.evaluate(() => {
      const a = document.querySelector<HTMLDivElement>('div.a')!;
      const b = document.querySelector<HTMLDivElement>('div.b')!;
      const styleSheetCountBefore = document.adoptedStyleSheets.length;

      // Distinct objects with equal tokens should map to the same theme.
      window.setTheme({ foo: 'foo1', bar: 'bar1' }, a);
      const styleSheetCountAfterFirstTheme = document.adoptedStyleSheets.length;

      // Re-applying equal tokens from new objects must not add style sheets.
      for (let i = 0; i < 10; i++) {
        window.setTheme({ foo: 'foo1', bar: 'bar1' }, b);
      }

      return {
        styleSheetCountBefore,
        styleSheetCountAfterFirstTheme,
        styleSheetCountAfterRepeatedThemes: document.adoptedStyleSheets.length,
        firstThemeKey: a.dataset.fluentTheme,
        secondThemeKey: b.dataset.fluentTheme,
      };
    });

    expect(result.firstThemeKey).toBeTruthy();
    expect(result.secondThemeKey).toBe(result.firstThemeKey);
    expect(result.styleSheetCountAfterFirstTheme).toBe(result.styleSheetCountBefore + 1);
    expect(result.styleSheetCountAfterRepeatedThemes).toBe(result.styleSheetCountAfterFirstTheme);

    await expect(a).toHaveCSS('--foo', 'foo1');
    await expect(a).toHaveCSS('--bar', 'bar1');
    await expect(b).toHaveCSS('--foo', 'foo1');
    await expect(b).toHaveCSS('--bar', 'bar1');
  });

  test('should use separate style sheets for element-scoped themes with different tokens', async ({
    fastPage,
    page,
  }) => {
    const a = page.locator('div.a');
    const b = page.locator('div.b');

    await fastPage.setTemplate(/* html */ `
      <div class="parent">
        <div class="a"></div>
        <div class="b"></div>
      </div>
    `);

    const supportsScopedTheme = await page.evaluate(() => 'adoptedStyleSheets' in document && 'CSSScopeRule' in window);
    test.skip(!supportsScopedTheme, 'Element-scoped themes require CSS `@scope` and adopted style sheets.');

    const result = await page.evaluate(() => {
      const a = document.querySelector<HTMLDivElement>('div.a')!;
      const b = document.querySelector<HTMLDivElement>('div.b')!;
      const styleSheetCountBefore = document.adoptedStyleSheets.length;

      window.setTheme({ foo: 'foo1' }, a);
      window.setTheme({ foo: 'foo2' }, b);

      return {
        styleSheetCountBefore,
        styleSheetCountAfterThemes: document.adoptedStyleSheets.length,
        firstThemeKey: a.dataset.fluentTheme,
        secondThemeKey: b.dataset.fluentTheme,
      };
    });

    expect(result.firstThemeKey).toBeTruthy();
    expect(result.secondThemeKey).toBeTruthy();
    expect(result.secondThemeKey).not.toBe(result.firstThemeKey);
    expect(result.styleSheetCountAfterThemes).toBe(result.styleSheetCountBefore + 2);

    await expect(a).toHaveCSS('--foo', 'foo1');
    await expect(b).toHaveCSS('--foo', 'foo2');
  });

  test('sanitizes token values', async ({ fastPage, page }) => {
    const body = page.locator('body');

    await fastPage.setTemplate();

    await page.evaluate(() => {
      window.setTheme({
        foo: 'red; } body { font-size: 10px; } /* ',
        'bar: blue;} body { font-size': '10px',
      });
    });

    await expect(body).not.toHaveCSS('--foo', 'red');
    await expect(body).not.toHaveCSS('--bar', 'blue');
    await expect(body).not.toHaveCSS('font-size', '10px');
  });
});
