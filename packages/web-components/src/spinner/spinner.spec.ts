import { expect, test } from '../../test/playwright/index.js';
import { SpinnerAppearance, SpinnerSize, tagName } from './spinner.options.js';

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

  test('should set the `appearance` property to match the `appearance` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    for (const appearance of Object.values(SpinnerAppearance)) {
      await test.step(appearance, async () => {
        await fastPage.updateTemplate(element, { attributes: { appearance } });

        await expect(element).toHaveJSProperty('appearance', appearance);

        await expect(element).toHaveAttribute('appearance', appearance);
      });
    }
  });

  test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    for (const size of Object.values(SpinnerSize)) {
      await test.step(size, async () => {
        await fastPage.updateTemplate(element, { attributes: { size } });

        await expect(element).toHaveJSProperty('size', size);

        await expect(element).toHaveAttribute('size', size);
      });
    }
  });
});
