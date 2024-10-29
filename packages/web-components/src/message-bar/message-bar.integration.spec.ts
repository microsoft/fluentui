import { test } from '@playwright/test';
import { analyzePageWithAxe, createElementInternalsTrapsForAxe, expect, fixtureURL } from '../helpers.tests.js';
import type { MessageBar } from './message-bar.js';

const storybookDocId = 'components-messagebar--docs';

test.describe('Message Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL(storybookDocId));
    await page.waitForFunction(() => customElements.whenDefined('fluent-message-bar'));
    await page.setContent(/* html */ `
      <fluent-message-bar></fluent-message-bar>
    `);
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
    await expect(element).toHaveCustomState('success');

    await element.evaluate((node: MessageBar) => {
      node.intent = 'warning';
    });

    await expect(element).toHaveJSProperty('intent', 'warning');
    await expect(element).not.toHaveCustomState('success');
    await expect(element).toHaveCustomState('warning');

    await element.evaluate((node: MessageBar) => {
      node.intent = 'error';
    });

    await expect(element).toHaveJSProperty('intent', 'error');
    await expect(element).not.toHaveCustomState('warning');
    await expect(element).toHaveCustomState('error');

    await element.evaluate((node: MessageBar) => {
      node.intent = 'info';
    });

    await expect(element).toHaveJSProperty('intent', 'info');
    await expect(element).not.toHaveCustomState('error');
    await expect(element).toHaveCustomState('info');
  });

  test('should set and retrieve the `shape` property correctly', async ({ page }) => {
    const element = page.locator('fluent-message-bar');

    await element.evaluate((node: MessageBar) => {
      node.shape = 'square';
    });

    await expect(element).toHaveJSProperty('shape', 'square');
    await expect(element).toHaveCustomState('square');

    await element.evaluate((node: MessageBar) => {
      node.shape = 'rounded';
    });

    await expect(element).toHaveJSProperty('shape', 'rounded');
    await expect(element).not.toHaveCustomState('square');
    await expect(element).toHaveCustomState('rounded');
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

test('should not have auto detectable accessibility issues', async ({ page }) => {
  await createElementInternalsTrapsForAxe(page);

  await page.goto(fixtureURL(storybookDocId));
  await page.waitForFunction(() => customElements.whenDefined('fluent-message-bar'));

  const results = await analyzePageWithAxe(page);

  expect(results.violations).toEqual([]);
});
