describe('Tree keyboard navigation', () => {
  const treeItemClassName = 'ui-tree__item';
  const treeTitleClassName = 'ui-tree__title';
  const treeClassName = 'ui-tree';

  const selectors = {
    tree: `.${treeClassName}`,
    treeItem: `.${treeItemClassName}`,
    treeTitleAt: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex}) .${treeTitleClassName}`,
    treeItemAt: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex}) `,
  };

  const navigateToLastLevel = () => {
    cy.focusOn(selectors.treeItemAt(1));
    cy.waitForSelectorAndPressKey(selectors.treeItemAt(1), '{rightarrow}'); // Expand first level item
    cy.expectCount(selectors.treeItem, 3);

    cy.waitForSelectorAndPressKey(selectors.treeItemAt(1), '{rightarrow}'); // Focus first child  2nd level
    cy.isFocused(selectors.treeItemAt(2));

    cy.waitForSelectorAndPressKey(selectors.treeItemAt(2), '{rightarrow}'); // Expand second level item
    cy.expectCount(selectors.treeItem, 6);

    cy.waitForSelectorAndPressKey(selectors.treeItemAt(2), '{rightarrow}'); // Focus first child 3rd level
    cy.isFocused(selectors.treeTitleAt(3)); // last level has always tree title focused
  };

  beforeEach(() => {
    cy.gotoTestCase(__filename, selectors.tree);
  });

  it('Should navigate down with right arrow', () => {
    navigateToLastLevel();
  });

  it('Should navigate up with left arrow', () => {
    navigateToLastLevel();

    cy.waitForSelectorAndPressKey(selectors.treeTitleAt(3), '{leftarrow}'); // Focus parent 2nd level
    cy.isFocused(selectors.treeItemAt(2));
    cy.expectCount(selectors.treeItem, 6);

    cy.waitForSelectorAndPressKey(selectors.treeItemAt(2), '{leftarrow}'); // closes 3rd level
    cy.expectCount(selectors.treeItem, 3);
    cy.isFocused(selectors.treeItemAt(2));

    cy.waitForSelectorAndPressKey(selectors.treeItemAt(2), '{leftarrow}'); // Focus parent 1nd level
    cy.expectCount(selectors.treeItem, 3);
    cy.isFocused(selectors.treeItemAt(1));
  });

  it('Should set focus based on first letter', () => {
    navigateToLastLevel();

    cy.focusOn(selectors.treeItemAt(1)); // focus on 'House Lannister'
    cy.waitForSelectorAndPressKey(selectors.treeItemAt(1), 'T'); // expect focus to be on 'Tywin'
    cy.isFocused(selectors.treeItemAt(2));

    cy.waitForSelectorAndPressKey(selectors.treeItemAt(2), 'т'); // expect focus to stay because no node is start with 'т'
    cy.isFocused(selectors.treeTitleAt(5)); // expect focus to be on 'тирион'

    cy.waitForSelectorAndPressKey(selectors.treeItemAt(2), 'F'); // expect focus to stay because no node is start with 'F'
    cy.isFocused(selectors.treeTitleAt(5));

    cy.waitForSelectorAndPressKey(selectors.treeItemAt(2), 'H'); // expect focus to be on 'House Lannister'
    cy.isFocused(selectors.treeItemAt(1));

    cy.waitForSelectorAndPressKey(selectors.treeItemAt(2), 'Tab'); // expect Tab key to still function as default
    cy.nothingIsFocused();
  });
});
