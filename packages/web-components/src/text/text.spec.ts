import { expect, test } from '../../test/playwright/index.js';
import { TextAlign, TextFont, TextSize, TextWeight } from './text.options.js';

test.describe('Text Component', () => {
  test.use({ tagName: 'fluent-text' });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-text');
    });

    expect(hasError).toBe(false);
  });

  test(`should set the \`nowrap\` property to true when the \`nowrap\` attribute is present`, async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { nowrap: true } });

    await expect(element).toHaveJSProperty('nowrap', true);

    await test.step('should set the `nowrap` property to false when the `nowrap` attribute is removed', async () => {
      await fastPage.setTemplate({ attributes: {} });

      await expect(element).toHaveJSProperty('nowrap', false);
    });
  });

  test(`should set the \`truncate\` property to true when the \`truncate\` attribute is present`, async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { truncate: true } });

    await expect(element).toHaveJSProperty('truncate', true);

    await test.step('should set the `truncate` property to false when the `truncate` attribute is removed', async () => {
      await fastPage.setTemplate({ attributes: {} });

      await expect(element).toHaveJSProperty('truncate', false);
    });
  });

  test(`should set the \`italic\` property to true when the \`italic\` attribute is present`, async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { italic: true } });

    await expect(element).toHaveJSProperty('italic', true);

    await test.step('should set the `italic` property to false when the `italic` attribute is removed', async () => {
      await fastPage.setTemplate({ attributes: {} });

      await expect(element).toHaveJSProperty('italic', false);
    });
  });

  test(`should set the \`underline\` property to true when the \`underline\` attribute is present`, async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { underline: true } });

    await expect(element).toHaveJSProperty('underline', true);

    await test.step('should set the `underline` property to false when the `underline` attribute is removed', async () => {
      await fastPage.setTemplate({ attributes: {} });

      await expect(element).toHaveJSProperty('underline', false);
    });
  });

  test(`should set the \`strikethrough\` property to true when the \`strikethrough\` attribute is present`, async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { strikethrough: true } });

    await expect(element).toHaveJSProperty('strikethrough', true);

    await test.step('should set the `strikethrough` property to false when the `strikethrough` attribute is removed', async () => {
      await fastPage.setTemplate({ attributes: {} });

      await expect(element).toHaveJSProperty('strikethrough', false);
    });
  });

  test(`should set the \`block\` property to true when the \`block\` attribute is present`, async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { block: true } });

    await expect(element).toHaveJSProperty('block', true);

    await test.step('should set the `block` property to false when the `block` attribute is removed', async () => {
      await fastPage.setTemplate({ attributes: {} });

      await expect(element).toHaveJSProperty('block', false);
    });
  });

  test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const size of Object.values(TextSize)) {
      await test.step(size, async () => {
        await fastPage.setTemplate({ attributes: { size } });

        await expect(element).toHaveJSProperty('size', size);

        await expect(element).toHaveAttribute('size', size);
      });
    }
  });

  test('should set the `weight` property to match the `weight` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const weight of Object.values(TextWeight)) {
      await test.step(weight, async () => {
        await fastPage.setTemplate({ attributes: { weight } });

        await expect(element).toHaveJSProperty('weight', weight);

        await expect(element).toHaveAttribute('weight', weight);
      });
    }
  });

  test('should set the `align` property to match the `align` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const align of Object.values(TextAlign)) {
      await test.step(align, async () => {
        await fastPage.setTemplate({ attributes: { align } });

        await expect(element).toHaveJSProperty('align', align);

        await expect(element).toHaveAttribute('align', align);
      });
    }
  });

  test('should set the `font` property to match the `font` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const font of Object.values(TextFont)) {
      await test.step(font, async () => {
        await fastPage.setTemplate({ attributes: { font } });

        await expect(element).toHaveJSProperty('font', font);

        await expect(element).toHaveAttribute('font', font);
      });
    }
  });
});
