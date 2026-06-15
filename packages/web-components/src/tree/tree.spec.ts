import { expect, test } from '../../test/playwright/index.js';
import { tagName as TreeItemTagName } from '../tree-item/tree-item.options.js';
import { tagName } from './tree.options.js';

test.describe('Tree', () => {
  test.use({
    tagName,
    waitFor: [TreeItemTagName],
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(tagName => {
      document.createElement(tagName);
    }, tagName);

    expect(hasError).toBe(false);
  });

  test('should work with basic rendering', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TreeItemTagName}>Item 1</${TreeItemTagName}>
        <${TreeItemTagName}>Item 2</${TreeItemTagName}>
        <${TreeItemTagName}>Item 3</${TreeItemTagName}>
      `,
    });
    const treeItems = element.locator(TreeItemTagName);
    await expect(element).toHaveCount(1);
    await expect(treeItems).toHaveCount(3);
    await expect(treeItems.nth(0)).toHaveText('Item 1');
    await expect(treeItems.nth(1)).toHaveText('Item 2');
    await expect(treeItems.nth(2)).toHaveText('Item 3');
  });

  test('should work with basic rendering - nested', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TreeItemTagName}>
          Item 1
          <${TreeItemTagName}>Nested Item A</${TreeItemTagName}>
        </${TreeItemTagName}>
        <${TreeItemTagName}>
          Item 2
          <${TreeItemTagName}>Nested Item B</${TreeItemTagName}>
        </${TreeItemTagName}>
      `,
    });
    const treeItems = element.locator(TreeItemTagName);
    await expect(element).toHaveCount(1);
    await expect(treeItems).toHaveCount(4);
    const nestedItems = treeItems.nth(0).locator(TreeItemTagName);
    await expect(nestedItems).toHaveCount(1);
  });

  test('works with size variants - small', async ({ fastPage }) => {
    const { element } = fastPage;
    const treeItemEl = element.locator(TreeItemTagName);

    await fastPage.setTemplate({
      attributes: { size: 'small' },
      innerHTML: /* html */ ` <${TreeItemTagName}>Item 1</${TreeItemTagName}> `,
    });

    await expect(treeItemEl).toHaveCount(1);
    await expect(treeItemEl).toHaveAttribute('size', 'small');
    const box = await treeItemEl.boundingBox();
    expect(box?.height).toEqual(24);
  });

  test('works with size variants - medium', async ({ fastPage }) => {
    const { element } = fastPage;
    const treeItemEl = element.locator(TreeItemTagName);

    await fastPage.setTemplate({
      attributes: { size: 'medium' },
      innerHTML: /* html */ ` <${TreeItemTagName}>Item 1</${TreeItemTagName}> `,
    });
    await expect(treeItemEl).toHaveCount(1);
    await expect(treeItemEl).toHaveAttribute('size', 'medium');
    const box2 = await treeItemEl.boundingBox();
    expect(box2?.height).toEqual(32);
  });

  test('works with appearance variants - subtle', async ({ fastPage }) => {
    const { element } = fastPage;
    const treeItemEl = element.locator(TreeItemTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ ` <${TreeItemTagName}>Item 1</${TreeItemTagName}> `,
    });

    await expect(treeItemEl).toHaveAttribute('appearance', 'subtle');
  });

  test('works with appearance variants - subtle-alpha', async ({ fastPage }) => {
    const { element } = fastPage;
    const treeItemEl = element.locator(TreeItemTagName);

    await fastPage.setTemplate({
      attributes: { appearance: 'subtle-alpha' },
      innerHTML: /* html */ `
        <${TreeItemTagName}>Item 1</${TreeItemTagName}>
      `,
    });

    await expect(treeItemEl).toHaveAttribute('appearance', 'subtle-alpha');
  });

  test('works with appearance variants - transparent', async ({ fastPage }) => {
    const { element } = fastPage;
    const treeItemEl = element.locator(TreeItemTagName);

    await fastPage.setTemplate({
      attributes: { appearance: 'transparent' },
      innerHTML: /* html */ `
        <${TreeItemTagName}>Item 1</${TreeItemTagName}>
      `,
    });

    await expect(treeItemEl).toHaveAttribute('appearance', 'transparent');
  });

  test('should expand the item when clicking on it', async ({ fastPage }) => {
    const { element } = fastPage;
    const treeItem = element.locator('#click-tree-item');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TreeItemTagName} id="click-tree-item">
          Item 1
          <${TreeItemTagName}>Nested Item A</${TreeItemTagName}>
        </${TreeItemTagName}>
      `,
    });

    await expect(treeItem).not.toHaveAttribute('expanded');

    // expand
    await treeItem.click();
    await expect(treeItem).toHaveAttribute('expanded');

    // collapse
    await treeItem.click({
      position: { x: 1, y: 1 }, // click on the top left
    });
    await expect(treeItem).not.toHaveAttribute('expanded');
  });

  test('should work with selection', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TreeItemTagName}>Item 1</${TreeItemTagName}>
        <${TreeItemTagName}>Item 2</${TreeItemTagName}>
      `,
    });
    const treeItemEl = element.locator(TreeItemTagName);
    await expect(element).toHaveCount(1);
    await expect(treeItemEl).toHaveCount(2);
    await expect(treeItemEl.nth(0)).not.toHaveAttribute('selected');
    await expect(treeItemEl.nth(1)).not.toHaveAttribute('selected');
    // select item 1
    await treeItemEl.nth(0).click();
    await expect(treeItemEl.nth(0)).toHaveAttribute('selected');
    await expect(treeItemEl.nth(1)).not.toHaveAttribute('selected');
    // select item 2
    await treeItemEl.nth(1).click();
    await expect(treeItemEl.nth(0)).not.toHaveAttribute('selected');
    await expect(treeItemEl.nth(1)).toHaveAttribute('selected');
    // select item 2 again
    await treeItemEl.nth(1).click();
    await expect(treeItemEl.nth(0)).not.toHaveAttribute('selected');
    await expect(treeItemEl.nth(1)).toHaveAttribute('selected');
  });

  test('should not scroll when pressing space key', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TreeItemTagName}>Item 1</${TreeItemTagName}>
      `,
    });
    // mock scroll event
    const elementHandle = Promise.race([
      element.evaluate(node => new Promise(resolve => node.addEventListener('scroll', () => resolve(true)))),
      new Promise(resolve => setTimeout(() => resolve(false), 10)),
    ]);
    await element.evaluate((node, tagName) => {
      for (let i = 0; i < 30; i++) {
        node.appendChild(document.createElement(tagName));
      }
    }, TreeItemTagName);
    expect(await element.evaluate(node => node.children.length)).toBe(31);

    const treeItem1 = element.locator(TreeItemTagName).nth(0);
    expect(await treeItem1.getAttribute('selected')).toBeNull();

    await treeItem1.focus();
    expect(await elementHandle).toBe(false);
    await page.keyboard.press('Space');

    await expect(treeItem1).toHaveAttribute('selected');
    expect(await elementHandle).toBe(false);
  });

  test('keyboard navigation should work when the tree-item contains focusable elements', async ({
    fastPage,
    page,
    browserName,
  }) => {
    const anchor = page.locator('a');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TreeItemTagName}>
          Item1
          <a href="#" focusgroup="none">Link1</a>
        </${TreeItemTagName}>
        <${TreeItemTagName}>Item 2</${TreeItemTagName}>
      `,
    });

    const treeItems = page.locator(TreeItemTagName);
    await treeItems.nth(0).focus();
    await expect(treeItems.nth(0)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(treeItems.nth(0)).toHaveAttribute('selected');
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
    await expect(anchor).toBeFocused();
  });
  test('should move focus down with ArrowDown', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const treeItems = element.locator(`:scope > ${TreeItemTagName}`);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TreeItemTagName}>Item 1</${TreeItemTagName}>
        <${TreeItemTagName}>Item 2</${TreeItemTagName}>
        <${TreeItemTagName}>Item 3</${TreeItemTagName}>
      `,
    });

    await treeItems.nth(0).focus();
    await expect(treeItems.nth(0)).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(treeItems.nth(1)).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(treeItems.nth(2)).toBeFocused();
  });

  test('should move focus up with ArrowUp', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const treeItems = element.locator(`:scope > ${TreeItemTagName}`);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TreeItemTagName}>Item 1</${TreeItemTagName}>
        <${TreeItemTagName}>Item 2</${TreeItemTagName}>
        <${TreeItemTagName}>Item 3</${TreeItemTagName}>
      `,
    });

    await treeItems.nth(0).focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(treeItems.nth(2)).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(treeItems.nth(1)).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(treeItems.nth(0)).toBeFocused();
  });

  test('should expand a collapsed item with ArrowRight', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const parentItem = element.locator(`:scope > ${TreeItemTagName}`);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TreeItemTagName}>
          Item 1
          <${TreeItemTagName} slot="item">Nested Item A</${TreeItemTagName}>
        </${TreeItemTagName}>
      `,
    });

    await parentItem.focus();
    await expect(parentItem).toBeFocused();
    await expect(parentItem).not.toHaveAttribute('expanded');

    await page.keyboard.press('ArrowRight');
    await expect(parentItem).toHaveAttribute('expanded');
  });

  test('should focus child after ArrowRight on an expanded item', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const parentItem = element.locator(`:scope > ${TreeItemTagName}`);
    const nestedItem = parentItem.locator(TreeItemTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TreeItemTagName}>
          Item 1
          <${TreeItemTagName} slot="item">Nested Item A</${TreeItemTagName}>
        </${TreeItemTagName}>
      `,
    });

    await parentItem.focus();
    // expand first
    await page.keyboard.press('ArrowRight');
    await expect(parentItem).toHaveAttribute('expanded');
    await expect(nestedItem).toBeVisible();

    // arrow right again should focus the nested item
    await page.keyboard.press('ArrowRight');
    await expect(nestedItem).toBeFocused();
  });

  test('should collapse an expanded item with ArrowLeft', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const parentItem = element.locator(`:scope > ${TreeItemTagName}`);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TreeItemTagName}>
          Item 1
          <${TreeItemTagName} slot="item">Nested Item A</${TreeItemTagName}>
        </${TreeItemTagName}>
      `,
    });

    await parentItem.focus();
    await page.keyboard.press('ArrowRight');
    await expect(parentItem).toHaveAttribute('expanded');

    await page.keyboard.press('ArrowLeft');
    await expect(parentItem).not.toHaveAttribute('expanded');
  });

  test('should focus parent item with ArrowLeft on a nested item', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const parentItem = element.locator(`:scope > ${TreeItemTagName}`);
    const nestedItem = parentItem.locator(TreeItemTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TreeItemTagName}>
          Item 1
          <${TreeItemTagName} slot="item">Nested Item A</${TreeItemTagName}>
        </${TreeItemTagName}>
      `,
    });

    await parentItem.focus();
    // expand and wait for nested item to be visible
    await page.keyboard.press('ArrowRight');
    await expect(parentItem).toHaveAttribute('expanded');
    await expect(nestedItem).toBeVisible();

    // focus nested item
    await page.keyboard.press('ArrowRight');
    await expect(nestedItem).toBeFocused();

    // arrow left on leaf should focus parent
    await page.keyboard.press('ArrowLeft');
    await expect(parentItem).toBeFocused();
  });

  test('should focus first item with Home key', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const treeItems = element.locator(`:scope > ${TreeItemTagName}`);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TreeItemTagName}>Item 1</${TreeItemTagName}>
        <${TreeItemTagName}>Item 2</${TreeItemTagName}>
        <${TreeItemTagName}>Item 3</${TreeItemTagName}>
      `,
    });

    await treeItems.nth(0).focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(treeItems.nth(2)).toBeFocused();

    await page.keyboard.press('Home');
    await expect(treeItems.nth(0)).toBeFocused();
  });

  test('should focus last item with End key', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const treeItems = element.locator(`:scope > ${TreeItemTagName}`);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TreeItemTagName}>Item 1</${TreeItemTagName}>
        <${TreeItemTagName}>Item 2</${TreeItemTagName}>
        <${TreeItemTagName}>Item 3</${TreeItemTagName}>
      `,
    });

    await treeItems.nth(0).focus();
    await expect(treeItems.nth(0)).toBeFocused();

    await page.keyboard.press('End');
    await expect(treeItems.nth(2)).toBeFocused();
  });
});

test.describe('Tree upgrade order', () => {
  test('should apply tree state when tree items upgrade after the tree', async ({ fastPage }) => {
    await fastPage.page.goto('/test/parent-child-upgrade-order.html');

    const result = await fastPage.page.evaluate(async () => {
      return (
        window as unknown as {
          runTreeUpgradeOrderTest(): Promise<{
            childTreeItemsLength: number;
            currentSelectedLocalName: string | undefined;
            firstItemSize: string;
            hasOwnSize: boolean;
          }>;
        }
      ).runTreeUpgradeOrderTest();
    });

    expect(result.childTreeItemsLength).toBe(2);
    expect(result.currentSelectedLocalName).toContain('tree-item');
    expect(result.firstItemSize).toBe('medium');
    expect(result.hasOwnSize).toBe(false);
  });
});
