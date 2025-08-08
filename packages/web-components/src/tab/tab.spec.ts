import { expect, test } from '../../test/playwright/index.js';
import type { Tab } from './tab.js';

test.describe('Tab', () => {
  test.use({ tagName: 'fluent-tab' });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-tab');
    });

    expect(hasError).toBe(false);
  });

  test('should set defaults', async ({ fastPage }) => {
    const { element } = fastPage;

    await test.step('should have a role of `tab`', async () => {
      await expect(element).toHaveAttribute('role', 'tab');
    });

    await test.step('should have a slot attribute of `tab`', async () => {
      await expect(element).toHaveAttribute('slot', 'tab');
    });
  });

  test('should set the `aria-disabled` attribute when `disabled` is true', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).not.toHaveAttribute('aria-disabled');

    await element.evaluate((node: Tab) => {
      node.disabled = true;
    });

    await expect(element).toHaveAttribute('aria-disabled', 'true');
  });
});
