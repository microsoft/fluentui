import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Badge } from './badge.js';

test.describe('Badge component', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-badge');
    root = page.locator('#root');

    await page.goto(fixtureURL('components-badge--badge'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should set default attribute values', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-badge></fluent-badge>
            `;
    });
    await expect(element).toHaveAttribute('appearance', 'filled');
    await expect(element).toHaveJSProperty('appearance', 'filled');

    await expect(element).toHaveAttribute('color', 'brand');
    await expect(element).toHaveJSProperty('color', 'brand');
  });

  test('should reflect color attribute and update property', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-badge color="brand"></fluent-badge>
            `;
    });
    await expect(element).toHaveAttribute('color', 'brand');
    await expect(element).toHaveJSProperty('color', 'brand');

    await element.evaluate((node: Badge) => {
      node.color = 'danger';
    });
    await expect(element).toHaveAttribute('color', 'danger');
    await expect(element).toHaveJSProperty('color', 'danger');

    await element.evaluate((node: Badge) => {
      node.color = 'important';
    });
    await expect(element).toHaveAttribute('color', 'important');
    await expect(element).toHaveJSProperty('color', 'important');

    await element.evaluate((node: Badge) => {
      node.color = 'informative';
    });
    await expect(element).toHaveAttribute('color', 'informative');
    await expect(element).toHaveJSProperty('color', 'informative');

    await element.evaluate((node: Badge) => {
      node.color = 'severe';
    });
    await expect(element).toHaveAttribute('color', 'severe');
    await expect(element).toHaveJSProperty('color', 'severe');

    await element.evaluate((node: Badge) => {
      node.color = 'subtle';
    });
    await expect(element).toHaveAttribute('color', 'subtle');
    await expect(element).toHaveJSProperty('color', 'subtle');

    await element.evaluate((node: Badge) => {
      node.color = 'success';
    });
    await expect(element).toHaveAttribute('color', 'success');
    await expect(element).toHaveJSProperty('color', 'success');

    await element.evaluate((node: Badge) => {
      node.color = 'warning';
    });
    await expect(element).toHaveAttribute('color', 'warning');
    await expect(element).toHaveJSProperty('color', 'warning');
  });

  test('should reflect size attribute and update property', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-badge size="tiny"></fluent-badge>
            `;
    });
    await expect(element).toHaveAttribute('size', 'tiny');
    await expect(element).toHaveJSProperty('size', 'tiny');

    await element.evaluate((node: Badge) => {
      node.size = 'extra-small';
    });
    await expect(element).toHaveAttribute('size', 'extra-small');
    await expect(element).toHaveJSProperty('size', 'extra-small');

    await element.evaluate((node: Badge) => {
      node.size = 'small';
    });
    await expect(element).toHaveAttribute('size', 'small');
    await expect(element).toHaveJSProperty('size', 'small');

    await element.evaluate((node: Badge) => {
      node.size = 'medium';
    });
    await expect(element).toHaveAttribute('size', 'medium');
    await expect(element).toHaveJSProperty('size', 'medium');

    await element.evaluate((node: Badge) => {
      node.size = 'large';
    });
    await expect(element).toHaveAttribute('size', 'large');
    await expect(element).toHaveJSProperty('size', 'large');

    await element.evaluate((node: Badge) => {
      node.size = 'extra-large';
    });
    await expect(element).toHaveAttribute('size', 'extra-large');
    await expect(element).toHaveJSProperty('size', 'extra-large');
  });

  test('should reflect appearance attribute and update property', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-badge appearance="filled"></fluent-badge>
            `;
    });
    await expect(element).toHaveAttribute('appearance', 'filled');
    await expect(element).toHaveJSProperty('appearance', 'filled');

    await element.evaluate((node: Badge) => {
      node.appearance = 'ghost';
    });
    await expect(element).toHaveAttribute('appearance', 'ghost');
    await expect(element).toHaveJSProperty('appearance', 'ghost');

    await element.evaluate((node: Badge) => {
      node.appearance = 'outline';
    });
    await expect(element).toHaveAttribute('appearance', 'outline');
    await expect(element).toHaveJSProperty('appearance', 'outline');

    await element.evaluate((node: Badge) => {
      node.appearance = 'tint';
    });
    await expect(element).toHaveAttribute('appearance', 'tint');
    await expect(element).toHaveJSProperty('appearance', 'tint');
  });

  test('should reflect shape attribute and update property', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-badge shape="circular"></fluent-badge>
            `;
    });
    await expect(element).toHaveAttribute('shape', 'circular');
    await expect(element).toHaveJSProperty('shape', 'circular');

    await element.evaluate((node: Badge) => {
      node.shape = 'rounded';
    });
    await expect(element).toHaveAttribute('shape', 'rounded');
    await expect(element).toHaveJSProperty('shape', 'rounded');

    await element.evaluate((node: Badge) => {
      node.shape = 'square';
    });
    await expect(element).toHaveAttribute('shape', 'square');
    await expect(element).toHaveJSProperty('shape', 'square');
  });
});
