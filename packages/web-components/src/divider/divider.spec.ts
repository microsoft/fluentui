import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import { Divider } from './divider.js';

test.describe('Divider', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    await page.goto(fixtureURL('components-divider--divider'));

    element = page.locator('fluent-divider');

    root = page.locator('#root');
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should set a default `role` attribute of "separator"', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-divider></fluent-divider>
            `;
    });

    await expect(element).toHaveJSProperty('elementInternals.role', 'separator');
  });

  test('should set the `role` attribute equal to the role provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-divider role="presentation"></fluent-divider>
            `;
    });

    await expect(element).toHaveJSProperty('elementInternals.role', 'presentation');

    await element.evaluate((node: Divider) => {
      node.role = 'separator';
    });

    await expect(element).toHaveJSProperty('elementInternals.role', 'separator');
  });

  test('should set the `aria-orientation` attribute equal to the `orientation` value', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-divider orientation="vertical"></fluent-divider>
            `;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'vertical');

    await element.evaluate((node: Divider) => {
      node.orientation = 'horizontal';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');
  });

  test('should NOT set the `aria-orientation` property equal to `orientation` value if the `role` is presentational', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-divider orientation="vertical"></fluent-divider>
            `;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'vertical');

    await element.evaluate((node: Divider) => {
      node.role = 'presentation';
    });

    await expect(element).not.toHaveJSProperty('elementInternals.ariaOrientation', 'vertical');
    await expect(element).not.toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');
  });

  test('should add a custom state matching the `orientation` attribute when provided', async () => {
    await element.evaluate((node: Divider) => {
      node.orientation = 'vertical';
    });

    expect(await element.evaluate((node: Divider) => node.elementInternals.states.has('vertical'))).toBe(true);

    await element.evaluate((node: Divider) => {
      node.orientation = 'horizontal';
    });

    expect(await element.evaluate((node: Divider) => node.elementInternals.states.has('vertical'))).toBe(false);
    expect(await element.evaluate((node: Divider) => node.elementInternals.states.has('horizontal'))).toBe(true);
  });

  test('should initialize to the provided value attribute if set post-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
              <fluent-divider></fluent-divider>
          `;
    });

    await element.evaluate((node: Divider) => {
      node.alignContent = 'start';
    });

    await expect(element).toHaveJSProperty('alignContent', 'start');

    await element.evaluate((node: Divider) => {
      node.alignContent = 'center';
    });

    await expect(element).toHaveJSProperty('alignContent', 'center');

    await element.evaluate((node: Divider) => {
      node.alignContent = 'end';
    });

    await expect(element).toHaveJSProperty('alignContent', 'end');

    await element.evaluate((node: Divider) => {
      node.appearance = 'default';
    });

    await expect(element).toHaveJSProperty('appearance', 'default');

    await element.evaluate((node: Divider) => {
      node.appearance = 'strong';
    });

    await expect(element).toHaveJSProperty('appearance', 'strong');

    await element.evaluate((node: Divider) => {
      node.appearance = 'brand';
    });

    await expect(element).toHaveJSProperty('appearance', 'brand');
    await element.evaluate((node: Divider) => {
      node.appearance = 'subtle';
    });

    await expect(element).toHaveJSProperty('appearance', 'subtle');

    await element.evaluate((node: Divider) => {
      node.inset = true;
    });

    await expect(element).toHaveJSProperty('inset', true);
  });

  test('should add a custom state matching the `appearance` attribute when provided', async () => {
    await element.evaluate((node: Divider) => {
      node.appearance = 'strong';
    });

    expect(await element.evaluate((node: Divider) => node.elementInternals.states.has('strong'))).toBe(true);

    await element.evaluate((node: Divider) => {
      node.appearance = 'brand';
    });

    expect(await element.evaluate((node: Divider) => node.elementInternals.states.has('strong'))).toBe(false);
    expect(await element.evaluate((node: Divider) => node.elementInternals.states.has('brand'))).toBe(true);

    await element.evaluate((node: Divider) => {
      node.appearance = 'subtle';
    });

    expect(await element.evaluate((node: Divider) => node.elementInternals.states.has('brand'))).toBe(false);
    expect(await element.evaluate((node: Divider) => node.elementInternals.states.has('subtle'))).toBe(true);
  });

  test('should add a custom state of `inset` when the value is true', async () => {
    await element.evaluate((node: Divider) => {
      node.inset = true;
    });

    expect(await element.evaluate((node: Divider) => node.elementInternals.states.has('inset'))).toBe(true);

    await element.evaluate((node: Divider) => {
      node.inset = false;
    });

    expect(await element.evaluate((node: Divider) => node.elementInternals.states.has('inset'))).toBe(false);
  });

  test('should add a custom state matching the `align-content` attribute value when provided', async () => {
    await element.evaluate((node: Divider) => {
      node.alignContent = 'start';
    });

    expect(await element.evaluate((node: Divider) => node.elementInternals.states.has('align-start'))).toBe(true);

    await element.evaluate((node: Divider) => {
      node.alignContent = 'end';
    });

    expect(await element.evaluate((node: Divider) => node.elementInternals.states.has('align-start'))).toBe(false);
    expect(await element.evaluate((node: Divider) => node.elementInternals.states.has('align-end'))).toBe(true);

    await element.evaluate((node: Divider) => {
      node.alignContent = undefined;
    });

    expect(await element.evaluate((node: Divider) => node.elementInternals.states.has('align-start'))).toBe(false);
    expect(await element.evaluate((node: Divider) => node.elementInternals.states.has('align-end'))).toBe(false);
  });
});
