import { TreeView } from './tree-view.js';
import { TreeItem } from '../tree-item/tree-item.js';
import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

test.describe('<tree-view> and <tree-item>', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-treeview--tree-view'));
    await page.waitForFunction(() => customElements.whenDefined('fluent-tree-view'));
  });


  test('should work with basic rendering', async ({ page }) => {
    await page.setContent(/* html */ `
      <fluent-tree-view>
        <fluent-tree-item>Item 1</fluent-tree-item>
        <fluent-tree-item>Item 2</fluent-tree-item>
        <fluent-tree-item>Item 3</fluent-tree-item>
      </fluent-tree-view>
    `);
    const treeView = page.locator('fluent-tree-view');
    const treeItems = page.locator('fluent-tree-item');
    await expect(treeView).toHaveCount(1);
    await expect(treeItems).toHaveCount(3);
    await expect(treeItems.nth(0)).toHaveText('Item 1');
    await expect(treeItems.nth(1)).toHaveText('Item 2');
    await expect(treeItems.nth(2)).toHaveText('Item 3');
  });

  test('should work with basic rendering - nested', async ({ page }) => {
    await page.setContent(/* html */ `
      <fluent-tree-view>
        <fluent-tree-item>
          Item 1
          <fluent-tree-item>Nested Item A</fluent-tree-item>
        </fluent-tree-item>
        <fluent-tree-item>
          Item 2
          <fluent-tree-item>Nested Item B</fluent-tree-item>
        </fluent-tree-item>
      </fluent-tree-view>
      `);
    const treeView = page.locator('fluent-tree-view');
    const treeItems = page.locator('fluent-tree-item');
    await expect(treeView).toHaveCount(1);
    await expect(treeItems).toHaveCount(4);
    const nestedItems = await treeItems.nth(0).locator('fluent-tree-item');
    expect(nestedItems).toHaveCount(1);
  });

  test('works with size variants', async ({ page }) => {
    await page.setContent(`
      <fluent-tree-view size='small'>
        <fluent-tree-item>Item 1</fluent-tree-item>
      </fluent-tree-view>
    `);
    const treeViewEl = page.locator('fluent-tree-view');
    const treeItemEl = treeViewEl.locator('fluent-tree-item');
    expect(treeItemEl).toHaveCount(1);
    expect(treeViewEl).toHaveAttribute('size', 'small');
    const box = await treeItemEl.boundingBox();
    expect(box?.height).toEqual(24);

    await page.setContent(`
      <fluent-tree-view size='medium'>
        <fluent-tree-item>Item 1</fluent-tree-item>
      </fluent-tree-view>
    `);
    expect(treeItemEl).toHaveCount(1);
    expect(treeViewEl).toHaveAttribute('size', 'medium');
    const box2 = await treeItemEl.boundingBox();
    expect(box2?.height).toEqual(32);
  });

  test('works with appearance variants', async ({ page }) => {
    await page.setContent(`
      <fluent-tree-view>
        <fluent-tree-item>Item 1</fluent-tree-item>
      </fluent-tree-view>
    `);
    const treeViewEl = page.locator('fluent-tree-view');
    expect(await treeViewEl.evaluate(node => node.children[0].classList.contains('subtle'))).toBe(true);

    await page.setContent(`
      <fluent-tree-view appearance='subtle-alpha'>
        <fluent-tree-item>Item 1</fluent-tree-item>
      </fluent-tree-view>
    `);
    const treeItemEl = treeViewEl.locator('fluent-tree-item');
    expect(treeItemEl).toHaveCount(1);
    expect(await treeViewEl.evaluate(node => node.children[0].classList.contains('subtle-alpha'))).toBe(true);

    await page.setContent(`
      <fluent-tree-view appearance='transparent'>
        <fluent-tree-item>Item 1</fluent-tree-item>
      </fluent-tree-view>
    `);
    expect(await treeViewEl.evaluate(node => node.children.length)).toBe(1);
    expect(await treeViewEl.evaluate(node => node.children[0].classList.contains('transparent'))).toBe(true);
  });

  test.only('should expand the item when clicking on it', async ({ page }) => {
    await page.setContent(`
      <fluent-tree-view>
        <fluent-tree-item>
          Item 1
          <fluent-tree-item>Nested Item A</fluent-tree-item>
        </fluent-tree-item>
      </fluent-tree-view>
    `);
    const treeViewEl = page.locator('fluent-tree-view');
    expect(await treeViewEl.evaluate(node => node.children.length)).toBe(1);

    const treeItem = treeViewEl.locator('fluent-tree-item');
    expect(await treeItem.nth(0).getAttribute('expanded')).toBeNull();

    // expand
    await treeItem.nth(0).click();
    expect(await treeItem.nth(0).getAttribute('expanded')).not.toBeNull();

    // collapes
    await treeItem.nth(0).click({
      position: { x: 10, y: 10 } // click on the top left
    });
    expect(await treeItem.nth(0).getAttribute('expanded')).toBeNull();
  });

  test('should work with selection', async ({ page }) => {
    await page.setContent(`
      <fluent-tree-view>
        <fluent-tree-item>Item 1</fluent-tree-item>
        <fluent-tree-item>Item 2</fluent-tree-item>
      </fluent-tree-view>
    `);
    const treeViewEl = page.locator('fluent-tree-view');
    const treeItemEl = treeViewEl.locator('fluent-tree-item');
    expect(treeViewEl).toHaveCount(1);
    expect(treeItemEl).toHaveCount(2);
    expect(await treeItemEl.nth(0).getAttribute('selected')).toBeNull();
    expect(await treeItemEl.nth(1).getAttribute('selected')).toBeNull();
    // select item 1
    await treeItemEl.nth(0).click();
    expect(await treeItemEl.nth(0).getAttribute('selected')).not.toBeNull();
    expect(await treeItemEl.nth(1).getAttribute('selected')).toBeNull();
    // select item 2
    await treeItemEl.nth(1).click();
    expect(await treeItemEl.nth(0).getAttribute('selected')).toBeNull();
    expect(await treeItemEl.nth(1).getAttribute('selected')).not.toBeNull();
  });

  test('should not scroll when pressing space key', async ({ page }) => {
    await page.setContent(`
      <fluent-tree-view>
        <fluent-tree-item>Item 1</fluent-tree-item>
      </fluent-tree-view>
    `);
    const treeViewEl = page.locator('fluent-tree-view');
    // mock scroll event
    const elementHandle = Promise.race([
      treeViewEl.evaluate(node => new Promise(resolve => node.addEventListener('scroll', () => resolve(true)))),
      new Promise(resolve => setTimeout(() => resolve(false), 10)),
    ]);
    await treeViewEl.evaluate(node => {
      for (let i = 0; i < 30; i++) {
        node.appendChild(document.createElement('fluent-tree-item'));
      }
    })
    expect(await treeViewEl.evaluate(node => node.children.length)).toBe(31);

    const treeItem1 = treeViewEl.locator('fluent-tree-item').nth(0);
    expect(await treeItem1.getAttribute('selected')).toBeNull();

    await treeItem1.focus();
    expect(await elementHandle).toBe(false);
    await page.keyboard.press('Space');

    expect(await treeItem1.getAttribute('selected')).not.toBeNull();
    expect(await elementHandle).toBe(false);
  });
});
