import { treeItemAsListItemBehavior } from '@fluentui/accessibility';

describe('TreeItemAsListItemBehavior', () => {
  describe('role', () => {
    test(`is 'listitem' if not a leaf`, () => {
      const expectedResult = treeItemAsListItemBehavior({ hasSubtree: true });
      expect(expectedResult.attributes.root.role).toEqual('listitem');
    });

    test(`is 'option' if it is not a leaf and is selectable`, () => {
      const expectedResult = treeItemAsListItemBehavior({ hasSubtree: true, selectable: true });
      expect(expectedResult.attributes.root.role).toEqual('option');
    });

    test(`is 'none' if a leaf`, () => {
      const expectedResult = treeItemAsListItemBehavior({ hasSubtree: false });
      expect(expectedResult.attributes.root.role).toEqual('none');
    });
  });

  describe('aria-selected', () => {
    test(`is added with 'true' value to an item that has hasSubtree, is selectable and selected`, () => {
      const expectedResult = treeItemAsListItemBehavior({ hasSubtree: true, selectable: true, selected: true });
      expect(expectedResult.attributes.root['aria-selected']).toEqual(true);
    });

    test(`is added with 'false' value to an item that has hasSubtree, is selectable and not selected`, () => {
      const expectedResult = treeItemAsListItemBehavior({ hasSubtree: true, selectable: true });
      expect(expectedResult.attributes.root['aria-selected']).toEqual(false);
    });

    test(`is not added to an item that is not selectable `, () => {
      const expectedResult = treeItemAsListItemBehavior({ hasSubtree: true });
      expect(expectedResult.attributes.root['aria-selected']).toBeUndefined();
    });
  });

  describe('aria-checked', () => {
    test(`is always undefined`, () => {
      let expectedResult = treeItemAsListItemBehavior({ hasSubtree: true, selectable: true, selected: true });
      expect(expectedResult.attributes.root['aria-checked']).toBeUndefined();
      expectedResult = treeItemAsListItemBehavior({ hasSubtree: true, selectable: true });
      expect(expectedResult.attributes.root['aria-checked']).toBeUndefined();
    });
  });
});
