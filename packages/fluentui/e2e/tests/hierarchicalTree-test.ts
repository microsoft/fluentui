import { selectors } from './hierarchicalTree-example';

const tree = `.${selectors.treeClass}`;
const treeItem = index => `.${selectors.treeItemClass}:nth-child(${index})`;
const treeTitle = index => `.${selectors.treeTitleClass}:nth-child(${index})`;

describe('HierarchialTree', () => {
  describe('Focus behavior', () => {
    beforeEach(async () => {
      await e2e.gotoTestCase(__filename, tree);
    });

    it('moves focus to first child from expanded parent', async () => {
      await e2e.clickOn(treeTitle(1)); // expands first subtree and focuses it.
      await e2e.pressKey('ArrowRight'); // moves focus to first child.

      expect(await e2e.isFocused(`${treeItem(1)} ${treeItem(1)}`)).toBe(true);
    });

    it('moves focus to parent from one of its children', async () => {
      await e2e.clickOn(treeTitle(1)); // expands first subtree and focuses it.
      await e2e.focusOn(`${treeItem(1)} ${treeItem(1)}`); // move focus to first child of first subtree.
      await e2e.pressKey('ArrowLeft'); // moves focus back to the parent of first subtree.

      expect(await e2e.isFocused(treeItem(1))).toBe(true);
    });
  });
});
