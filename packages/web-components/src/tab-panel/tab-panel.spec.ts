import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

test.describe('TabPanel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-tabs--tabs-default'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-tab-panel'));
  });

  test('should have a role of `tabpanel`', async ({ page }) => {
    const element = page.locator('fluent-tab-panel');

    await page.setContent(/* html */ `
        <fluent-tab-panel></fluent-tab-panel>
    `);

    await expect(element).toHaveAttribute('role', 'tabpanel');
  });

  test('should have a slot attribute of `tabpanel`', async ({ page }) => {
    const element = page.locator('fluent-tab-panel');

    await page.setContent(/* html */ `
        <fluent-tab-panel></fluent-tab-panel>
    `);

    await expect(element).toHaveAttribute('slot', 'tabpanel');
  });
});
