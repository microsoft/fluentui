import { expect, test } from '../../test/playwright/index.js';
import type { Label } from './label.js';
import { tagName } from './label.options.js';

test.describe('Label', () => {
  test.use({
    tagName,
    innerHTML: 'Label',
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(tagName => {
      document.createElement(tagName);
    }, tagName);

    expect(hasError).toBe(false);
  });

  test('should set the `required` property to match the `required` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { required: true } });

    await expect(element).toHaveAttribute('required');

    await expect(element).toHaveJSProperty('required', true);

    await test.step('should display an asterisk when the `required` attribute is set', async () => {
      const asterisk = element.locator('span.asterisk');

      await expect(asterisk).toBeVisible();
    });

    await element.evaluate((node: Label) => {
      node.required = false;
    });

    await expect(element).not.toHaveAttribute('required');

    await expect(element).toHaveJSProperty('required', false);

    await test.step('should NOT display an asterisk when the `required` attribute is NOT set', async () => {
      const asterisk = element.locator('span.asterisk');

      await expect(asterisk).toBeHidden();
    });
  });
});
