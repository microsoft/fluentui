import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

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

    await expect(element).toHaveAttribute('aria-pressed', 'false');
  });

  test('should set the `aria-pressed` attribute to `true` when the `pressed` attribute is present', async ({
    page,
  }) => {
    const element = page.locator('fluent-toggle-button');

    await page.setContent(/* html */ `
        <fluent-toggle-button pressed>Toggle</fluent-toggle-button>
    `);

    await expect(element).toHaveAttribute('aria-pressed', 'true');
  });

  test('should toggle the `pressed` attribute when clicked', async ({ page }) => {
    const element = page.locator('fluent-toggle-button');

    const pressed = page.locator('fluent-toggle-button[pressed]');

    await page.setContent(/* html */ `
      <fluent-toggle-button>Toggle</fluent-toggle-button>
    `);

    await expect(element).toHaveAttribute('aria-pressed', 'false');

    expect(await element.evaluate(node => node.getAttribute('pressed'))).toBe(null);

    // await expect(element).not.toHaveAttribute('pressed');
    await expect(pressed).toHaveCount(0);

    await element.click();

    await expect(element).toHaveAttribute('aria-pressed', 'true');

    // await expect(element).toHaveAttribute('pressed');
    await expect(pressed).toHaveCount(1);

    await element.click();

    await expect(element).toHaveAttribute('aria-pressed', 'false');

    // await expect(element).not.toHaveAttribute('pressed');
    await expect(pressed).toHaveCount(0);
  });

  test('should NOT toggle the `pressed` attribute when clicked when the `disabled` attribute is present', async ({
    page,
  }) => {
    const element = page.locator('fluent-toggle-button');

    const pressed = page.locator('fluent-toggle-button[pressed]');

    await page.setContent(/* html */ `
      <fluent-toggle-button disabled>Toggle</fluent-toggle-button>
    `);

    await expect(element).toHaveAttribute('aria-pressed', 'false');

    // await expect(element).not.toHaveAttribute('pressed');
    await expect(pressed).toHaveCount(0);

    await element.click();

    await expect(element).toHaveAttribute('aria-pressed', 'false');

    // await expect(element).not.toHaveAttribute('pressed');
    await expect(pressed).toHaveCount(0);
  });

  test('should NOT toggle the `pressed` attribute when clicked when the `disabled-focusable` attribute is present', async ({
    page,
  }) => {
    const element = page.locator('fluent-toggle-button');
    const pressed = page.locator('fluent-toggle-button[pressed]');

    await page.setContent(/* html */ `
      <fluent-toggle-button disabled-focusable>Toggle</fluent-toggle-button>
    `);

    await expect(element).toHaveAttribute('aria-pressed', 'false');

    // await expect(element).not.toHaveAttribute('pressed');
    await expect(pressed).toHaveCount(0);

    await element.click();

    await expect(element).toHaveAttribute('aria-pressed', 'false');

    // await expect(element).not.toHaveAttribute('pressed');
    await expect(pressed).toHaveCount(0);
  });

  test('should set the `aria-pressed` attribute to `mixed` when the `mixed` attribute is present', async ({ page }) => {
    const element = page.locator('fluent-toggle-button');

    await page.setContent(/* html */ `
      <fluent-toggle-button mixed>Toggle</fluent-toggle-button>
    `);

    await expect(element).toHaveAttribute('aria-pressed', 'mixed');
  });

  test('should set the `aria-pressed` attribute to match the `pressed` attribute when the `mixed` attribute is removed', async ({
    page,
  }) => {
    const element = page.locator('fluent-toggle-button');

    await page.setContent(/* html */ `
      <fluent-toggle-button mixed pressed>Toggle</fluent-toggle-button>
    `);

    await expect(element).toHaveAttribute('aria-pressed', 'mixed');

    await element.evaluate(node => {
      node.removeAttribute('mixed');
    });

    await expect(element).toHaveAttribute('aria-pressed', 'true');
  });
});
