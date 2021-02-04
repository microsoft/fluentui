import { treeTitleBehavior, keyboardKey, SpacebarKey } from '@fluentui/accessibility';

describe('TreeTitleBehavior', () => {
  describe('tabIndex', () => {
    test(`is added with '0' value to a title with hasSubtree prop false`, () => {
      const expectedResult = treeTitleBehavior({ hasSubtree: false });
      expect(expectedResult.attributes.root.tabIndex).toEqual(-1);
    });

    test(`is not added to a title with hasSubtree prop true`, () => {
      const expectedResult = treeTitleBehavior({ hasSubtree: true });
      expect(expectedResult.attributes.root.tabIndex).toBeUndefined();
    });
  });

  describe('role', () => {
    test(`is added with 'treeitem' value to a title with hasSubtree prop false`, () => {
      const expectedResult = treeTitleBehavior({ hasSubtree: false });
      expect(expectedResult.attributes.root.role).toEqual('treeitem');
    });

    test(`is not added to a title with hasSubtree prop true`, () => {
      const expectedResult = treeTitleBehavior({ hasSubtree: true });
      expect(expectedResult.attributes.root.role).toBeUndefined();
    });
  });

  describe('aria-checked', () => {
    test(`is added with 'selected' prop value to a title with hasSubtree prop false, when tree title is 'selectable'`, () => {
      const expectedResultWhenSelected = treeTitleBehavior({ hasSubtree: false, selectable: true, selected: true });
      const expectedResultWhenNotSelected = treeTitleBehavior({ hasSubtree: false, selectable: true, selected: false });
      expect(expectedResultWhenSelected.attributes.root['aria-checked']).toEqual(true);
      expect(expectedResultWhenNotSelected.attributes.root['aria-checked']).toEqual(false);
    });

    test(`is not added to a title, when tree title is NOT 'selectable'`, () => {
      const expectedResult = treeTitleBehavior({ selectable: false });
      expect(expectedResult.attributes.root['aria-checked']).toBeUndefined();
    });
  });

  describe('keyboard interaction', () => {
    test(`click is executed only with 'spacebar' or 'enter', when tree title is 'selectable'`, () => {
      const expectedResult = treeTitleBehavior({ selectable: true, hasSubtree: true });
      expect(expectedResult.keyActions.root.performClick.keyCombinations).toHaveLength(1);
      expect(expectedResult.keyActions.root.performClick.keyCombinations[0].keyCode).toEqual(SpacebarKey);
    });

    test(`arrow left navigation, should focus on parent  `, () => {
      const expectedResult = treeTitleBehavior({ hasSubtree: false });
      expect(expectedResult.keyActions.root.focusParent.keyCombinations).toHaveLength(1);
      expect(expectedResult.keyActions.root.focusParent.keyCombinations[0].keyCode).toEqual(keyboardKey.ArrowLeft);
    });
  });
});
