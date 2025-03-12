import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

test.describe('<tree-item>', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-tree-item'));
    await page.waitForFunction(() => customElements.whenDefined('fluent-tree-item'));
  });

  test('should work with basic rendering', async ({ page }) => {
    await page.setContent(/* html */ `
        <fluent-tree-item>Item 1</fluent-tree-item>
        <fluent-tree-item>Item 2</fluent-tree-item>
    `);
    const treeItems = page.locator('fluent-tree-item');
    await expect(treeItems).toHaveCount(2);
    await expect(treeItems.nth(0)).toHaveText('Item 1');
    await expect(treeItems.nth(1)).toHaveText('Item 2');
  });

  test('should work with basic rendering - nested', async ({ page }) => {
    await page.setContent(/* html */ `
        <fluent-tree-item>
          Item 1
          <fluent-tree-item>Nested Item A</fluent-tree-item>
        </fluent-tree-item>
        <fluent-tree-item>
          Item 2
          <fluent-tree-item>Nested Item B</fluent-tree-item>
        </fluent-tree-item>
      `);
    const treeItems = page.locator('fluent-tree-item');
    await expect(treeItems).toHaveCount(4);
    const nestedItems = treeItems.nth(0).locator('fluent-tree-item');
    await expect(nestedItems).toHaveCount(1);
  });

  test('should work with expanded attribute', async ({ page }) => {
    await page.setContent(`
        <fluent-tree-item>
          Item 1
          <fluent-tree-item>Nested Item A</fluent-tree-item>
        </fluent-tree-item>
    `);
    const treeItemEl = page.locator('fluent-tree-item');
    expect(await treeItemEl.nth(0).getAttribute('expanded')).toBeNull();
    const nestedItems = treeItemEl.nth(0).locator('fluent-tree-item');
    await expect(nestedItems).toBeHidden();
    // expand
    await page.setContent(`
        <fluent-tree-item expanded>
          Item 1
          <fluent-tree-item>Nested Item A</fluent-tree-item>
        </fluent-tree-item>
    `);
    expect(await treeItemEl.nth(0).getAttribute('expanded')).not.toBeNull();
    await expect(nestedItems).toBeVisible();
  });

  test('should work with selected attribute', async ({ page }) => {
    await page.setContent(`
        <fluent-tree-item>
          Item 1
        </fluent-tree-item>
    `);
    const treeItemEl = page.locator('fluent-tree-item');
    expect(await treeItemEl.getAttribute('selected')).toBeNull();
    // selected
    await page.setContent(`
        <fluent-tree-item selected>
          Item 1
        </fluent-tree-item>
    `);
    expect(await treeItemEl.getAttribute('selected')).not.toBeNull();
  });
});
