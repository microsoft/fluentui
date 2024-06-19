import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { MessageBar } from './message-bar.js';

test.describe('Message Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-messagebar--message'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-message-bar'));
  });

  test('should include a role of status', async ({ page }) => {
    const element = page.locator('fluent-message-bar');

    await expect(element).toHaveJSProperty('elementInternals.role', 'status');
  });

  test('should set and retrieve the `intent` property correctly', async ({ page }) => {
    const element = page.locator('fluent-message-bar');

    await element.evaluate((node: MessageBar) => {
      node.intent = 'success';
    });

    await expect(element).toHaveJSProperty('intent', 'success');
    expect(await element.evaluate((node: MessageBar) => node.elementInternals.states.has('success'))).toBe(true);

    await element.evaluate((node: MessageBar) => {
      node.intent = 'warning';
    });

    await expect(element).toHaveJSProperty('intent', 'warning');
    expect(await element.evaluate((node: MessageBar) => node.elementInternals.states.has('success'))).toBe(false);
    expect(await element.evaluate((node: MessageBar) => node.elementInternals.states.has('warning'))).toBe(true);

    await element.evaluate((node: MessageBar) => {
      node.intent = 'error';
    });

    await expect(element).toHaveJSProperty('intent', 'error');
    expect(await element.evaluate((node: MessageBar) => node.elementInternals.states.has('warning'))).toBe(false);
    expect(await element.evaluate((node: MessageBar) => node.elementInternals.states.has('error'))).toBe(true);

    await element.evaluate((node: MessageBar) => {
      node.intent = 'info';
    });

    await expect(element).toHaveJSProperty('intent', 'info');
    expect(await element.evaluate((node: MessageBar) => node.elementInternals.states.has('error'))).toBe(false);
    expect(await element.evaluate((node: MessageBar) => node.elementInternals.states.has('info'))).toBe(true);
  });

  test('should set and retrieve the `shape` property correctly', async ({ page }) => {
    const element = page.locator('fluent-message-bar');

    await element.evaluate((node: MessageBar) => {
      node.shape = 'square';
    });

    await expect(element).toHaveJSProperty('shape', 'square');
    expect(await element.evaluate((node: MessageBar) => node.elementInternals.states.has('square'))).toBe(true);

    await element.evaluate((node: MessageBar) => {
      node.shape = 'rounded';
    });

    await expect(element).toHaveJSProperty('shape', 'rounded');
    expect(await element.evaluate((node: MessageBar) => node.elementInternals.states.has('square'))).toBe(false);
    expect(await element.evaluate((node: MessageBar) => node.elementInternals.states.has('rounded'))).toBe(true);
  });

  test('should set and retrieve the `layout` property correctly', async ({ page }) => {
    const element = page.locator('fluent-message-bar');

    await element.evaluate((node: MessageBar) => {
      node.layout = 'multiline';
    });

    await expect(element).toHaveJSProperty('layout', 'multiline');
    expect(await element.evaluate((node: MessageBar) => node.getAttribute('layout'))).toBe('multiline');

    await element.evaluate((node: MessageBar) => {
      node.layout = 'singleline';
    });

    await expect(element).toHaveJSProperty('layout', 'singleline');
    expect(await element.evaluate((node: MessageBar) => node.getAttribute('layout'))).toBe('singleline');
  });

  test('should emit dismiss event when dismissMessageBar is called', async ({ page }) => {
    const element = page.locator('fluent-message-bar');
    await element.evaluate((node: MessageBar) => {
      node.addEventListener('dismiss', () => {
        node.setAttribute('dismissed', 'true');
      });
    });

    await element.evaluate((node: MessageBar) => {
      node.dismissMessageBar();
    });

    await expect(element).toHaveAttribute('dismissed', 'true');
  });
});
