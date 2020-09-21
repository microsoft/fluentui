import { treeTitleAsListItemTitleBehavior } from '@fluentui/accessibility';

describe('TreeTitleBehavior', () => {
  describe('role', () => {
    test(`is added with 'listitem' value to a title with hasSubtree prop false`, () => {
      const expectedResult = treeTitleAsListItemTitleBehavior({ hasSubtree: false });
      expect(expectedResult.attributes.root.role).toEqual('listitem');
    });

    test(`is added with 'option' value to a title with hasSubtree prop false and selectable true`, () => {
      const expectedResult = treeTitleAsListItemTitleBehavior({ hasSubtree: false, selectable: true });
      expect(expectedResult.attributes.root.role).toEqual('option');
    });

    test(`is not added to a title with hasSubtree prop true`, () => {
      const expectedResult = treeTitleAsListItemTitleBehavior({ hasSubtree: true });
      expect(expectedResult.attributes.root.role).toBeUndefined();
    });
  });

  describe('aria-selected', () => {
    test(`is added with 'selected' prop value to a title with hasSubtree prop false, when tree title is 'selectable'`, () => {
      const expectedResultWhenSelected = treeTitleAsListItemTitleBehavior({
        hasSubtree: false,
        selectable: true,
        selected: true,
      });
      const expectedResultWhenNotSelected = treeTitleAsListItemTitleBehavior({
        hasSubtree: false,
        selectable: true,
        selected: false,
      });
      expect(expectedResultWhenSelected.attributes.root['aria-selected']).toEqual(true);
      expect(expectedResultWhenNotSelected.attributes.root['aria-selected']).toEqual(false);
    });

    test(`is not added to a title, when tree title is NOT 'selectable'`, () => {
      const expectedResult = treeTitleAsListItemTitleBehavior({ selectable: false });
      expect(expectedResult.attributes.root['aria-selected']).toBeUndefined();
    });
  });
});
