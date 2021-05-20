const popoverTriggerSelector = '[aria-haspopup="true"]';
const popoverContentSelector = '[role="dialog"]';

['Default', 'AnchorToTarget', 'Controlled'].forEach(story => {
  describe(story, () => {
    beforeEach(() => cy.visitStory('Popover', story));

    it('should open when clicked', () => {
      cy.get(popoverTriggerSelector).click().get(popoverContentSelector).should('be.visible');
    });

    ['enter', ' '].forEach(key => {
      it(`should open with ${key === ' ' ? 'space' : key}`, () => {
        cy.get(popoverTriggerSelector).focus().type(`{${key}}`).get(popoverContentSelector).should('be.visible');
      });
    });

    it('should dismiss on click outside', () => {
      cy.get(popoverTriggerSelector)
        .click()
        .get('body')
        .click('bottomRight')
        .get(popoverContentSelector)
        .should('not.exist');
    });

    it('should dismiss on Escape keydown', () => {
      cy.get(popoverTriggerSelector).click().type('{esc}').get(popoverContentSelector).should('not.exist');
    });
  });
});

describe('With custom trigger', () => {
  it('should dismiss on click outside', () => {
    cy.visitStory('Popover', 'WithCustomTrigger')
      .get(popoverTriggerSelector)
      .get('body')
      .click('bottomRight')
      .get(popoverContentSelector)
      .should('not.exist');
  });
});

describe('Nested', () => {
  beforeEach(() => {
    // Open the whole stack of popovers
    cy.visitStory('Popover', 'NestedPopovers')
      .contains('Root')
      .click()
      .get('body')
      .contains('First')
      .click()
      .get('body')
      .contains('Second')
      .first()
      .click();
  });

  it('should dismiss all nested popovers on outside click', () => {
    cy.get('body').click('bottomRight').get(popoverContentSelector).should('not.exist');
  });

  it('should not dismiss when clicking on nested content', () => {
    cy.contains('Second nested button').click().get(popoverContentSelector).should('have.length', 3);
  });

  it('should dismiss child popovers when clicking on parents', () => {
    cy.contains('First nested button')
      .click()
      .get(popoverContentSelector)
      .should('have.length', 2)
      .contains('Root button')
      .click()
      .get(popoverContentSelector)
      .should('have.length', 1);
  });

  it('should when opening a sibling popover, should dismiss other sibling popover', () => {
    cy.contains('Sibling nested trigger')
      .click()
      .get(popoverContentSelector)
      .should('have.length', 3)
      .contains('Second nested trigger')
      .click()
      .get(popoverContentSelector)
      .should('have.length', 3);
  });

  it('should dismiss each popover in the stack with Escape keydown', () => {
    cy.focused()
      .type('{esc}')
      .get(popoverContentSelector)
      .should('have.length', 2)
      .focused()
      .type('{esc}')
      .get(popoverContentSelector)
      .should('have.length', 1)
      .focused()
      .type('{esc}')
      .get(popoverContentSelector)
      .should('not.exist');
  });
});
