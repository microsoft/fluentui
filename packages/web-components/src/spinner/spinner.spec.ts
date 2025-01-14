import { expect, test } from '../../test/playwright/index.js';
import { SpinnerAppearance, SpinnerSize } from './spinner.options.js';

test.describe('Spinner', () => {
  test.use({
    tagName: 'fluent-spinner',
  });

  test('should set the `appearance` property to match the `appearance` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const appearance of Object.values(SpinnerAppearance)) {
      await test.step(appearance, async () => {
        await fastPage.setTemplate({ attributes: { appearance } });

        await expect(element).toHaveJSProperty('appearance', appearance);

        await expect(element).toHaveAttribute('appearance', appearance);
      });
    }
  });

  test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const size of Object.values(SpinnerSize)) {
      await test.step(size, async () => {
        await fastPage.setTemplate({ attributes: { size } });

        await expect(element).toHaveJSProperty('size', size);

        await expect(element).toHaveAttribute('size', size);
      });
    }
  });
});
