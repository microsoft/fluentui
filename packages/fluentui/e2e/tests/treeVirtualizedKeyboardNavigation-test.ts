import { treeItemClassName, treeTitleClassName, treeClassName } from '@fluentui/react-northstar';

const selectors = {
  tree: `.${treeClassName}`,
  treeItem: `.${treeItemClassName}`,
  treeTitleAt: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex}) .${treeTitleClassName}`,
  treeItemAt: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex}) `,
};

describe('Virtual Tree keyboard navigation', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, selectors.tree);
  });

  it('Should navigate down with right arrow, and up with left arrow', async () => {
    await e2e.focusOn(selectors.treeItemAt(1));
    // Expand item 1
    await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(1), 'ArrowRight');
    // focus on the first child of item 1
    await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(1), 'ArrowRight');
    await e2e.isFocused(selectors.treeTitleAt(2));

    // navigate to 20th child of item 1 by arrow down
    for (let i = 0; i < 19; ++i) {
      await e2e.waitForSelectorAndPressKey(selectors.tree, 'ArrowDown');
    }

    // press arrow left on the 20th child of item 1
    await e2e.waitForSelectorAndPressKey(selectors.tree, 'ArrowLeft');
    // expect focus to be on item 1
    await e2e.isFocused(selectors.treeItemAt(1));
  });

  it('Should keep focus when pressing * key ', async () => {
    await e2e.focusOn(selectors.treeItemAt(2));
    // Press * key on item 2
    await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(1), '*');
    // expect focus to retain
    await e2e.isFocused(selectors.treeItemAt(2));
  });
});
