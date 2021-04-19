describe('Menu', () => {
  it('should open when trigger is clicked', () => {
    cy.visitStory('Menu', 'TextOnly')
      .get('[aria-haspopup="true"]')
      .click()
      .get('[role="menu"]')
      .should('be.visible');
  });

  ['downarrow', 'enter', ' '].forEach(key => {
    it(`should open when ${key === ' ' ? 'space' : key} key is used with trigger`, () => {
      cy.visitStory('Menu', 'TextOnly')
        .get('[aria-haspopup="true"]')
        .focus()
        .type(`{${key}}`)
        .get('[role="menu"]')
        .should('be.visible');
    });
  });

  it('should close when a menu item is clicked', () => {
    cy.visitStory('Menu', 'TextOnly')
      .get('[aria-haspopup="true"]')
      .trigger('click')
      .get('[role="menuitem"]')
      .first()
      .click();

    cy.get('[role="menu"]').should('not.be.exist');
  });

  it('should not close when a disabled menu item is clicked', () => {
    cy.visitStory('Menu', 'TextOnly')
      .get('[aria-haspopup="true"]')
      .trigger('click')
      .get('[aria-disabled="true"]')
      .first()
      .click();

    cy.get('[role="menu"]').should('be.visible');
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
