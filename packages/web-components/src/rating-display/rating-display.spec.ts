import { expect, test } from '../../test/playwright/index.js';
import { RatingDisplaySize } from './rating-display.options.js';
import type { RatingDisplay } from './rating-display.js';

function encodedSvg(str: string, browserName: string) {
  return encodeURIComponent(str)
    .replaceAll('.', browserName === 'webkit' ? '\\.' : '.')
    .replaceAll('%', browserName === 'webkit' ? '\\%' : '%');
}

test.describe('Rating Display', () => {
  test.use({
    tagName: 'fluent-rating-display',
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-rating-display');
    });

    expect(hasError).toBe(false);
  });

  test('should not set any default attributes and custom states', async ({ fastPage }) => {
    const { element } = fastPage;
    await expect(element).toBeVisible();
    for (const attribute of ['color', 'compact', 'count', 'icon-view-box', 'max', 'size']) {
      await expect(element).not.toHaveAttribute(attribute);
    }
    await expect(element.locator('.count-label')).toBeHidden();

    await expect(element).toHaveJSProperty('color', undefined);
    await expect(element).toHaveJSProperty('size', undefined);
  });

  test('should set the correct accessibility attributes', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({ attributes: { value: '3.5', count: '100' } });

    await expect(element).toHaveJSProperty('elementInternals.role', 'img');
    await expect(element.locator('.display')).toHaveAttribute('aria-hidden', 'true');
    await expect(element.locator('.value-label')).toHaveAttribute('aria-hidden', 'true');
    await expect(element.locator('.count-label')).toHaveAttribute('aria-hidden', 'true');
  });

  test('should display the correct number of filled icons and label text based on the `value` attribute', async ({
    fastPage,
    browserName,
  }) => {
    const { element } = fastPage;
    const display = element.locator('.display');
    await fastPage.setTemplate({ attributes: { value: '3.5' } });

    await expect(element).toHaveJSProperty('value', 3.5);
    await expect(element.locator('.value-label')).toHaveText('3.5');
    await expect(display).toHaveCSS('inline-size', `${5 * (16 + 2) - 2 / 2}px`);
    await expect(display).toHaveCSS(
      'background-image',
      browserName === 'chromium'
        ? 'linear-gradient(90deg, rgb(234, 163, 0) calc(63px), rgb(249, 226, 174) calc(63.5px))'
        : 'linear-gradient(90deg, rgb(234, 163, 0) 63px, rgb(249, 226, 174) 63.5px)',
    );
  });

  test('should use the right icon color based on the `color` attribute', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({ attributes: { value: '4' } });
    await expect(element).toHaveJSProperty('color', undefined);

    await expect(element).toHaveCSS('--_icon-color-value', '#eaa300');
    await expect(element).toHaveCSS('--_icon-color-empty', '#f9e2ae');

    await element.evaluate((node: RatingDisplay) => {
      node.color = 'brand';
    });

    await expect(element).toHaveJSProperty('color', 'brand');
    await expect(element).toHaveAttribute('color', 'brand');
    await expect(element).toHaveCSS('--_icon-color-value', '#0f6cbd');
    await expect(element).toHaveCSS('--_icon-color-empty', '#ebf3fc');

    await element.evaluate((node: RatingDisplay) => {
      node.color = 'neutral';
    });

    await expect(element).toHaveJSProperty('color', 'neutral');
    await expect(element).toHaveAttribute('color', 'neutral');
    await expect(element).toHaveCSS('--_icon-color-value', '#242424');
    await expect(element).toHaveCSS('--_icon-color-empty', '#e6e6e6');
  });

  test('should display the compact version', async ({ fastPage }) => {
    const { element } = fastPage;
    const display = element.locator('.display');
    await fastPage.setTemplate({ attributes: { value: '4.5', compact: true } });

    await expect(display).toHaveCSS('--_max', '1');
  });

  test('should display the count text', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({ attributes: { value: '3', count: '1000' } });

    await expect(element).toHaveJSProperty('count', 1000);
    await expect(element.locator('.value-label')).toHaveText('3');
    await expect(element.locator('.count-label')).toHaveText('1,000');
  });

  test('should display the correct number of icons based on the `max` attribute', async ({ fastPage }) => {
    const { element } = fastPage;
    const display = element.locator('.display');
    await fastPage.setTemplate({ attributes: { value: '8', max: '10' } });

    await expect(display).toHaveCSS('--_value', 'max(0, round(8 * 2) / 2)');
    await expect(display).toHaveCSS('--_max', 'max(1, 10)');
  });

  test('should display the component in the correct size based on the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;
    const value = element.locator('.value-label');
    const display = element.locator('.display');

    await fastPage.setTemplate({ attributes: { value: '1.3' } });

    await expect(element).toHaveJSProperty('size', undefined);

    await expect(element).toHaveCSS('--_icon-size', '16px');
    await expect(display).toHaveCSS('inline-size', `${5 * (16 + 2) - 2 / 2}px`);
    await expect(display).toHaveCSS('block-size', '16px');
    await expect(value).toHaveCSS('font-size', '12px');
    await expect(value).toHaveCSS('line-height', '16px');
    await expect(value).toHaveCSS('margin-inline-start', '4px');

    await element.evaluate((node: RatingDisplay) => {
      node.size = 'small';
    });

    await expect(element).toHaveAttribute('size', 'small');

    await expect(element).toHaveJSProperty('size', RatingDisplaySize.small);
    await expect(element).toHaveCSS('--_icon-size', '12px');
    await expect(display).toHaveCSS('inline-size', `${5 * (12 + 2) - 2 / 2}px`);
    await expect(display).toHaveCSS('block-size', '12px');
    await expect(value).toHaveCSS('font-size', '12px');
    await expect(value).toHaveCSS('line-height', '16px');
    await expect(value).toHaveCSS('margin-inline-start', '2px');

    await element.evaluate((node: RatingDisplay) => {
      node.size = 'large';
    });

    await expect(element).toHaveAttribute('size', 'large');

    await expect(element).toHaveJSProperty('size', RatingDisplaySize.large);
    await expect(element).toHaveCSS('--_icon-size', '20px');
    await expect(display).toHaveCSS('inline-size', `${5 * (20 + 2) - 2 / 2}px`);
    await expect(display).toHaveCSS('block-size', '20px');
    await expect(value).toHaveCSS('font-size', '14px');
    await expect(value).toHaveCSS('line-height', '20px');
    await expect(value).toHaveCSS('margin-inline-start', '6px');
  });

  test('should use custom icons when provided', async ({ fastPage, browserName }) => {
    const { element } = fastPage;
    const display = element.locator('.display');
    const customIconPath =
      '<path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z"></path>';
    const customIcon = /* html */ `<svg slot="icon">${customIconPath}</svg>`;

    await fastPage.setTemplate({
      attributes: { value: '4.1' },
      innerHTML: customIcon,
    });

    const maskImageFilled = await display.evaluate(node => {
      return getComputedStyle(node).getPropertyValue('--_mask-image-filled');
    });
    const maskImageOutlined = await display.evaluate(node => {
      return getComputedStyle(node).getPropertyValue('--_mask-image-outlined');
    });

    expect(maskImageFilled).toContain(encodedSvg(customIconPath, browserName));
    expect(maskImageOutlined).toContain(encodedSvg(customIconPath, browserName));
    expect(maskImageOutlined).toContain(encodedSvg('stroke="black"', browserName));
    expect(maskImageOutlined).toContain(encodedSvg('stroke-width="2"', browserName));
    expect(maskImageOutlined).toContain(encodedSvg('fill="none"', browserName));
  });
});
