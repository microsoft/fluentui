import { treeItemClassName, treeTitleClassName, treeClassName } from '@fluentui/react-northstar';

const selectors = {
  tree: `.${treeClassName}`,
  treeItem: `.${treeItemClassName}`,
  treeTitleAt: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex}) .${treeTitleClassName}`,
  treeItemAt: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex}) `,
};

const navigateToLastLevel = async () => {
  await e2e.focusOn(selectors.treeItemAt(1));
  await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(1), 'ArrowRight'); // Expand first level item
  await e2e.expectCount(selectors.treeItem, 3);

  await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(1), 'ArrowRight'); // Focus first child  2nd level
  await e2e.isFocused(selectors.treeItemAt(2));

  await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(2), 'ArrowRight'); // Expand second level item
  await e2e.expectCount(selectors.treeItem, 4);

  await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(2), 'ArrowRight'); // Focus first child 3rd level
  await e2e.isFocused(selectors.treeTitleAt(3)); // last level has always tree title focused
};

describe('Tree keyboard navigation', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, selectors.tree);
  });

  it('Should navigate down with right arrow', async () => {
    await navigateToLastLevel();
  });

  it('Should navigate up with left arrow', async () => {
    await navigateToLastLevel();

    await e2e.waitForSelectorAndPressKey(selectors.treeTitleAt(3), 'ArrowLeft'); // Focus parent 2nd level
    await e2e.isFocused(selectors.treeItemAt(2));
    await e2e.expectCount(selectors.treeItem, 4);

    await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(2), 'ArrowLeft'); // Focus parent 1nd level and closes 3rd level
    await e2e.expectCount(selectors.treeItem, 3);
    await e2e.isFocused(selectors.treeItemAt(1));
  });
});
