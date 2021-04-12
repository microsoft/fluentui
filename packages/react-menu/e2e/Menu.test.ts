describe('MenuList', () => {
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
