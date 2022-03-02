const ftzStoriesTitle = 'Components/FocusTrapZone/e2e';

describe('FocusTrapZone', () => {
  before(() => {
    cy.visitStorybook({ qs: { e2e: '1' } });
  });

  describe('Tab and shift-tab wrap at extreme ends of the FTZ', () => {
    it('can tab across FocusZones with different button structures', () => {
      cy.loadStory(ftzStoriesTitle, 'TabWrappingMultiFocusZone');

      cy.get('#a').focus();
      cy.focused().should('have.id', 'a');

      // shift+tab to focus first bumper
      cy.realPress(['Shift', 'Tab']);
      cy.focused().should('have.id', 'd');

      // tab to focus last bumper
      cy.realPress('Tab');
      cy.focused().should('have.id', 'a');
    });
  });
});
