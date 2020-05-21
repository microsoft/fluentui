import { hierarchicalTreeItemBehavior } from '@fluentui/accessibility';

describe('HierarchicalTreeItemBehavior', () => {
  describe('tabIndex', () => {
    test(`is added with '0' value to an item that is expandable`, () => {
      const expectedResult = hierarchicalTreeItemBehavior({ hasItems: true });
      expect(expectedResult.attributes.root.tabIndex).toEqual(-1);
    });

    test(`is not added to a leaf item (no items)`, () => {
      const expectedResult = hierarchicalTreeItemBehavior({});
      expect(expectedResult.attributes.root.tabIndex).toBeUndefined();
    });

    test(`is not added to a leaf item (empty items)`, () => {
      const expectedResult = hierarchicalTreeItemBehavior({ hasItems: false });
      expect(expectedResult.attributes.root.tabIndex).toBeUndefined();
    });
  });

  describe('aria-expanded', () => {
    test(`is not added to a leaf item`, () => {
      const expectedResult = hierarchicalTreeItemBehavior({});
      expect(expectedResult.attributes.root['aria-expanded']).toBeUndefined();
    });

    test(`is added with 'false' value to an item that is expandable but not open`, () => {
      const expectedResult = hierarchicalTreeItemBehavior({
        hasItems: true,
        open: false,
      });
      expect(expectedResult.attributes.root['aria-expanded']).toEqual(false);
    });

    test(`is added with 'false' value to an item that is expandable and open`, () => {
      const expectedResult = hierarchicalTreeItemBehavior({ hasItems: true, open: true });
      expect(expectedResult.attributes.root['aria-expanded']).toEqual(true);
    });
  });

  describe('role', () => {
    test(`is 'treeitem' if not a leaf`, () => {
      const expectedResult = hierarchicalTreeItemBehavior({ hasItems: true });
      expect(expectedResult.attributes.root.role).toEqual('treeitem');
    });

    test(`is 'none' if a leaf`, () => {
      const expectedResult = hierarchicalTreeItemBehavior({});
      expect(expectedResult.attributes.root.role).toEqual('none');
    });
  });
});
