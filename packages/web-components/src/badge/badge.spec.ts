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

    await expect(element).toHaveAttribute('appearance', 'filled');

    await expect(element).toHaveJSProperty('appearance', 'filled');

    await expect(element).toHaveAttribute('color', 'brand');

    await expect(element).toHaveJSProperty('color', 'brand');
  });

  test('should set the `appearance` property to match the `appearance` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const appearance of Object.values(BadgeAppearance)) {
      await test.step(appearance, async () => {
        await fastPage.setTemplate({ attributes: { appearance } });

        await expect(element).toHaveJSProperty('appearance', appearance);

        await expect(element).toHaveAttribute('appearance', appearance);
      });
    }
  });

  test('should set the `color` property to match the `color` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const color of Object.values(BadgeColor)) {
      await test.step(`should set the \`color\` property to \`${color}\``, async () => {
        await fastPage.setTemplate({ attributes: { color } });

        await expect(element).toHaveAttribute('color', color);

        await expect(element).toHaveJSProperty('color', color);
      });
    }
  });

  test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const size of Object.values(BadgeSize)) {
      await test.step(`should set the \`size\` property to \`${size}\``, async () => {
        await fastPage.setTemplate({ attributes: { size } });

        await expect(element).toHaveAttribute('size', size);

        await expect(element).toHaveJSProperty('size', size);
      });
    }
  });

  test('should set the `shape` property to match the `shape` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const shape of Object.values(BadgeShape)) {
      await test.step(`should set the \`shape\` property to \`${shape}\``, async () => {
        await fastPage.setTemplate({ attributes: { shape } });

        await expect(element).toHaveAttribute('shape', shape);

        await expect(element).toHaveJSProperty('shape', shape);
      });
    }
  });
});
