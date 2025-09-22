import { expect, test } from '../../test/playwright/index.js';

test.describe('Tree', () => {
  test.use({
    tagName: 'fluent-tree',
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-tree');
    });

    expect(hasError).toBe(false);
  });

  test('should work with basic rendering', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      innerHTML: /* html */ `
          <fluent-tree-item>Item 1</fluent-tree-item>
          <fluent-tree-item>Item 2</fluent-tree-item>
          <fluent-tree-item>Item 3</fluent-tree-item>
      `,
    });
    const treeItems = element.locator('fluent-tree-item');
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
        <fluent-tree-item>
          Item 1
          <fluent-tree-item>Nested Item A</fluent-tree-item>
        </fluent-tree-item>
        <fluent-tree-item>
          Item 2
          <fluent-tree-item>Nested Item B</fluent-tree-item>
        </fluent-tree-item>
      `,
    });
    const treeItems = element.locator('fluent-tree-item');
    await expect(element).toHaveCount(1);
    await expect(treeItems).toHaveCount(4);
    const nestedItems = treeItems.nth(0).locator('fluent-tree-item');
    await expect(nestedItems).toHaveCount(1);
  });

  test('works with size variants - small', async ({ fastPage }) => {
    const { element } = fastPage;
    const treeItemEl = element.locator('fluent-tree-item');

    await fastPage.setTemplate({
      attributes: { size: 'small' },
      innerHTML: /* html */ `
          <fluent-tree-item>Item 1</fluent-tree-item>
      `,
    });

    await expect(treeItemEl).toHaveCount(1);
    await expect(treeItemEl).toHaveAttribute('size', 'small');
    const box = await treeItemEl.boundingBox();
    expect(box?.height).toEqual(24);
  });

  test('works with size variants - medium', async ({ fastPage }) => {
    const { element } = fastPage;
    const treeItemEl = element.locator('fluent-tree-item');

    await fastPage.setTemplate({
      attributes: { size: 'medium' },
      innerHTML: /* html */ `
          <fluent-tree-item>Item 1</fluent-tree-item>
      `,
    });
    await expect(treeItemEl).toHaveCount(1);
    await expect(treeItemEl).toHaveAttribute('size', 'medium');
    const box2 = await treeItemEl.boundingBox();
    expect(box2?.height).toEqual(32);
  });

  test('works with appearance variants - subtle', async ({ fastPage }) => {
    const { element } = fastPage;
    const treeItemEl = element.locator('fluent-tree-item');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
          <fluent-tree-item>Item 1</fluent-tree-item>
      `,
    });

    await expect(treeItemEl).toHaveAttribute('appearance', 'subtle');
  });

  test('works with appearance variants - subtle-alpha', async ({ fastPage }) => {
    const { element } = fastPage;
    const treeItemEl = element.locator('fluent-tree-item');

    await fastPage.setTemplate({
      attributes: { appearance: 'subtle-alpha' },
      innerHTML: /* html */ `
          <fluent-tree-item>Item 1</fluent-tree-item>
      `,
    });

    await expect(treeItemEl).toHaveAttribute('appearance', 'subtle-alpha');
  });

  test('works with appearance variants - transparent', async ({ fastPage }) => {
    const { element } = fastPage;
    const treeItemEl = element.locator('fluent-tree-item');

    await fastPage.setTemplate({
      attributes: { appearance: 'transparent' },
      innerHTML: /* html */ `
          <fluent-tree-item>Item 1</fluent-tree-item>
      `,
    });

    await expect(treeItemEl).toHaveAttribute('appearance', 'transparent');
  });

  test('should expand the item when clicking on it', async ({ fastPage }) => {
    const { element } = fastPage;
    const treeItem = element.locator('#click-tree-item');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
          <fluent-tree-item id="click-tree-item">
            Item 1
            <fluent-tree-item>Nested Item A</fluent-tree-item>
          </fluent-tree-item>
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
          <fluent-tree-item>Item 1</fluent-tree-item>
          <fluent-tree-item>Item 2</fluent-tree-item>
      `,
    });
    const treeItemEl = element.locator('fluent-tree-item');
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
          <fluent-tree-item>Item 1</fluent-tree-item>
      `,
    });
    // mock scroll event
    const elementHandle = Promise.race([
      element.evaluate(node => new Promise(resolve => node.addEventListener('scroll', () => resolve(true)))),
      new Promise(resolve => setTimeout(() => resolve(false), 10)),
    ]);
    await element.evaluate(node => {
      for (let i = 0; i < 30; i++) {
        node.appendChild(document.createElement('fluent-tree-item'));
      }
    });
    expect(await element.evaluate(node => node.children.length)).toBe(31);

    const treeItem1 = element.locator('fluent-tree-item').nth(0);
    expect(await treeItem1.getAttribute('selected')).toBeNull();

    await element.focus();
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
    const { element } = fastPage;
    const anchor = page.locator('a');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
          <fluent-tree-item>
            Item1
            <a href='edge://settings'>Link1</a>
          </fluent-tree-item>
          <fluent-tree-item>Item 2</fluent-tree-item>
      `,
    });

    const treeItems = page.locator('fluent-tree-item');
    await element.focus();
    await expect(treeItems.nth(0)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(treeItems.nth(0)).toHaveAttribute('selected');
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
    await expect(anchor).toBeFocused();
  });
});
