const popupTriggerSelector = '[aria-haspopup="true"]';
const popupContentSelector = '[role="dialog"]';

describe('Popup', () => {
  ['Default', 'AnchorToTarget', 'Controlled', 'WithCustomTrigger'].forEach(story => {
    describe(story, () => {
      it('should open popup when clicked', () => {
        cy.visitStory('Popup', story)
          .get(popupTriggerSelector)
          .click()
          .get(popupContentSelector)
          .should('be.visible');
      });

      ['enter', ' '].forEach(key => {
        it(`should open popup with ${key === ' ' ? 'space' : key}`, () => {
          cy.visitStory('Popup', story)
            .get(popupTriggerSelector)
            .focus()
            .type(`{${key}}`)
            .get(popupContentSelector)
            .should('be.visible');
        });
      });

      it('should dismiss on click outside', () => {
        cy.visitStory('Popup', story)
          .get(popupTriggerSelector)
          .get('body')
          .click('bottomRight')
          .get(popupContentSelector)
          .should('not.exist');
      });
    });
  });
});
