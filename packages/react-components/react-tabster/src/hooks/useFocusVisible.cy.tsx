import * as React from 'react';
import { mount } from '@cypress/react';
import root from 'react-shadow';
import { useFocusVisible } from './useFocusVisible';
import { FOCUS_VISIBLE_ATTR } from '../focus/constants';

describe('useFocusVisible', () => {
  it('should apply focus visible attribute elements in an open shadow root', () => {
    const Example = () => {
      const ref = useFocusVisible<HTMLDivElement>();
      return (
        <div ref={ref}>
          <button id="start">Start</button>
          <root.div id="shadow-host">
            <button id="end">End</button>
          </root.div>
        </div>
      );
    };

    mount(<Example />);
    cy.get('#start').focus().realPress('Tab');
    cy.get('#shadow-host').shadow().find('#end').should('have.attr', FOCUS_VISIBLE_ATTR);
  });

  it('should remove focus visible attribute when focus leaves shadow root', () => {
    const Example = () => {
      const ref = useFocusVisible<HTMLDivElement>();
      return (
        <div ref={ref}>
          <button id="start">Start</button>
          <root.div id="shadow-host">
            <button id="end">End</button>
          </root.div>
        </div>
      );
    };

    mount(<Example />);
    cy.get('#start').focus().realPress('Tab').realPress(['Shift', 'Tab']);
    cy.get('#start')
      .should('have.focus')
      .get('#shadow-host')
      .shadow()
      .find('#end')
      .should('not.have.attr', FOCUS_VISIBLE_ATTR);
  });

  it('should not register activeElement if it is outside of scope', () => {
    const FocusVisible = () => {
      const ref = useFocusVisible<HTMLDivElement>();

      return (
        <div ref={ref}>
          <button>Within scope</button>
        </div>
      );
    };

    const Example = () => {
      const [mounted, setMounted] = React.useState(false);
      const ref = useFocusVisible<HTMLDivElement>();

      return (
        <>
          <div ref={ref}>
            <button id="toggle" onClick={() => setMounted(s => !s)}>
              Toggle mount
            </button>
          </div>
          {mounted && (
            <div id="portal">
              <FocusVisible />
            </div>
          )}
        </>
      );
    };

    mount(<Example />);
    cy.get('#toggle').focus().realPress('Tab');
    cy.get('#toggle').focus().realPress('Enter');
    cy.get('#toggle').should('have.attr', FOCUS_VISIBLE_ATTR).realPress('Enter');
    cy.get('#portal').should('not.exist');
    cy.get('#toggle').should('have.attr', FOCUS_VISIBLE_ATTR);
  });
});
