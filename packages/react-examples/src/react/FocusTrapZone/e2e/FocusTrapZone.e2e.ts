import type { IFocusTrapZoneProps } from '@fluentui/react/lib/FocusTrapZone';
import type { FTZTestWindow } from './shared';

const ftzStoriesTitle = 'Components/FocusTrapZone/e2e';

/**
 * Calls `window.setProps()` -- this must be defined by the story being tested
 */
function setProps(props: IFocusTrapZoneProps) {
  cy.window().then(win => (win as FTZTestWindow).setProps!(props));
}

describe('FocusTrapZone', () => {
  before(() => {
    cy.visitStorybook({ qs: { e2e: '1' } });
  });

  // These are basic tests of different props, but due to the reliance on focus behavior they're
  // best done in the browser.
  describe('Focus behavior based on default and explicit prop values', () => {
    beforeEach(() => {
      cy.loadStory(ftzStoriesTitle, 'PropValues');
    });

    it('Restores focus to FTZ when clicking outside FTZ', () => {
      setProps({});

      cy.get('#mid').focus();
      cy.focused().should('have.id', 'mid');

      // try to focus on button outside FTZ
      cy.get('#before').focus();
      // it focuses first button inside FTZ instead
      cy.focused().should('have.id', 'first');
    });

    it('Does not restore focus to FTZ when clicking outside FTZ with isClickableOutsideFocusTrap', () => {
      setProps({ isClickableOutsideFocusTrap: true });

      // verify we can focus on button outside FTZ
      cy.get('#before').focus();
      cy.focused().should('have.id', 'before');
    });

    it('Focuses first element when focus enters FTZ does not have focus and first bumper receives focus', () => {
      setProps({ disableFirstFocus: true, isClickableOutsideFocusTrap: true });

      cy.get('#before').focus();
      cy.focused().should('have.id', 'before');

      cy.realPress('Tab');
      cy.focused().should('have.id', 'first');
    });

    it('Focuses last element when FTZ does not have focus and last bumper receives focus', () => {
      setProps({ disableFirstFocus: true, isClickableOutsideFocusTrap: true });

      cy.get('#after').focus();
      cy.focused().should('have.id', 'after');

      cy.realPress(['Shift', 'Tab']);
      cy.focused().should('have.id', 'last');
    });

    it('Restores focus to FTZ when focusing outside FTZ', () => {
      setProps({});

      cy.get('#mid').focus();
      cy.focused().should('have.id', 'mid');

      cy.get('#after').focus();
      cy.focused().should('have.id', 'first');
    });

    it('Does not restore focus to FTZ when forceFocusInsideTrap is false', () => {
      setProps({ forceFocusInsideTrap: false });

      cy.get('#after').focus();
      cy.focused().should('have.id', 'after');
    });

    it('Focuses first on mount', () => {
      setProps({});

      cy.focused().should('have.id', 'first');
    });

    it('Does not focus first on mount with disableFirstFocus', () => {
      setProps({ disableFirstFocus: true });

      // For some reason this doesn't work:
      // cy.focused().should('match', 'body');
      cy.document().should(doc => {
        expect(doc.activeElement?.tagName).to.equal('BODY');
      });
    });

    it('Does not focus first on mount while disabled', () => {
      setProps({ disabled: true });

      cy.document().should(doc => {
        expect(doc.activeElement?.tagName).to.equal('BODY');
      });
    });

    it('Focuses on firstFocusableSelector on mount', () => {
      // deprecated: this is actually a className, not a selector
      setProps({ firstFocusableSelector: 'last-class' });

      cy.focused().should('have.id', 'last');
    });

    it('Does not focus on firstFocusableSelector on mount while disabled', () => {
      setProps({ firstFocusableSelector: 'last-class', disabled: true });

      cy.document().should(doc => {
        expect(doc.activeElement?.tagName).to.equal('BODY');
      });
    });

    it('Falls back to first focusable element with invalid firstFocusableSelector', () => {
      setProps({ firstFocusableSelector: 'invalidSelector' });

      cy.focused().should('have.id', 'first');
    });

    it('Focuses on firstFocusableTarget selector on mount', () => {
      setProps({ firstFocusableTarget: '#last' });

      cy.focused().should('have.id', 'last');
    });

    it('Focuses on firstFocusableTarget callback on mount', () => {
      setProps({ firstFocusableTarget: element => element.querySelector('#last') });

      cy.focused().should('have.id', 'last');
    });

    it('Does not focus on firstFocusableTarget selector on mount while disabled', () => {
      setProps({ firstFocusableTarget: '#last', disabled: true });

      cy.document().should(doc => {
        expect(doc.activeElement?.tagName).to.equal('BODY');
      });
    });

    it('Does not focus on firstFocusableTarget callback on mount while disabled', () => {
      setProps({
        firstFocusableTarget: (element: HTMLElement) => element.querySelector('#last'),
        disabled: true,
      });

      cy.document().should(doc => {
        expect(doc.activeElement?.tagName).to.equal('BODY');
      });
    });

    it('Falls back to first focusable element with invalid firstFocusableTarget selector', () => {
      setProps({ firstFocusableTarget: '.invalidSelector' });

      cy.focused().should('have.id', 'first');
    });

    it('Falls back to first focusable element with invalid firstFocusableTarget callback', () => {
      setProps({ firstFocusableTarget: () => null });

      cy.focused().should('have.id', 'first');
    });
  });

  describe('Tab and shift-tab wrap at extreme ends of the FTZ', () => {
    // Note: all of the IDs in these tests refer to buttons

    it('can tab across a FocusZone with different button structures', () => {
      // This story has a FTZ containing a button and a FocusZone (containing more buttons)
      cy.loadStory(ftzStoriesTitle, 'TabWrappingFocusZone');

      // focus the first button inside the FTZ
      cy.get('#first').focus();
      cy.focused().should('have.id', 'first');

      // shift+tab to focus first bumper => wraps to FocusZone => first button inside it
      cy.realPress(['Shift', 'Tab']);
      cy.focused().should('have.id', 'fzFirst');

      // tab to focus last bumper => wraps to first button
      cy.realPress('Tab');
      cy.focused().should('have.id', 'first');
    });

    it('can tab across FocusZones with different button structures', () => {
      // This story has a FTZ containing two FocusZones (both containing buttons)
      cy.loadStory(ftzStoriesTitle, 'TabWrappingMultiFocusZone');

      cy.get('#fz1First').focus();
      cy.focused().should('have.id', 'fz1First');

      // shift+tab to focus first bumper => wraps to second FocusZone => first button inside it
      cy.realPress(['Shift', 'Tab']);
      cy.focused().should('have.id', 'fz2First');

      // tab to focus last bumper => wraps to first FocusZone => first button inside it
      cy.realPress('Tab');
      cy.focused().should('have.id', 'fz1First');
    });

    it(
      'can trap focus when FTZ bookmark elements are FocusZones, ' +
        'and those elements have inner elements focused that are not the first inner element',
      () => {
        // This story has a FTZ containing a FocusZone (with buttons), a button, and another FocusZone (with buttons)
        cy.loadStory(ftzStoriesTitle, 'TabWrappingFocusZoneBumpers');

        // Focus the middle button in the first FZ.
        cy.get('#fz1First').focus().realPress('ArrowRight');
        cy.focused().should('have.id', 'fz1Mid');

        // Focus the middle button in the second FZ.
        cy.get('#fz2Mid').focus().realPress('ArrowRight');
        cy.focused().should('have.id', 'fz2Last');

        // tab to focus last bumper => wraps to first FocusZone => previously focused button inside it
        cy.realPress('Tab');
        cy.focused().should('have.id', 'fz1Mid');

        // shift+tab to focus first bumper => wraps to last FocusZone => previously focused button inside it
        cy.realPress(['Shift', 'Tab']);
        cy.focused().should('have.id', 'fz2Last');
      },
    );
  });

  describe('Tab and shift-tab do nothing (keep focus where it is) when the FTZ contains 0 tabbable items', () => {
    beforeEach(() => {
      cy.loadStory(ftzStoriesTitle, 'Empty');
    });

    it('focuses first focusable element when focusing first bumper', () => {
      setProps({});

      cy.get('#mid').focus();
      cy.focused().should('have.id', 'mid');

      // shift+tab to focus first bumper
      cy.realPress(['Shift', 'Tab']);
      cy.focused().should('have.id', 'first');
    });

    it('focuses first focusable element when focusing last bumper', () => {
      setProps({});

      cy.get('#mid').focus();
      cy.focused().should('have.id', 'mid');

      // tab to focus first bumper
      cy.realPress('Tab');
      cy.focused().should('have.id', 'first');
    });

    it('focuses first focusable element when focusing outside of FTZ with 0 tabbable items', () => {
      setProps({});

      cy.get('#mid').focus();
      cy.focused().should('have.id', 'mid');

      // try to focus on button outside FTZ
      cy.get('#before').focus();
      // it focuses first button inside FTZ instead
      cy.focused().should('have.id', 'first');
    });

    it('focuses previously focused element when focusing outside of FTZ with 0 tabbable items', () => {
      setProps({ focusPreviouslyFocusedInnerElement: true });

      cy.get('#mid').focus();
      cy.focused().should('have.id', 'mid');

      // try to focus on button outside FTZ
      cy.get('#before').focus();
      // it focuses last focused button inside FTZ instead
      cy.focused().should('have.id', 'mid');
    });
  });

  describe('Imperatively focusing the FTZ', () => {
    function imperativeFocus() {
      cy.window().then(win => (win as FTZTestWindow).imperativeFocus!());
    }

    beforeEach(() => {
      cy.loadStory(ftzStoriesTitle, 'ImperativeFocus');
    });

    it('goes to previously focused element when focusing the FTZ', async () => {
      setProps({ focusPreviouslyFocusedInnerElement: true });

      // Manually focusing FTZ when FTZ has never had focus within should go to 1st focusable inner element.
      imperativeFocus();
      cy.focused().should('have.id', 'first');

      // Focus inside the trap zone, not the first element.
      cy.get('#last').focus();
      cy.focused().should('have.id', 'last');

      // Focus outside the trap zone
      cy.get('#after').focus();
      cy.focused().should('have.id', 'after');

      // Manually focusing FTZ should return to originally focused inner element.
      imperativeFocus();

      cy.focused().should('have.id', 'last');
    });

    it('goes to first focusable element when focusing the FTZ', async () => {
      setProps({ focusPreviouslyFocusedInnerElement: false });

      // Manually focusing FTZ when FTZ has never had focus within should go to 1st focusable inner element.
      imperativeFocus();
      cy.focused().should('have.id', 'first');

      // Focus inside the trap zone, not the first element.
      cy.get('#last').focus();
      cy.focused().should('have.id', 'last');

      // Focus outside the trap zone
      cy.get('#after').focus();
      cy.focused().should('have.id', 'after');

      // Manually focusing FTZ should go to the first focusable element.
      imperativeFocus();
      cy.focused().should('have.id', 'first');
    });
  });

  it('maintains a proper stack of FocusTrapZones as more are mounted/unmounted', () => {
    // TODO: try to find a way to test this concept without looking this deeply into the implementation
    // or using global functions
    //
    // This test needs to look at FocusTrapZone.focusStack (at least with current implementation),
    // and the easiest way to do that in cypress is having the story expose a getFocusStack() global.
    // (Rendering FocusTrapZone.focusStack in the story doesn't work because updates to the array
    // don't trigger React updates, so it gets out of date.)
    //
    // It also needs a way to show and hide FocusTrapZones. Currently this is done by having the
    // story expose a setShown() global, but finding an interactive approach would be better.
    // (The jsdom version of the test did this by clicking buttons inside ftz0, but that (correctly)
    // doesn't work in the browser because the other FocusTrapZones set isClickableOutsideFocusTrap=false.

    const setShown: Required<FTZTestWindow>['setShown'] = (num, show) => {
      cy.window().then(win => (win as FTZTestWindow).setShown!(num, show));
    };

    cy.loadStory(ftzStoriesTitle, 'FocusStack');

    // There should now be one focus trap zone.
    cy.window().should(win => {
      // NOTE: This expectation should NOT be done in a helper because there will be no useful
      // line/stack info if it fails (due to being run with eval() inside the test window).
      expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0']);
    });

    // Show ftz1 and verify there are now two FTZs in the stack
    setShown(1, true);
    cy.get('#ftz1').should('exist');
    cy.window().should(win => {
      expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0', 'ftz1']);
    });

    // Show ftz2 => three FTZ in stack
    setShown(2, true);
    cy.get('#ftz2').should('exist');
    cy.window().should(win => {
      expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0', 'ftz1', 'ftz2']);
    });

    // Hide ftz1 => two FTZ in stack
    setShown(1, false);
    cy.get('#ftz1').should('not.exist');
    cy.window().should(win => {
      expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0', 'ftz2']);
    });

    // Hide ftz2 => one FTZ in stack
    setShown(2, false);
    cy.get('#ftz2').should('not.exist');
    cy.window().should(win => {
      expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0']);
    });

    // Show ftz3 => two FTZ in stack
    // (even though ftz3 has forceFocusInsideTrap=false)
    setShown(3, true);
    cy.get('#ftz3').should('exist');
    cy.window().should(win => {
      expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0', 'ftz3']);
    });

    // Hide ftz3 => one FTZ in stack
    setShown(3, false);
    cy.get('#ftz3').should('not.exist');
    cy.window().should(win => {
      expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0']);
    });

    // Show ftz4 => still only one FTZ in stack because ftz4 is disabled
    setShown(4, true);
    cy.get('#ftz4').should('exist');
    cy.window().should(win => {
      expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0']);
    });
  });
});
