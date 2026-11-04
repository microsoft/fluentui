import { expect, test } from '../../test/playwright/index.js';
import { tagName } from './spinner.options.js';

test.describe('Spinner', () => {
  test.use({
    tagName,
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
});
