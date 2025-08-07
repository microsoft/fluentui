import { expect, test } from '../../test/playwright/index.js';

test.describe('Toggle Button', () => {
  test.use({ tagName: 'fluent-toggle-button' });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-toggle-button');
    });

    expect(hasError).toBe(false);
  });

  test('should have the `aria-pressed` attribute set to `false` by default', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'false');
  });

  test('should set the `aria-pressed` attribute to `true` when the `pressed` attribute is present', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { pressed: true } });

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'true');
  });

  test('should toggle the `pressed` attribute when clicked', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'false');

    await expect(element).not.toHaveCustomState('pressed');

    await element.click();

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'true');

    await expect(element).toHaveCustomState('pressed');

    await element.click();

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'false');

    await expect(element).not.toHaveCustomState('pressed');
  });

  test('should NOT toggle the `pressed` attribute when clicked when the `disabled` attribute is present', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'false');

    await expect(element).not.toHaveCustomState('pressed');

    await element.click();

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'false');

    await expect(element).not.toHaveCustomState('pressed');

    await element.click();

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'false');

    await expect(element).not.toHaveCustomState('pressed');
  });

  test('should NOT toggle the `pressed` attribute when clicked when the `disabled-focusable` attribute is present', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { 'disabled-focusable': true } });

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'false');

    await expect(element).not.toHaveCustomState('pressed');

    await element.click();

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'false');

    await expect(element).not.toHaveCustomState('pressed');

    await element.click();

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'false');

    await expect(element).not.toHaveCustomState('pressed');
  });

  test('should set the `aria-pressed` attribute to `mixed` when the `mixed` attribute is present', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { mixed: true } });

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'mixed');
  });

  test('should set the `pressed` state when the `mixed` attribute is present', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { mixed: true } });

    await expect(element).toHaveCustomState('pressed');
  });

  test('should set the `aria-pressed` attribute to match the `pressed` attribute when the `mixed` attribute is removed', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { mixed: true, pressed: true } });

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'mixed');

    await element.evaluate(node => {
      node.removeAttribute('mixed');
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'true');
  });

  test('should persist the `pressed` state when the `mixed` attribute is removed', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { mixed: true, pressed: true } });

    await expect(element).toHaveCustomState('pressed');

    await element.evaluate(node => {
      node.removeAttribute('mixed');
    });

    await expect(element).toHaveCustomState('pressed');
  });
});
