import { treeItemBehavior, keyboardKey, SpacebarKey } from '@fluentui/accessibility';

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

  describe('keyboard interaction', () => {
    test(`click is executed only with 'spacebar', when tree item is 'selectable' and tree item has no subtree`, () => {
      const expectedResult = treeItemBehavior({ selectable: true, hasSubtree: false });
      expect(expectedResult.keyActions.root.performClick.keyCombinations).toHaveLength(1);
      expect(expectedResult.keyActions.root.performClick.keyCombinations[0].keyCode).toEqual(SpacebarKey);
    });

    test(`selection is executed only with 'spacebar', when tree item is 'selectable'`, () => {
      const expectedResult = treeItemBehavior({ selectable: true });
      expect(expectedResult.keyActions.root.performSelection.keyCombinations).toHaveLength(1);
      expect(expectedResult.keyActions.root.performSelection.keyCombinations[0].keyCode).toEqual(SpacebarKey);
    });

    test(`click is executed with 'enter' key, when tree item is 'selectable' and tree item has subtree`, () => {
      const expectedResult = treeItemBehavior({ selectable: true, hasSubtree: true });
      expect(expectedResult.keyActions.root.performClick.keyCombinations).toHaveLength(1);
      expect(expectedResult.keyActions.root.performClick.keyCombinations[0].keyCode).toEqual(keyboardKey.Enter);
    });

    test(`arrow left navigation, should collapse when tree expanded`, () => {
      const expectedResult = treeItemBehavior({ expanded: true, hasSubtree: true });
      expect(expectedResult.keyActions.root.collapse.keyCombinations).toHaveLength(1);
      expect(expectedResult.keyActions.root.collapse.keyCombinations[0].keyCode).toEqual(keyboardKey.ArrowLeft);
    });
    test(`arrow left navigation, should focus on parent when tree is not expanded`, () => {
      const expectedResult = treeItemBehavior({ expanded: false, hasSubtree: true });
      expect(expectedResult.keyActions.root.focusParent.keyCombinations).toHaveLength(1);
      expect(expectedResult.keyActions.root.focusParent.keyCombinations[0].keyCode).toEqual(keyboardKey.ArrowLeft);
    });
    test(`arrow left navigation, should focus on parent when treeItem has no subtree`, () => {
      const expectedResult = treeItemBehavior({ hasSubtree: false });
      expect(expectedResult.keyActions.root.focusParent.keyCombinations).toHaveLength(1);
      expect(expectedResult.keyActions.root.focusParent.keyCombinations[0].keyCode).toEqual(keyboardKey.ArrowLeft);
    });

    test(`arrow right navigation, should expand when tree collapsed`, () => {
      const expectedResult = treeItemBehavior({ expanded: false, hasSubtree: true });
      expect(expectedResult.keyActions.root.expand.keyCombinations).toHaveLength(1);
      expect(expectedResult.keyActions.root.expand.keyCombinations[0].keyCode).toEqual(keyboardKey.ArrowRight);
    });
    test(`arrow right navigation, should focus on frist child when tree expanded`, () => {
      const expectedResult = treeItemBehavior({ expanded: true, hasSubtree: true });
      expect(expectedResult.keyActions.root.focusFirstChild.keyCombinations).toHaveLength(1);
      expect(expectedResult.keyActions.root.focusFirstChild.keyCombinations[0].keyCode).toEqual(keyboardKey.ArrowRight);
    });
  });

  describe('aria-checked', () => {
    test(`is added with 'true' value to an item that has hasSubtree, is selectable and selected`, () => {
      const expectedResult = treeItemBehavior({ hasSubtree: true, selectable: true, selected: true });
      expect(expectedResult.attributes.root['aria-checked']).toEqual(true);
    });

    test(`is added with 'false' value to an item that has hasSubtree, is selectable and not selected`, () => {
      const expectedResult = treeItemBehavior({ hasSubtree: true, selectable: true });
      expect(expectedResult.attributes.root['aria-checked']).toEqual(false);
    });
    test(`is added with 'mixed' value to an item that has hasSubtree, is selectable and in indeterminate state`, () => {
      const expectedResult = treeItemBehavior({ hasSubtree: true, selectable: true, indeterminate: true });
      expect(expectedResult.attributes.root['aria-checked']).toEqual('mixed');
    });

    test(`is not added to an item that is not selectable`, () => {
      const expectedResult = treeItemBehavior({ hasSubtree: true });
      expect(expectedResult.attributes.root['aria-checked']).toBeUndefined();
    });
  });
});
