import { expect, test } from '../../test/playwright/index.js';
import type { MessageBar } from './message-bar.js';
import { MessageBarIntent, MessageBarLayout, MessageBarShape, tagName } from './message-bar.options.js';

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

  test('should set the `intent` property to match the `intent` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    for (const intent of Object.values(MessageBarIntent)) {
      await test.step(intent, async () => {
        await fastPage.updateTemplate(element, { attributes: { intent } });

        await expect(element).toHaveJSProperty('intent', intent);

        await expect(element).toHaveAttribute('intent', intent);
      });
    }
  });

  test('should set the `shape` property to match the `shape` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    for (const shape of Object.values(MessageBarShape)) {
      await test.step(shape, async () => {
        await fastPage.updateTemplate(element, { attributes: { shape } });

        await expect(element).toHaveJSProperty('shape', shape);

        await expect(element).toHaveAttribute('shape', shape);
      });
    }
  });

  test('should set the `layout` property to match the `layout` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    for (const layout of Object.values(MessageBarLayout)) {
      await test.step(layout, async () => {
        await fastPage.updateTemplate(element, { attributes: { layout } });

        await expect(element).toHaveJSProperty('layout', layout);

        await expect(element).toHaveAttribute('layout', layout);
      });
    }
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
