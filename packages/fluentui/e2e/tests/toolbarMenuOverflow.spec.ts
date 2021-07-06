describe('Toolbar menu overflow', () => {
  const selectors = {
    toolbarItem: 'ui-toolbar__item',
    toolbar: 'ui-toolbar',
    toolbarItemWrapper: 'ui-toolbar__itemwrapper',
    menuTrigger: 'menu-trigger',
    itemButtonId: 'item-button',
    toolbarMenu: 'ui-toolbar__menu',
    afterToolbarId: 'after',
  };
  const itemsCount = 20;
  const toolbarItem = (index: number) => `.${selectors.toolbarItem}:nth-child(${index + 1})`;
  const toolbarItemButton = (index: number) => `#${selectors.itemButtonId}-${index}`;
  const toolbarItemWrapped = (index: number) =>
    `.${selectors.toolbarItemWrapper}:nth-child(${index + 1}) .${selectors.toolbarItem}`;
  const toolbar = `.${selectors.toolbar}`;
  const menuTrigger = `#${selectors.menuTrigger}`;
  const toolbarMenu = `.${selectors.toolbarMenu}`;
  const buttonAfterToolbarId = `#${selectors.afterToolbarId}`;

  let itemWidth;

  beforeEach(() => {
    cy.gotoTestCase(__filename, toolbar);
    // Getting width required for an item. Assumes all items have same width.
    if (itemWidth === undefined) {
      cy.get(toolbarItem(0))
        .invoke('outerWidth')
        .then(width => {
          itemWidth = width;
        });
    }
  });

  afterEach(() => {
    // resizes the viewport to contain all items.
    cy.resizeViewport(itemWidth * (itemsCount + 2));
    cy.wait(500);
  });

  it('hiding focused item will set focus to first focusable element', () => {
    const itemToBeHiddenIndex = itemsCount / 2 - 1; // last un-wrapped item.
    const itemToReceiveFocusIndex = 0; // first item is not wrapped.

    // clicks to set focus on last un-wrapped item.
    cy.clickOn(toolbarItem(itemToBeHiddenIndex));
    cy.isFocused(toolbarItem(itemToBeHiddenIndex));

    // resizes the viewport to hide the focused item.
    cy.resizeViewport(itemWidth * (itemsCount / 2));
    cy.wait(500);

    // check that the focus was applied to first item as fall-back.
    cy.isFocused(toolbarItem(itemToReceiveFocusIndex));
  });

  it('hiding focused wrapped item will set focus to first focusable element', () => {
    const itemToBeHiddenIndex = itemsCount / 2; // first wrapped item (not accounting the very first).
    const itemToReceiveFocusIndex = 0; // first item is not wrapped.

    // clicks to set focus on first wrapped item.
    cy.clickOn(toolbarItemWrapped(itemToBeHiddenIndex));
    cy.isFocused(toolbarItemWrapped(itemToBeHiddenIndex));

    // resizes the viewport to hide that item.
    cy.resizeViewport(itemWidth * (itemsCount / 2));
    cy.wait(500);

    // check that the focus was applied to first item as fall-back.
    cy.isFocused(toolbarItem(itemToReceiveFocusIndex));
  });

  it('moves focus to particular element, after click on menu item', () => {
    cy.resizeViewport(itemWidth * (itemsCount / 2));
    cy.wait(500);

    // wait menu trigger button visible and then opens menu
    cy.visible(menuTrigger);
    cy.clickOn(menuTrigger);

    // verify menu was opened and last item visible
    cy.visible(toolbarMenu);
    cy.visible(toolbarItemButton(itemsCount - 1));

    // click on the last item in overflow menu where action in 'onClick' is defined
    cy.clickOn(toolbarItemButton(itemsCount - 1));

    // verify focus was moved to button and menu was closed
    cy.isFocused(buttonAfterToolbarId);
    cy.notExist(toolbarMenu);
  });
});
