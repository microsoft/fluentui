import { expect, test } from '../../test/playwright/index.js';
import type { Tooltip } from './tooltip.js';
import type { TooltipPositioningOption } from './tooltip.options.js';

test.describe('Tooltip', () => {
  test.use({ tagName: 'fluent-tooltip' });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-tooltip');
    });

    expect(hasError).toBe(false);
  });

  /**
   * ARIA APG Tooltip Pattern {@link https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/ }
   * ESC dismisses the tooltip.
   * The element that serves as the tooltip container has role tooltip.
   * The element that triggers the tooltip references the tooltip element with aria-describedby.
   */
  test('escape key should hide the tooltip', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const button = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <div style="position: absolute; inset: 200px">
        <button id="target">Target</button>
        <fluent-tooltip anchor="target">This is a tooltip</fluent-tooltip>
      </div>
    `);

    await button.focus();

    await expect(element).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(element).toBeHidden();
  });

  test('should have the role set to `tooltip`', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.role', 'tooltip');
  });

  test('should have the `aria-describedby` attribute set to the tooltip id', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const button = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <div style="position: absolute; inset: 200px">
        <button id="target">Target</button>
        <fluent-tooltip anchor="target">This is a tooltip</fluent-tooltip>
      </div>
    `);

    await expect(element).toHaveAttribute('id');

    const id = await element.evaluate((node: Tooltip) => node.id);

    await expect(button).toHaveAttribute('aria-describedby', id);
  });

  test('should not be visible by default', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toBeHidden();
  });

  test('should show the tooltip on hover', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const button = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <div style="position: absolute; inset: 200px">
        <button id="target">Target</button>
        <fluent-tooltip anchor="target">This is a tooltip</fluent-tooltip>
      </div>
    `);

    await expect(element).toBeHidden();

    await button.hover();

    await expect(element).toBeVisible();
  });

  test('should show the tooltip on focus', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const button = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <div style="position: absolute; inset: 200px">
        <button id="target">Target</button>
        <fluent-tooltip anchor="target">This is a tooltip</fluent-tooltip>
      </div>
    `);

    await expect(element).toBeHidden();

    await button.focus();

    await expect(element).toBeVisible();

    await button.blur();

    await expect(element).toBeHidden();
  });

  test('default placement should be set to `above`', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const button = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <div style="position: absolute; inset: 200px">
        <button id="target">Target</button>
        <fluent-tooltip anchor="target">This is a tooltip</fluent-tooltip>
      </div>
    `);

    await expect(element).not.toHaveAttribute('positioning', 'above');

    await button.focus();
    await expect(element).toBeVisible();

    const buttonTop = await button.evaluate((node: HTMLElement) => node.getBoundingClientRect().top);
    const elementBottom = await element.evaluate((node: HTMLElement) => node.getBoundingClientRect().bottom);

    expect(buttonTop).toBeGreaterThan(elementBottom);
  });

  test('position should be set to `above` when `positioning` is set to `above`', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const button = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <div style="position: absolute; inset: 200px">
        <button id="target">Target</button>
        <fluent-tooltip anchor="target">This is a tooltip</fluent-tooltip>
      </div>
    `);

    await element.evaluate((node: Tooltip) => {
      node.positioning = 'above' as TooltipPositioningOption;
    });

    await expect(element).toHaveAttribute('positioning', 'above');

    await button.focus();

    const buttonTop = await button.evaluate((node: HTMLElement) => node.getBoundingClientRect().top);

    const elementBottom = await element.evaluate((node: HTMLElement) => node.getBoundingClientRect().bottom);

    expect(buttonTop).toBeGreaterThan(elementBottom);
  });

  test('position should be set to `below` when `positioning` is set to `below`', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const button = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <div style="position: absolute; inset: 200px">
        <button id="target">Target</button>
        <fluent-tooltip anchor="target" positioning="below">This is a tooltip</fluent-tooltip>
      </div>
    `);

    await expect(element).toHaveJSProperty('positioning', 'below');

    await button.focus();

    const buttonBottom = await button.evaluate((node: HTMLElement) => node.getBoundingClientRect().bottom);
    const elementTop = await element.evaluate((node: HTMLElement) => node.getBoundingClientRect().top);

    expect(buttonBottom).toBeLessThan(elementTop);
  });

  test('position should be set to `before` when `positioning` is set to `before`', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const button = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <div style="position: absolute; inset: 200px">
        <button id="target">Target</button>
        <fluent-tooltip anchor="target" positioning="before">This is a tooltip</fluent-tooltip>
      </div>
    `);

    await expect(element).toHaveJSProperty('positioning', 'before');

    await button.focus();

    const buttonLeft = await button.evaluate((node: HTMLElement) => node.getBoundingClientRect().left);
    const elementRight = await element.evaluate((node: HTMLElement) => node.getBoundingClientRect().right);

    expect(buttonLeft).toBeGreaterThan(elementRight);
  });

  test('position should be set to `after` when `positioning` is set to `after`', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const button = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <div style="position: absolute; inset: 200px">
        <button id="target">Target</button>
        <fluent-tooltip anchor="target" positioning="after">This is a tooltip</fluent-tooltip>
      </div>
    `);

    await expect(element).toHaveJSProperty('positioning', 'after');

    await button.focus();

    const buttonRight = await button.evaluate((node: HTMLElement) => node.getBoundingClientRect().right);
    const elementLeft = await element.evaluate((node: HTMLElement) => node.getBoundingClientRect().left);

    expect(buttonRight).toBeLessThan(elementLeft);
  });
});
