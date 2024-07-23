import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Spinner } from './spinner.js';

test.describe('Spinner', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-spinner');

    root = page.locator('#root');

    await page.goto(fixtureURL('components-spinner--spinner'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  // Fluent Specific property tests
  test('should set and retrieve the `appearance` property correctly to primary', async () => {
    await element.evaluate((node: Spinner) => {
      node.appearance = 'primary';
    });

    await expect(element).toHaveJSProperty('appearance', 'primary');
  });

  test('should set and retrieve the `appearance` property correctly to inverted', async () => {
    await element.evaluate((node: Spinner) => {
      node.appearance = 'inverted';
    });

    await expect(element).toHaveJSProperty('appearance', 'inverted');
  });

  test('should add a custom state matching the `appearance` attribute when provided', async () => {
    await element.evaluate((node: Spinner) => {
      node.appearance = 'primary';
    });

    expect(await element.evaluate((node: Spinner) => node.elementInternals.states.has('primary'))).toBe(true);

    await element.evaluate((node: Spinner) => {
      node.appearance = 'inverted';
    });

    expect(await element.evaluate((node: Spinner) => node.elementInternals.states.has('primary'))).toBe(false);
    expect(await element.evaluate((node: Spinner) => node.elementInternals.states.has('inverted'))).toBe(true);
  });

  test('should set and retrieve the `size` property correctly to tiny', async () => {
    await element.evaluate((node: Spinner) => {
      node.size = 'tiny';
    });

    await expect(element).toHaveJSProperty('size', 'tiny');
  });

  test('should set and retrieve the `size` property correctly to small', async () => {
    await element.evaluate((node: Spinner) => {
      node.size = 'small';
    });

    await expect(element).toHaveJSProperty('size', 'small');
  });

  test('should set and retrieve the `size` property correctly to medium', async () => {
    await element.evaluate((node: Spinner) => {
      node.size = 'medium';
    });

    await expect(element).toHaveJSProperty('size', 'medium');
  });

  test('should set and retrieve the `size` property correctly to large', async () => {
    await element.evaluate((node: Spinner) => {
      node.size = 'large';
    });

    await expect(element).toHaveJSProperty('size', 'large');
  });

  test('should set and retrieve the `size` property correctly to extra-large', async () => {
    await element.evaluate((node: Spinner) => {
      node.size = 'extra-large';
    });

    await expect(element).toHaveJSProperty('size', 'extra-large');
  });

  test('should set and retrieve the `size` property correctly to huge', async () => {
    await element.evaluate((node: Spinner) => {
      node.size = 'huge';
    });

    await expect(element).toHaveJSProperty('size', 'huge');
  });

  test('should add a custom state matching the `size` attribute when provided', async () => {
    await element.evaluate((node: Spinner) => {
      node.size = 'tiny';
    });

    expect(await element.evaluate((node: Spinner) => node.elementInternals.states.has('tiny'))).toBe(true);

    await element.evaluate((node: Spinner) => {
      node.size = 'small';
    });

    expect(await element.evaluate((node: Spinner) => node.elementInternals.states.has('tiny'))).toBe(false);
    expect(await element.evaluate((node: Spinner) => node.elementInternals.states.has('small'))).toBe(true);

    await element.evaluate((node: Spinner) => {
      node.size = 'huge';
    });

    expect(await element.evaluate((node: Spinner) => node.elementInternals.states.has('small'))).toBe(false);
    expect(await element.evaluate((node: Spinner) => node.elementInternals.states.has('huge'))).toBe(true);
  });
});
