import { test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

test.describe('Split Button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-button-button--split-button'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-split-button'));
  });
});
