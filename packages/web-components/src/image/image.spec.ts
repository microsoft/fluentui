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

  test('should initialize to the provided value attribute if set post-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-image>
          <img alt="Short image description" src="https://picsum.photos/300/100">
        </fluent-image>
      `;
    });

    await element.evaluate((node: Image) => {
      node.block = true;
    });
    await expect(element).toHaveJSProperty('block', true);

    await element.evaluate((node: Image) => {
      node.block = false;
    });
    await expect(element).toHaveJSProperty('block', false);

    await element.evaluate((node: Image) => {
      node.bordered = true;
    });
    await expect(element).toHaveJSProperty('bordered', true);

    await element.evaluate((node: Image) => {
      node.bordered = undefined;
    });
    await expect(element).toHaveJSProperty('bordered', false);

    await element.evaluate((node: Image) => {
      node.shadow = true;
    });
    await expect(element).toHaveJSProperty('shadow', true);

    await element.evaluate((node: Image) => {
      node.shadow = undefined;
    });
    await expect(element).toHaveJSProperty('shadow', false);

    await element.evaluate((node: Image) => {
      node.fit = 'default';
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

    await element.evaluate((node: Image) => {
      node.shape = 'circular';
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
});
