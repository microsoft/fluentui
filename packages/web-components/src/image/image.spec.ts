import { test } from '@playwright/test';
import { analyzePageWithAxe, createElementInternalsTrapsForAxe, expect, fixtureURL } from '../helpers.tests.js';
import type { Image } from './image.js';

const storybookDocId = 'components-image--docs';

test.describe('Image', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL(storybookDocId));

    await page.waitForFunction(() => customElements.whenDefined('fluent-image'));
  });

  test('should initialize to the `block` attribute when provided', async ({ page }) => {
    const element = page.locator('fluent-image');

    await page.setContent(/* html */ `
      <fluent-image block>
        <img alt="Short image description" src="300x100.png" />
      </fluent-image>
    `);

    await expect(element).toHaveJSProperty('block', true);

    await element.evaluate((node: Image) => {
      node.block = false;
    });

    await expect(element).not.toHaveJSProperty('block', true);
  });

  test('should add a custom state of `block` when a value of true is provided', async ({ page }) => {
    const element = page.locator('fluent-image');

    await page.setContent(/* html */ `
      <fluent-image block>
        <img alt="Short image description" src="300x100.png" />
      </fluent-image>
    `);

    await element.evaluate((node: Image) => {
      node.block = true;
    });

    await expect(element).toHaveCustomState('block');

    await element.evaluate((node: Image) => {
      node.block = false;
    });

    await expect(element).not.toHaveCustomState('block');
  });

  test('should initialize to the `bordered` attribute', async ({ page }) => {
    const element = page.locator('fluent-image');

    await page.setContent(/* html */ `
      <fluent-image bordered>
        <img alt="Short image description" src="300x100.png" />
      </fluent-image>
    `);

    await expect(element).toHaveJSProperty('bordered', true);

    await element.evaluate((node: Image) => {
      node.bordered = undefined;
    });

    await expect(element).not.toHaveJSProperty('bordered', true);
  });

  test('should add a custom state of `bordered` when a value of true is provided', async ({ page }) => {
    const element = page.locator('fluent-image');

    await page.setContent(/* html */ `
      <fluent-image block>
        <img alt="Short image description" src="300x100.png" />
      </fluent-image>
    `);

    await element.evaluate((node: Image) => {
      node.bordered = true;
    });

    await expect(element).toHaveCustomState('bordered');

    await element.evaluate((node: Image) => {
      node.bordered = false;
    });

    await expect(element).not.toHaveCustomState('bordered');
  });

  test('should initialize to the `shadow` attribute', async ({ page }) => {
    const element = page.locator('fluent-image');

    await page.setContent(/* html */ `
      <fluent-image shadow>
        <img alt="Short image description" src="300x100.png" />
      </fluent-image>
    `);

    await expect(element).toHaveJSProperty('shadow', true);

    await element.evaluate((node: Image) => {
      node.shadow = undefined;
    });

    await expect(element).not.toHaveJSProperty('shadow', true);
  });

  test('should add a custom state of `shadow` when a value of true is provided', async ({ page }) => {
    const element = page.locator('fluent-image');

    await page.setContent(/* html */ `
      <fluent-image block>
        <img alt="Short image description" src="300x100.png" />
      </fluent-image>
    `);

    await element.evaluate((node: Image) => {
      node.shadow = true;
    });

    await expect(element).toHaveCustomState('shadow');

    await element.evaluate((node: Image) => {
      node.shadow = false;
    });

    await expect(element).not.toHaveCustomState('shadow');
  });

  test('should initialize to the `fit` attribute', async ({ page }) => {
    const element = page.locator('fluent-image');

    await page.setContent(/* html */ `
      <fluent-image fit="default">
        <img alt="Short image description" src="300x100.png" />
      </fluent-image>
    `);

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

  test('should add a custom state matching the `fit` attribute when provided', async ({ page }) => {
    const element = page.locator('fluent-image');

    await page.setContent(/* html */ `
      <fluent-image block>
        <img alt="Short image description" src="300x100.png" />
      </fluent-image>
    `);

    await element.evaluate((node: Image) => {
      node.fit = 'contain';
    });

    await expect(element).toHaveCustomState('fit-contain');

    await element.evaluate((node: Image) => {
      node.fit = 'none';
    });

    await expect(element).not.toHaveCustomState('fit-contain');

    await expect(element).toHaveCustomState('fit-none');

    await element.evaluate((node: Image) => {
      node.fit = 'cover';
    });

    await expect(element).not.toHaveCustomState('fit-none');

    await expect(element).toHaveCustomState('fit-cover');
  });

  test('should initialize to the `shape` attribute', async ({ page }) => {
    const element = page.locator('fluent-image');

    await page.setContent(/* html */ `
      <fluent-image shape="circular">
        <img alt="Short image description" src="300x100.png" />
      </fluent-image>
    `);

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

  test('should add a custom state matching the `shape` attribute when provided', async ({ page }) => {
    const element = page.locator('fluent-image');

    await page.setContent(/* html */ `
      <fluent-image block>
        <img alt="Short image description" src="300x100.png" />
      </fluent-image>
    `);

    await element.evaluate((node: Image) => {
      node.shape = 'circular';
    });

    await expect(element).toHaveCustomState('circular');

    await element.evaluate((node: Image) => {
      node.shape = 'rounded';
    });

    await expect(element).not.toHaveCustomState('circular');

    await expect(element).toHaveCustomState('rounded');

    await element.evaluate((node: Image) => {
      node.shape = 'square';
    });

    await expect(element).not.toHaveCustomState('rounded');

    await expect(element).toHaveCustomState('square');

    await element.evaluate((node: Image) => {
      node.shape = undefined;
    });

    await expect(element).not.toHaveCustomState('rounded');

    await expect(element).not.toHaveCustomState('square');

    await expect(element).not.toHaveCustomState('circular');
  });
});

test('should not have auto detectable accessibility issues', async ({ page }) => {
  await createElementInternalsTrapsForAxe(page);

  await page.goto(fixtureURL(storybookDocId));
  await page.waitForFunction(() => customElements.whenDefined('fluent-image'));

  const results = await analyzePageWithAxe(page);

  expect(results.violations).toEqual([]);
});
