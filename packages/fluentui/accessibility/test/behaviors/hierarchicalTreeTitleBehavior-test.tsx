import { hierarchicalTreeTitleBehavior } from '@fluentui/accessibility';

describe('HierarchicalTreeTitleBehavior', () => {
  describe('tabIndex', () => {
    test(`is added with '0' value to a title with hasSubtree prop false`, () => {
      const expectedResult = hierarchicalTreeTitleBehavior({ hasSubtree: false });
      expect(expectedResult.attributes.root.tabIndex).toEqual(-1);
    });

    test(`is not added to a title with hasSubtree prop true`, () => {
      const expectedResult = hierarchicalTreeTitleBehavior({ hasSubtree: true });
      expect(expectedResult.attributes.root.tabIndex).toBeUndefined();
    });
  });

  describe('role', () => {
    test(`is added with 'treeitem' value to a title with hasSubtree prop false`, () => {
      const expectedResult = hierarchicalTreeTitleBehavior({ hasSubtree: false });
      expect(expectedResult.attributes.root.role).toEqual('treeitem');
    });

    test(`is not added to a title with hasSubtree prop true`, () => {
      const expectedResult = hierarchicalTreeTitleBehavior({ hasSubtree: true });
      expect(expectedResult.attributes.root.role).toBeUndefined();
    });
  });
});
