import { treeItemBehavior } from '@fluentui/accessibility';

describe('TreeItemBehavior', () => {
  describe('tabIndex', () => {
    test(`is added with '0' value to an item that is expandable`, () => {
      const expectedResult = treeItemBehavior({ hasSubtree: true });
      expect(expectedResult.attributes.root.tabIndex).toEqual(-1);
    });

    test(`is not added to a leaf item (no items)`, () => {
      const expectedResult = treeItemBehavior({});
      expect(expectedResult.attributes.root.tabIndex).toBeUndefined();
    });
  });

  describe('aria-expanded', () => {
    test(`is not added to a leaf item`, () => {
      const expectedResult = treeItemBehavior({});
      expect(expectedResult.attributes.root['aria-expanded']).toBeUndefined();
    });

    test(`is added with 'false' value to an item that is expandable but not open`, () => {
      const expectedResult = treeItemBehavior({ hasSubtree: true, expanded: false });
      expect(expectedResult.attributes.root['aria-expanded']).toEqual(false);
    });

    test(`is added with 'false' value to an item that is expandable and open`, () => {
      const expectedResult = treeItemBehavior({ hasSubtree: true, expanded: true });
      expect(expectedResult.attributes.root['aria-expanded']).toEqual(true);
    });
  });

  describe('role', () => {
    test(`is 'treeitem' if not a leaf`, () => {
      const expectedResult = treeItemBehavior({ hasSubtree: true });
      expect(expectedResult.attributes.root.role).toEqual('treeitem');
    });

    test(`is 'none' if a leaf`, () => {
      const expectedResult = treeItemBehavior({});
      expect(expectedResult.attributes.root.role).toEqual('none');
    });
  });
});
