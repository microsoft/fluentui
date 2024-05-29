import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

test.describe('Dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-dialog-dialog--default'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-button'));
  });

  test('should open and close dialog', async ({ page }) => {
    const openButton = await page.$('fluent-button');
    await openButton?.click();

    const dialog = await page.$('fluent-dialog');
    expect(dialog).not.toBeNull();

    const closeButton = await dialog?.$('fluent-button');
    await closeButton?.click();

    await expect(page.locator('fluent-dialog')).toBeHidden();
  });
});
