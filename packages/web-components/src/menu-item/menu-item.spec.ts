import { expect, test } from '../../test/playwright/index.js';
import { tagName } from './menu-item.options.js';

test.describe('Menu Item', () => {
  test.use({ tagName, innerHTML: 'Menu Item' });

  test('should set default host attributes when connected', async ({ fastPage }) => {
    await fastPage.setTemplate();

    await expect(fastPage.element).toHaveAttribute('tabindex', '0');
  });

  test('should preserve authored host attributes when connected', async ({ fastPage }) => {
    await fastPage.setTemplate({ attributes: { tabindex: '-1' } });

    await expect(fastPage.element).toHaveAttribute('tabindex', '-1');
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate('');

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(tagName => {
      document.createElement(tagName);
    }, tagName);

    expect(hasError).toBe(false);
  });

  test('should render on the page', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toBeAttached();

    await expect(element).toContainText('Menu Item');
  });

  test("should have a default role of 'menuitem'", async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveAttribute('role', 'menuitem');
  });
});
