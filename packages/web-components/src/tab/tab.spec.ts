import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Tab } from './tab.js';

test.describe('Tab', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-tabs--tabs-default'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-tab'));
  });

  test('should have a role of `tab`', async ({ page }) => {
    const element = page.locator('fluent-tab').nth(0);

    await expect(element).toHaveAttribute('role', 'tab');
  });

  test('should have a slot attribute of `tab`', async ({ page }) => {
    const element = page.locator('fluent-tab').nth(0);

    await expect(element).toHaveAttribute('slot', 'tab');
  });

  test('should set the `aria-disabled` attribute when `disabled` is true', async ({ page }) => {
    const element = page.locator('fluent-tab').nth(0);

    await expect(element).not.toHaveAttribute('aria-disabled');

    await element.nth(0).evaluate((node: Tab) => {
      node.disabled = true;
    });

    await expect(element).toHaveAttribute('aria-disabled', 'true');

    await element.nth(0).evaluate((node: Tab) => {
      node.disabled = false;
    });

    await expect(element).toHaveAttribute('aria-disabled', 'false');
  });
});
