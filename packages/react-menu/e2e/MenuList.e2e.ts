describe('MenuList', () => {
  it('should focus each menu item on hover', () => {
    cy.visitStory('MenuList', 'TextOnly')
      .get('[role="menuitem"]')
      .each(el => {
        cy.wrap(el)
          .trigger('mouseover')
          .should('be.focused');
      });
  });
});
