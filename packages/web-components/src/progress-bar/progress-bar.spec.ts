import { expect, test } from '../../test/playwright/index.js';
import type { ProgressBar } from './progress-bar.js';
import { ProgressBarShape, ProgressBarThickness, ProgressBarValidationState } from './progress-bar.options.js';

interface BoundingBox {
  width: number;
}

test.describe('Progress Bar', () => {
  test.use({
    tagName: 'fluent-progress-bar',
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-progress-bar');
    });

    expect(hasError).toBe(false);
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

  test('should set indicator width to be 1/3 of the container width if `value` is missing', async ({ fastPage }) => {
    const { element } = fastPage;
    await element.evaluate(node => {
      node.style.setProperty('width', '100px');
    });
    const indicator = element.locator('.indicator');

    await expect(indicator).toHaveCSS('width', '33px');
  });

  test('should set indicator width to match the `value` property as a percentage between 0 and 100 when `min` and `max` are unset', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const indicator = element.locator('.indicator');

    await fastPage.setTemplate({ attributes: { value: '50' } });

    const elementBox = (await element.boundingBox()) as BoundingBox;

    await expect(indicator).toHaveCSS('width', `${elementBox.width / 2}px`);
  });

  test('should set the indicator width to match the `value` property as a percentage between `min` and `max`', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const indicator = element.locator('.indicator');

    await fastPage.setTemplate({ attributes: { value: '0' } });

    let elementBox = (await element.boundingBox()) as BoundingBox;

    await expect(indicator).toHaveCSS('width', '0px');

    await element.evaluate((node: ProgressBar) => {
      node.value = 50;
    });
    elementBox = (await element.boundingBox()) as BoundingBox;

    await expect(indicator).toHaveCSS('width', `${elementBox.width / 2}px`);

    await element.evaluate((node: ProgressBar) => {
      node.value = 100;
    });
    elementBox = (await element.boundingBox()) as BoundingBox;

    await expect(indicator).toHaveCSS('width', `${elementBox.width}px`);

    await element.evaluate((node: ProgressBar) => {
      node.max = 200;
    });
    elementBox = (await element.boundingBox()) as BoundingBox;

    await expect(indicator).toHaveCSS('width', `${elementBox.width / 2}px`);

    await element.evaluate((node: ProgressBar) => {
      node.min = 100;
    });
    elementBox = (await element.boundingBox()) as BoundingBox;

    await expect(indicator).toHaveCSS('width', '0px');
  });

  test('should set the `thickness` property to match the `thickness` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const thickness of Object.values(ProgressBarThickness)) {
      await test.step(thickness, async () => {
        await fastPage.setTemplate({ attributes: { thickness } });

        await expect(element).toHaveAttribute('thickness', thickness);

        await expect(element).toHaveJSProperty('thickness', thickness);
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
      });
    }
  });
});
