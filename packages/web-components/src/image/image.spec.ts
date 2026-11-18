import { expect, test } from '../../test/playwright/index.js';
import { tagName } from './image.options.js';

test.describe('Image', () => {
  test.use({
    tagName,
    innerHTML: /* html */ `
      <img alt="Short image description" src="/300x100.png" />
    `,
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
