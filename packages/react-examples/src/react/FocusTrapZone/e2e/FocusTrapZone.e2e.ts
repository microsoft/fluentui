import type { IFocusTrapZoneProps } from '@fluentui/react/lib/FocusTrapZone';
import type { FTZTestGlobals } from './types';

/** Window with zero or more extra functions defined by some of the stories. */
type FTZTestWindow = Cypress.AUTWindow & FTZTestGlobals;

const ftzStoriesTitle = 'Components/FocusTrapZone/e2e';

/**
 * Calls `window.setProps()` -- this must be defined by the story being tested
 */
function setProps(props: IFocusTrapZoneProps) {
  // Use should() to ensure that the call retries if setProps isn't defined yet
  // (this can happen in headless mode, if the example isn't finished rendering)
  cy.window().should(win => {
    (win as FTZTestWindow).setProps!(props);
  });
}

describe('FocusTrapZone', () => {
  before(() => {
    cy.visitStorybook({ qs: { e2e: '1' } });
  });

  // These are basic tests of different props, but due to the reliance on focus behavior they're
  // best done in the browser.
  describe('Respects default and explicit prop values', () => {
    beforeEach(() => {
      cy.loadStory(ftzStoriesTitle, 'PropValues');
    });

    it('Focuses first child on mount', () => {
      setProps({});

      cy.focused().should('have.text', 'first');
    });

    it('Does not focus first child on mount with disableFirstFocus', () => {
      setProps({ disableFirstFocus: true });

      // Verify nothing is focused (note that document.activeElement will be body, but cy.focused()
      // uses :focus, and that's not set on body even if it's active)
      cy.focused().should('not.exist');
    });

    it('Can click children inside the FTZ', () => {
      setProps({});

      // wait for first focus to finish
      cy.focused().should('have.text', 'first');

      // focus inside the FTZ
      cy.contains('mid').realClick();
      cy.focused().should('have.text', 'mid');
    });

    it('Restores focus to FTZ when clicking outside FTZ', () => {
      setProps({});

      // wait for first focus to finish to avoid timing issue
      cy.focused().should('have.text', 'first');

      // try to click on button outside FTZ
      cy.contains('before').realClick();
      // it focuses first button inside FTZ instead
      cy.focused().should('have.text', 'first');
      // and the click isn't respected
      cy.get('#buttonClicked').should('have.text', 'clicked ');
    });

    it('Restores focus to FTZ when programmatically focusing outside FTZ', () => {
      setProps({});

      // wait for first focus to finish to avoid timing issue
      cy.focused().should('have.text', 'first');

      cy.contains('after').focus();
      cy.focused().should('have.text', 'first');
    });

    it('Allows clicks outside FTZ with isClickableOutsideFocusTrap but restores focus inside', () => {
      setProps({ isClickableOutsideFocusTrap: true });

      // wait for first focus to finish to avoid timing issue
      cy.focused().should('have.text', 'first');

      // click the button and verify it worked (the story updates the text when a button is clicked)
      cy.contains('before').realClick();
      cy.get('#buttonClicked').should('have.text', 'clicked before');

      // but focus is kept within the FTZ
      cy.focused().should('have.text', 'first');
    });

    it('Focuses first element when focus enters FTZ with tab', () => {
      setProps({ disableFirstFocus: true });

      // Start by programmatically focusing an element outside
      // (clicking it won't work in this case because that would send focus inside the trap)
      cy.contains('before').focus();
      cy.focused().should('have.text', 'before');

      // Tab to send focus to the first bumper, which passes focus on to the first element inside
      cy.realPress('Tab');
      cy.focused().should('have.text', 'first');
    });

    it('Focuses last element when focus enters FTZ with shift+tab', () => {
      setProps({ disableFirstFocus: true });

      // Start by programmatically focusing an element outside
      // (clicking it won't work in this case because that would send focus inside the trap)
      cy.contains('after').focus();
      cy.focused().should('have.text', 'after');

      // Shift+tab will send focus to the last bumper, which passes focus on to the last element inside
      cy.realPress(['Shift', 'Tab']);
      cy.focused().should('have.text', 'last');
    });

    // TODO: investigate why this intermittently fails and re-enable.
    // It succeeds if you set disableFirstFocus: true, but the failure with first focus enabled
    // may reflect an actual bug in the function component conversion. Also, the intermittent
    // failure may indicate a timing issue with either the effects within FTZ, or with cypress.
    xit('Does not restore focus to FTZ when forceFocusInsideTrap is false', () => {
      setProps({ forceFocusInsideTrap: false });

      // wait for first focus to finish to avoid timing issue
      cy.focused().should('have.text', 'first');

      // click a button outside => respected
      cy.contains('after').realClick();
      cy.focused().should('have.text', 'after');

      // focus back inside
      cy.contains('mid').realClick();
      cy.focused().should('have.text', 'mid');

      // programmatic focus outside => respected
      cy.contains('after').focus();
      cy.focused().should('have.text', 'after');
    });

    it('Does not focus first on mount while disabled', () => {
      setProps({ disabled: true });

      // verify story rendered (to make sure we're not checking the base state of the page)
      cy.contains('first').should('exist');

      cy.focused().should('not.exist');
    });

    it('Focuses on firstFocusableSelector on mount', () => {
      // deprecated: this is actually a className, not a selector
      setProps({ firstFocusableSelector: 'last-class' });

      cy.focused().should('have.text', 'last');
    });

    it('Does not focus on firstFocusableSelector on mount while disabled', () => {
      setProps({ firstFocusableSelector: 'last-class', disabled: true });

      // verify story rendered (to make sure we're not checking the base state of the page)
      cy.contains('first').should('exist');

      cy.focused().should('not.exist');
    });

    it('Falls back to first focusable element with invalid firstFocusableSelector', () => {
      setProps({ firstFocusableSelector: 'invalidSelector' });

      cy.focused().should('have.text', 'first');
    });

    it('Focuses on firstFocusableTarget selector on mount', () => {
      setProps({ firstFocusableTarget: '#last' });

      cy.focused().should('have.text', 'last');
    });

    it('Focuses on firstFocusableTarget callback on mount', () => {
      setProps({ firstFocusableTarget: element => element.querySelector('#last') });

      cy.focused().should('have.text', 'last');
    });

    it('Does not focus on firstFocusableTarget selector on mount while disabled', () => {
      setProps({ firstFocusableTarget: '#last', disabled: true });

      // verify story rendered (to make sure we're not checking the base state of the page)
      cy.contains('first').should('exist');

      cy.focused().should('not.exist');
    });

    it('Does not focus on firstFocusableTarget callback on mount while disabled', () => {
      setProps({
        firstFocusableTarget: (element: HTMLElement) => element.querySelector('#last'),
        disabled: true,
      });

      // verify story rendered (to make sure we're not checking the base state of the page)
      cy.contains('first').should('exist');

      cy.focused().should('not.exist');
    });

    it('Falls back to first focusable element with invalid firstFocusableTarget selector', () => {
      setProps({ firstFocusableTarget: '.invalidSelector' });

      cy.focused().should('have.text', 'first');
    });

    it('Falls back to first focusable element with invalid firstFocusableTarget callback', () => {
      setProps({ firstFocusableTarget: () => null });

      cy.focused().should('have.text', 'first');
    });
  });

  describe('Tab and shift-tab wrap at extreme ends of the FTZ', () => {
    // Note: all of the IDs in these tests refer to buttons

    it('can tab between a button and a FocusZone', () => {
      // This story has a FTZ containing a button and a FocusZone (containing more buttons)
      cy.loadStory(ftzStoriesTitle, 'TabWrappingButtonFocusZone');

      // initial focus goes to the button
      cy.focused().should('have.text', 'first');

      // shift+tab to focus first bumper => wraps to FocusZone => first button inside it
      cy.realPress(['Shift', 'Tab']);
      cy.focused().should('have.text', 'fzFirst');

      // tab to focus last bumper => wraps to first button
      cy.realPress('Tab');
      cy.focused().should('have.text', 'first');
    });

    it('can tab between multiple FocusZones with different button structures', () => {
      // This story has a FTZ containing two FocusZones (both containing buttons)
      cy.loadStory(ftzStoriesTitle, 'TabWrappingMultiFocusZone');

      // initial focus goes into the first FocusZone
      cy.focused().should('have.text', 'fz1First');

      // shift+tab to focus first bumper => wraps to second FocusZone => first button inside it
      cy.realPress(['Shift', 'Tab']);
      cy.focused().should('have.text', 'fz2First');

      // tab to focus last bumper => wraps to first FocusZone => first button inside it
      cy.realPress('Tab');
      cy.focused().should('have.text', 'fz1First');
    });

    it(
      'can trap focus when FTZ bookmark elements are FocusZones, ' +
        'and those elements have inner elements focused that are not the first inner element',
      () => {
        // This story has a FTZ containing a FocusZone (with buttons), a button, and another FocusZone (with buttons).
        // "Bookmark" refers to the first and last elements inside the FTZ.
        cy.loadStory(ftzStoriesTitle, 'TabWrappingFocusZoneBumpers');

        // wait for first focus to finish to avoid timing issue
        cy.focused().should('have.text', 'fz1First');

        // Focus the middle button in the first FZ.
        cy.contains('fz1First').click().realPress('ArrowRight');
        cy.focused().should('have.text', 'fz1Mid');

        // Focus the middle button in the second FZ.
        cy.contains('fz2Mid').click().realPress('ArrowRight');
        cy.focused().should('have.text', 'fz2Last');

        // tab to focus last bumper => wraps to first FocusZone => previously focused button inside it
        cy.realPress('Tab');
        cy.focused().should('have.text', 'fz1Mid');

        // shift+tab to focus first bumper => wraps to last FocusZone => previously focused button inside it
        cy.realPress(['Shift', 'Tab']);
        cy.focused().should('have.text', 'fz2Last');
      },
    );
  });

  describe('Tab and shift-tab when the FTZ contains 0 tabbable items', () => {
    beforeEach(() => {
      // This story has a FocusTrapZone containing buttons with tabIndex=-1, so they can still be
      // clicked or programmatically focused, but aren't keyboard-focusable with tab
      cy.loadStory(ftzStoriesTitle, 'NoTabbableItems');
    });

    it('focuses first focusable element when focusing first bumper', () => {
      setProps({});

      // wait for first focus to finish to avoid timing issue
      cy.focused().should('have.text', 'first');

      cy.contains('last').realClick();
      cy.focused().should('have.text', 'last');

      // shift+tab focuses the first bumper (since the buttons inside aren't keyboard-focusable)
      //   => sends focus to first element
      cy.realPress(['Shift', 'Tab']);
      cy.focused().should('have.text', 'first');
    });

    it('focuses first focusable element when focusing last bumper', () => {
      setProps({});

      // wait for first focus to finish to avoid timing issue
      cy.focused().should('have.text', 'first');

      cy.contains('mid').realClick();
      cy.focused().should('have.text', 'mid');

      // tab wraps around to focus first bumper (??) => sends focus to first element
      cy.realPress('Tab');
      cy.focused().should('have.text', 'first');
    });

    it('focuses first focusable element when focusing outside of FTZ with 0 tabbable items', () => {
      setProps({});

      // wait for first focus to finish to avoid timing issue
      cy.focused().should('have.text', 'first');

      cy.contains('mid').realClick();
      cy.focused().should('have.text', 'mid');

      // try to focus on button outside FTZ
      cy.contains('before').realClick();
      // it focuses first button inside FTZ instead
      cy.focused().should('have.text', 'first');
    });

    it('focuses previously focused element when focusing outside of FTZ with 0 tabbable items', () => {
      setProps({ focusPreviouslyFocusedInnerElement: true });

      // wait for first focus to finish to avoid timing issue
      cy.focused().should('have.text', 'first');

      cy.contains('mid').realClick();
      cy.focused().should('have.text', 'mid');

      // try to focus on button outside FTZ
      cy.contains('before').realClick();
      // it focuses last focused button inside FTZ instead
      cy.focused().should('have.text', 'mid');
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
      cy.focused().should('have.text', 'first');

      // Focus inside the trap zone, not the first element.
      cy.contains('last').realClick();
      cy.focused().should('have.text', 'last');

      // Focus outside the trap zone
      cy.contains('after').realClick();
      cy.focused().should('have.text', 'after');

      // Manually focusing FTZ should return to originally focused inner element.
      imperativeFocus();

      cy.focused().should('have.text', 'last');
    });

    it('goes to first focusable element when focusing the FTZ', async () => {
      setProps({ focusPreviouslyFocusedInnerElement: false });

      // Manually focusing FTZ when FTZ has never had focus within should go to 1st focusable inner element.
      imperativeFocus();
      cy.focused().should('have.text', 'first');

      // Focus inside the trap zone, not the first element.
      cy.contains('last').realClick();
      cy.focused().should('have.text', 'last');

      // Focus outside the trap zone
      cy.contains('after').realClick();
      cy.focused().should('have.text', 'after');

      // Manually focusing FTZ should go to the first focusable element.
      imperativeFocus();
      cy.focused().should('have.text', 'first');
    });
  });

  describe('focus stack', () => {
    it('maintains a proper stack of FocusTrapZones as more are mounted/unmounted', () => {
      // TODO: try to find a way to test this concept without looking this deeply into the implementation
      // or using global functions
      //
      // This test needs to look at FocusTrapZone.focusStack (at least with current implementation),
      // and the easiest way to do that in cypress is having the story expose a getFocusStack() global.
      // (Rendering FocusTrapZone.focusStack in the story doesn't work because updates to the array
      // don't trigger React updates, so it gets out of date.)

      cy.loadStory(ftzStoriesTitle, 'FocusStack');

      // There should now be one focus trap zone.
      cy.get('#ftz0').should('exist');
      cy.focused().should('have.text', 'add ftz1'); // first button in ftz0
      cy.window().should(win => {
        // NOTE: This expectation should NOT be done in a helper because there will be no useful
        // line/stack info if it fails (due to being run with eval() inside the test window).
        expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0']);
      });

      // add ftz1 and verify there are now two FTZs in the stack
      cy.contains('add ftz1').realClick();
      cy.get('#ftz1').should('exist');
      cy.focused().should('have.text', 'add ftz2'); // first button in ftz1
      cy.window().should(win => {
        expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0', 'ftz1']);
      });

      // add ftz2 => three FTZ in stack
      cy.contains('add ftz2').realClick();
      cy.get('#ftz2').should('exist');
      cy.focused().should('have.text', 'remove ftz1'); // first button in ftz2
      cy.window().should(win => {
        expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0', 'ftz1', 'ftz2']);
      });

      // remove ftz1 => two FTZ in stack
      cy.contains('remove ftz1').realClick();
      cy.get('#ftz1').should('not.exist');
      cy.focused().should('have.text', 'remove ftz1'); // first button in ftz2
      cy.window().should(win => {
        expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0', 'ftz2']);
      });

      // remove ftz2 => one FTZ in stack
      cy.contains('remove ftz2').realClick();
      cy.get('#ftz2').should('not.exist');
      cy.window().should(win => {
        expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0']);
      });
      // ftz2 will try to return focus to its initiator (the button in ftz1), but that button is gone,
      // so focus goes to document.body
      cy.focused().should('not.exist');
      // add ftz3 => two FTZ in stack
      // (even though ftz3 has forceFocusInsideTrap=false)
      cy.contains('add ftz3').realClick();
      cy.get('#ftz3').should('exist');
      cy.focused().should('have.text', 'remove ftz3'); // first button in ftz3
      cy.window().should(win => {
        expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0', 'ftz3']);
      });

      // remove ftz3 => one FTZ in stack
      cy.contains('remove ftz3').realClick();
      cy.get('#ftz3').should('not.exist');
      cy.window().should(win => {
        expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0']);
      });
      // ftz3 returns focus to initiator after unmount
      cy.focused().should('have.text', 'add ftz3');

      // add ftz4 => still only one FTZ in stack because ftz4 is disabled
      cy.contains('add ftz4').realClick();
      cy.get('#ftz4').should('exist');
      cy.focused().should('have.text', 'add ftz4'); // clicked button in ftz0
      cy.window().should(win => {
        expect((win as FTZTestWindow).getFocusStack!()).to.deep.equal(['ftz0']);
      });
    });
  });
});
