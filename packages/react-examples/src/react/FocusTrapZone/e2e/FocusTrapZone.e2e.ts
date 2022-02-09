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

    it('can tab across a FocusZone with different button structures', () => {
      cy.loadStory(ftzStoriesTitle, 'TabWrappingFocusZone');

      cy.get('#x').focus();
      cy.focused().should('have.id', 'x');

      // shift+tab to focus first bumper
      cy.realPress(['Shift', 'Tab']);
      cy.focused().should('have.id', 'a');

      // tab to focus last bumper
      cy.realPress('Tab');
      cy.focused().should('have.id', 'x');
    });

    it(
      'can trap focus when FTZ bookmark elements are FocusZones, ' +
        'and those elements have inner elements focused that are not the first inner element',
      () => {
        cy.loadStory(ftzStoriesTitle, 'TabWrappingFocusZoneBumpers');

        // Focus the middle button in the first FZ.
        cy.get('#a').focus().realPress('ArrowRight');
        cy.focused().should('have.id', 'b');

        // Focus the middle button in the second FZ.
        cy.get('#e').focus().realPress('ArrowRight');
        cy.focused().should('have.id', 'f');

        // tab to focus last bumper
        cy.realPress('Tab');
        cy.focused().should('have.id', 'b');

        // shift+tab to focus first bumper
        cy.realPress(['Shift', 'Tab']);
        cy.focused().should('have.id', 'f');
      },
    );
  });
});
