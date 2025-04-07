import { expect, test } from '../../test/playwright/index.js';
import type { Label } from './label.js';
import { LabelSize, LabelWeight } from './label.options.js';

test.describe('Label', () => {
  test.use({ tagName: 'fluent-label' });

  test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const size of Object.values(LabelSize)) {
      await test.step(`should set the \`size\` property to "${size}"`, async () => {
        await fastPage.setTemplate({ attributes: { size } });

        await expect(element).toHaveAttribute('size', size);

        await expect(element).toHaveJSProperty('size', size);

        await expect(element).toHaveCustomState(size);
      });
    }
  });

  test('should set the `weight` property to match the `weight` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const weight of Object.values(LabelWeight)) {
      await test.step(`should set the \`weight\` property to "${weight}"`, async () => {
        await fastPage.setTemplate({ attributes: { weight } });

        await expect(element).toHaveAttribute('weight', weight);

        await expect(element).toHaveJSProperty('weight', weight);

        await expect(element).toHaveCustomState(weight);
      });
    }
  });

  test('should set the `disabled` property to match the `disabled` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await expect(element).toHaveAttribute('disabled');

    await expect(element).toHaveJSProperty('disabled', true);

    await expect(element).toHaveCustomState('disabled');

    await element.evaluate((node: Label) => {
      node.disabled = false;
    });

    await expect(element).not.toHaveAttribute('disabled');

    await expect(element).toHaveJSProperty('disabled', false);

    await expect(element).not.toHaveCustomState('disabled');
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
