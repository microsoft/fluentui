import { test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';

test.describe('Toggle Button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-button-toggle-button--button'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-toggle-button'));
  });

  test('should have the `aria-pressed` attribute set to `false` by default', async ({ page }) => {
    const element = page.locator('fluent-toggle-button');

    await page.setContent(/* html */ `
      <fluent-toggle-button>Toggle</fluent-toggle-button>
    `);

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'false');
  });

  test('should set the `aria-pressed` attribute to `true` when the `pressed` attribute is present', async ({
    page,
  }) => {
    const element = page.locator('fluent-toggle-button');

    await page.setContent(/* html */ `
        <fluent-toggle-button pressed>Toggle</fluent-toggle-button>
    `);

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'true');
  });

  test('should toggle the `pressed` attribute when clicked', async ({ page }) => {
    const element = page.locator('fluent-toggle-button');

    await page.setContent(/* html */ `
      <fluent-toggle-button>Toggle</fluent-toggle-button>
    `);

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
    page,
  }) => {
    const element = page.locator('fluent-toggle-button');

    await page.setContent(/* html */ `
      <fluent-toggle-button disabled>Toggle</fluent-toggle-button>
    `);

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
    page,
  }) => {
    const element = page.locator('fluent-toggle-button');

    await page.setContent(/* html */ `
      <fluent-toggle-button disabled-focusable>Toggle</fluent-toggle-button>
    `);

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'false');

    await expect(element).not.toHaveCustomState('pressed');

    await element.click();

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'false');

    await expect(element).not.toHaveCustomState('pressed');

    await element.click();

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'false');

    await expect(element).not.toHaveCustomState('pressed');
  });

  test('should set the `aria-pressed` attribute to `mixed` when the `mixed` attribute is present', async ({ page }) => {
    const element = page.locator('fluent-toggle-button');

    await page.setContent(/* html */ `
      <fluent-toggle-button mixed>Toggle</fluent-toggle-button>
    `);

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'mixed');
  });

  test('should set the `pressed` state when the `mixed` attribute is present', async ({ page }) => {
    const element = page.locator('fluent-toggle-button');

    await page.setContent(/* html */ `
      <fluent-toggle-button mixed>Toggle</fluent-toggle-button>
    `);

    await expect(element).toHaveCustomState('pressed');
  });

  test('should set the `aria-pressed` attribute to match the `pressed` attribute when the `mixed` attribute is removed', async ({
    page,
  }) => {
    const element = page.locator('fluent-toggle-button');

    await page.setContent(/* html */ `
      <fluent-toggle-button mixed pressed>Toggle</fluent-toggle-button>
    `);

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'mixed');

    await element.evaluate(node => {
      node.removeAttribute('mixed');
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaPressed', 'true');
  });

  test('should persist the `pressed` state when the `mixed` attribute is removed', async ({ page }) => {
    const element = page.locator('fluent-toggle-button');

    await page.setContent(/* html */ `
      <fluent-toggle-button mixed pressed>Toggle</fluent-toggle-button>
    `);

    await expect(element).toHaveCustomState('pressed');

    await element.evaluate(node => {
      node.removeAttribute('mixed');
    });

    await expect(element).toHaveCustomState('pressed');
  });
});
