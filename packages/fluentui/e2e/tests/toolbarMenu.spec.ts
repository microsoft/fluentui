describe('Toolbar menu on', () => {
  const selectors = {
    beforeToolbarId: 'before',
    afterToolbarId: 'after',
    triggerButtonId: 'trigger',
    menuItemButtonId: 'menu-button',
    toolbarMenu: 'ui-toolbar__menu',
  };

  const beforeToolbarId = `#${selectors.beforeToolbarId}`;
  const afterToolbarId = `#${selectors.afterToolbarId}`;
  const menuTrigger = `#${selectors.triggerButtonId}`;
  const toolbarMenu = `.${selectors.toolbarMenu}`;
  const menuItemButton = (index: number) => `#${selectors.menuItemButtonId}-${index}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, menuTrigger);
  });

  it('TAB moves focus to next tabbable element after toolbar', () => {
    // opens menu
    cy.clickOn(menuTrigger);
    cy.visible(toolbarMenu);

    // TAB from opened menu
    cy.waitForSelectorAndPressKey(toolbarMenu, 'Tab');

    cy.isFocused(afterToolbarId);
    cy.notExist(toolbarMenu);
  });

  it('Should toggle the menu', () => {
    // opens menu
    cy.clickOn(menuTrigger);
    cy.visible(toolbarMenu);

    cy.clickOn(menuTrigger);

    cy.isFocused(menuTrigger);
    cy.notExist(toolbarMenu);
  });

  it('Shift+TAB moves focus to previous tabbable element before toolbar', () => {
    // opens menu
    cy.clickOn(menuTrigger);
    cy.visible(toolbarMenu);

    // Shift+TAB from opened menu
    cy.waitForSelectorAndPressKey(toolbarMenu, 'Tab', 'Shift');

    cy.isFocused(beforeToolbarId);
    cy.notExist(toolbarMenu);
  });

  it('moves focus to particular element, after press "{enter}" on menu item', () => {
    // opens menu
    cy.clickOn(menuTrigger);
    cy.visible(toolbarMenu);
    cy.isFocused(menuItemButton(0));

    // press enter on first menu item
    cy.waitForSelectorAndPressKey(menuItemButton(0), '{enter}');

    // verify focus was moved to button, this action is defined in 'onClick'
    cy.isFocused(afterToolbarId);
    // verify menu was closed
    cy.notExist(toolbarMenu);
  });
});
