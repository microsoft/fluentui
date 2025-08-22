import { expect, test } from '../../test/playwright/index.js';
import type { BaseTreeItem } from './tree-item.base.js';

test.describe('Tree Item', () => {
  test.use({
    tagName: 'fluent-tree-item',
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-tree-item');
    });

    expect(hasError).toBe(false);
  });

  test('should work with basic rendering', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({
      innerHTML: `Item 1`,
    });
    await expect(element).toHaveText('Item 1');
  });

  test('should work with basic rendering - nested', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-tree-item>Nested Item A</fluent-tree-item>
      `,
    });

    const nestedItem = element.nth(0).locator('fluent-tree-item');
    await expect(nestedItem).toHaveCount(1);
    await expect(nestedItem).toHaveText('Nested Item A');
  });

  test('should have empty attribute when there are not child tree items', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({
      innerHTML: /* html */ `Item 1
        <span slot="start"></span>
        `,
    });
    await expect(element.nth(0)).toHaveAttribute('empty');
  });

  test('should work with expanded attribute', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({
      innerHTML: /* html */ `
        Item 1
        <fluent-tree-item>Nested Item A</fluent-tree-item>
      `,
    });

    await expect(element.nth(0)).not.toHaveAttribute('expanded');

    const nestedItems = element.locator('fluent-tree-item');
    await expect(nestedItems).toBeHidden();

    await element.nth(0).evaluate((node: BaseTreeItem) => {
      node.expanded = true;
    });
    await expect(element.nth(0)).toHaveAttribute('expanded');
    await expect(nestedItems).toBeVisible();
  });

  test('should not have selected attribute', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({
      innerHTML: `Item 1`,
    });

    expect(await element.getAttribute('selected')).toBeNull();
  });

  test('should have selected attribute', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({
      attributes: { selected: true },
      innerHTML: `Item 1`,
    });
    expect(await element.getAttribute('selected')).not.toBeNull();
  });

  test('should expand parent items when child item is set to selected', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({
      innerHTML: /* html */ `
        Item 1
        <fluent-tree-item>
          Nested Item A
          <fluent-tree-item>
            Nested Item B
            <fluent-tree-item selected>Nested Item C</fluent-tree-item>
          </fluent-tree-item>
        </fluent-tree-item>
      `,
    });
    const selectedItems = element.locator('[selected]');

    await expect(element.nth(0)).toHaveAttribute('expanded');
    await expect(selectedItems).toBeVisible();
  });

  test('should keep intitally set expanded attribute when no child item is set to selected', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({
      attributes: { expanded: true },
      innerHTML: /* html */ `
        Item 1
        <fluent-tree-item>
          Nested Item A
          <fluent-tree-item>
            Nested Item B
            <fluent-tree-item>Nested Item C</fluent-tree-item>
          </fluent-tree-item>
        </fluent-tree-item>
      `,
    });
    const nestedItem = element.nth(0).locator('fluent-tree-item').nth(0);
    await expect(element.nth(0)).toHaveAttribute('expanded');
    await expect(nestedItem).toBeVisible();
  });
});
