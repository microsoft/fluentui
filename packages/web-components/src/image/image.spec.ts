import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Image } from './image.js';

test.describe('Image', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    element = page.locator('fluent-image');
    root = page.locator('#root');
    await page.goto(fixtureURL('components-image--image'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should initialize to the `block` attribute when provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-image block>
          <img alt="Short image description" src="https://picsum.photos/300/100">
        </fluent-image>
      `;
    });

    await expect(element).toHaveJSProperty('block', true);

    await element.evaluate((node: Image) => {
      node.block = false;
    });
    await expect(element).not.toHaveJSProperty('block', true);
  });

  test('should add a custom state of `block` when a value of true is provided', async () => {
    await element.evaluate((node: Image) => {
      node.block = true;
    });

    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('block'))).toBe(true);

    await element.evaluate((node: Image) => {
      node.block = false;
    });

    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('block'))).toBe(false);
  });

  test('should initialize to the `bordered` attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-image bordered>
          <img alt="Short image description" src="https://picsum.photos/300/100">
        </fluent-image>
      `;
    });

    await expect(element).toHaveJSProperty('bordered', true);

    await element.evaluate((node: Image) => {
      node.bordered = undefined;
    });
    await expect(element).not.toHaveJSProperty('bordered', true);
  });

  test('should add a custom state of `bordered` when a value of true is provided', async () => {
    await element.evaluate((node: Image) => {
      node.bordered = true;
    });

    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('bordered'))).toBe(true);

    await element.evaluate((node: Image) => {
      node.bordered = false;
    });

    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('bordered'))).toBe(false);
  });

  test('should initialize to the `shadow` attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-image shadow>
          <img alt="Short image description" src="https://picsum.photos/300/100">
        </fluent-image>
      `;
    });

    await expect(element).toHaveJSProperty('shadow', true);

    await element.evaluate((node: Image) => {
      node.shadow = undefined;
    });
    await expect(element).not.toHaveJSProperty('shadow', true);
  });

  test('should add a custom state of `shadow` when a value of true is provided', async () => {
    await element.evaluate((node: Image) => {
      node.shadow = true;
    });

    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('shadow'))).toBe(true);

    await element.evaluate((node: Image) => {
      node.shadow = false;
    });

    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('shadow'))).toBe(false);
  });

  test('should initialize to the `fit` attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-image fit="default">
          <img alt="Short image description" src="https://picsum.photos/300/100">
        </fluent-image>
      `;
    });

    await expect(element).toHaveJSProperty('fit', 'default');

    await element.evaluate((node: Image) => {
      node.fit = 'none';
    });
    await expect(element).toHaveJSProperty('fit', 'none');

    await element.evaluate((node: Image) => {
      node.fit = 'center';
    });
    await expect(element).toHaveJSProperty('fit', 'center');

    await element.evaluate((node: Image) => {
      node.fit = 'contain';
    });
    await expect(element).toHaveJSProperty('fit', 'contain');

    await element.evaluate((node: Image) => {
      node.fit = 'cover';
    });
    await expect(element).toHaveJSProperty('fit', 'cover');
  });

  test('should add a custom state matching the `fit` attribute when provided', async () => {
    await element.evaluate((node: Image) => {
      node.fit = 'contain';
    });

    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('fit-contain'))).toBe(true);

    await element.evaluate((node: Image) => {
      node.fit = 'none';
    });

    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('fit-contain'))).toBe(false);
    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('fit-none'))).toBe(true);

    await element.evaluate((node: Image) => {
      node.fit = 'cover';
    });

    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('fit-none'))).toBe(false);
    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('fit-cover'))).toBe(true);
  });

  test('should initialize to the `shape` attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-image shape="circular">
          <img alt="Short image description" src="https://picsum.photos/300/100">
        </fluent-image>
      `;
    });

    await expect(element).toHaveJSProperty('shape', 'circular');

    await element.evaluate((node: Image) => {
      node.shape = 'rounded';
    });
    await expect(element).toHaveJSProperty('shape', 'rounded');

    await element.evaluate((node: Image) => {
      node.shape = 'square';
    });
    await expect(element).toHaveJSProperty('shape', 'square');
  });

  test('should add a custom state matching the `shape` attribute when provided', async () => {
    await element.evaluate((node: Image) => {
      node.shape = 'circular';
    });

    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('circular'))).toBe(true);

    await element.evaluate((node: Image) => {
      node.shape = 'rounded';
    });

    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('circular'))).toBe(false);
    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('rounded'))).toBe(true);

    await element.evaluate((node: Image) => {
      node.shape = 'square';
    });

    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('rounded'))).toBe(false);
    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('square'))).toBe(true);

    await element.evaluate((node: Image) => {
      node.shape = undefined;
    });

    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('rounded'))).toBe(false);
    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('square'))).toBe(false);
    expect(await element.evaluate((node: Image) => node.elementInternals.states.has('circular'))).toBe(false);
  });
});
