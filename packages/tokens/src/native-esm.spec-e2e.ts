import { expect, test } from '@playwright/test';

import { webLightTheme } from './index';

test.describe('Native ESM', () => {
  test('should render UI divs including all webLightTheme colors', async ({ page }) => {
    await page.goto('test-esm.html');

    await expect(page).toHaveTitle('native ESM for @fluentui/tokens');
    await expect(page.locator('.root')).not.toBeEmpty();
    await expect(page.locator('.color-ramp')).toHaveCount(
      Object.keys(webLightTheme).filter(value => value.startsWith('color')).length,
    );
  });
});
