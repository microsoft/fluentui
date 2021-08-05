describe('Dismiss Menu on Item Click', () => {
  const menuItem = '.ui-menu__item';
  const firstSubmenuItem = `#first`;
  const secondSubmenuItem = `#second`;
  const firstSubmenu = `#firstSubmenu`;
  const secondSubmenu = `#secondSubmenu`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, menuItem);
  });

  describe('Mouse interactions', () => {
    it('Should close submenu on click', () => {
      cy.notExist(firstSubmenu);

      cy.clickOn(menuItem);
      cy.visible(firstSubmenu);

      cy.clickOn(firstSubmenuItem);
      cy.notExist(firstSubmenu);
    });

    it('Should keep open on click of item with submenu', () => {
      cy.notExist(secondSubmenu);
      cy.notExist(firstSubmenu);

      cy.clickOn(menuItem);
      cy.visible(firstSubmenu);
      cy.notExist(secondSubmenu);

      cy.clickOn(secondSubmenuItem);
      cy.visible(firstSubmenu);
      cy.visible(secondSubmenu);
    });
  });

  describe('Keyboard interactions', () => {
    it('Should close on click', () => {
      cy.notExist(firstSubmenu);

      cy.focusOn(menuItem);
      cy.waitForSelectorAndPressKey(menuItem, '{enter}');
      cy.visible(firstSubmenu);

      cy.waitForSelectorAndPressKey(firstSubmenuItem, '{enter}');
      cy.notExist(firstSubmenu);
    });

    it('Should keep open on click of item with submenu', () => {
      cy.notExist(secondSubmenu);
      cy.notExist(firstSubmenu);

      cy.focusOn(menuItem);
      cy.waitForSelectorAndPressKey(menuItem, '{enter}');
      cy.visible(firstSubmenu);

      cy.focusOn(secondSubmenuItem);
      cy.waitForSelectorAndPressKey(secondSubmenuItem, '{enter}');
      cy.visible(secondSubmenu);
    });
  });
});
