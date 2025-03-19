import { expect, test } from '../../test/playwright/index.js';
import type { BaseTreeItem } from './tree-item.base.js';

test.describe('Tree Item', () => {
  test.use({
    tagName: 'fluent-tree-item',
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
});
