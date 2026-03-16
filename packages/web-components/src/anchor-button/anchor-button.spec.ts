import { expect, test } from '../../test/playwright/index.js';
import { AnchorButtonAppearance, AnchorButtonShape, AnchorButtonSize } from './anchor-button.options.js';

test.describe('Anchor Button', () => {
  test.use({
    innerHTML: 'Fluent Anchor Button',
    tagName: 'fluent-anchor-button',
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-anchor-button');
    });

    expect(hasError).toBe(false);
  });

  test('should set the `href` property to match the `href` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { href: '#foo' } });

    await expect(element).toHaveJSProperty('href', '#foo');

    await test.step('should set the `href` property and attribute on the internal anchor element', async () => {
      const anchor = element.locator('a');

      await expect(anchor).toHaveAttribute('href', '#foo');
    });
  });

  test('should set the `hreflang` property to match the `hreflang` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { hreflang: 'en-GB' } });

    await expect(element).toHaveJSProperty('hreflang', 'en-GB');

    await test.step('should set the `hreflang` property and attribute on the internal anchor element', async () => {
      const anchor = element.locator('a');

      await expect(anchor).toHaveAttribute('hreflang', 'en-GB');
    });
  });

  test('should set the `ping` property to match the `ping` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { ping: 'ping' } });

    await expect(element).toHaveJSProperty('ping', 'ping');

    await test.step('should set the `ping` property and attribute on the internal anchor element', async () => {
      const anchor = element.locator('a');

      await expect(anchor).toHaveAttribute('ping', 'ping');
    });
  });

  test('should set the `referrerpolicy` property to match the `referrerpolicy` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { referrerpolicy: 'no-referrer' } });

    await expect(element).toHaveJSProperty('referrerpolicy', 'no-referrer');

    await test.step('should set the `referrerpolicy` property and attribute on the internal anchor element', async () => {
      const anchor = element.locator('a');

      await expect(anchor).toHaveAttribute('referrerpolicy', 'no-referrer');
    });
  });

  test('should set the `rel` property to match the `rel` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { rel: 'external' } });

    await expect(element).toHaveJSProperty('rel', 'external');

    await test.step('should set the `rel` property and attribute on the internal anchor element', async () => {
      const anchor = element.locator('a');

      await expect(anchor).toHaveAttribute('rel', 'external');
    });
  });

  test('should set the `target` property to match the `target` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { target: '_blank' } });

    await expect(element).toHaveJSProperty('target', '_blank');

    await test.step('should set the `target` property and attribute on the internal anchor element', async () => {
      const anchor = element.locator('a');

      await expect(anchor).toHaveAttribute('target', '_blank');
    });
  });

  test('should set the `type` property to match the `type` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { type: 'foo' } });

    await expect(element).toHaveJSProperty('type', 'foo');

    await test.step('should set the `type` property and attribute on the internal anchor element', async () => {
      const anchor = element.locator('a');

      await expect(anchor).toHaveAttribute('type', 'foo');
    });
  });

  test('should set the `iconOnly` property to match the `icon-only` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { 'icon-only': true } });

    await expect(element).toHaveJSProperty('iconOnly', true);
  });

  for (const appearance of Object.values(AnchorButtonAppearance)) {
    test(`should set the \`appearance\` property to "${appearance}" when the attribute is set to "${appearance}"`, async ({
      fastPage,
    }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { appearance } });

      await expect(element).toHaveJSProperty('appearance', appearance);
    });
  }

  for (const shape of Object.values(AnchorButtonShape)) {
    test(`should set the \`shape\` property to "${shape}" when the attribute is set to "${shape}"`, async ({
      fastPage,
    }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { shape } });

      await expect(element).toHaveJSProperty('shape', shape);
    });
  }

  for (const size of Object.values(AnchorButtonSize)) {
    test(`should set the \`size\` property to "${size}" when the attribute is set to "${size}"`, async ({
      fastPage,
    }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { size } });

      await expect(element).toHaveJSProperty('size', size);
    });
  }

  test('should navigate to the provided url when clicked', async ({ fastPage, page }) => {
    const { element } = fastPage;

    const expectedUrl = '#foo';

    await fastPage.setTemplate({ attributes: { href: expectedUrl } });

    await element.click();

    await expect(page).toHaveURL(expectedUrl);
  });

  test('should navigate to the provided url when clicked while pressing the `Control` key on Windows or `Meta` on Mac', async ({
    fastPage,
    context,
  }) => {
    const { element } = fastPage;

    const expectedUrl = '#foo';

    await fastPage.setTemplate({ attributes: { href: expectedUrl } });

    const newPagePromise = context.waitForEvent('page');

    await element.click({ modifiers: ['ControlOrMeta'] });

    const newPage = await newPagePromise;

    await expect(newPage).toHaveURL(expectedUrl);
  });

  test('should navigate to the provided url when `Enter` is pressed via keyboard', async ({ fastPage, page }) => {
    const { element } = fastPage;

    const expectedUrl = '#foo';

    await fastPage.setTemplate({ attributes: { href: expectedUrl } });

    await element.focus();

    await element.press('Enter');

    await expect(page).toHaveURL(expectedUrl);
  });

  test('should navigate to the provided url when `ctrl` and `Enter` are pressed via keyboard', async ({
    fastPage,
    context,
  }) => {
    const { element } = fastPage;

    const expectedUrl = '#foo';

    await fastPage.setTemplate({ attributes: { href: expectedUrl } });

    const newPagePromise = context.waitForEvent('page');

    await element.focus();

    await expect(element).toBeFocused();

    await element.press('Control+Enter');

    const newPage = await newPagePromise;

    await expect(newPage).toHaveURL(expectedUrl);
  });
});
