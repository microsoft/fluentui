const menuListStoriesTitle = 'Components/MenuList';

describe('MenuList', () => {
  before(() => {
    cy.visitStorybook();
  });

  it('should focus each menu item on hover', () => {
    cy.loadStory(menuListStoriesTitle, 'TextOnly')
      .get('[role="menuitem"]')
      .each(el => {
        cy.wrap(el).trigger('mouseover').should('be.focused');
      });
  });
});
