import { expect, test } from '../../test/playwright/index.js';
import type { ProgressBar } from './progress-bar.js';
import { ProgressBarShape, ProgressBarThickness, ProgressBarValidationState } from './progress-bar.options.js';

test.describe('Progress Bar', () => {
  test.use({
    tagName: 'fluent-progress-bar',
  });

  test('should include a role of progressbar', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.role', 'progressbar');
  });

  test('should set the `aria-valuenow` attribute to match the `value` property', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { value: '50' } });

    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '50');
  });

  test('should set the `aria-valuemin` attribute to match the `min` property', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { min: '50' } });

    await expect(element).toHaveJSProperty('elementInternals.ariaValueMin', '50');
  });

  test('should set the `aria-valuemax` attribute to match the `max` property', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { max: '50' } });

    await expect(element).toHaveJSProperty('elementInternals.ariaValueMax', '50');
  });

  test('should set the `percentComplete` property to match the `value` property as a percentage between 0 and 100 when `min` and `max` are unset', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { value: '50' } });

    await expect(element).toHaveJSProperty('percentComplete', 50);
  });

  test('should set the `percentComplete` property to match the `value` property as a percentage between `min` and `max`', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { value: '0' } });

    await expect(element).toHaveJSProperty('percentComplete', 0);

    await element.evaluate((node: ProgressBar) => {
      node.value = 50;
    });

    await expect(element).toHaveJSProperty('percentComplete', 50);

    await element.evaluate((node: ProgressBar) => {
      node.value = 100;
    });

    await expect(element).toHaveJSProperty('percentComplete', 100);

    await element.evaluate((node: ProgressBar) => {
      node.max = 200;
    });

    await expect(element).toHaveJSProperty('percentComplete', 50);

    await element.evaluate((node: ProgressBar) => {
      node.min = 100;
    });

    await expect(element).toHaveJSProperty('percentComplete', 0);
  });

  test('should set the `thickness` property to match the `thickness` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const thickness of Object.values(ProgressBarThickness)) {
      await test.step(thickness, async () => {
        await fastPage.setTemplate({ attributes: { thickness } });

        await expect(element).toHaveAttribute('thickness', thickness);

        await expect(element).toHaveJSProperty('thickness', thickness);

        await expect(element).toHaveCustomState(thickness);
      });
    }
  });

  test('should set the `shape` property to match the `shape` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const shape of Object.values(ProgressBarShape)) {
      await test.step(shape, async () => {
        await fastPage.setTemplate({ attributes: { shape } });

        await expect(element).toHaveAttribute('shape', shape);

        await expect(element).toHaveJSProperty('shape', shape);

        await expect(element).toHaveCustomState(shape);
      });
    }
  });

  test('should set the `validationState` property to match the `validation-state` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const validationState of Object.values(ProgressBarValidationState)) {
      await test.step(validationState, async () => {
        await fastPage.setTemplate({ attributes: { 'validation-state': validationState } });

        await expect(element).toHaveAttribute('validation-state', validationState);

        await expect(element).toHaveJSProperty('validationState', validationState);

        await expect(element).toHaveCustomState(validationState);
      });
    }
  });
});
