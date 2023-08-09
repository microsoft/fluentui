import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

test.describe('Avatar Component', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-avatar');

    root = page.locator('#root');

    await page.goto(fixtureURL('components-avatar--avatar'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should render without crashing', async () => {
    await page.waitForSelector('fluent-avatar');
  });

  test('should generate initials based on the provided name value', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-avatar name="John Doe"></fluent-avatar>
      `;
    });

    await expect(element).toHaveText('JD');
  });

  test('should render with custom initials based on the provided initials value', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-avatar initials="JD"></fluent-avatar>
      `;
    });

    await expect(element).toHaveText('JD');
  });

  test('should set the size attribute to the provided size value', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-avatar size="48"></fluent-avatar>
      `;
    });

    await expect(element).toHaveAttribute('size', '48');
  });

  test('should set the shape attribute to the provided shape value', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-avatar shape="circular"></fluent-avatar>
      `;
    });

    await expect(element).toHaveAttribute('shape', 'circular');
  });

  test('should set the appearance attribute to the provided appearance value', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-avatar appearance="ring"></fluent-avatar>
      `;
    });

    await expect(element).toHaveAttribute('appearance', 'ring');
  });

  test('should set the color attrinute to the provided color value', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-avatar color="brand"></fluent-avatar>
      `;
    });

    await expect(element).toHaveAttribute('color', 'brand');
  });
});
