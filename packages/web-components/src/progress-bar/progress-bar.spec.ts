import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { ProgressBar } from './progress-bar.js';

test.describe('Progress Bar', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-progress-bar');

    root = page.locator('#root');

    await page.goto(fixtureURL('components-progressbar--progress'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  // Foundation tests
  test('should include a role of progressbar', async () => {
    await expect(element).toHaveAttribute('role', 'progressbar');
  });

  test('should set the `aria-valuenow` attribute with the `value` property when provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-progress-bar value="50"></fluent-progress-bar>
        `;
    });

    await expect(element).toHaveAttribute('aria-valuenow', '50');
  });

  test('should set the `aria-valuemin` attribute with the `min` property when provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-progress-bar min="50"></fluent-progress-bar>
        `;
    });

    await expect(element).toHaveAttribute('aria-valuemin', '50');
  });

  test('should set the `aria-valuemax` attribute with the `max` property when provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-progress-bar max="50"></fluent-progress-bar>
        `;
    });

    await expect(element).toHaveAttribute('aria-valuemax', '50');
  });

  test('should render an element with a `determinate` slot when a value is provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-progress-bar value="50"></fluent-progress-bar>
        `;
    });

    const progress = element.locator('.progress');

    await expect(progress).toHaveAttribute('slot', 'determinate');
  });

  test('should render an element with an `indeterminate` slot when no value is provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-progress-bar></fluent-progress-bar>
        `;
    });

    const progress = element.locator('.progress');

    await expect(progress).toHaveAttribute('slot', 'indeterminate');
  });

  test('should return the `percentComplete` property as a value between 0 and 100 when `min` and `max` are unset', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-progress-bar value="50"></fluent-progress-bar>
        `;
    });

    await expect(element).toHaveJSProperty('percentComplete', 50);
  });

  test('should set the `percentComplete` property to match the current `value` in the range of `min` and `max`', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-progress-bar value="0"></fluent-progress-bar>
        `;
    });

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

  // Fluent Specific propertiy tests
  test('should set and retrieve the `thickness` property correctly', async () => {
    await element.evaluate((node: ProgressBar) => {
      node.thickness = 'medium';
    });

    await expect(element).toHaveJSProperty('thickness', 'medium');

    await element.evaluate((node: ProgressBar) => {
      node.thickness = 'large';
    });

    await expect(element).toHaveJSProperty('thickness', 'large');
  });

  test('should set and retrieve the `shape` property correctly', async () => {
    await element.evaluate((node: ProgressBar) => {
      node.shape = 'square';
    });

    await expect(element).toHaveJSProperty('shape', 'square');

    await element.evaluate((node: ProgressBar) => {
      node.shape = 'rounded';
    });

    await expect(element).toHaveJSProperty('shape', 'rounded');
  });

  test('should set and retrieve the `validationState` property correctly', async () => {
    await element.evaluate((node: ProgressBar) => {
      node.validationState = 'success';
    });

    await expect(element).toHaveJSProperty('validationState', 'success');

    await element.evaluate((node: ProgressBar) => {
      node.validationState = 'warning';
    });

    await expect(element).toHaveJSProperty('validationState', 'warning');

    await element.evaluate((node: ProgressBar) => {
      node.validationState = 'error';
    });

    await expect(element).toHaveJSProperty('validationState', 'error');
  });
});
