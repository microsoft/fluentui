import { treeItemAsListItemBehavior } from '@fluentui/accessibility';

describe('TreeItemAsListItemBehavior', () => {
  describe('role', () => {
    test(`is 'listitem' if not a leaf`, () => {
      const expectedResult = treeItemAsListItemBehavior({ hasSubtree: true });
      expect(expectedResult.attributes.root.role).toEqual('listitem');
    });

    test(`is 'none' if a leaf`, () => {
      const expectedResult = treeItemAsListItemBehavior({ hasSubtree: false });
      expect(expectedResult.attributes.root.role).toEqual('none');
    });
  });
});
