const popoverTriggerSelector = '[aria-haspopup="true"]';
const popoverContentSelector = '[role="dialog"]';

['Default', 'AnchorToTarget', 'Controlled'].forEach(story => {
  describe(story, () => {
    it('should open when clicked', () => {
      cy.visitStory('Popover', story)
        .get(popoverTriggerSelector)
        .click()
        .get(popoverContentSelector)
        .should('be.visible');
    });

    ['enter', ' '].forEach(key => {
      it(`should open with ${key === ' ' ? 'space' : key}`, () => {
        cy.visitStory('Popover', story)
          .get(popoverTriggerSelector)
          .focus()
          .type(`{${key}}`)
          .get(popoverContentSelector)
          .should('be.visible');
      });
    });

    it('should dismiss on click outside', () => {
      cy.visitStory('Popover', story)
        .get(popoverTriggerSelector)
        .get('body')
        .click('bottomRight')
        .get(popoverContentSelector)
        .should('not.exist');
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
