describe('Virtual Tree keyboard navigation', () => {
  const treeItemClassName = 'ui-tree__item';
  const treeTitleClassName = 'ui-tree__title';
  const treeClassName = 'ui-tree';
  const selectors = {
    tree: `.${treeClassName}`,
    treeItem: `.${treeItemClassName}`,
    treeTitleAt: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex}) .${treeTitleClassName}`,
    treeItemAt: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex}) `,
  };

  beforeEach(() => {
    cy.gotoTestCase(__filename, selectors.tree);
  });

  it('Should navigate down with right arrow, and up with left arrow', () => {
    cy.focusOn(selectors.treeItemAt(1));
    // Expand item 1
    cy.waitForSelectorAndPressKey(selectors.treeItemAt(1), '{rightarrow}');
    // focus on the first child of item 1
    cy.waitForSelectorAndPressKey(selectors.treeItemAt(1), '{rightarrow}');
    cy.isFocused(selectors.treeTitleAt(2));

    // navigate to 20th child of item 1 by arrow down
    for (let i = 0; i < 19; ++i) {
      cy.waitForSelectorAndPressKey(selectors.tree, '{downarrow}');
    }

    // press arrow left on the 20th child of item 1
    cy.waitForSelectorAndPressKey(selectors.tree, '{leftarrow}');
    // expect focus to be on item 1
    cy.isFocused(selectors.treeItemAt(1));
  });

  it('Should keep focus when pressing * key ', () => {
    cy.focusOn(selectors.treeItemAt(2));
    // Press * key on item 2
    cy.waitForSelectorAndPressKey(selectors.treeItemAt(1), '*');
    // expect focus to retain
    cy.isFocused(selectors.treeItemAt(2));
  });
});
