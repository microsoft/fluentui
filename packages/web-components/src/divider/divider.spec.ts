import { expect, test } from '../../test/playwright/index.js';
import type { Divider } from './divider.js';
import { DividerAlignContent, DividerAppearance, DividerOrientation, DividerRole } from './divider.options.js';

test.describe('Divider', () => {
  test.use({ tagName: 'fluent-divider' });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-divider');
    });

    expect(hasError).toBe(false);
  });

  test('should set a default `role` attribute of "separator"', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.role', 'separator');
  });

  test('should set the internal `role` property to match the `role` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const role of Object.values(DividerRole)) {
      await test.step(`role="${role}"`, async () => {
        await fastPage.setTemplate({ attributes: { role } });

        await expect(element).toHaveJSProperty('elementInternals.role', role);
      });
    }
  });

  test('should set the `aria-orientation` attribute equal to the `orientation` value', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const orientation of Object.values(DividerOrientation)) {
      await test.step(`orientation="${orientation}"`, async () => {
        await fastPage.setTemplate({ attributes: { orientation } });

        await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', orientation);
      });
    }
  });

  test('should NOT set the `aria-orientation` property when the `role` is "presentation"', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { orientation: 'vertical' } });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'vertical');

    await element.evaluate((node: Divider) => {
      node.role = 'presentation';
    });

    await expect(element).not.toHaveJSProperty('elementInternals.ariaOrientation', 'vertical');
    await expect(element).not.toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');
  });

  test('should set the orientation property to match the `orientation` attribute when provided', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { orientation: 'vertical' } });

    await element.evaluate((node: Divider) => {
      node.orientation = 'horizontal';
    });

    await expect(element).toHaveJSProperty('orientation', 'horizontal');
  });

  test('should initialize to the provided value attribute if set post-connection', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const alignment of Object.values(DividerAlignContent)) {
      await test.step(`alignContent="${alignment}"`, async () => {
        await fastPage.setTemplate({ attributes: { 'align-content': alignment } });

        await expect(element).toHaveJSProperty('alignContent', alignment);
      });
    }

    for (const appearance of Object.values(DividerAppearance)) {
      await test.step(`appearance="${appearance}"`, async () => {
        await fastPage.setTemplate({ attributes: { appearance } });

        await expect(element).toHaveJSProperty('appearance', appearance);
      });
    }

    await test.step('inset', async () => {
      await fastPage.setTemplate({ attributes: { inset: true } });

      await expect(element).toHaveJSProperty('inset', true);
    });
  });
});
