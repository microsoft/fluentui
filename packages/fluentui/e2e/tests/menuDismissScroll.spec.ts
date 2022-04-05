describe('Dismiss Menu on Scroll', () => {
  const menuItem = '.ui-menu__item';
  beforeEach(() => {
    cy.gotoTestCase(__filename, menuItem);
  });

  describe('cursor behavior on an input', () => {
    it('Should close on scroll', () => {
      cy.expectCount(menuItem, 1);

      cy.clickOn(menuItem);
      cy.expectCount(menuItem, 3);

      cy.simulatePageMove();
      cy.expectCount(menuItem, 1);
    });
  });
});
