import { expect, test } from '../../test/playwright/index.js';

test.describe('Tab', () => {
  test.use({ tagName: 'fluent-tab' });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate('');

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-tab');
    });

    expect(hasError).toBe(false);
  });

  test('should have a role of `tab`', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveRole('tab');
  });

  test('should have a slot attribute of `tab`', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveAttribute('slot', 'tab');
  });

  test('should NOT set the `aria-disabled` attribute when `disabled` is not initially set', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).not.toHaveAttribute('aria-disabled');
  });

  test('should set the `aria-disabled` attribute when `disabled` is true during connectedCallback', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      attributes: {
        disabled: true,
      },
    });

    await expect(element).toHaveAttribute('aria-disabled', 'true');
  });
});
