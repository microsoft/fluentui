import { expect, test } from '../../test/playwright/index.js';
import { RatingDisplaySize } from './rating-display.options.js';
import type { RatingDisplay } from './rating-display.js';

test.describe('Rating Display', () => {
  test.use({
    tagName: 'fluent-rating-display',
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
    await expect(element.locator('svg').first()).toHaveAttribute('aria-hidden', 'true');
    await expect(element.locator('.value-label')).toHaveAttribute('aria-hidden', 'true');
    await expect(element.locator('.count-label')).toHaveAttribute('aria-hidden', 'true');
  });

  test('should display the correct number of filled icons and label text based on the `value` attribute', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({ attributes: { value: '3.5' } });

    await expect(element).toHaveJSProperty('value', 3.5);
    await expect(element.locator('.value-label')).toHaveText('3.5');
    await expect(element.locator('svg[aria-hidden="true"]')).toHaveCount(10);

    // Based on the `value` attribute, the 7th icon should be set as selected
    await expect(element.locator('svg:nth-child(7 of [aria-hidden="true"])')).toHaveAttribute('selected');

    // The first 7 icons should have the default filled color (colorPaletteMarigoldBackground3)
    for (const icon of await element.locator('svg:nth-child(-n+7 of [aria-hidden="true"])').all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(234, 163, 0)');
    }

    // Other icons after the selected icon should have the default unfilled color (colorPaletteMarigoldBackground2)
    for (const icon of await element.locator('svg:nth-child(n+8 of [aria-hidden="true"])').all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(249, 226, 174)');
    }
  });

  test('should use the right icon color based on the `color` attribute', async ({ fastPage }) => {
    const { element } = fastPage;
    const filledIcons = element.locator('svg:nth-child(-n+8 of [aria-hidden="true"])');
    const unfilledIcons = element.locator('svg:nth-child(n+9 of [aria-hidden="true"])');
    await fastPage.setTemplate({ attributes: { value: '4' } });
    await expect(element).toHaveJSProperty('color', undefined);

    // Assert correct color for filled icons
    for (const icon of await filledIcons.all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(234, 163, 0)');
    }

    // Assert correct color for unfilled icons
    for (const icon of await unfilledIcons.all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(249, 226, 174)');
    }

    await element.evaluate((node: RatingDisplay) => {
      node.color = 'brand';
    });

    await expect(element).toHaveJSProperty('color', 'brand');
    await expect(element).toHaveCustomState('brand');

    for (const icon of await filledIcons.all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(15, 108, 189)');
    }

    for (const icon of await unfilledIcons.all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(180, 214, 250)');
    }

    await element.evaluate((node: RatingDisplay) => {
      node.color = 'neutral';
    });

    await expect(element).toHaveJSProperty('color', 'neutral');
    await expect(element).toHaveCustomState('neutral');

    for (const icon of await filledIcons.all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(36, 36, 36)');
    }

    for (const icon of await unfilledIcons.all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(224, 224, 224)');
    }
  });

  test('should display the compact version', async ({ fastPage }) => {
    const { element } = fastPage;
    const svgs = element.locator('svg[aria-hidden="true"]');
    await fastPage.setTemplate({ attributes: { value: '4.5', compact: 'true' } });

    await expect(element).toHaveJSProperty('compact', true);
    await expect(svgs).toHaveCount(2);
    await expect(svgs.last()).toHaveAttribute('selected');
    await expect(element.locator('.value-label')).toHaveText('4.5');

    for (const icon of await svgs.all()) {
      await expect(icon).toHaveCSS('fill', 'rgb(234, 163, 0)');
    }
  });

  test('should display the count text', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({ attributes: { value: '3', count: '1000' } });

    await expect(element).toHaveJSProperty('count', 1000);
    await expect(element.locator('.value-label')).toHaveText('3');
    await expect(element.locator('.count-label')).toHaveText('1,000');
  });

  test('should set the correct icon `viewBox` based on the `icon-view-box` attribute', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({ attributes: { value: '2.2' } });

    const icon = element.locator('svg[aria-hidden="true"]').last();

    // Should set the default value when the attribute is not provided
    await expect(icon).toHaveAttribute('viewBox', '0 0 20 20');

    await element.evaluate((node: RatingDisplay) => {
      node.iconViewBox = '0 0 12 12';
    });

    await expect(icon).toHaveAttribute('viewBox', '0 0 12 12');
  });

  test('should display the correct number of icons based on the `max` attribute', async ({ fastPage }) => {
    const { element } = fastPage;
    const svgs = element.locator('svg[aria-hidden="true"]');
    await fastPage.setTemplate({ attributes: { value: '8', max: '10' } });

    await expect(element).toHaveJSProperty('max', 10);
    await expect(svgs).toHaveCount(20);
    await expect(svgs.nth(15)).toHaveAttribute('selected');
  });

  test('should display the component in the correct size based on the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;
    const icon = element.locator('svg[aria-hidden="true"]').last();
    const value = element.locator('.value-label');

    await fastPage.setTemplate({ attributes: { value: '1.3' } });

    await expect(element).toHaveJSProperty('size', undefined);

    await expect(icon).toHaveCSS('width', '16px');
    await expect(icon).toHaveCSS('height', '16px');
    await expect(value).toHaveCSS('font-size', '12px');
    await expect(value).toHaveCSS('line-height', '16px');
    await expect(value).toHaveCSS('margin-inline-start', '4px');

    await element.evaluate((node: RatingDisplay) => {
      node.size = 'small';
    });

    await expect(element).toHaveCustomState('small');

    await expect(element).toHaveJSProperty('size', RatingDisplaySize.small);
    await expect(icon).toHaveCSS('width', '12px');
    await expect(icon).toHaveCSS('height', '12px');
    await expect(value).toHaveCSS('font-size', '12px');
    await expect(value).toHaveCSS('line-height', '16px');
    await expect(value).toHaveCSS('margin-inline-start', '2px');

    await element.evaluate((node: RatingDisplay) => {
      node.size = 'large';
    });

    await expect(element).toHaveCustomState('large');

    await expect(element).toHaveJSProperty('size', RatingDisplaySize.large);
    await expect(icon).toHaveCSS('width', '20px');
    await expect(icon).toHaveCSS('height', '20px');
    await expect(value).toHaveCSS('font-size', '14px');
    await expect(value).toHaveCSS('line-height', '20px');
    await expect(value).toHaveCSS('margin-inline-start', '6px');
  });

  test('should use custom icons when provided', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({
      attributes: { value: '4.1' },
      innerHTML: /* html */ `
        <svg slot="icon">
          <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z" />
        </svg>
      `,
    });

    const icon = element.locator('svg[aria-hidden="true"]').last();

    // Check for <path> as a direct child to verify that the custom icon is being used
    await expect(icon.locator('> path')).toBeVisible();
    await expect(icon.locator('> use')).toBeHidden();
  });
});
