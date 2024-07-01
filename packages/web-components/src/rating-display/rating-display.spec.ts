import { expect, Locator, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import { RatingDisplaySize } from './rating-display.options.js';
import { RatingDisplay } from './rating-display.js';

test.describe('Rating Display', () => {
  let element: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-rating-display--rating-display'));
    await page.waitForFunction(() => customElements.whenDefined('fluent-rating-display'));

    element = page.locator('fluent-rating-display');
  });

  test('should not set any default attributes and custom states', async ({ page }) => {
    await expect(element).toBeVisible();
    await expect(element).not.toHaveAttribute('color');
    await expect(element).not.toHaveAttribute('compact');
    await expect(element).not.toHaveAttribute('max');
    await expect(element).not.toHaveAttribute('size');
    await expect(page.locator('.count-label')).toBeHidden();

    expect(await element.evaluate((node: RatingDisplay) => node.color)).toBeUndefined();
    expect(await element.evaluate((node: RatingDisplay) => node.size)).toBeUndefined();
  });

  test('should set the correct accessibility attributes', async ({ page }) => {
    await page.setContent(`<fluent-rating-display value="3.5" count="100"></fluent-rating-display>`);

    await expect(element).toHaveJSProperty('elementInternals.role', 'img');
    await expect(page.locator('svg').last()).toHaveAttribute('aria-hidden', 'true');
    await expect(page.locator('.value-label')).toHaveAttribute('aria-hidden', 'true');
    await expect(page.locator('.count-label')).toHaveAttribute('aria-hidden', 'true');
  });

  test('should display the correct number of filled icons and label text based on the `value` attribute', async ({
    page,
  }) => {
    await page.setContent(`<fluent-rating-display value="3.5"></fluent-rating-display>`);

    await expect(element).toHaveJSProperty('value', 3.5);
    await expect(page.locator('.value-label')).toHaveText('3.5');
    await expect(page.locator('svg[aria-hidden="true"]')).toHaveCount(10);

    // Based on the `value` attribute, the 7th icon should be set as selected
    await expect(page.locator('svg:nth-child(7 of [aria-hidden="true"])')).toHaveAttribute('selected');

    // The first 7 icons should have the default filled color (colorPaletteMarigoldBackground3)
    for (const icon of await page.locator('svg:nth-child(-n+7 of [aria-hidden="true"])').all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(234, 163, 0)');
    }

    // Other icons after the selected icon should have the default unfilled color (colorPaletteMarigoldBackground2)
    for (const icon of await page.locator('svg:nth-child(n+8 of [aria-hidden="true"])').all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(249, 226, 174)');
    }
  });

  test('should use the right icon color based on the `icon` attribute', async ({ page }) => {
    await page.setContent(`<fluent-rating-display value="4"></fluent-rating-display>`);

    expect(await element.evaluate((node: RatingDisplay) => node.color)).toBeUndefined();

    // Assert correct color for filled icons
    for (const icon of await page.locator('svg:nth-child(-n+8 of [aria-hidden="true"])').all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(234, 163, 0)');
    }

    // Assert correct color for unfilled icons
    for (const icon of await page.locator('svg:nth-child(n+9 of [aria-hidden="true"])').all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(249, 226, 174)');
    }

    await element.evaluate((node: RatingDisplay) => {
      node.color = 'brand';
    });

    expect(await element.evaluate((node: RatingDisplay) => node.color)).toBe('brand');
    expect(await element.evaluate((node: RatingDisplay) => node.elementInternals.states.has('brand'))).toBe(true);

    for (const icon of await page.locator('svg:nth-child(-n+8 of [aria-hidden="true"])').all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(15, 108, 189)');
    }

    for (const icon of await page.locator('svg:nth-child(n+9 of [aria-hidden="true"])').all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(180, 214, 250)');
    }

    await element.evaluate((node: RatingDisplay) => {
      node.color = 'neutral';
    });

    expect(await element.evaluate((node: RatingDisplay) => node.color)).toBe('neutral');
    expect(await element.evaluate((node: RatingDisplay) => node.elementInternals.states.has('neutral'))).toBe(true);

    for (const icon of await page.locator('svg:nth-child(-n+8 of [aria-hidden="true"])').all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(36, 36, 36)');
    }

    for (const icon of await page.locator('svg:nth-child(n+9 of [aria-hidden="true"])').all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(224, 224, 224)');
    }
  });

  test('should display the compact version', async ({ page }) => {
    await page.setContent(`<fluent-rating-display value="4.5" compact="true"></fluent-rating-display>`);

    await expect(element).toHaveJSProperty('compact', true);
    await expect(page.locator('svg[aria-hidden="true"]')).toHaveCount(2);
    await expect(page.locator('svg').last()).toHaveAttribute('selected');
    await expect(page.locator('.value-label')).toHaveText('4.5');

    for (const icon of await page.locator('svg[aria-hidden="true"]').all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(234, 163, 0)');
    }
  });

  test('should display the count text', async ({ page }) => {
    await page.setContent(`<fluent-rating-display value="3" count="1000"></fluent-rating-display>`);

    await expect(element).toHaveJSProperty('count', 1000);
    await expect(page.locator('.value-label')).toHaveText('3');
    await expect(page.locator('.count-label')).toHaveText('1,000');
  });

  test('should display the correct number of icons based on the `max` attribute', async ({ page }) => {
    await page.setContent(`<fluent-rating-display value="8" max="10"></fluent-rating-display>`);

    await expect(element).toHaveJSProperty('max', 10);
    await expect(page.locator('svg[aria-hidden="true"]')).toHaveCount(20);
    await expect(page.locator('svg:nth-child(16 of [aria-hidden="true"])')).toHaveAttribute('selected');
  });

  test('should display the component in the correct size based on the `size` attribute', async ({ page }) => {
    await page.setContent(`<fluent-rating-display value="1.3"></fluent-rating-display>`);

    const icon: Locator = page.locator('svg[aria-hidden="true"]').last();
    const value: Locator = page.locator('.value-label');

    expect(await element.evaluate((node: RatingDisplay) => node.size)).toBeUndefined();

    await expect(icon).toHaveCSS('width', '16px');
    await expect(icon).toHaveCSS('height', '16px');
    await expect(value).toHaveCSS('font-size', '12px');
    await expect(value).toHaveCSS('line-height', '16px');
    await expect(value).toHaveCSS('margin-inline-start', '4px');

    await element.evaluate((node: RatingDisplay) => {
      node.size = 'small';
    });

    expect(await element.evaluate((node: RatingDisplay) => node.size)).toBe('small');
    expect(await element.evaluate((node: RatingDisplay) => node.elementInternals.states.has('small'))).toBe(true);

    await expect(element).toHaveJSProperty('size', RatingDisplaySize.small);
    await expect(icon).toHaveCSS('width', '12px');
    await expect(icon).toHaveCSS('height', '12px');
    await expect(value).toHaveCSS('font-size', '12px');
    await expect(value).toHaveCSS('line-height', '16px');
    await expect(value).toHaveCSS('margin-inline-start', '2px');

    await element.evaluate((node: RatingDisplay) => {
      node.size = 'large';
    });

    expect(await element.evaluate((node: RatingDisplay) => node.size)).toBe('large');
    expect(await element.evaluate((node: RatingDisplay) => node.elementInternals.states.has('large'))).toBe(true);

    await expect(element).toHaveJSProperty('size', RatingDisplaySize.large);
    await expect(icon).toHaveCSS('width', '20px');
    await expect(icon).toHaveCSS('height', '20px');
    await expect(value).toHaveCSS('font-size', '14px');
    await expect(value).toHaveCSS('line-height', '20px');
    await expect(value).toHaveCSS('margin-inline-start', '6px');
  });
});
