import { test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';
import type { Spinner } from './spinner.js';
import { SpinnerAppearance, SpinnerSize } from './spinner.options.js';

test.describe('Spinner', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-spinner--default'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-spinner'));
  });

  for (const thisAppearance of Object.values(SpinnerAppearance)) {
    test(`should set and retrieve the \`appearance\` property correctly to ${thisAppearance}`, async ({ page }) => {
      const element = page.locator('fluent-spinner');

      await element.evaluate((node: Spinner, appearance) => {
        node.appearance = appearance;
      }, thisAppearance as SpinnerAppearance);

      await expect(element).toHaveJSProperty('appearance', thisAppearance);

      await test.step('should add a custom state matching the `appearance` attribute when provided', async () => {
        for (const appearance of Object.values(SpinnerAppearance)) {
          // eslint-disable-next-line playwright/no-conditional-in-test
          if (appearance === thisAppearance) {
            await expect(element).toHaveCustomState(appearance);
          } else {
            await expect(element).not.toHaveCustomState(appearance);
          }
        }
      });
    });
  }

  for (const thisSize of Object.values(SpinnerSize)) {
    test(`should set and retrieve the \`size\` property correctly to ${thisSize}`, async ({ page }) => {
      const element = page.locator('fluent-spinner');

      await element.evaluate((node: Spinner, size) => {
        node.size = size;
      }, thisSize as SpinnerSize);

      await expect(element).toHaveJSProperty('size', thisSize);

      await test.step('should add a custom state matching the `appearance` attribute when provided', async () => {
        for (const size of Object.values(SpinnerSize)) {
          // eslint-disable-next-line playwright/no-conditional-in-test
          if (size === thisSize) {
            await expect(element).toHaveCustomState(size);
          } else {
            await expect(element).not.toHaveCustomState(size);
          }
        }
      });
    });
  }
});
