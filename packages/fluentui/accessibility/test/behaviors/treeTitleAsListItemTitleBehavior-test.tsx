import { treeTitleAsListItemTitleBehavior } from '@fluentui/accessibility';

describe('TreeTitleBehavior', () => {
  describe('role', () => {
    test(`is added with 'listitem' value to a title with hasSubtree prop false`, () => {
      const expectedResult = treeTitleAsListItemTitleBehavior({ hasSubtree: false });
      expect(expectedResult.attributes.root.role).toEqual('listitem');
    });

    test(`is not added to a title with hasSubtree prop true`, () => {
      const expectedResult = treeTitleAsListItemTitleBehavior({ hasSubtree: true });
      expect(expectedResult.attributes.root.role).toBeUndefined();
    });
  });
});
