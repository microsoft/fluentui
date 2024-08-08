import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Spinner } from './spinner.js';
import { SpinnerAppearance, SpinnerSize } from './spinner.options.js';

test.describe('Spinner', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-spinner--spinner'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-spinner'));
  });

  for (const thisAppearance in SpinnerAppearance) {
    test(`should set and retrieve the \`appearance\` property correctly to ${thisAppearance}`, async ({ page }) => {
      const element = page.locator('fluent-spinner');

      await element.evaluate((node: Spinner, appearance) => {
        node.appearance = appearance;
      }, thisAppearance as SpinnerAppearance);

      await expect(element).toHaveJSProperty('appearance', thisAppearance);

      await test.step('should add a custom state matching the `appearance` attribute when provided', async () => {
        for (const appearance in SpinnerAppearance) {
          const hasState = await element.evaluate(
            (node, appearance) => node.matches(`:state(${appearance})`),
            appearance,
          );

          expect(hasState).toEqual(appearance === thisAppearance);
        }
      });
    });
  }

  for (const thisSize in SpinnerSize) {
    test(`should set and retrieve the \`size\` property correctly to ${thisSize}`, async ({ page }) => {
      const element = page.locator('fluent-spinner');

      await element.evaluate((node: Spinner, size) => {
        node.size = size;
      }, thisSize as SpinnerSize);

      await expect(element).toHaveJSProperty('size', thisSize);

      await test.step('should add a custom state matching the `appearance` attribute when provided', async () => {
        for (const size in SpinnerSize) {
          const hasState = await element.evaluate((node, size) => node.matches(`:state(${size})`), size);

          expect(hasState).toEqual(size === thisSize);
        }
      });
    });
  }
});
