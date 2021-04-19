describe('MenuList', () => {
  it('should open item by clicking on trigger', () => {
    cy.visitStory('Menu', 'TextOnly')
      .get('[aria-haspopup="true"]')
      .trigger('click')
      .get('[role="menu"]')
      .should('be.visible');
  });

  it('should focus each menu item on hover', () => {
    cy.visitStory('Menu', 'TextOnly')
      .get('[aria-haspopup="true"]')
      .trigger('click')
      .get('[role="menuitem"]')
      .each(el => {
        cy.wrap(el)
          .trigger('mouseover')
          .should('be.focused');
      });
  });
});
