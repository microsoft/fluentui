import { test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';
import type { Label } from './label.js';

test.describe('Label', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-label--label'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-label'));
  });

  test('should reflect size attribute', async ({ page }) => {
    const element = page.locator('fluent-label');

    await element.evaluate((node: Label) => {
      node.size = 'small';
    });

    await expect(element).toHaveAttribute('size', 'small');

    await expect(element).toHaveJSProperty('size', 'small');

    await expect(element).toHaveCustomState('small');

    await element.evaluate((node: Label) => {
      node.size = 'medium';
    });

    await expect(element).toHaveAttribute('size', 'medium');

    await expect(element).toHaveJSProperty('size', 'medium');

    await expect(element).not.toHaveCustomState('small');

    await expect(element).toHaveCustomState('medium');

    await element.evaluate((node: Label) => {
      node.size = 'large';
    });

    await expect(element).toHaveAttribute('size', 'large');

    await expect(element).toHaveJSProperty('size', 'large');

    await expect(element).not.toHaveCustomState('medium');

    await expect(element).toHaveCustomState('large');
  });

  test('should reflect weight attribute', async ({ page }) => {
    const element = page.locator('fluent-label');

    await element.evaluate((node: Label) => {
      node.weight = 'regular';
    });

    await expect(element).toHaveAttribute('weight', 'regular');

    await expect(element).toHaveJSProperty('weight', 'regular');

    await expect(element).toHaveCustomState('regular');

    await element.evaluate((node: Label) => {
      node.weight = 'semibold';
    });

    await expect(element).toHaveAttribute('weight', 'semibold');

    await expect(element).toHaveJSProperty('weight', 'semibold');

    await expect(element).not.toHaveCustomState('regular');

    await expect(element).toHaveCustomState('semibold');
  });

  test('should reflect disabled attribute', async ({ page }) => {
    const element = page.locator('fluent-label');

    await page.setContent(/* html */ `
        <fluent-label disabled>Label</fluent-label>
    `);

    await expect(element).toHaveAttribute('disabled', '');

    await expect(element).toHaveJSProperty('disabled', true);

    await expect(element).toHaveCustomState('disabled');
  });

  test('should reflect required attribute and show asterisk', async ({ page }) => {
    const element = page.locator('fluent-label');

    await page.setContent(/* html */ `
        <fluent-label required>Label</fluent-label>
    `);

    const asterisk = element.locator('span.asterisk');

    await expect(element).toHaveAttribute('required', '');

    await expect(element).toHaveJSProperty('required', true);

    await expect(asterisk).toBeVisible();
  });

  test('should hide asterisk when required attribute is not set', async ({ page }) => {
    const element = page.locator('fluent-label');

    await page.setContent(/* html */ `
        <fluent-label>Label</fluent-label>
    `);

    const asterisk = element.locator('span.asterisk');
    await expect(element).not.toHaveAttribute('required', '');

    await expect(element).toHaveJSProperty('required', false);

    await expect(asterisk).toBeHidden();
  });
});
