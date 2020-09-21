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
});
