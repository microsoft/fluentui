import * as React from 'react';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import type { IFocusTrapZoneProps, IFocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { mount } from '@cypress/react';
import type { FTZTestGlobals } from './types';
import { rootClass } from './shared';

describe('FocusTrapZone', () => {
  // These are basic tests of different props, but due to the reliance on focus behavior they're
  // best done in the browser.
  describe('Respects default and explicit prop values', () => {
    const PropValues = (props: IFocusTrapZoneProps) => {
      const [buttonClicked, setButtonClicked] = React.useState('');

      return (
        <div className={rootClass} onClick={ev => setButtonClicked((ev.target as HTMLButtonElement).textContent || '')}>
          <span id="buttonClicked" style={{ display: 'block' /* avoid inherited div styling */ }}>
            clicked {buttonClicked}
          </span>
          <button>before</button>
          <FocusTrapZone {...props}>
            <button>first</button>
            <button>mid</button>
            <button className="last-class" id="last">
              last
            </button>
          </FocusTrapZone>
          <button>after</button>
        </div>
      );
    };

    it('Focuses first child on mount', () => {
      mount(<PropValues />);
      cy.focused().should('have.text', 'first');
    });

    it('Does not focus first child on mount with disableFirstFocus', () => {
      mount(<PropValues disableFirstFocus />);

      // Verify nothing is focused (note that document.activeElement will be body, but cy.focused()
      // uses :focus, and that's not set on body even if it's active)
      cy.focused().should('not.exist');
    });

    it('Can click children inside the FTZ', () => {
      mount(<PropValues />);

      // wait for first focus to finish
      cy.focused().should('have.text', 'first');

      // focus inside the FTZ
      cy.contains('mid').realClick();
      cy.focused().should('have.text', 'mid');
    });

    it('Restores focus to FTZ when clicking outside FTZ', () => {
      mount(<PropValues />);

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
      mount(<PropValues />);

      // wait for first focus to finish to avoid timing issue
      cy.focused().should('have.text', 'first');

      cy.contains('after').focus();
      cy.focused().should('have.text', 'first');
    });

    it('Allows clicks outside FTZ with isClickableOutsideFocusTrap but restores focus inside', () => {
      mount(<PropValues isClickableOutsideFocusTrap />);

      // wait for first focus to finish to avoid timing issue
      cy.focused().should('have.text', 'first');

      // click the button and verify it worked (the story updates the text when a button is clicked)
      cy.contains('before').realClick();
      cy.get('#buttonClicked').should('have.text', 'clicked before');

      // but focus is kept within the FTZ
      cy.focused().should('have.text', 'first');
    });

    it('Focuses first element when focus enters FTZ with tab', () => {
      mount(<PropValues disableFirstFocus forceFocusInsideTrap={false} />);

      // Start by programmatically focusing an element outside
      // (clicking it won't work in this case because that would send focus inside the trap)
      cy.contains('before').focus();
      cy.focused().should('have.text', 'before');

      // Tab to send focus to the first bumper, which passes focus on to the first element inside
      cy.realPress('Tab');
      cy.focused().should('have.text', 'first');
    });

    it('Focuses last element when focus enters FTZ with shift+tab', () => {
      mount(<PropValues disableFirstFocus />);

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
      mount(<PropValues forceFocusInsideTrap />);

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
      mount(<PropValues disabled />);

      // verify story rendered (to make sure we're not checking the base state of the page)
      cy.contains('first').should('exist');

      cy.focused().should('not.exist');
    });

    it('Focuses on firstFocusableSelector on mount', () => {
      mount(<PropValues firstFocusableSelector="last-class" />);

      cy.focused().should('have.text', 'last');
    });

    it('Does not focus on firstFocusableSelector on mount while disabled', () => {
      mount(<PropValues firstFocusableSelector="last-class" disabled />);

      // verify story rendered (to make sure we're not checking the base state of the page)
      cy.contains('first').should('exist');

      cy.focused().should('not.exist');
    });

    it('Falls back to first focusable element with invalid firstFocusableSelector', () => {
      mount(<PropValues firstFocusableSelector="invalidSelector" />);

      cy.focused().should('have.text', 'first');
    });

    it('Focuses on firstFocusableTarget selector on mount', () => {
      mount(<PropValues firstFocusableTarget="#last" />);

      cy.focused().should('have.text', 'last');
    });

    it('Focuses on firstFocusableTarget callback on mount', () => {
      // eslint-disable-next-line react/jsx-no-bind
      mount(<PropValues firstFocusableTarget={element => element.querySelector('#last')} />);

      cy.focused().should('have.text', 'last');
    });

    it('Does not focus on firstFocusableTarget selector on mount while disabled', () => {
      mount(<PropValues firstFocusableTarget="#last" disabled />);

      // verify story rendered (to make sure we're not checking the base state of the page)
      cy.contains('first').should('exist');

      cy.focused().should('not.exist');
    });

    it('Does not focus on firstFocusableTarget callback on mount while disabled', () => {
      // eslint-disable-next-line react/jsx-no-bind
      mount(<PropValues firstFocusableTarget={element => element.querySelector('#last')} disabled />);

      // verify story rendered (to make sure we're not checking the base state of the page)
      cy.contains('first').should('exist');

      cy.focused().should('not.exist');
    });

    it('Falls back to first focusable element with invalid firstFocusableTarget selector', () => {
      mount(<PropValues firstFocusableTarget=".invalidSelector" />);

      cy.focused().should('have.text', 'first');
    });

    it('Falls back to first focusable element with invalid firstFocusableTarget callback', () => {
      // eslint-disable-next-line react/jsx-no-bind
      mount(<PropValues firstFocusableTarget={() => null} />);

      cy.focused().should('have.text', 'first');
    });
  });

  describe('Tab and shift-tab wrap at extreme ends of the FTZ', () => {
    const TabWrappingButtonFocusZone = () => {
      return (
        <div className={rootClass}>
          <FocusTrapZone forceFocusInsideTrap={false}>
            <div>
              <button>first</button>
            </div>
            <FocusZone direction={FocusZoneDirection.horizontal}>
              <div>
                <button>fzFirst</button>
              </div>
              <div>
                <div>
                  <button>fzMid1</button>
                  <button>fzMid2</button>
                  <button>fzLast</button>
                </div>
              </div>
            </FocusZone>
          </FocusTrapZone>
        </div>
      );
    };

    const TabWrappingMultiFocusZone = () => {
      return (
        <div className={rootClass}>
          <FocusTrapZone forceFocusInsideTrap={false}>
            <FocusZone direction={FocusZoneDirection.horizontal}>
              <div>
                <button>fz1First</button>
              </div>
              <div>
                <button>fz1Mid</button>
              </div>
              <div>
                <button>fz1Last</button>
              </div>
            </FocusZone>
            <FocusZone direction={FocusZoneDirection.horizontal}>
              <div>
                <div>
                  <button>fz2First</button>
                  <button>fz2Mid</button>
                  <button>fz2Last</button>
                </div>
              </div>
            </FocusZone>
          </FocusTrapZone>
        </div>
      );
    };

    const TabWrappingFocusZoneBumpers = () => {
      return (
        <div className={rootClass}>
          <button>before</button>
          <FocusTrapZone forceFocusInsideTrap={false}>
            <FocusZone direction={FocusZoneDirection.horizontal}>
              <button>fz1First</button>
              <button>fz1Mid</button>
              <button>fz1Last</button>
            </FocusZone>
            <button>mid</button>
            <FocusZone direction={FocusZoneDirection.horizontal}>
              <button>fz2First</button>
              <button>fz2Mid</button>
              <button>fz2Last</button>
            </FocusZone>
          </FocusTrapZone>
          <button>after</button>
        </div>
      );
    };

    it('can tab between a button and a FocusZone', () => {
      mount(<TabWrappingButtonFocusZone />);

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
      mount(<TabWrappingMultiFocusZone />);

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
        mount(<TabWrappingFocusZoneBumpers />);

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
    const NoTabbableItems = (props: IFocusTrapZoneProps) => {
      return (
        // don't render until props have been set
        <div className={rootClass}>
          <button>before</button>
          <FocusTrapZone forceFocusInsideTrap {...props}>
            <button tabIndex={-1}>first</button>
            <button tabIndex={-1}>mid</button>
            <button tabIndex={-1}>last</button>
          </FocusTrapZone>
          <button>after</button>
        </div>
      );
    };
    it('focuses first focusable element when focusing first bumper', () => {
      mount(<NoTabbableItems />);

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
      mount(<NoTabbableItems />);

      // wait for first focus to finish to avoid timing issue
      cy.focused().should('have.text', 'first');

      cy.contains('mid').realClick();
      cy.focused().should('have.text', 'mid');

      // tab wraps around to focus first bumper (??) => sends focus to first element
      cy.realPress('Tab');
      cy.focused().should('have.text', 'first');
    });

    it('focuses first focusable element when focusing outside of FTZ with 0 tabbable items', () => {
      mount(<NoTabbableItems />);

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
      mount(<NoTabbableItems focusPreviouslyFocusedInnerElement />);

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
    let imperativeFocus: () => void = () => null;
    const ImperativeFocus = (props: IFocusTrapZoneProps) => {
      const focusTrapZoneRef = React.useRef<IFocusTrapZone>(null);
      React.useEffect(() => {
        imperativeFocus = () => focusTrapZoneRef.current?.focus();
      }, []);

      return (
        // don't render until props have been set
        props && (
          <div className={rootClass}>
            <FocusTrapZone disableFirstFocus componentRef={focusTrapZoneRef} {...props}>
              <button>first</button>
              <FocusZone>
                <button>mid</button>
                <button>last</button>
              </FocusZone>
            </FocusTrapZone>
            <button>after</button>
          </div>
        )
      );
    };

    it('goes to previously focused element when focusing the FTZ', async () => {
      mount(<ImperativeFocus focusPreviouslyFocusedInnerElement />);

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
      mount(<ImperativeFocus focusPreviouslyFocusedInnerElement={false} />);

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
    const getFocusStack: NonNullable<FTZTestGlobals['getFocusStack']> = () => FocusTrapZone.focusStack;
    const FocusStack = () => {
      // Whether to render each FocusTrapZone
      const [shouldRender, setShouldRender] = React.useState([true, false, false, false, false]);

      const updateFTZ = (num: 1 | 2 | 3 | 4, newValue: boolean) => {
        setShouldRender(prevValues => {
          const newValues = [...prevValues];
          newValues[num] = newValue;
          return newValues;
        });
      };

      // React.useEffect(() => {
      //   getFocusStack = () => FocusTrapZone.focusStack;
      // }, []);
      return (
        <div className={rootClass}>
          <FocusTrapZone id="ftz0">
            ftz0
            <button onClick={() => updateFTZ(1, true)}>add ftz1</button>
            <button onClick={() => updateFTZ(3, true)}>add ftz3</button>
            <button onClick={() => updateFTZ(4, true)}>add ftz4</button>
          </FocusTrapZone>

          {shouldRender[1] && (
            <FocusTrapZone id="ftz1">
              ftz1
              <button onClick={() => updateFTZ(2, true)}>add ftz2</button>
            </FocusTrapZone>
          )}
          {shouldRender[2] && (
            <FocusTrapZone id="ftz2">
              ftz2
              <button onClick={() => updateFTZ(1, false)}>remove ftz1</button>
              <button onClick={() => updateFTZ(2, false)}>remove ftz2</button>
            </FocusTrapZone>
          )}
          {shouldRender[3] && (
            <FocusTrapZone id="ftz3" forceFocusInsideTrap={false}>
              ftz3
              <button onClick={() => updateFTZ(3, false)}>remove ftz3</button>
            </FocusTrapZone>
          )}
          {shouldRender[4] && (
            <FocusTrapZone id="ftz4" disabled>
              ftz4
            </FocusTrapZone>
          )}
        </div>
      );
    };

    it('maintains a proper stack of FocusTrapZones as more are mounted/unmounted', () => {
      // TODO: try to find a way to test this concept without looking this deeply into the implementation
      // or using global functions
      //
      // This test needs to look at FocusTrapZone.focusStack (at least with current implementation),
      // and the easiest way to do that in cypress is having the story expose a getFocusStack() global.
      // (Rendering FocusTrapZone.focusStack in the story doesn't work because updates to the array
      // don't trigger React updates, so it gets out of date.)
      mount(<FocusStack />);

      // There should now be one focus trap zone.
      cy.get('#ftz0').should('exist');
      cy.focused().should('have.text', 'add ftz1'); // first button in ftz0
      cy.then(() => expect(getFocusStack()).to.deep.equal(['ftz0']));

      // add ftz1 and verify there are now two FTZs in the stack
      cy.contains('add ftz1').realClick();
      cy.get('#ftz1').should('exist');
      cy.focused().should('have.text', 'add ftz2'); // first button in ftz1
      cy.then(() => expect(getFocusStack()).to.deep.equal(['ftz0', 'ftz1']));

      // add ftz2 => three FTZ in stack
      cy.contains('add ftz2').realClick();
      cy.get('#ftz2').should('exist');
      cy.focused().should('have.text', 'remove ftz1'); // first button in ftz2
      cy.then(() => expect(getFocusStack()).to.deep.equal(['ftz0', 'ftz1', 'ftz2']));

      // remove ftz1 => two FTZ in stack
      cy.contains('remove ftz1').realClick();
      cy.get('#ftz1').should('not.exist');
      cy.focused().should('have.text', 'remove ftz1'); // first button in ftz2
      cy.then(() => expect(getFocusStack()).to.deep.equal(['ftz0', 'ftz2']));

      // remove ftz2 => one FTZ in stack
      cy.contains('remove ftz2').realClick();
      cy.get('#ftz2').should('not.exist');
      // expect(getFocusStack()).to.deep.equal(['ftz0']);
      // ftz2 will try to return focus to its initiator (the button in ftz1), but that button is gone,
      // so focus goes to document.body
      cy.focused().should('not.exist');
      // add ftz3 => two FTZ in stack
      // (even though ftz3 has forceFocusInsideTrap=false)
      cy.contains('add ftz3').realClick();
      cy.get('#ftz3').should('exist');
      cy.focused().should('have.text', 'remove ftz3'); // first button in ftz3
      cy.then(() => expect(getFocusStack()).to.deep.equal(['ftz0', 'ftz3']));

      // remove ftz3 => one FTZ in stack
      cy.contains('remove ftz3').realClick();
      cy.get('#ftz3').should('not.exist');
      cy.then(() => expect(getFocusStack()).to.deep.equal(['ftz0']));
      // ftz3 returns focus to initiator after unmount
      cy.focused().should('have.text', 'add ftz3');

      // add ftz4 => still only one FTZ in stack because ftz4 is disabled
      cy.contains('add ftz4').realClick();
      cy.get('#ftz4').should('exist');
      cy.focused().should('have.text', 'add ftz4'); // clicked button in ftz0
      cy.then(() => expect(getFocusStack()).to.deep.equal(['ftz0']));
    });
  });
});
