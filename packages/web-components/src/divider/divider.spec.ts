import { test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';
import type { Divider } from './divider.js';

test.describe('Divider', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-divider--divider'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-divider'));
  });

  test('should set a default `role` attribute of "separator"', async ({ page }) => {
    const element = page.locator('fluent-divider');

    await page.setContent(/* html */ `
      <fluent-divider></fluent-divider>
    `);

    await expect(element).toHaveJSProperty('elementInternals.role', 'separator');
  });

  test('should set the `role` attribute equal to the role provided', async ({ page }) => {
    const element = page.locator('fluent-divider');

    await page.setContent(/* html */ `
      <fluent-divider role="presentation"></fluent-divider>
    `);

    await expect(element).toHaveJSProperty('elementInternals.role', 'presentation');

    await element.evaluate((node: Divider) => {
      node.role = 'separator';
    });

    await expect(element).toHaveJSProperty('elementInternals.role', 'separator');
  });

  test('should set the `aria-orientation` attribute equal to the `orientation` value', async ({ page }) => {
    const element = page.locator('fluent-divider');

    await page.setContent(/* html */ `
      <fluent-divider orientation="vertical"></fluent-divider>
    `);

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'vertical');

    await element.evaluate((node: Divider) => {
      node.orientation = 'horizontal';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');
  });

  test('should NOT set the `aria-orientation` property equal to `orientation` value if the `role` is presentational', async ({
    page,
  }) => {
    const element = page.locator('fluent-divider');

    await page.setContent(/* html */ `
      <fluent-divider orientation="vertical"></fluent-divider>
    `);

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'vertical');

    await element.evaluate((node: Divider) => {
      node.role = 'presentation';
    });

    await expect(element).not.toHaveJSProperty('elementInternals.ariaOrientation', 'vertical');
    await expect(element).not.toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');
  });

  test('should add a custom state matching the `orientation` attribute when provided', async ({ page }) => {
    const element = page.locator('fluent-divider');

    await element.evaluate((node: Divider) => {
      node.orientation = 'vertical';
    });

    await expect(element).toHaveCustomState('vertical');

    await element.evaluate((node: Divider) => {
      node.orientation = 'horizontal';
    });

    await expect(element).not.toHaveCustomState('vertical');

    await expect(element).toHaveCustomState('horizontal');
  });

  test('should initialize to the provided value attribute if set post-connection', async ({ page }) => {
    const element = page.locator('fluent-divider');

    await page.setContent(/* html */ `
      <fluent-divider></fluent-divider>
    `);

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
      node.appearance = undefined;
    });

    await expect(element).not.toHaveJSProperty('appearance', 'default');

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

  test('should add a custom state matching the `appearance` attribute when provided', async ({ page }) => {
    const element = page.locator('fluent-divider');

    await element.evaluate((node: Divider) => {
      node.appearance = 'strong';
    });

    await expect(element).toHaveCustomState('strong');

    await element.evaluate((node: Divider) => {
      node.appearance = 'brand';
    });

    await expect(element).not.toHaveCustomState('strong');

    await expect(element).toHaveCustomState('brand');

    await element.evaluate((node: Divider) => {
      node.appearance = 'subtle';
    });

    await expect(element).not.toHaveCustomState('brand');

    await expect(element).toHaveCustomState('subtle');
  });

  test('should add a custom state of `inset` when the value is true', async ({ page }) => {
    const element = page.locator('fluent-divider');

    await element.evaluate((node: Divider) => {
      node.inset = true;
    });

    await expect(element).toHaveCustomState('inset');

    await element.evaluate((node: Divider) => {
      node.inset = false;
    });

    await expect(element).not.toHaveCustomState('inset');
  });

  test('should add a custom state matching the `align-content` attribute value when provided', async ({ page }) => {
    const element = page.locator('fluent-divider');

    await element.evaluate((node: Divider) => {
      node.alignContent = 'start';
    });

    await expect(element).toHaveCustomState('align-start');

    await element.evaluate((node: Divider) => {
      node.alignContent = 'end';
    });

    await expect(element).not.toHaveCustomState('align-start');

    await expect(element).toHaveCustomState('align-end');

    await element.evaluate((node: Divider) => {
      node.alignContent = undefined;
    });

    await expect(element).not.toHaveCustomState('align-start');

    await expect(element).not.toHaveCustomState('align-end');
  });
});
