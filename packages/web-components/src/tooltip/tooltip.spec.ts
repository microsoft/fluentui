import { test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';
import type { Tooltip } from './tooltip.js';
import type { TooltipPositioningOption } from './tooltip.options.js';

test.describe('Tooltip', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-tooltip--docs'));
    await page.waitForFunction(() => customElements.whenDefined('fluent-tooltip'));

    await page.setContent(/* html */ `
      <div style="position: absolute; inset: 200px">
        <button id="target">Target</button>
        <fluent-tooltip anchor="target">This is a tooltip</fluent-tooltip>
      </div>
    `);
  });

  /**
   * ARIA APG Tooltip Pattern {@link https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/ }
   * ESC dismisses the tooltip.
   * The element that serves as the tooltip container has role tooltip.
   * The element that triggers the tooltip references the tooltip element with aria-describedby.
   */
  test('escape key should hide the tooltip', async ({ page }) => {
    const element = page.locator('fluent-tooltip');
    const button = page.locator('button');

    await button.focus();
    await expect(element).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(element).toBeHidden();
  });

  test('should have the role set to `tooltip`', async ({ page }) => {
    const element = page.locator('fluent-tooltip');
    await expect(element).toHaveJSProperty('elementInternals.role', 'tooltip');
  });

  test('should have the `aria-describedby` attribute set to the tooltip id', async ({ page }) => {
    const element = page.locator('fluent-tooltip');
    const button = page.locator('button');

    await expect(element).toHaveAttribute('id');
    const id = await element.evaluate((node: Tooltip) => node.id);
    await expect(button).toHaveAttribute('aria-describedby', id);
  });

  test('should not be visible by default', async ({ page }) => {
    const element = page.locator('fluent-tooltip');
    await expect(element).toBeHidden();
  });

  test('should show the tooltip on hover', async ({ page }) => {
    const element = page.locator('fluent-tooltip');
    const button = page.locator('button');

    await expect(element).toBeHidden();
    await button.hover();
    await expect(element).toBeVisible();
  });

  test('should show the tooltip on focus', async ({ page }) => {
    const element = page.locator('fluent-tooltip');
    const button = page.locator('button');

    await expect(element).toBeHidden();
    await button.focus();
    await expect(element).toBeVisible();
    await button.blur();
    await expect(element).toBeHidden();
  });

  test('default placement should be set to `above`', async ({ page }) => {
    const element = page.locator('fluent-tooltip');
    const button = page.locator('button');
    await expect(element).not.toHaveAttribute('positioning', 'above');

    // show the element to get the position
    await button.focus();
    await expect(element).toBeVisible();

    const buttonTop = await button.evaluate((node: HTMLElement) => node.getBoundingClientRect().top);
    const elementBottom = await element.evaluate((node: HTMLElement) => node.getBoundingClientRect().bottom);

    await expect(buttonTop).toBeGreaterThan(elementBottom);
  });

  test('position should be set to `above` when `positioning` is set to `above`', async ({ page }) => {
    const element = page.locator('fluent-tooltip');
    const button = page.locator('button');

    await element.evaluate((node: Tooltip) => {
      node.positioning = 'above' as TooltipPositioningOption;
    });
    await expect(element).toHaveAttribute('positioning', 'above');

    // show the element to get the position
    await button.focus();

    const buttonTop = await button.evaluate((node: HTMLElement) => node.getBoundingClientRect().top);
    const elementBottom = await element.evaluate((node: HTMLElement) => node.getBoundingClientRect().bottom);

    await expect(buttonTop).toBeGreaterThan(elementBottom);
  });

  test('position should be set to `below` when `positioning` is set to `below`', async ({ page }) => {
    const element = page.locator('fluent-tooltip');
    const button = page.locator('button');

    await element.evaluate((node: Tooltip) => {
      node.positioning = 'below' as TooltipPositioningOption;
    });
    await expect(element).toHaveAttribute('positioning', 'below');

    // show the element to get the position
    await button.focus();

    const buttonBottom = await button.evaluate((node: HTMLElement) => node.getBoundingClientRect().bottom);
    const elementTop = await element.evaluate((node: HTMLElement) => node.getBoundingClientRect().top);

    await expect(buttonBottom).toBeLessThan(elementTop);
  });

  test('position should be set to `before` when `positioning` is set to `before`', async ({ page }) => {
    const element = page.locator('fluent-tooltip');
    const button = page.locator('button');

    await element.evaluate((node: Tooltip) => {
      node.positioning = 'before' as TooltipPositioningOption;
    });
    await expect(element).toHaveAttribute('positioning', 'before');

    // show the element to get the position
    await button.focus();

    const buttonLeft = await button.evaluate((node: HTMLElement) => node.getBoundingClientRect().left);
    const elementRight = await element.evaluate((node: HTMLElement) => node.getBoundingClientRect().right);

    await expect(buttonLeft).toBeGreaterThan(elementRight);
  });

  test('position should be set to `after` when `positioning` is set to `after`', async ({ page }) => {
    const element = page.locator('fluent-tooltip');
    const button = page.locator('button');

    await element.evaluate((node: Tooltip) => {
      node.positioning = 'after' as TooltipPositioningOption;
    });
    await expect(element).toHaveAttribute('positioning', 'after');

    // show the element to get the position
    await button.focus();

    const buttonRight = await button.evaluate((node: HTMLElement) => node.getBoundingClientRect().right);
    const elementLeft = await element.evaluate((node: HTMLElement) => node.getBoundingClientRect().left);

    await expect(buttonRight).toBeLessThan(elementLeft);
  });
});
