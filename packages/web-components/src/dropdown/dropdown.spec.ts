import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

test.describe('Dropdown', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-dropdown--dropdown'));

    await page.waitForFunction(() =>
      Promise.all([customElements.whenDefined('fluent-dropdown'), customElements.whenDefined('fluent-option')]),
    );
  });

  test('should render a dropdown', async ({ page }) => {
    const element = page.locator('fluent-dropdown');

    await page.setContent(/* html */ `<fluent-dropdown></fluent-dropdown>`);

    await expect(element).toHaveCount(1);
  });
});
