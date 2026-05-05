import { expect, test } from '../../test/playwright/index.js';
import { BadgeAppearance, BadgeColor, BadgeShape, BadgeSize } from './badge.options.js';

test.describe('Badge', () => {
  test.use({
    tagName: 'fluent-badge',
    innerHTML: 'Badge',
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-badge');
    });

    expect(hasError).toBe(false);
  });

  test('should set default attribute values', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveAttribute('appearance', 'filled');

    await expect(element).toHaveJSProperty('appearance', 'filled');

    await expect(element).toHaveAttribute('color', 'brand');

    await expect(element).toHaveJSProperty('color', 'brand');
  });

  for (const appearance of Object.values(BadgeAppearance)) {
    test(`should set the \`appearance\` property to \`${appearance}\``, async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { appearance } });

      await expect(element).toHaveJSProperty('appearance', appearance);

      await expect(element).toHaveAttribute('appearance', appearance);
    });
  }

  for (const color of Object.values(BadgeColor)) {
    test(`should set the \`color\` property to \`${color}\``, async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { color } });

      await expect(element).toHaveAttribute('color', color);

      await expect(element).toHaveJSProperty('color', color);
    });
  }

  for (const size of Object.values(BadgeSize)) {
    test(`should set the \`size\` property to \`${size}\``, async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { size } });

      await expect(element).toHaveAttribute('size', size);

      await expect(element).toHaveJSProperty('size', size);
    });
  }

  for (const shape of Object.values(BadgeShape)) {
    test(`should set the \`shape\` property to \`${shape}\``, async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { shape } });

      await expect(element).toHaveAttribute('shape', shape);

      await expect(element).toHaveJSProperty('shape', shape);
    });
  }
});
