const popoverTriggerSelector = '[aria-haspopup="true"]';
const popoverContentSelector = '[role="dialog"]';
const popoverStoriesTitle = 'Components/Popover';

const popoverDefaultStory = 'Default';
const popoverAnchorToTargetStory = 'AnchorToTarget';
const popoverControlledStory = 'Controlled';
const popoverWithCustomTriggerStory = 'WithCustomTrigger';
const popoverNestedStory = 'NestedPopovers';

describe('Popover', () => {
  before(() => {
    cy.visitStorybook();
  });

  [popoverDefaultStory, popoverAnchorToTargetStory, popoverControlledStory].forEach(story => {
    describe(story, () => {
      beforeEach(() => {
        cy.get('body').click('bottomRight').loadStory(popoverStoriesTitle, story);
      });

      it('should open when clicked', () => {
        cy.get(popoverTriggerSelector).click().get(popoverContentSelector).should('be.visible');
      });

      ['{enter}', 'Space'].forEach((key: '{enter}' | 'Space') => {
        it(`should open with ${key}`, () => {
          cy.get(popoverTriggerSelector).focus().realPress(key);

          cy.get(popoverContentSelector).should('be.visible');
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
        cy.get(popoverTriggerSelector).click().realPress('Escape');
        cy.get(popoverContentSelector).should('not.exist');
      });
    });
  });

  describe('With custom trigger', () => {
    it('should dismiss on click outside', () => {
      cy.loadStory(popoverStoriesTitle, popoverWithCustomTriggerStory)
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
      cy.loadStory(popoverStoriesTitle, popoverNestedStory)
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

    it('should trap focus with tab', () => {
      cy.focused().then(beforeFocused => {
        cy.focused().realPress('Tab');
        cy.realPress(['Shift', 'Tab']);
        cy.focused().then(afterFocused => {
          expect(beforeFocused[0]).eq(afterFocused[0]);
        });
      });
    });

    it('should trap focus with shift+tab', () => {
      cy.focused().then(beforeFocused => {
        cy.focused().realPress('Tab');
        cy.realPress(['Shift', 'Tab']);
        cy.focused().then(afterFocused => {
          expect(beforeFocused[0]).eq(afterFocused[0]);
        });
      });
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
      const secondNestedTriggerSelector = 'button:contains(Second nested trigger)';

      cy.get(secondNestedTriggerSelector)
        .eq(1)
        .click()
        .get(popoverContentSelector)
        .should('have.length', 3)
        .get(secondNestedTriggerSelector)
        .eq(0)
        .click()
        .get(popoverContentSelector)
        .should('have.length', 3);
    });

    it('should dismiss each popover in the stack with Escape keydown', () => {
      cy.focused().realPress('Escape');
      cy.get(popoverContentSelector).should('have.length', 2);
      cy.focused().realPress('Escape');
      cy.get(popoverContentSelector).should('have.length', 1);
      cy.focused().realPress('Escape');
      cy.get(popoverContentSelector).should('not.exist');
    });
  });
});
