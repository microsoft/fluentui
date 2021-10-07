import { menuItemSelector, menuSelector, menuTriggerSelector } from './selectors';

const menuListStoriesTitle = 'Components/MenuList';
const menuListNestedSubmenusStoriesTitle = 'MenuListWithNestedSubmenus';
const menuListDefaultStoryTitle = 'Default';

describe('MenuList', () => {
  before(() => {
    cy.visitStorybook();
  });

  it('should focus each menu item on hover', () => {
    cy.loadStory(menuListStoriesTitle, menuListDefaultStoryTitle)
      .get(menuItemSelector)
      .each(el => {
        cy.wrap(el).trigger('mouseover').should('be.focused');
      });
  });

  describe('With nested submenus', () => {
    it('should not open a menu trigger with ArrowDown', () => {
      cy.loadStory(menuListStoriesTitle, menuListNestedSubmenusStoriesTitle)
        .get(menuTriggerSelector)
        .focus()
        .type('{downarrow}')
        .get(menuSelector)
        .should('have.length', 1);
    });

    it('should focus next menuitem from a menu trigger with ArrowDown', () => {
      cy.loadStory(menuListStoriesTitle, menuListNestedSubmenusStoriesTitle)
        .get('body')
        .click()
        .get(menuTriggerSelector)
        .focus()
        .type('{downarrow}');

      cy.focused().get(menuItemSelector).first().should('be.focused');
    });

    it('should open a menu trigger with ArrowRight', () => {
      cy.loadStory(menuListStoriesTitle, menuListNestedSubmenusStoriesTitle)
        .get(menuTriggerSelector)
        .focus()
        .type('{rightarrow}')
        .get(menuSelector)
        .should('have.length', 2);
    });
  });
});
