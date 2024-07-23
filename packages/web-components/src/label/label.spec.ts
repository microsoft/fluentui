import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Label } from './label.js';

test.describe('Label', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-label');
    root = page.locator('#root');

    await page.goto(fixtureURL('components-label--label'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should reflect size attribute', async () => {
    await element.evaluate((node: Label) => {
      node.size = 'small';
    });

    await expect(element).toHaveAttribute('size', 'small');
    await expect(element).toHaveJSProperty('size', 'small');
    expect(await element.evaluate((node: Label) => node.elementInternals.states.has('small'))).toBe(true);

    await element.evaluate((node: Label) => {
      node.size = 'medium';
    });

    await expect(element).toHaveAttribute('size', 'medium');
    await expect(element).toHaveJSProperty('size', 'medium');
    expect(await element.evaluate((node: Label) => node.elementInternals.states.has('small'))).toBe(false);
    expect(await element.evaluate((node: Label) => node.elementInternals.states.has('medium'))).toBe(true);

    await element.evaluate((node: Label) => {
      node.size = 'large';
    });
    await expect(element).toHaveAttribute('size', 'large');
    await expect(element).toHaveJSProperty('size', 'large');
    expect(await element.evaluate((node: Label) => node.elementInternals.states.has('medium'))).toBe(false);
    expect(await element.evaluate((node: Label) => node.elementInternals.states.has('large'))).toBe(true);
  });

  test('should reflect weight attribute', async () => {
    await element.evaluate((node: Label) => {
      node.weight = 'regular';
    });
    await expect(element).toHaveAttribute('weight', 'regular');
    await expect(element).toHaveJSProperty('weight', 'regular');
    expect(await element.evaluate((node: Label) => node.elementInternals.states.has('regular'))).toBe(true);

    await element.evaluate((node: Label) => {
      node.weight = 'semibold';
    });
    await expect(element).toHaveAttribute('weight', 'semibold');
    await expect(element).toHaveJSProperty('weight', 'semibold');
    expect(await element.evaluate((node: Label) => node.elementInternals.states.has('regular'))).toBe(false);
    expect(await element.evaluate((node: Label) => node.elementInternals.states.has('semibold'))).toBe(true);
  });

  test('should reflect disabled attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-label disabled>Label</fluent-label>
            `;
    });

    await expect(element).toHaveAttribute('disabled', '');
    await expect(element).toHaveJSProperty('disabled', true);
    expect(await element.evaluate((node: Label) => node.elementInternals.states.has('disabled'))).toBe(true);
  });

  test('should reflect required attribute and show asterisk', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-label required>Label</fluent-label>
            `;
    });

    const asterisk = element.locator('span.asterisk');

    await expect(element).toHaveAttribute('required', '');
    await expect(element).toHaveJSProperty('required', true);
    await expect(asterisk).toBeVisible();
  });

  test('should hide asterisk when required attribute is not set', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                    <fluent-label>Label</fluent-label>
            `;
    });

    const asterisk = element.locator('span.asterisk');
    await expect(element).not.toHaveAttribute('required', '');
    await expect(element).toHaveJSProperty('required', false);
    await expect(asterisk).toBeHidden();
  });
});
