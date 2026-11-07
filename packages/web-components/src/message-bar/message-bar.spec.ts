import { expect, test } from '../../test/playwright/index.js';
import type { MessageBar } from './message-bar.js';
import { tagName } from './message-bar.options.js';

test.describe('Message Bar', () => {
  test.use({
    tagName,
    innerHTML: 'Message Bar',
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(tagName => {
      document.createElement(tagName);
    }, tagName);

    expect(hasError).toBe(false);
  });

  test('should include a role of status', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('elementInternals.role', 'status');
  });

  test('should emit a `dismiss` event when `dismissMessageBar()` is called', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    const didDismiss = element.evaluate(
      node => new Promise(resolve => node.addEventListener('dismiss', () => resolve(true))),
    );

    await element.evaluate((node: MessageBar) => {
      node.dismissMessageBar();
    });

    await expect(didDismiss).resolves.toBe(true);
  });
});
