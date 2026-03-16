import { expect, test } from '../../test/playwright/index.js';
import type { Image } from './image.js';
import { ImageFit, ImageShape } from './image.options.js';

test.describe('Image', () => {
  test.use({
    tagName: 'fluent-image',
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

    await page.evaluate(() => {
      document.createElement('fluent-image');
    });

    expect(hasError).toBe(false);
  });

  test('should set the `block` property to match the `block` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { block: true } });

    await expect(element).toHaveAttribute('block');

    await expect(element).toHaveJSProperty('block', true);

    await element.evaluate((node: Image) => {
      node.block = false;
    });

    await expect(element).not.toHaveAttribute('block');

    await expect(element).not.toHaveJSProperty('block', true);
  });

  test('should set the `bordered` property to match the `bordered` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { bordered: true } });

    await expect(element).toHaveAttribute('bordered');

    await expect(element).toHaveJSProperty('bordered', true);

    await element.evaluate((node: Image) => {
      node.bordered = false;
    });

    await expect(element).not.toHaveAttribute('bordered');

    await expect(element).toHaveJSProperty('bordered', false);
  });

  test('should set the `shadow` property to match the `shadow` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { shadow: true } });

    await expect(element).toHaveAttribute('shadow');

    await expect(element).toHaveJSProperty('shadow', true);

    await element.evaluate((node: Image) => {
      node.shadow = false;
    });

    await expect(element).not.toHaveAttribute('shadow');

    await expect(element).toHaveJSProperty('shadow', false);
  });

  test('should set the `fit` property to match the `fit` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const fit of Object.values(ImageFit)) {
      await test.step(`should set the \`fit\` property to "${fit}"`, async () => {
        await fastPage.setTemplate({ attributes: { fit } });

        await expect(element).toHaveAttribute('fit', fit);

        await expect(element).toHaveJSProperty('fit', fit);
      });
    }
  });

  test('should set the `shape` property to match the `shape` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const shape of Object.values(ImageShape)) {
      await test.step(`should set the \`shape\` property to "${shape}"`, async () => {
        await fastPage.setTemplate({ attributes: { shape } });

        await expect(element).toHaveAttribute('shape', shape);

        await expect(element).toHaveJSProperty('shape', shape);
      });
    }
  });
});
